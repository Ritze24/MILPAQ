import Link from "next/link";
import { notFound } from "next/navigation";
import { getDetail } from "@/lib/partner-api/staff-data";
import { requireStaff, parseEnv } from "../../auth";
import { completeQuote, moveRequest } from "./actions";

export const dynamic = "force-dynamic";

const label = (s: string) => s.replace(/_/g, " ");
const fmt = (d: Date) => d.toISOString().slice(0, 16).replace("T", " ") + " UTC";
const input = "w-full rounded-md border px-3 py-2 text-sm";

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ env?: string; notice?: string; error?: string }>;
}) {
  await requireStaff();
  const { id } = await params;
  const sp = await searchParams;
  const env = parseEnv(sp.env);
  const detail = await getDetail(env, id).catch(() => undefined);
  if (detail === undefined) return <main><p className="text-sm text-red-600">Could not load this request. Check the database settings.</p></main>;
  if (detail === null) notFound();
  const { row: r, files, events, messages } = detail;
  const open = r.status === "received" || r.status === "under_review" || r.status === "additional_information_required";
  const hidden = (<><input type="hidden" name="env" value={env} /><input type="hidden" name="id" value={r.id} /></>);
  const fileLink = (f: (typeof files)[number]) => (
    <a key={f.id} className="underline" href={`/staff/files/${f.id}?env=${env}`}>{f.filename}</a>
  );
  const suggestedNumber = `Q-${r.received_at.getUTCFullYear()}-${r.id.slice(-6).toUpperCase()}`;

  return (
    <main className="space-y-8">
      <div>
        <Link href={`/staff/quotes?env=${env}`} className="text-sm underline">← All requests</Link>
        <h1 className="mt-2 text-2xl font-semibold">{r.company_name}</h1>
        <p className="text-sm text-muted-foreground">{detail.partnerName} · {env} · {r.id} · <strong>{label(r.status)}</strong></p>
      </div>

      {sp.notice ? <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-900">{sp.notice}</p> : null}
      {sp.error ? <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-900">{sp.error}</p> : null}

      <section>
        <h2 className="font-semibold">Request</h2>
        <dl className="mt-2 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          <div>Contact: {r.contact_name} · {r.contact_email} · {r.contact_phone}</div>
          <div>Solicitation: {r.solicitation_number}</div>
          <div>Units: {r.number_of_units}</div>
          <div>Per unit: {r.unit_length} × {r.unit_width} × {r.unit_height} {r.dimension_unit}, {r.unit_weight} {r.weight_unit}</div>
          <div>Origin inspection: {r.origin_inspection ? "yes" : "no"} · Destination: {r.destination_inspection ? "yes" : "no"}</div>
          <div>Terms {r.terms_version} accepted by {r.terms_accepted_by} on {fmt(r.terms_accepted_at)}</div>
          <div>Received: {fmt(r.received_at)}</div>
          <div>Partner ref: {r.external_request_id}</div>
        </dl>
        {r.notes ? <p className="mt-2 text-sm">Notes: {r.notes}</p> : null}
        <p className="mt-2 text-sm">Files: {files.map((f, i) => <span key={f.id}>{i ? ", " : ""}{fileLink(f)} ({f.kind})</span>)}</p>
      </section>

      {r.status === "quote_completed" ? (
        <section>
          <h2 className="font-semibold">Quote {r.quote_number}</h2>
          <p className="text-sm">{r.currency} {r.packaging_price} packaging{r.shipping_price !== null ? ` + ${r.shipping_price} shipping` : ""} = <strong>{r.total_amount}</strong>. Expires {r.quote_expires_at ? fmt(r.quote_expires_at) : "-"}.</p>
        </section>
      ) : null}

      {open ? (
        <section className="space-y-6">
          <h2 className="font-semibold">Actions</h2>
          <p className="text-sm text-muted-foreground">Each action notifies the partner by signed webhook.</p>

          {r.status === "received" || r.status === "additional_information_required" ? (
            <form action={moveRequest} className="flex items-center gap-3">
              {hidden}<input type="hidden" name="to" value="under_review" />
              <button className="rounded-md bg-black px-4 py-2 text-sm text-white">{r.status === "received" ? "Start review" : "Resume review"}</button>
            </form>
          ) : null}

          {r.status === "under_review" ? (
            <>
              <form action={completeQuote} encType="multipart/form-data" className="space-y-3 rounded-md border p-4">
                {hidden}
                <h3 className="font-medium">Enter quote</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="text-sm">Currency<input name="currency" defaultValue="USD" maxLength={3} required className={input} /></label>
                  <label className="text-sm">Packaging price<input name="packaging_price" inputMode="decimal" required className={input} /></label>
                  <label className="text-sm">Shipping price (optional)<input name="shipping_price" inputMode="decimal" className={input} /></label>
                  <label className="text-sm">Quote number<input name="quote_number" defaultValue={suggestedNumber} required className={input} /></label>
                  <label className="text-sm">Valid until<input name="expires_on" type="date" required className={input} /></label>
                  <label className="text-sm">Quote PDF<input name="quote_pdf" type="file" accept="application/pdf" required className={input} /></label>
                </div>
                <label className="block text-sm">Notes to partner (optional)<textarea name="notes" rows={2} maxLength={2000} className={input} /></label>
                <p className="text-xs text-muted-foreground">Total is calculated as packaging + shipping. Submitting sends the quote to the partner and cannot be undone.</p>
                <button className="rounded-md bg-black px-4 py-2 text-sm text-white">Send quote</button>
              </form>

              <form action={moveRequest} className="space-y-2 rounded-md border p-4">
                {hidden}<input type="hidden" name="to" value="additional_information_required" />
                <h3 className="font-medium">Request more information</h3>
                <textarea name="message" rows={3} required maxLength={2000} placeholder="What do you need from the customer?" className={input} />
                <button className="rounded-md border px-4 py-2 text-sm">Ask partner</button>
              </form>
            </>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {(["declined", "cancelled"] as const).map((to) => (
              <form key={to} action={moveRequest} className="space-y-2 rounded-md border p-4">
                {hidden}<input type="hidden" name="to" value={to} />
                <h3 className="font-medium">{to === "declined" ? "Decline" : "Cancel"}</h3>
                <textarea name="message" rows={2} required maxLength={2000} placeholder="Reason shown to the partner" className={input} />
                <button className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-700">{to === "declined" ? "Decline request" : "Cancel request"}</button>
              </form>
            ))}
          </div>
        </section>
      ) : null}

      {messages.length ? (
        <section>
          <h2 className="font-semibold">Messages</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {messages.map((m, i) => <li key={i}><strong>{m.direction === "milpaq" ? "MILPAQ" : "Partner"}</strong> · {fmt(m.created_at)}<br />{m.body}</li>)}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="font-semibold">History</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {events.map((e, i) => <li key={i}>{fmt(e.occurred_at)} · {label(e.status)}{e.detail ? ` · ${e.detail}` : ""}</li>)}
        </ul>
      </section>
    </main>
  );
}
