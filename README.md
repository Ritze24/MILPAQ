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

Before 2026-09-24 the forms were display-only and discarded submissions. Monday.com automation for the RFQ workflow is still pending.

## Notes

- This project pins a newer Next.js version than may be reflected in general documentation/training data — see `AGENTS.md` for details, and check `node_modules/next/dist/docs/` for the installed version's docs before relying on prior Next.js knowledge.
- Blog content is sourced from a headless WordPress instance (see `src/lib/wordpress.ts`).
