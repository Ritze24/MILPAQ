// Thin wrapper around the GTM dataLayer (declared in src/app/layout.tsx).
// Safe to call from anywhere, including during SSR (no-ops off the client).
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushToDataLayer(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
