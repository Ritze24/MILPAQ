import { after } from "next/server";
import { LIMITS } from "@/lib/partner-api/config";
import { ApiError, jsonResponse, type FieldError } from "@/lib/partner-api/errors";
import { authenticate, handle } from "@/lib/partner-api/auth";
import { hasPdfMagic } from "@/lib/partner-api/pdf";
import { addPartnerMessage, enforceRateLimit, toApiView, type UploadedFile } from "@/lib/partner-api/service";
import { dispatchDelivery } from "@/lib/partner-api/webhooks";

export const dynamic = "force-dynamic";

function sniff(bytes: Uint8Array): string | null {
  if (hasPdfMagic(bytes)) return "application/pdf";
  if (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  return null;
}

// POST /api/v1/quote-requests/{id}/messages: reply to an information request.
// Accepts JSON ({"message": "..."}) or multipart (`message` + up to 5 `attachments`,
// PDF/PNG/JPEG, 10 MB total). Only valid while the request is
// additional_information_required; on success it returns to under_review.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await params;
    if (Number(request.headers.get("content-length") ?? "0") > LIMITS.maxBodyBytes) {
      throw new ApiError("payload_too_large", "Request body is too large. Attachments may total at most 10 MB.");
    }
    const ctx = await authenticate(request);
    await enforceRateLimit(ctx, "submit", LIMITS.submitPerMinute);

    const contentType = (request.headers.get("content-type") ?? "").toLowerCase();
    const errors: FieldError[] = [];
    let message = "";
    const files: UploadedFile[] = [];

    if (contentType.startsWith("application/json")) {
      const body = (await request.json().catch(() => null)) as { message?: unknown } | null;
      message = typeof body?.message === "string" ? body.message.trim() : "";
    } else if (contentType.startsWith("multipart/form-data")) {
      let form: FormData;
      try {
        form = await request.formData();
      } catch {
        throw new ApiError("invalid_request", "The multipart body could not be read.");
      }
      const m = form.get("message");
      message = typeof m === "string" ? m.trim() : "";
      const parts = form.getAll("attachments");
      if (parts.length > LIMITS.maxMessageAttachments) {
        errors.push({ field: "attachments", code: "too_many", message: `At most ${LIMITS.maxMessageAttachments} attachments are allowed.` });
      }
      let total = 0;
      for (const part of parts.slice(0, LIMITS.maxMessageAttachments)) {
        if (typeof part === "string") {
          errors.push({ field: "attachments", code: "invalid_type", message: "Attachments must be file parts." });
          continue;
        }
        total += part.size;
        if (part.size === 0 || total > LIMITS.maxPdfBytes) {
          errors.push({ field: "attachments", code: part.size === 0 ? "required" : "too_large", message: part.size === 0 ? "An attachment is empty." : "Attachments must total 10 MB or less." });
          continue;
        }
        const bytes = new Uint8Array(await part.arrayBuffer());
        const detected = sniff(bytes);
        if (!detected) {
          errors.push({ field: "attachments", code: "invalid_format", message: "Attachments must be PDF, PNG or JPEG files." });
          continue;
        }
        files.push({ filename: part.name || "attachment", contentType: detected, bytes });
      }
    } else {
      throw new ApiError("invalid_request", "Content-Type must be application/json or multipart/form-data.");
    }

    if (!message) errors.push({ field: "message", code: "required", message: "A message is required." });
    else if (message.length > 5000) errors.push({ field: "message", code: "too_long", message: "The message must be at most 5000 characters." });
    if (errors.length > 0) throw new ApiError("validation_failed", "One or more fields are invalid.", errors);

    const { row, deliveryId } = await addPartnerMessage(ctx, id, message, files);
    after(() => dispatchDelivery(ctx.pool, ctx.env, deliveryId));
    return jsonResponse(await toApiView(ctx.pool, ctx.env, row), 201);
  });
}
