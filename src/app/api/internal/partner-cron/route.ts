import { cronSecret, ENVIRONMENTS } from "@/lib/partner-api/config";
import { exec, getPool, ensureSchema } from "@/lib/partner-api/db";
import { safeEqual, extractBearer } from "@/lib/partner-api/keys";
import { advanceSandbox } from "@/lib/partner-api/sandbox";
import { dispatchDue } from "@/lib/partner-api/webhooks";

export const dynamic = "force-dynamic";

// Called every minute by cron-job.org (Authorization: Bearer PARTNER_CRON_SECRET):
// retries due webhook deliveries, advances sandbox test requests, prunes rate-limit rows.
export async function POST(request: Request) {
  const expected = cronSecret();
  const given = extractBearer(request.headers.get("authorization"));
  if (!expected || !given || !safeEqual(given, expected)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  const report: Record<string, unknown> = {};
  for (const env of ENVIRONMENTS) {
    const pool = getPool(env);
    if (!pool) {
      report[env] = "not configured";
      continue;
    }
    try {
      await ensureSchema(env, pool);
      const sandbox = env === "sandbox" ? await advanceSandbox(pool) : undefined;
      const webhooks = await dispatchDue(pool, env);
      await exec(pool, "DELETE FROM rate_limits WHERE bucket < ?", [Math.floor(Date.now() / 60_000) - 60]);
      report[env] = { ...(sandbox !== undefined ? { sandbox_advanced: sandbox } : {}), webhooks };
    } catch (err) {
      console.error("[partner-cron]", env, err instanceof Error ? err.message : "unknown");
      report[env] = "error";
    }
  }
  return Response.json(report, { headers: { "Cache-Control": "no-store" } });
}
