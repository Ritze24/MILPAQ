import { WEBSITE_PARTNER_NAME } from "./config.ts";
import { ensureSchema, exec, getPool, rows, withTx } from "./db.ts";
import { sha256Hex, stableStringify } from "./fingerprint.ts";
import { newId } from "./ids.ts";
import { putFile, removeFile } from "./storage.ts";
import { contentTypeFor, type WebsiteRfq } from "./website-rfq-parse.ts";

// The public packaging RFQ form is emailed first (see /api/forms); this copies the
// same submission into the live database so staff can work it in /staff/quotes.

export type WebsiteUpload = { filename: string; bytes: Uint8Array };

export type SaveResult = { saved: true; requestId: string } | { saved: false; reason: string };

// Best effort and never throws: the email is the system of record and has
// already been sent by the time this runs.
export async function saveWebsiteRfq(rfq: WebsiteRfq, upload: WebsiteUpload | null): Promise<SaveResult> {
  const pool = getPool("live");
  if (!pool) return { saved: false, reason: "live database not configured" };

  let storedPath: string | null = null;
  const requestId = newId("mpq_");
  try {
    await ensureSchema("live", pool);
    const [partner] = await rows<{ id: number }>(pool, "SELECT id FROM partners WHERE name = ? LIMIT 1", [WEBSITE_PARTNER_NAME]);
    if (!partner) return { saved: false, reason: "website partner row missing" };

    const notes: string[] = [];
    if (rfq.notes) notes.push(rfq.notes);
    if (!rfq.measurementsParsed) notes.push(`[Entered dimensions: "${rfq.rawDimensions}", weight: "${rfq.rawWeight}". Could not be read automatically, so the values above may be 0.]`);

    let upload_ok = false;
    if (upload) {
      try {
        storedPath = await putFile("live", requestId, upload.filename, upload.bytes);
        upload_ok = true;
      } catch {
        notes.push("[The uploaded contract could not be stored here. Use the copy attached to the notification email.]");
      }
    }

    const now = new Date();
    const externalId = `web_${requestId}`;
    const fingerprint = sha256Hex(stableStringify({ ...rfq, requestId }));
    await withTx(pool, async (conn) => {
      await exec(
        conn,
        `INSERT INTO quote_requests (
           id, partner_id, source, external_request_id, idempotency_key, fingerprint, status,
           company_name, contact_name, contact_email, contact_phone, solicitation_number,
           number_of_units, unit_length, unit_width, unit_height, dimension_unit,
           unit_weight, weight_unit, origin_inspection, destination_inspection, notes,
           terms_version, terms_accepted_at, terms_accepted_by, received_at, updated_at)
         VALUES (?, ?, 'website', ?, ?, ?, 'received', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          requestId, partner.id, externalId, externalId, fingerprint,
          rfq.companyName, rfq.contactName, rfq.email, rfq.phone, rfq.solicitationNumber,
          rfq.numberOfUnits, rfq.length, rfq.width, rfq.height, rfq.dimensionUnit,
          rfq.weight, rfq.weightUnit, rfq.originInspection ? 1 : 0, rfq.destinationInspection ? 1 : 0, notes.join("\n\n") || null,
          rfq.termsVersion || "unknown", now, rfq.email, now, now,
        ],
      );
      if (upload && upload_ok && storedPath) {
        await exec(
          conn,
          `INSERT INTO request_files (id, request_id, kind, path, filename, content_type, size_bytes, sha256, created_at)
           VALUES (?, ?, 'solicitation', ?, ?, ?, ?, ?, ?)`,
          [newId("file_"), requestId, storedPath, upload.filename.slice(0, 200), contentTypeFor(upload.filename), upload.bytes.length, sha256Hex(upload.bytes), now],
        );
      }
      await exec(conn, "INSERT INTO request_events (request_id, status, detail, occurred_at) VALUES (?, 'received', 'Submitted on the website', ?)", [requestId, now]);
    });
    return { saved: true, requestId };
  } catch (err) {
    if (storedPath) await removeFile(storedPath).catch(() => undefined);
    return { saved: false, reason: err instanceof Error ? err.message : "unknown error" };
  }
}
