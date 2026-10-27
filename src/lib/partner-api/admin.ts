import type { Pool } from "mysql2/promise";
import { masterKey } from "./config.ts";
import { deriveKey, encryptSecret, generateWebhookSecret } from "./crypto-box.ts";
import { exec, rows, withTx } from "./db.ts";
import { ApiError } from "./errors.ts";
import { generateApiKey } from "./keys.ts";
import type { ApiEnvironment } from "./config.ts";

// Webhook destinations are registered by MILPAQ only (never taken from a
// request body) and must be public HTTPS hosts.
export function assertSafeWebhookUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ApiError("invalid_request", "webhook_url is not a valid URL.");
  }
  const host = url.hostname.toLowerCase();
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":") || host.startsWith("[");
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443") ||
    isIp ||
    host === "localhost" ||
    !host.includes(".") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    throw new ApiError("invalid_request", "webhook_url must be a public https URL on a hostname (no IP, localhost, credentials or custom port).");
  }
  return url.toString();
}

function secretKey(): Buffer {
  const master = masterKey();
  if (!master) throw new ApiError("unavailable", "PARTNER_MASTER_KEY is not configured.");
  return deriveKey(master, "secret-encryption");
}

// Plaintext credentials are returned exactly once and never stored or logged.
export async function createPartner(pool: Pool, env: ApiEnvironment, input: { name: string; webhookUrl: string }) {
  const url = assertSafeWebhookUrl(input.webhookUrl);
  const enc = secretKey();
  const apiKey = generateApiKey(env);
  const webhookSecret = generateWebhookSecret();
  const now = new Date();
  const partnerId = await withTx(pool, async (conn) => {
    const created = await exec(conn, "INSERT INTO partners (name, created_at) VALUES (?, ?)", [input.name.trim().slice(0, 120), now]);
    const id = created.insertId;
    await exec(conn, "INSERT INTO api_keys (partner_id, key_prefix, key_hash, status, created_at) VALUES (?, ?, ?, 'active', ?)", [id, apiKey.prefix, apiKey.hash, now]);
    await exec(conn, "INSERT INTO webhook_endpoints (partner_id, url, updated_at) VALUES (?, ?, ?)", [id, url, now]);
    await exec(conn, "INSERT INTO webhook_secrets (partner_id, secret_enc, status, created_at) VALUES (?, ?, 'active', ?)", [id, encryptSecret(webhookSecret, enc), now]);
    return id;
  });
  return { partnerId, apiKey: apiKey.key, webhookSecret };
}

export async function setWebhookUrl(pool: Pool, partnerId: number, rawUrl: string) {
  const url = assertSafeWebhookUrl(rawUrl);
  const res = await exec(pool, "UPDATE webhook_endpoints SET url = ?, updated_at = ? WHERE partner_id = ?", [url, new Date(), partnerId]);
  if (res.affectedRows === 0) {
    await exec(pool, "INSERT INTO webhook_endpoints (partner_id, url, updated_at) VALUES (?, ?, ?)", [partnerId, url, new Date()]);
  }
}

// Step 1 of rotation: add a second active secret. Webhooks are then signed with
// both until the old one is retired.
export async function rotateWebhookSecret(pool: Pool, partnerId: number) {
  const secret = generateWebhookSecret();
  await exec(pool, "INSERT INTO webhook_secrets (partner_id, secret_enc, status, created_at) VALUES (?, ?, 'active', ?)", [partnerId, encryptSecret(secret, secretKey()), new Date()]);
  return { webhookSecret: secret };
}

// Step 2 of rotation: retire every active secret except the newest.
export async function retireOldWebhookSecrets(pool: Pool, partnerId: number) {
  const active = await rows<{ id: number }>(pool, "SELECT id FROM webhook_secrets WHERE partner_id = ? AND status = 'active' ORDER BY id DESC", [partnerId]);
  const old = active.slice(1).map((r) => r.id);
  if (old.length) await exec(pool, "UPDATE webhook_secrets SET status = 'retired', retired_at = ? WHERE id IN (?)", [new Date(), old]);
  return { retired: old.length };
}

export async function createApiKey(pool: Pool, env: ApiEnvironment, partnerId: number) {
  const key = generateApiKey(env);
  await exec(pool, "INSERT INTO api_keys (partner_id, key_prefix, key_hash, status, created_at) VALUES (?, ?, ?, 'active', ?)", [partnerId, key.prefix, key.hash, new Date()]);
  return { apiKey: key.key };
}

export async function revokeApiKey(pool: Pool, keyId: number) {
  const res = await exec(pool, "UPDATE api_keys SET status = 'revoked', revoked_at = ? WHERE id = ? AND status = 'active'", [new Date(), keyId]);
  return { revoked: res.affectedRows };
}
