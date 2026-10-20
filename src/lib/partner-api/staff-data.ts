import { dbUrlFor, ENVIRONMENTS, type ApiEnvironment } from "./config.ts";
import { requirePool, rows } from "./db.ts";
import type { FileRow, QuoteRequestRow } from "./service.ts";

export function configuredEnvironments(): ApiEnvironment[] {
  return ENVIRONMENTS.filter((e) => dbUrlFor(e));
}

export type ListItem = Pick<QuoteRequestRow, "id" | "status" | "company_name" | "solicitation_number" | "number_of_units" | "received_at" | "updated_at"> & { partner_name: string };

export async function listRequests(env: ApiEnvironment, status: string | null): Promise<ListItem[]> {
  const pool = await requirePool(env);
  const where = status ? "WHERE q.status = ?" : "";
  return rows<ListItem>(
    pool,
    `SELECT q.id, q.status, q.company_name, q.solicitation_number, q.number_of_units, q.received_at, q.updated_at, p.name AS partner_name
     FROM quote_requests q JOIN partners p ON p.id = q.partner_id ${where}
     ORDER BY (q.status IN ('received','under_review')) DESC, q.received_at DESC LIMIT 200`,
    status ? [status] : [],
  );
}

export type Detail = {
  row: QuoteRequestRow & {
    unit_length: number; unit_width: number; unit_height: number; dimension_unit: string;
    unit_weight: number; weight_unit: string; origin_inspection: number; destination_inspection: number;
    notes: string | null; terms_version: string; terms_accepted_at: Date; terms_accepted_by: string;
  };
  partnerName: string;
  files: FileRow[];
  events: { status: string; detail: string | null; occurred_at: Date }[];
  messages: { direction: "partner" | "milpaq"; body: string; created_at: Date }[];
};

export async function getDetail(env: ApiEnvironment, id: string): Promise<Detail | null> {
  const pool = await requirePool(env);
  const found = await rows<Detail["row"] & { partner_name: string }>(
    pool,
    "SELECT q.*, p.name AS partner_name FROM quote_requests q JOIN partners p ON p.id = q.partner_id WHERE q.id = ?",
    [id],
  );
  if (!found[0]) return null;
  const { partner_name, ...row } = found[0];
  const [files, events, messages] = await Promise.all([
    rows<FileRow>(pool, "SELECT * FROM request_files WHERE request_id = ? ORDER BY created_at", [id]),
    rows<Detail["events"][number]>(pool, "SELECT status, detail, occurred_at FROM request_events WHERE request_id = ? ORDER BY id", [id]),
    rows<Detail["messages"][number]>(pool, "SELECT direction, body, created_at FROM request_messages WHERE request_id = ? ORDER BY id", [id]),
  ]);
  return { row, partnerName: partner_name, files, events, messages };
}
