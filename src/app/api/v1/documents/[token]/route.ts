import { masterKey } from "@/lib/partner-api/config";
import { deriveKey } from "@/lib/partner-api/crypto-box";
import { requirePool, rows } from "@/lib/partner-api/db";
import { verifyDownloadToken } from "@/lib/partner-api/download-token";
import { ApiError } from "@/lib/partner-api/errors";
import { handle } from "@/lib/partner-api/auth";
import type { FileRow } from "@/lib/partner-api/service";
import { getFileBytes } from "@/lib/partner-api/storage";

export const dynamic = "force-dynamic";

// GET /api/v1/documents/{token}: expiring, signed link to a completed quote PDF.
// The signed token is the credential; only quote documents are ever served here.
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  return handle(async () => {
    const { token } = await params;
    const master = masterKey();
    if (!master) throw new ApiError("unavailable", "The MILPAQ API is not available right now.");
    const claims = verifyDownloadToken(token, deriveKey(master, "download-signing"));
    if (!claims) throw new ApiError("not_found", "This link is invalid or has expired. Fetch the quote request again for a fresh link.");

    const pool = await requirePool(claims.e);
    const [file] = await rows<FileRow>(pool, "SELECT * FROM request_files WHERE id = ? AND request_id = ? AND kind = 'quote'", [claims.f, claims.r]);
    if (!file) throw new ApiError("not_found", "Document not found.");

    const bytes = await getFileBytes(file.path);
    return new Response(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": file.content_type,
        "Content-Length": String(bytes.length),
        "Content-Disposition": `attachment; filename="${file.filename.replace(/[^A-Za-z0-9._-]/g, "_")}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  });
}
