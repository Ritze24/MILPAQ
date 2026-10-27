import { adminSecret, ENVIRONMENTS, type ApiEnvironment } from "@/lib/partner-api/config";
import { createApiKey, createPartner, retireOldWebhookSecrets, revokeApiKey, rotateWebhookSecret, setWebhookUrl } from "@/lib/partner-api/admin";
import { requirePool } from "@/lib/partner-api/db";
import { ApiError, jsonResponse } from "@/lib/partner-api/errors";
import { handle } from "@/lib/partner-api/auth";
import { extractBearer, safeEqual } from "@/lib/partner-api/keys";

export const dynamic = "force-dynamic";

// MILPAQ-only provisioning. Credentials are returned once in this response and are
// never stored in plaintext or logged. Protected by PARTNER_ADMIN_SECRET.
//
// Body: { "env": "sandbox"|"live", "action": "create_partner"|"create_key"|"rotate_secret"|
//         "retire_old_secrets"|"set_webhook"|"revoke_key", ...args }
export async function POST(request: Request) {
  return handle(async () => {
    const expected = adminSecret();
    const given = extractBearer(request.headers.get("authorization"));
    if (!expected || !given || !safeEqual(given, expected)) throw new ApiError("unauthorized", "Unauthorized.");

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const env = body?.env as ApiEnvironment;
    if (!body || !ENVIRONMENTS.includes(env)) throw new ApiError("invalid_request", "env must be sandbox or live.");
    const pool = await requirePool(env);
    const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");
    const num = (k: string) => {
      const n = Number(body[k]);
      if (!Number.isInteger(n) || n <= 0) throw new ApiError("invalid_request", `${k} must be a positive integer.`);
      return n;
    };

    switch (body.action) {
      case "create_partner": {
        if (!str("name")) throw new ApiError("invalid_request", "name is required.");
        return jsonResponse(await createPartner(pool, env, { name: str("name"), webhookUrl: str("webhook_url") }), 201);
      }
      case "create_key":
        return jsonResponse(await createApiKey(pool, env, num("partner_id")), 201);
      case "rotate_secret":
        return jsonResponse(await rotateWebhookSecret(pool, num("partner_id")), 201);
      case "retire_old_secrets":
        return jsonResponse(await retireOldWebhookSecrets(pool, num("partner_id")));
      case "set_webhook":
        await setWebhookUrl(pool, num("partner_id"), str("webhook_url"));
        return jsonResponse({ ok: true });
      case "revoke_key":
        return jsonResponse(await revokeApiKey(pool, num("key_id")));
      default:
        throw new ApiError("invalid_request", "Unknown action.");
    }
  });
}
