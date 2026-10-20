import { isAbsolute } from "node:path";
import { termsVersion } from "../terms-content.ts";

export type ApiEnvironment = "sandbox" | "live";
export const ENVIRONMENTS: ApiEnvironment[] = ["sandbox", "live"];

// Key prefix decides which database a key may touch (Stripe-style).
export const KEY_PREFIX: Record<ApiEnvironment, string> = {
  sandbox: "mpq_test_",
  live: "mpq_live_",
};

export const LIMITS = {
  maxPdfBytes: 10 * 1024 * 1024,
  // multipart overhead on top of the 10 MB PDF
  maxBodyBytes: 10 * 1024 * 1024 + 512 * 1024,
  submitPerMinute: 20,
  pollPerMinute: 60,
  downloadUrlTtlSeconds: 24 * 60 * 60,
  maxMessageAttachments: 5,
} as const;

// Terms versions an API submission may claim to have accepted.
export const SUPPORTED_TERMS_VERSIONS: string[] = [termsVersion];

export function dbUrlFor(env: ApiEnvironment): string | null {
  const value = env === "sandbox" ? process.env.PARTNER_DB_SANDBOX_URL : process.env.PARTNER_DB_LIVE_URL;
  return value && value.trim() ? value.trim() : null;
}

// Must be an absolute path outside the build directory: the Node process runs
// from hbuilds/versions/<id>, which is replaced on every redeploy.
export function storageDir(): string | null {
  const dir = process.env.PARTNER_STORAGE_DIR?.trim();
  return dir && isAbsolute(dir) ? dir : null;
}

export function masterKey(): Buffer | null {
  const raw = process.env.PARTNER_MASTER_KEY?.trim();
  if (!raw) return null;
  const key = Buffer.from(raw, "base64");
  return key.length === 32 ? key : null;
}

export function cronSecret(): string | null {
  return process.env.PARTNER_CRON_SECRET?.trim() || null;
}

export function adminSecret(): string | null {
  return process.env.PARTNER_ADMIN_SECRET?.trim() || null;
}

export function publicBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://milpaq.com").replace(/\/+$/, "");
}
