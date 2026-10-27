import { LIMITS } from "@/lib/partner-api/config";
import { jsonResponse } from "@/lib/partner-api/errors";
import { authenticate, handle } from "@/lib/partner-api/auth";
import { enforceRateLimit, getRequestForPartner, toApiView } from "@/lib/partner-api/service";

export const dynamic = "force-dynamic";

// GET /api/v1/quote-requests/{id}: current status, and the quote once completed.
// A completed quote always carries a freshly signed document URL.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await params;
    const ctx = await authenticate(request);
    await enforceRateLimit(ctx, "poll", LIMITS.pollPerMinute);
    const row = await getRequestForPartner(ctx, id);
    return jsonResponse(await toApiView(ctx.pool, ctx.env, row));
  });
}
