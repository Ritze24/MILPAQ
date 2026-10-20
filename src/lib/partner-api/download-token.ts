import { createHmac } from "node:crypto";
import { safeEqual } from "./keys.ts";
import type { ApiEnvironment } from "./config.ts";

export type DownloadClaims = { e: ApiEnvironment; r: string; f: string; x: number };

export function signDownloadToken(claims: DownloadClaims, key: Buffer): string {
  const body = Buffer.from(JSON.stringify(claims)).toString("base64url");
  const sig = createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyDownloadToken(token: string, key: Buffer, nowSeconds = Math.floor(Date.now() / 1000)): DownloadClaims | null {
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== undefined) return null;
  const expected = createHmac("sha256", key).update(body).digest("base64url");
  if (!safeEqual(sig, expected)) return null;
  try {
    const claims = JSON.parse(Buffer.from(body, "base64url").toString()) as DownloadClaims;
    if (typeof claims.x !== "number" || claims.x < nowSeconds) return null;
    if (claims.e !== "sandbox" && claims.e !== "live") return null;
    if (typeof claims.r !== "string" || typeof claims.f !== "string") return null;
    return claims;
  } catch {
    return null;
  }
}
