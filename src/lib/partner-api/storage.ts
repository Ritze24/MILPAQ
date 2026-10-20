import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve, sep } from "node:path";
import { storageDir, type ApiEnvironment } from "./config.ts";
import { ApiError } from "./errors.ts";
import { newId } from "./ids.ts";

function root(): string {
  const dir = storageDir();
  if (!dir) throw new ApiError("unavailable", "The MILPAQ API is not available right now.");
  return resolve(dir);
}

function safeName(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 80);
  return cleaned || "file";
}

function absolute(relPath: string): string {
  const base = root();
  const full = resolve(base, relPath);
  if (full !== base && !full.startsWith(base + sep)) throw new Error("Path escapes storage root");
  return full;
}

// Private files live under PARTNER_STORAGE_DIR/<env>/<requestId>/..., never under public_html.
export async function putFile(env: ApiEnvironment, requestId: string, filename: string, bytes: Uint8Array) {
  const relPath = join(env, requestId, `${newId("f_")}-${safeName(filename)}`);
  const full = absolute(relPath);
  await mkdir(dirname(full), { recursive: true, mode: 0o700 });
  await writeFile(full, bytes, { mode: 0o600 });
  return relPath;
}

export async function getFileBytes(relPath: string): Promise<Buffer> {
  return readFile(absolute(relPath));
}

export async function removeFile(relPath: string): Promise<void> {
  await rm(absolute(relPath), { force: true });
}
