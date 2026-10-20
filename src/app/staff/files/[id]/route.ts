import { requirePool, rows } from "@/lib/partner-api/db";
import type { FileRow } from "@/lib/partner-api/service";
import { getFileBytes } from "@/lib/partner-api/storage";
import { isStaff, parseEnv } from "../../auth";

export const dynamic = "force-dynamic";

// Staff-only download of any file attached to a request (solicitation, quote, message).
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isStaff())) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const env = parseEnv(new URL(request.url).searchParams.get("env"));
  try {
    const pool = await requirePool(env);
    const [file] = await rows<FileRow>(pool, "SELECT * FROM request_files WHERE id = ?", [id]);
    if (!file) return new Response("Not found", { status: 404 });
    const bytes = await getFileBytes(file.path);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": file.content_type,
        "Content-Length": String(bytes.length),
        "Content-Disposition": `attachment; filename="${file.filename.replace(/[^A-Za-z0-9._-]/g, "_")}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Unavailable", { status: 503 });
  }
}
