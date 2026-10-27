# MILPAQ

Website and platform build for MILPAQ Solutions — Next.js frontend replacing the client's existing Wix site (milpaq.com).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Prerequisites

- Node.js 20+
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages hot-reload as you edit files under `src/app`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/            # routes (App Router) — pages, layout, sitemap, robots
  components/     # shared UI components (header, footer, hero, RFQ form, etc.)
  lib/            # constants, SEO/blog data, WordPress integration helpers
```

Key routes: `/about`, `/services` (+ subpages for military packaging, DCMA origin inspection, government readiness, government infrastructure, strategic growth retainer), `/blog`, `/contact`, `/oem-partnership`, `/resource-store`, `/workshops`, plus dynamic SEO landing pages under `/[slug]`.

## Hosting & deployment

- **Production:** https://milpaq.com runs on a Hostinger **Web App** (Node.js, full SSR/API support), live since 2026-09-17. The old Vercel project (milpaq.vercel.app) is no longer the live site.
- **Blog CMS:** headless WordPress at https://blog.milpaq.com (`WORDPRESS_API_URL`).
- **Deploying:** push to `master`, then in hPanel → Websites → milpaq.com → Deployments → **Redeploy**. The server builds from `hbuilds/last-source/`, so changed files must be in that folder before a redeploy.

### Environment variables (set in hPanel, never committed)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://milpaq.com` |
| `WORDPRESS_API_URL` | `https://blog.milpaq.com` |
| `SMTP_USER` / `SMTP_PASS` | Hostinger mailbox used to **send** form emails (`noreply@milpaq.com`) |
| `SMTP_HOST` / `SMTP_PORT` | Optional; default `smtp.hostinger.com` / `465` |
| `FORMS_TO` | Optional; comma-separated recipients, default `milpaq@305aerosupplies.com` |

## Form submissions

All lead forms (contact, OEM partnership, strategic growth retainer, packaging RFQ with file upload, brochure download) POST to `src/app/api/forms/route.ts`, which emails them via SMTP (`src/lib/mailer.ts`) to **milpaq@305aerosupplies.com** only, with Reply-To set to the visitor. Includes a honeypot spam field and a 10 MB attachment limit. If SMTP isn't configured the API returns 503 and visitors are told to email directly — submissions are never silently dropped.

The packaging RFQ form is also saved to the live database (`source = 'website'`, built-in partner "MILPAQ Website") so staff can work it in `/staff/quotes`. The email is sent first and the save happens after the response, so a database problem never fails a submission; failures are logged as `RFQ was emailed but not saved`. Website requests never queue webhooks, so staff actions on them are recorded only and the customer is replied to by email. This needs `PARTNER_DB_LIVE_URL` and `PARTNER_STORAGE_DIR`; without them the form still works and just emails.

Before 2026-09-24 the forms were display-only and discarded submissions. Monday.com automation for the RFQ workflow is still pending.

## Notes

- This project pins a newer Next.js version than may be reflected in general documentation/training data — see `AGENTS.md` for details, and check `node_modules/next/dist/docs/` for the installed version's docs before relying on prior Next.js knowledge.
- Blog content is sourced from a headless WordPress instance (see `src/lib/wordpress.ts`). Posts can be filtered with `/blog?category=<slug>` or `/blog?tag=<slug>`; post tags link to the tag filter, and the share row's copy-link button is `src/components/copy-link-button.tsx`.

## Partner API (Contrax AI) — branch `feat/partner-api`

Server-to-server quote-request API for partners, built 2026-10-20. Spec: `partner-api/openapi.yaml`. Code: `src/lib/partner-api/`, routes under `src/app/api/v1/` and `src/app/api/internal/`, staff screen under `src/app/staff/`.

- Endpoints: `POST /api/v1/quote-requests` (multipart: `metadata` JSON + `solicitation_pdf`, `Idempotency-Key`), `GET /api/v1/quote-requests/{id}`, `POST .../messages`, signed quote-PDF links, HMAC-SHA256 signed webhooks with retries.
- Keys: `mpq_test_` keys use the sandbox database, `mpq_live_` the live one. Sandbox scenario is chosen by the solicitation number (contains INFO, DECLINE or CANCEL; otherwise completes with a stub quote).
- Staff screen: `/staff/login` then `/staff/quotes` (review, enter quote + PDF, ask for info, decline, cancel). Shared password, not per-person.
- Environment variables (set in hPanel, never in the repo): `PARTNER_DB_SANDBOX_URL`, `PARTNER_DB_LIVE_URL`, `PARTNER_STORAGE_DIR` (absolute, outside the build folder), `PARTNER_MASTER_KEY` (32 random bytes, base64), `PARTNER_CRON_SECRET`, `PARTNER_ADMIN_SECRET`, `PARTNER_STAFF_PASSWORD` (12+ chars).
- Cron: POST `/api/internal/partner-cron` every minute (cron-job.org) with `Authorization: Bearer <PARTNER_CRON_SECRET>`.
- Tests: `npm run test:partner-api`. The database test needs `PARTNER_TEST_DB_URL` pointing at a database whose name contains `sandbox` or `test`.
- Status: SQL, file persistence across redeploys and live webhook delivery are not yet tested against real infrastructure. Stripe pay-to-proceed is undecided.
- The packaging RFQ form now takes structured dimensions/weight and an optional solicitation number, and sends the terms version; the inbox email keeps the same field labels.
