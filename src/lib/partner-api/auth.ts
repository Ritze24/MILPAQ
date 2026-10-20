import { envFromKey, extractBearer, hashApiKey, safeEqual } from "./keys.ts";
import { exec, requirePool, rows } from "./db.ts";
import { ApiError, errorResponse } from "./errors.ts";
import type { AuthContext } from "./service.ts";

const UNAUTHORIZED = "Missing or invalid API key.";

// The key prefix chooses the database, and the key is looked up only there, so a
// sandbox key can never reach production data (or the reverse).
export async function authenticate(request: Request): Promise<AuthContext> {
  const key = extractBearer(request.headers.get("authorization"));
  const env = key ? envFromKey(key) : null;
  if (!key || !env) throw new ApiError("unauthorized", UNAUTHORIZED);

  const pool = await requirePool(env);
  const hash = hashApiKey(key);
  const found = await rows<{ id: number; partner_id: number; key_hash: string; last_used_at: Date | null }>(
    pool,
    "SELECT id, partner_id, key_hash, last_used_at FROM api_keys WHERE key_hash = ? AND status = 'active'",
    [hash],
  );
  const row = found[0];
  if (!row || !safeEqual(row.key_hash, hash)) throw new ApiError("unauthorized", UNAUTHORIZED);

  if (!row.last_used_at || Date.now() - row.last_used_at.getTime() > 60_000) {
    await exec(pool, "UPDATE api_keys SET last_used_at = ? WHERE id = ?", [new Date(), row.id]).catch(() => undefined);
  }
  return { env, pool, partnerId: row.partner_id, keyId: row.id };
}

// Shared wrapper: documented error responses, and no internals ever leak.
export async function handle(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ApiError) return errorResponse(err);
    console.error("[partner-api] unhandled error", err instanceof Error ? err.message : "unknown");
    return errorResponse(new ApiError("internal_error", "Something went wrong on our side. Please retry."));
  }
}
