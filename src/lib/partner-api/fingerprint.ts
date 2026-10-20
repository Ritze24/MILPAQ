import { createHash } from "node:crypto";

// JSON with recursively sorted keys, so key order never changes the hash.
export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return `{${Object.keys(obj)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

export function sha256Hex(data: string | Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

// Identity of a submission: the normalised metadata plus the PDF contents.
export function requestFingerprint(normalisedMetadata: unknown, pdfSha256: string): string {
  return sha256Hex(`${stableStringify(normalisedMetadata)}|${pdfSha256}`);
}
