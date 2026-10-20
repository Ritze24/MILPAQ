import type { Pool } from "mysql2/promise";
import { masterKey, type ApiEnvironment } from "./config.ts";
import { decryptSecret, deriveKey } from "./crypto-box.ts";
import { exec, rows } from "./db.ts";
import { retryDelaySeconds } from "./backoff.ts";
import { signWebhook } from "./webhook-signing.ts";

type DeliveryRow = {
  id: string;
  partner_id: number;
  event_type: string;
  payload: string;
  attempts: number;
};

export type DispatchOutcome = "delivered" | "retry" | "dead" | "skipped";

const LEASE_SECONDS = 120;
const REQUEST_TIMEOUT_MS = 10_000;

async function claim(pool: Pool, id: string): Promise<boolean> {
  const now = new Date();
  const lease = new Date(now.getTime() + LEASE_SECONDS * 1000);
  const res = await exec(
    pool,
    `UPDATE webhook_deliveries SET status = 'sending', lease_until = ?
     WHERE id = ? AND ((status = 'pending' AND next_attempt_at <= ?) OR (status = 'sending' AND lease_until < ?))`,
    [lease, id, now, now],
  );
  return res.affectedRows === 1;
}

async function activeSecrets(pool: Pool, partnerId: number): Promise<string[]> {
  const master = masterKey();
  if (!master) throw new Error("PARTNER_MASTER_KEY is not configured");
  const key = deriveKey(master, "secret-encryption");
  const found = await rows<{ secret_enc: string }>(
    pool,
    "SELECT secret_enc FROM webhook_secrets WHERE partner_id = ? AND status = 'active' ORDER BY id DESC",
    [partnerId],
  );
  return found.map((r) => decryptSecret(r.secret_enc, key));
}

// Sends one delivery. Never throws: the outcome is recorded on the row.
export async function dispatchDelivery(pool: Pool, _env: ApiEnvironment, deliveryId: string): Promise<DispatchOutcome> {
  if (!(await claim(pool, deliveryId))) return "skipped";
  const [delivery] = await rows<DeliveryRow>(pool, "SELECT id, partner_id, event_type, payload, attempts FROM webhook_deliveries WHERE id = ?", [deliveryId]);
  if (!delivery) return "skipped";

  let statusCode: number | null = null;
  let error: string | null = null;
  try {
    const [endpoint] = await rows<{ url: string }>(pool, "SELECT url FROM webhook_endpoints WHERE partner_id = ?", [delivery.partner_id]);
    if (!endpoint) throw new Error("no_webhook_endpoint_registered");
    const secrets = await activeSecrets(pool, delivery.partner_id);
    if (secrets.length === 0) throw new Error("no_active_webhook_secret");

    const timestamp = Math.floor(Date.now() / 1000);
    const response = await fetch(endpoint.url, {
      method: "POST",
      redirect: "manual", // never forward a signed payload to a redirect target
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "MILPAQ-Webhooks/1",
        "MILPAQ-Delivery-Id": delivery.id,
        "MILPAQ-Event": delivery.event_type,
        "MILPAQ-Timestamp": String(timestamp),
        "MILPAQ-Signature": signWebhook(secrets, timestamp, delivery.payload),
      },
      body: delivery.payload,
    });
    statusCode = response.status;
    if (response.status < 200 || response.status >= 300) error = `http_${response.status}`;
    await response.body?.cancel().catch(() => undefined);
  } catch (err) {
    error = err instanceof Error ? err.message.slice(0, 200) : "send_failed";
  }

  const now = new Date();
  if (!error) {
    await exec(pool, "UPDATE webhook_deliveries SET status = 'delivered', attempts = attempts + 1, last_status_code = ?, last_error = NULL, delivered_at = ?, lease_until = NULL WHERE id = ?", [statusCode, now, deliveryId]);
    return "delivered";
  }
  const attempts = delivery.attempts + 1;
  const delay = retryDelaySeconds(attempts);
  if (delay === null) {
    await exec(pool, "UPDATE webhook_deliveries SET status = 'dead', attempts = ?, last_status_code = ?, last_error = ?, lease_until = NULL WHERE id = ?", [attempts, statusCode, error, deliveryId]);
    return "dead";
  }
  await exec(
    pool,
    "UPDATE webhook_deliveries SET status = 'pending', attempts = ?, next_attempt_at = ?, last_status_code = ?, last_error = ?, lease_until = NULL WHERE id = ?",
    [attempts, new Date(now.getTime() + delay * 1000), statusCode, error, deliveryId],
  );
  return "retry";
}

export async function dispatchDue(pool: Pool, env: ApiEnvironment, limit = 20) {
  const now = new Date();
  const due = await rows<{ id: string }>(
    pool,
    `SELECT id FROM webhook_deliveries
     WHERE (status = 'pending' AND next_attempt_at <= ?) OR (status = 'sending' AND lease_until < ?)
     ORDER BY next_attempt_at LIMIT ${Math.max(1, Math.floor(limit))}`,
    [now, now],
  );
  const counts = { attempted: 0, delivered: 0, retry: 0, dead: 0 };
  for (const { id } of due) {
    const outcome = await dispatchDelivery(pool, env, id);
    if (outcome === "skipped") continue;
    counts.attempted++;
    counts[outcome]++;
  }
  return counts;
}
