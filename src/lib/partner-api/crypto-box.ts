import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";

// One 32-byte master key (PARTNER_MASTER_KEY) yields independent sub-keys.
export function deriveKey(master: Buffer, purpose: "secret-encryption" | "download-signing" | "staff-session"): Buffer {
  return Buffer.from(hkdfSync("sha256", master, Buffer.alloc(0), `milpaq-partner-api:${purpose}`, 32));
}

// Webhook signing secrets must be recoverable to sign with, so they are
// stored encrypted (AES-256-GCM), never in plaintext.
export function encryptSecret(plain: string, key: Buffer): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return `v1:${Buffer.concat([iv, cipher.getAuthTag(), ct]).toString("base64")}`;
}

export function decryptSecret(stored: string, key: Buffer): string {
  if (!stored.startsWith("v1:")) throw new Error("Unknown secret format");
  const raw = Buffer.from(stored.slice(3), "base64");
  const decipher = createDecipheriv("aes-256-gcm", key, raw.subarray(0, 12));
  decipher.setAuthTag(raw.subarray(12, 28));
  return Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8");
}

export function generateWebhookSecret(): string {
  return `whsec_${randomBytes(32).toString("base64url")}`;
}
