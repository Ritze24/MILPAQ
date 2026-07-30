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

## Notes

- This project pins a newer Next.js version than may be reflected in general documentation/training data — see `AGENTS.md` for details, and check `node_modules/next/dist/docs/` for the installed version's docs before relying on prior Next.js knowledge.
- Blog content is sourced from a headless WordPress instance (see `src/lib/wordpress.ts`).
