// Marketing attribution (UTM parameters, ad click IDs, landing page, referrer).
//
// Captured once when a visitor lands on the site (src/instrumentation-client.ts),
// kept in localStorage, and attached to every form submission by submitForm().
// The values then appear in the notification email and on the Monday.com board.
//
// Rule: a visit that arrives WITH campaign parameters (utm_* / gclid / fbclid /
// msclkid) replaces what's stored (last campaign touch wins). A visit without
// them never overwrites an existing campaign, so a lead who first clicked an ad
// and later came back directly is still credited to the ad. Data expires after
// 90 days.

export const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "landing_page",
  "referrer",
] as const;

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];
type Attribution = Partial<Record<AttributionField, string>> & { captured_at?: number };

const STORAGE_KEY = "milpaq_attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const CAMPAIGN_PARAMS: AttributionField[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
];

function read(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Attribution;
    if (!data.captured_at || Date.now() - data.captured_at > MAX_AGE_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function externalReferrer(): string {
  try {
    if (!document.referrer) return "";
    const ref = new URL(document.referrer);
    return ref.hostname === window.location.hostname ? "" : document.referrer.slice(0, 500);
  } catch {
    return "";
  }
}

/** Call once on page load. Safe on the server (no-op). */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasCampaign = CAMPAIGN_PARAMS.some((key) => params.get(key));
    const existing = read();
    if (existing && !hasCampaign) return;

    const data: Attribution = { captured_at: Date.now() };
    for (const key of CAMPAIGN_PARAMS) {
      const value = params.get(key)?.trim();
      if (value) data[key] = value.slice(0, 255);
    }
    data.landing_page = (window.location.origin + window.location.pathname + window.location.search).slice(0, 500);
    const referrer = externalReferrer();
    if (referrer) data.referrer = referrer;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked (private mode, etc.) — attribution is best-effort.
  }
}

/** Stored attribution values, ready to append to a form submission. */
export function getAttribution(): Partial<Record<AttributionField, string>> {
  if (typeof window === "undefined") return {};
  const data = read();
  if (!data) return {};
  const out: Partial<Record<AttributionField, string>> = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const value = data[key];
    if (value) out[key] = value;
  }
  return out;
}
