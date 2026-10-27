import { createHmac } from "node:crypto";
import { safeEqual } from "./keys.ts";

// signed_payload = timestamp + "." + raw_body ; signature = HMAC-SHA256(secret, signed_payload).
// During a secret rotation several active secrets each contribute one `v1=` value,
// comma separated, so a receiver holding either secret can verify.
export function signWebhook(secrets: string[], timestamp: number, rawBody: string): string {
  return secrets
    .map((s) => `v1=${createHmac("sha256", s).update(`${timestamp}.${rawBody}`).digest("hex")}`)
    .join(",");
}

export function verifyWebhook(
  secret: string,
  header: string,
  timestamp: number,
  rawBody: string,
  opts: { nowSeconds?: number; toleranceSeconds?: number } = {},
): boolean {
  const now = opts.nowSeconds ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > (opts.toleranceSeconds ?? 300)) return false;
  const expected = `v1=${createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex")}`;
  return header.split(",").some((part) => safeEqual(part.trim(), expected));
}
