import { createHmac } from "node:crypto";
import { safeEqual } from "./keys.ts";

export const STAFF_COOKIE = "milpaq_staff";
export const STAFF_SESSION_SECONDS = 8 * 60 * 60;

export function signStaffSession(key: Buffer, nowSeconds = Math.floor(Date.now() / 1000)): string {
  const body = Buffer.from(JSON.stringify({ x: nowSeconds + STAFF_SESSION_SECONDS })).toString("base64url");
  const sig = createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyStaffSession(token: string | undefined, key: Buffer, nowSeconds = Math.floor(Date.now() / 1000)): boolean {
  if (!token) return false;
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== undefined) return false;
  const expected = createHmac("sha256", key).update(body).digest("base64url");
  if (!safeEqual(sig, expected)) return false;
  try {
    const { x } = JSON.parse(Buffer.from(body, "base64url").toString()) as { x?: unknown };
    return typeof x === "number" && x >= nowSeconds;
  } catch {
    return false;
  }
}
