import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { KEY_PREFIX, type ApiEnvironment } from "./config.ts";

export function generateApiKey(env: ApiEnvironment) {
  const key = `${KEY_PREFIX[env]}${randomBytes(24).toString("base64url")}`;
  return { key, prefix: key.slice(0, 16), hash: hashApiKey(key) };
}

export function hashApiKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export function envFromKey(key: string): ApiEnvironment | null {
  if (key.startsWith(KEY_PREFIX.sandbox)) return "sandbox";
  if (key.startsWith(KEY_PREFIX.live)) return "live";
  return null;
}

export function extractBearer(header: string | null): string | null {
  if (!header) return null;
  const match = /^Bearer\s+(\S+)$/i.exec(header.trim());
  return match ? match[1] : null;
}

export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
