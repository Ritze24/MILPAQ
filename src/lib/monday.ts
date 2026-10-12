import { MONDAY_BOARDS, type MondayColumnMapping } from "@/lib/monday-config";

// Copies website form submissions into Monday.com boards.
// MONDAY_API_TOKEN is set as an environment variable on the Hostinger Web App
// (never committed). Without it, or for forms with no board configured, this
// is a no-op — the email notification is unaffected either way.

const API_URL = "https://api.monday.com/v2";
const FILE_API_URL = "https://api.monday.com/v2/file";
const TIMEOUT_MS = 10_000;

export function isMondayConfigured(formName: string) {
  return Boolean(process.env.MONDAY_API_TOKEN && MONDAY_BOARDS[formName]?.boardId);
}

function str(data: FormData, field: string) {
  const value = data.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function columnValue(mapping: MondayColumnMapping, data: FormData): unknown {
  if ("value" in mapping) {
    return mapping.kind === "status" ? { label: mapping.value } : mapping.value;
  }
  const text = str(data, mapping.field);
  switch (mapping.kind) {
    case "text":
      return text || null;
    case "longText":
      return text ? { text } : null;
    case "email":
      return text ? { email: text, text } : null;
    case "phone": {
      const digits = text.replace(/[^\d+]/g, "");
      return digits ? { phone: digits, countryShortName: "US" } : null;
    }
    case "number":
      return text && !Number.isNaN(Number(text)) ? text : null;
    case "checkbox":
      return data.get(mapping.field) ? { checked: "true" } : null;
    case "status":
      return text ? { label: text } : null;
    case "file":
      return null; // uploaded separately after the item exists
  }
}

async function mondayRequest(query: string, variables: Record<string, unknown>) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.MONDAY_API_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.errors || json.error_message) {
    throw new Error(`Monday API ${res.status}: ${JSON.stringify(json?.errors ?? json?.error_message ?? json)}`);
  }
  return json.data;
}

async function createItem(boardId: string, itemName: string, columns: Record<string, unknown>) {
  const data = await mondayRequest(
    `mutation ($board: ID!, $name: String!, $cols: JSON!) {
      create_item(board_id: $board, item_name: $name, column_values: $cols, create_labels_if_missing: true) { id }
    }`,
    { board: boardId, name: itemName, cols: JSON.stringify(columns) },
  );
  return String(data.create_item.id);
}

async function uploadFile(itemId: string, columnId: string, file: File) {
  const body = new FormData();
  body.append(
    "query",
    `mutation ($file: File!) { add_file_to_column(item_id: ${Number(itemId)}, column_id: ${JSON.stringify(columnId)}, file: $file) { id } }`,
  );
  body.append("variables[file]", file, file.name || "attachment");
  const res = await fetch(FILE_API_URL, {
    method: "POST",
    headers: { Authorization: process.env.MONDAY_API_TOKEN! },
    body,
    signal: AbortSignal.timeout(TIMEOUT_MS * 3),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.errors) {
    throw new Error(`Monday file upload ${res.status}: ${JSON.stringify(json?.errors ?? json)}`);
  }
}

/**
 * Creates an item for this submission on the form's Monday board.
 * Never throws: failures are logged so the visitor's submission still succeeds.
 */
export async function pushToMonday(formName: string, data: FormData): Promise<void> {
  const board = MONDAY_BOARDS[formName];
  if (!board?.boardId || !process.env.MONDAY_API_TOKEN) return;

  const itemName =
    board.itemName.map((field) => str(data, field)).find(Boolean)?.replace(/\s+/g, " ").slice(0, 255) ||
    str(data, "email") ||
    "Website submission";

  const mapped = board.columns.filter((m) => m.columnId);
  const columns: Record<string, unknown> = {};
  for (const mapping of mapped) {
    const value = columnValue(mapping, data);
    if (value !== null && value !== undefined) columns[mapping.columnId] = value;
  }

  let itemId: string;
  try {
    itemId = await createItem(board.boardId, itemName, columns);
  } catch (error) {
    console.error(`[monday] create_item failed for ${formName}; retrying without phone:`, error);
    // A malformed phone number is the most common rejection — retry without it
    // so the lead is still captured.
    const phoneIds = new Set(mapped.filter((m) => m.kind === "phone").map((m) => m.columnId));
    const fallback = Object.fromEntries(Object.entries(columns).filter(([id]) => !phoneIds.has(id)));
    try {
      itemId = await createItem(board.boardId, itemName, fallback);
    } catch (retryError) {
      console.error(`[monday] create_item failed again for ${formName}:`, retryError);
      return;
    }
  }

  for (const mapping of mapped) {
    if (!("field" in mapping) || mapping.kind !== "file") continue;
    const file = data.get(mapping.field);
    if (file instanceof File && file.size > 0) {
      try {
        await uploadFile(itemId, mapping.columnId, file);
      } catch (error) {
        console.error(`[monday] file upload failed for ${formName} item ${itemId}:`, error);
      }
    }
  }
}
