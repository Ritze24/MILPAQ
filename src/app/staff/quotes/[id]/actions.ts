"use server";

import { after } from "next/server";
import { redirect } from "next/navigation";
import { ENVIRONMENTS, type ApiEnvironment } from "@/lib/partner-api/config";
import { requirePool } from "@/lib/partner-api/db";
import { ApiError } from "@/lib/partner-api/errors";
import { changeStatus, type RequestStatus } from "@/lib/partner-api/service";
import { parseQuoteForm } from "@/lib/partner-api/staff-quote";
import { dispatchDelivery } from "@/lib/partner-api/webhooks";
import { requireStaff } from "../../auth";

const TARGETS: RequestStatus[] = ["under_review", "additional_information_required", "declined", "cancelled"];

function target(formData: FormData) {
  const env = String(formData.get("env")) as ApiEnvironment;
  const id = String(formData.get("id") ?? "");
  if (!ENVIRONMENTS.includes(env) || !/^mpq_[A-Za-z0-9]+$/.test(id)) redirect("/staff/quotes");
  return { env, id, back: `/staff/quotes/${id}?env=${env}` };
}

const flash = (back: string, kind: "notice" | "error", text: string) => `${back}&${kind}=${encodeURIComponent(text)}`;
const reason = (err: unknown) => (err instanceof ApiError ? err.message : "Something went wrong. Nothing was changed.");

export async function moveRequest(formData: FormData) {
  await requireStaff();
  const { env, id, back } = target(formData);
  const to = String(formData.get("to")) as RequestStatus;
  if (!TARGETS.includes(to)) redirect(flash(back, "error", "Unknown action."));
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000) || null;
  let failure: string | null = null;
  try {
    const pool = await requirePool(env);
    const deliveryId = await changeStatus(pool, env, id, to, { message });
    after(() => dispatchDelivery(pool, env, deliveryId));
  } catch (err) {
    failure = reason(err);
  }
  redirect(failure ? flash(back, "error", failure) : flash(back, "notice", "Status updated and partner notified."));
}

export async function completeQuote(formData: FormData) {
  await requireStaff();
  const { env, id, back } = target(formData);
  const parsed = await parseQuoteForm(formData);
  if (!parsed.ok) redirect(flash(back, "error", parsed.error));
  let failure: string | null = null;
  try {
    const pool = await requirePool(env);
    const deliveryId = await changeStatus(pool, env, id, "quote_completed", {
      quote: parsed.quote,
      quotePdf: { bytes: parsed.pdf, filename: parsed.pdfName },
    });
    after(() => dispatchDelivery(pool, env, deliveryId));
  } catch (err) {
    failure = reason(err);
  }
  redirect(failure ? flash(back, "error", failure) : flash(back, "notice", "Quote sent to the partner."));
}
