import Link from "next/link";
import { configuredEnvironments, listRequests } from "@/lib/partner-api/staff-data";
import { requireStaff, parseEnv } from "../auth";

export const dynamic = "force-dynamic";

const STATUSES = ["received", "under_review", "additional_information_required", "quote_completed", "declined", "cancelled"];
const label = (s: string) => s.replace(/_/g, " ");
const fmt = (d: Date) => d.toISOString().slice(0, 16).replace("T", " ") + " UTC";

export default async function QuotesPage({ searchParams }: { searchParams: Promise<{ env?: string; status?: string }> }) {
  await requireStaff();
  const sp = await searchParams;
  const envs = configuredEnvironments();
  const env = envs.includes(parseEnv(sp.env)) ? parseEnv(sp.env) : envs[0];
  const status = STATUSES.includes(sp.status ?? "") ? (sp.status as string) : null;

  if (!env) {
    return <main><h1 className="text-2xl font-semibold">Quote requests</h1><p className="mt-4 text-sm">No partner database is configured.</p></main>;
  }
  const items = await listRequests(env, status).catch(() => null);

  return (
    <main>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Quote requests</h1>
        <nav className="flex gap-2 text-sm">
          {envs.map((e) => (
            <Link key={e} href={`/staff/quotes?env=${e}`} className={`rounded-md border px-3 py-1 ${e === env ? "bg-black text-white" : ""}`}>{e}</Link>
          ))}
        </nav>
      </div>
      {env === "sandbox" ? <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">Sandbox: test data. The simulator advances these automatically.</p> : null}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <Link href={`/staff/quotes?env=${env}`} className={`rounded-full border px-3 py-1 ${!status ? "bg-black text-white" : ""}`}>all</Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/staff/quotes?env=${env}&status=${s}`} className={`rounded-full border px-3 py-1 ${status === s ? "bg-black text-white" : ""}`}>{label(s)}</Link>
        ))}
      </div>
      {items === null ? (
        <p className="mt-6 text-sm text-red-600">Could not load requests. Check the database settings.</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No requests.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-xs uppercase text-muted-foreground">
              <tr><th className="py-2 pr-4">Received</th><th className="pr-4">Company</th><th className="pr-4">Solicitation</th><th className="pr-4">Units</th><th className="pr-4">Partner</th><th>Status</th></tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2 pr-4 whitespace-nowrap">{fmt(r.received_at)}</td>
                  <td className="pr-4"><Link className="underline" href={`/staff/quotes/${r.id}?env=${env}`}>{r.company_name}</Link></td>
                  <td className="pr-4">{r.solicitation_number}</td>
                  <td className="pr-4">{r.number_of_units}</td>
                  <td className="pr-4">{r.partner_name}</td>
                  <td>{label(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
