# mohameddesign.com

Premium minimal portfolio for logo and brand identity work.
Concept: **A quiet gallery for loud marks.** Source of truth: [DESIGN-SPEC.md](./DESIGN-SPEC.md).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · served by Node behind Nginx (PM2 on port 3010).

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm run start  # serve the production build
```

## Deployment

GitHub → VPS (PM2 + Nginx + Certbot). Full instructions in [DEPLOYMENT.md](./DEPLOYMENT.md); redeploys run via [`deploy.sh`](./deploy.sh).

## Structure

```
/app          layout.tsx · page.tsx · globals.css
/components   one file per section + card primitives
/data         view-model TYPES only (content comes from Sanity)
/sanity       client.ts · image.ts · fetch.ts (GROQ queries + mapping to the view models)
/public       /logo (monogram + favicon)
```

## Content (Sanity CMS)

Projects, logo marks, and brand boards are managed in **Sanity**, not in code:

- **Editor:** https://mohameddesign.sanity.studio (log in with the Sanity account)
- **Project:** `yqklv3jo` · dataset `production` (public read, no token needed)
- **Document types:** `project`, `logoMark`, `brandBoard` (schema is MCP-managed in Sanity)

The site reads published content with **ISR (`revalidate = 60`)** — edits in the Studio appear on the live site within ~60s, **no redeploy needed**. Images upload in the Studio (served from Sanity's CDN); when a project/mark/board has no image, the placeholder block renders automatically.

`sanity/fetch.ts` maps Sanity documents to the view-model types in `/data`, so the presentational components are unchanged. Site copy (headline, services, bio, email, social, the Arabic footer signature) still lives at the top of the matching component (`Hero`, `AboutTeaser`, `Footer`, `Header`).

Image specs to upload in the Studio: 16:9 / 4:3 for projects (≥2400px wide for full-bleed), square single-colour SVG/PNG for marks, 4:5 (≥1600×2000) for boards.

## Animation policy

Load fade (hero only), hover underline, image scale ≤1.02 — all behind `prefers-reduced-motion`. Nothing else.

## Phase 1 scope

Homepage + Sanity CMS. Case-study pages, archive page, boards gallery, About page, contact form, and lightbox are phase 2+.
