import type { Pool, PoolConnection } from "mysql2/promise";
import { LIMITS, masterKey, publicBaseUrl, type ApiEnvironment } from "./config.ts";
import { deriveKey } from "./crypto-box.ts";
import { exec, isDuplicateKey, rows, withTx, type Queryable } from "./db.ts";
import { signDownloadToken } from "./download-token.ts";
import { ApiError } from "./errors.ts";
import { requestFingerprint, sha256Hex } from "./fingerprint.ts";
import { newId } from "./ids.ts";
import { putFile, removeFile } from "./storage.ts";
import type { ParsedMetadata } from "./validate.ts";

export type RequestStatus =
  | "received"
  | "under_review"
  | "additional_information_required"
  | "quote_completed"
  | "declined"
  | "cancelled";

const ALLOWED: Record<RequestStatus, RequestStatus[]> = {
  received: ["under_review", "declined", "cancelled"],
  under_review: ["additional_information_required", "quote_completed", "declined", "cancelled"],
  additional_information_required: ["under_review", "declined", "cancelled"],
  quote_completed: [],
  declined: [],
  cancelled: [],
};

export type AuthContext = { env: ApiEnvironment; pool: Pool; partnerId: number; keyId: number };

export type QuoteRequestRow = {
  id: string;
  partner_id: number;
  external_request_id: string;
  idempotency_key: string;
  fingerprint: string;
  status: RequestStatus;
  source: "partner" | "website";
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  solicitation_number: string;
  number_of_units: number;
  status_message: string | null;
  currency: string | null;
  packaging_price: number | null;
  shipping_price: number | null;
  total_amount: number | null;
  quote_number: string | null;
  quote_expires_at: Date | null;
  quote_notes: string | null;
  received_at: Date;
  updated_at: Date;
};

export type FileRow = {
  id: string;
  request_id: string;
  kind: "solicitation" | "quote" | "message";
  path: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  sha256: string;
  created_at: Date;
};

export type QuoteInput = {
  currency: string;
  packagingPrice: number;
  shippingPrice: number | null;
  totalAmount: number;
  quoteNumber: string;
  expiresAt: Date;
  notes: string | null;
};

export type UploadedFile = { filename: string; contentType: string; bytes: Uint8Array };

const iso = (d: Date) => d.toISOString();

// ---------- signed document URLs ----------

function downloadKey(): Buffer {
  const master = masterKey();
  if (!master) throw new ApiError("unavailable", "The MILPAQ API is not available right now.");
  return deriveKey(master, "download-signing");
}

export function documentUrl(env: ApiEnvironment, requestId: string, fileId: string, now = new Date()) {
  const expires = Math.floor(now.getTime() / 1000) + LIMITS.downloadUrlTtlSeconds;
  const token = signDownloadToken({ e: env, r: requestId, f: fileId, x: expires }, downloadKey());
  return { url: `${publicBaseUrl()}/api/v1/documents/${token}`, expiresAt: new Date(expires * 1000) };
}

async function latestQuoteFile(db: Queryable, requestId: string): Promise<FileRow | null> {
  const found = await rows<FileRow>(db, "SELECT * FROM request_files WHERE request_id = ? AND kind = 'quote' ORDER BY created_at DESC LIMIT 1", [requestId]);
  return found[0] ?? null;
}

// ---------- API representation ----------

export async function quoteBlock(db: Queryable, env: ApiEnvironment, row: QuoteRequestRow, now = new Date()) {
  if (row.status !== "quote_completed") return undefined;
  const file = await latestQuoteFile(db, row.id);
  const doc = file ? documentUrl(env, row.id, file.id, now) : null;
  return {
    currency: row.currency,
    packaging_price: row.packaging_price,
    shipping_price: row.shipping_price,
    total_amount: row.total_amount,
    quote_number: row.quote_number,
    expires_at: row.quote_expires_at ? iso(row.quote_expires_at) : null,
    document:
      file && doc
        ? { download_url: doc.url, expires_at: iso(doc.expiresAt), content_type: file.content_type, sha256: file.sha256 }
        : null,
    notes: row.quote_notes,
  };
}

function dataBlock(row: QuoteRequestRow) {
  if (!row.status_message) return undefined;
  return row.status === "additional_information_required" ? { message: row.status_message } : { reason: row.status_message };
}

export async function toApiView(db: Queryable, env: ApiEnvironment, row: QuoteRequestRow) {
  const data = dataBlock(row);
  const quote = await quoteBlock(db, env, row);
  return {
    request_id: row.id,
    external_request_id: row.external_request_id,
    status: row.status,
    received_at: iso(row.received_at),
    updated_at: iso(row.updated_at),
    ...(data ? { data } : {}),
    ...(quote ? { quote } : {}),
  };
}

// ---------- webhook outbox ----------

// Runs inside the same transaction as the status change, so an event exists
// if and only if the change committed.
async function enqueueWebhook(conn: PoolConnection, env: ApiEnvironment, row: QuoteRequestRow, now: Date): Promise<string> {
  const data = dataBlock(row);
  const quote = await quoteBlock(conn, env, row, now);
  const eventId = newId("evt_", now.getTime());
  const payload = JSON.stringify({
    event_id: eventId,
    event_type: "quote_request.updated",
    occurred_at: iso(now),
    request_id: row.id,
    external_request_id: row.external_request_id,
    status: row.status,
    ...(data ? { data } : {}),
    ...(quote ? { quote } : {}),
  });
  const deliveryId = newId("dlv_", now.getTime());
  await exec(
    conn,
    `INSERT INTO webhook_deliveries (id, partner_id, request_id, event_id, event_type, payload, status, attempts, next_attempt_at, created_at)
     VALUES (?, ?, ?, ?, 'quote_request.updated', ?, 'pending', 0, ?, ?)`,
    [deliveryId, row.partner_id, row.id, eventId, payload, now, now],
  );
  return deliveryId;
}

// ---------- create ----------

export type CreateResult = { replayed: boolean; row: QuoteRequestRow; deliveryId: string | null };

export async function createQuoteRequest(
  ctx: AuthContext,
  input: { idempotencyKey: string; meta: ParsedMetadata; pdf: Uint8Array; pdfName: string },
): Promise<CreateResult> {
  const { pool, env, partnerId } = ctx;
  const pdfSha = sha256Hex(input.pdf);
  const fingerprint = requestFingerprint(input.meta, pdfSha);

  const existing = await findByIdempotencyKey(pool, partnerId, input.idempotencyKey);
  if (existing) return resolveReplay(existing, fingerprint);

  const requestId = newId("mpq_");
  const now = new Date();
  const relPath = await putFile(env, requestId, "solicitation.pdf", input.pdf);

  try {
    const result = await withTx(pool, async (conn) => {
      const m = input.meta;
      await exec(
        conn,
        `INSERT INTO quote_requests (
           id, partner_id, external_request_id, idempotency_key, fingerprint, status,
           company_name, contact_name, contact_email, contact_phone, solicitation_number,
           number_of_units, unit_length, unit_width, unit_height, dimension_unit,
           unit_weight, weight_unit, origin_inspection, destination_inspection, notes,
           terms_version, terms_accepted_at, terms_accepted_by, received_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'received', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          requestId, partnerId, m.externalRequestId, input.idempotencyKey, fingerprint,
          m.companyName, m.contactName, m.contactEmail, m.contactPhone, m.solicitationNumber,
          m.numberOfUnits, m.length, m.width, m.height, m.dimensionUnit,
          m.weightValue, m.weightUnit, m.originInspectionRequired ? 1 : 0, m.destinationInspectionRequired ? 1 : 0, m.additionalNotes,
          m.termsVersion, new Date(m.termsAcceptedAt), m.termsAcceptedBy, now, now,
        ],
      );
      await exec(
        conn,
        `INSERT INTO request_files (id, request_id, kind, path, filename, content_type, size_bytes, sha256, created_at)
         VALUES (?, ?, 'solicitation', ?, ?, 'application/pdf', ?, ?, ?)`,
        [newId("file_"), requestId, relPath, input.pdfName.slice(0, 200), input.pdf.length, pdfSha, now],
      );
      await exec(conn, "INSERT INTO request_events (request_id, status, detail, occurred_at) VALUES (?, 'received', NULL, ?)", [requestId, now]);
      const [row] = await rows<QuoteRequestRow>(conn, "SELECT * FROM quote_requests WHERE id = ?", [requestId]);
      const deliveryId = await enqueueWebhook(conn, env, row, now);
      return { row, deliveryId };
    });
    return { replayed: false, ...result };
  } catch (err) {
    await removeFile(relPath).catch(() => undefined);
    if (isDuplicateKey(err)) {
      // A concurrent retry won the race: return its result (or a conflict).
      const winner = await findByIdempotencyKey(pool, partnerId, input.idempotencyKey);
      if (winner) return resolveReplay(winner, fingerprint);
    }
    throw err;
  }
}

async function findByIdempotencyKey(db: Queryable, partnerId: number, key: string) {
  const found = await rows<QuoteRequestRow>(db, "SELECT * FROM quote_requests WHERE partner_id = ? AND idempotency_key = ?", [partnerId, key]);
  return found[0] ?? null;
}

function resolveReplay(row: QuoteRequestRow, fingerprint: string): CreateResult {
  if (row.fingerprint !== fingerprint) {
    throw new ApiError("idempotency_conflict", "This Idempotency-Key was already used with different request content.");
  }
  return { replayed: true, row, deliveryId: null };
}

// ---------- read ----------

export async function getRequestForPartner(ctx: AuthContext, id: string): Promise<QuoteRequestRow> {
  const found = await rows<QuoteRequestRow>(ctx.pool, "SELECT * FROM quote_requests WHERE id = ? AND partner_id = ?", [id, ctx.partnerId]);
  if (!found[0]) throw new ApiError("not_found", "Quote request not found.");
  return found[0];
}

// ---------- status changes (MILPAQ staff / sandbox simulator) ----------

export type StatusChange = {
  message?: string | null;
  quote?: QuoteInput;
  quotePdf?: { bytes: Uint8Array; filename: string };
};

// Returns the queued webhook delivery, or null for website requests (no partner to notify).
async function applyStatusChange(conn: PoolConnection, env: ApiEnvironment, requestId: string, to: RequestStatus, change: StatusChange, quoteRelPath: string | null, now: Date): Promise<string | null> {
  const [current] = await rows<QuoteRequestRow>(conn, "SELECT * FROM quote_requests WHERE id = ? FOR UPDATE", [requestId]);
  if (!current) throw new ApiError("not_found", "Quote request not found.");
  if (!ALLOWED[current.status].includes(to)) {
    throw new ApiError("invalid_state", `Cannot move a request from ${current.status} to ${to}.`);
  }
  const message = change.message?.trim() || null;
  if (to === "additional_information_required" && !message) {
    throw new ApiError("invalid_request", "A message is required when more information is requested.");
  }
  if (to === "quote_completed") {
    if (!change.quote || !quoteRelPath || !change.quotePdf) {
      throw new ApiError("invalid_request", "Completing a quote requires the quote details and a PDF.");
    }
    const q = change.quote;
    await exec(
      conn,
      `UPDATE quote_requests SET currency = ?, packaging_price = ?, shipping_price = ?, total_amount = ?,
         quote_number = ?, quote_expires_at = ?, quote_notes = ? WHERE id = ?`,
      [q.currency, q.packagingPrice, q.shippingPrice, q.totalAmount, q.quoteNumber, q.expiresAt, q.notes, requestId],
    );
    await exec(
      conn,
      `INSERT INTO request_files (id, request_id, kind, path, filename, content_type, size_bytes, sha256, created_at)
       VALUES (?, ?, 'quote', ?, ?, 'application/pdf', ?, ?, ?)`,
      [newId("file_"), requestId, quoteRelPath, change.quotePdf.filename.slice(0, 200), change.quotePdf.bytes.length, sha256Hex(change.quotePdf.bytes), now],
    );
  }
  const keepMessage = to === "additional_information_required" || to === "declined" || to === "cancelled";
  await exec(conn, "UPDATE quote_requests SET status = ?, status_message = ?, updated_at = ? WHERE id = ?", [to, keepMessage ? message : null, now, requestId]);
  if (to === "additional_information_required" && message) {
    await exec(conn, "INSERT INTO request_messages (request_id, direction, body, created_at) VALUES (?, 'milpaq', ?, ?)", [requestId, message, now]);
  }
  await exec(conn, "INSERT INTO request_events (request_id, status, detail, occurred_at) VALUES (?, ?, ?, ?)", [requestId, to, message, now]);
  const [updated] = await rows<QuoteRequestRow>(conn, "SELECT * FROM quote_requests WHERE id = ?", [requestId]);
  return updated.source === "website" ? null : enqueueWebhook(conn, env, updated, now);
}

export async function changeStatus(pool: Pool, env: ApiEnvironment, requestId: string, to: RequestStatus, change: StatusChange = {}): Promise<string | null> {
  const quoteRelPath = change.quotePdf ? await putFile(env, requestId, change.quotePdf.filename, change.quotePdf.bytes) : null;
  try {
    return await withTx(pool, (conn) => applyStatusChange(conn, env, requestId, to, change, quoteRelPath, new Date()));
  } catch (err) {
    if (quoteRelPath) await removeFile(quoteRelPath).catch(() => undefined);
    throw err;
  }
}

// ---------- partner reply to an information request ----------

export async function addPartnerMessage(ctx: AuthContext, requestId: string, body: string, files: UploadedFile[]): Promise<{ row: QuoteRequestRow; deliveryId: string }> {
  const { pool, env } = ctx;
  await getRequestForPartner(ctx, requestId); // 404 for other partners' requests
  const stored: { relPath: string; file: UploadedFile }[] = [];
  for (const file of files) stored.push({ relPath: await putFile(env, requestId, file.filename, file.bytes), file });
  try {
    return await withTx(pool, async (conn) => {
      const [row] = await rows<QuoteRequestRow>(conn, "SELECT * FROM quote_requests WHERE id = ? AND partner_id = ? FOR UPDATE", [requestId, ctx.partnerId]);
      if (!row) throw new ApiError("not_found", "Quote request not found.");
      if (row.status !== "additional_information_required") {
        throw new ApiError("invalid_state", "Messages are only accepted while the request is awaiting additional information.");
      }
      const now = new Date();
      await exec(conn, "INSERT INTO request_messages (request_id, direction, body, created_at) VALUES (?, 'partner', ?, ?)", [requestId, body, now]);
      for (const { relPath, file } of stored) {
        await exec(
          conn,
          `INSERT INTO request_files (id, request_id, kind, path, filename, content_type, size_bytes, sha256, created_at)
           VALUES (?, ?, 'message', ?, ?, ?, ?, ?, ?)`,
          [newId("file_"), requestId, relPath, file.filename.slice(0, 200), file.contentType, file.bytes.length, sha256Hex(file.bytes), now],
        );
      }
      const deliveryId = await applyStatusChange(conn, env, requestId, "under_review", { message: null }, null, now);
      if (!deliveryId) throw new ApiError("not_found", "Quote request not found.");
      const [updated] = await rows<QuoteRequestRow>(conn, "SELECT * FROM quote_requests WHERE id = ?", [requestId]);
      return { row: updated, deliveryId };
    });
  } catch (err) {
    for (const { relPath } of stored) await removeFile(relPath).catch(() => undefined);
    throw err;
  }
}

// ---------- rate limiting (per key, per minute, stored in the DB) ----------

export async function enforceRateLimit(ctx: AuthContext, kind: "submit" | "poll", limit: number): Promise<void> {
  const bucket = Math.floor(Date.now() / 60_000);
  await exec(
    ctx.pool,
    "INSERT INTO rate_limits (key_id, kind, bucket, hits) VALUES (?, ?, ?, 1) ON DUPLICATE KEY UPDATE hits = hits + 1",
    [ctx.keyId, kind, bucket],
  );
  const [row] = await rows<{ hits: number }>(ctx.pool, "SELECT hits FROM rate_limits WHERE key_id = ? AND kind = ? AND bucket = ?", [ctx.keyId, kind, bucket]);
  if (row && row.hits > limit) {
    const retryAfter = 60 - (Math.floor(Date.now() / 1000) % 60);
    throw new ApiError("rate_limited", `Rate limit of ${limit} requests per minute exceeded.`, undefined, { "Retry-After": String(retryAfter) });
  }
}
