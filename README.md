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
/data         ALL portfolio content lives here — components never hardcode it
/public       /projects /marks /boards /logo — drop real assets here
```

## Replacing placeholder content

| File | Controls |
|------|----------|
| `data/projects.ts` | Featured case studies (4–6). `layout: "full"` renders 16:9 full-width; `"half"` renders as a 4:3 two-up pair |
| `data/logoMarks.ts` | Logo archive tiles (first 12 shown on homepage) |
| `data/brandBoards.ts` | Brand boards (first 3 shown) |

Site copy (headline, services, bio, email, social, the optional Arabic footer signature) lives at the top of the matching component (`Hero`, `AboutTeaser`, `Footer`, `Header`).

### Swapping in real imagery

1. Drop files into `public/projects/`, `public/marks/`, `public/boards/`.
2. Set the optional `image` (projects) or `src` (marks, boards) field, e.g. `image: "/projects/arden-hero.jpg"`.
3. The placeholder block is replaced automatically; ratios are locked so layout never shifts.

Image specs: 16:9 / 4:3 for projects (≥2400px wide for full-bleed), square single-color SVGs for marks, 4:5 (≥1600×2000) for boards. Consistent neutral paper-tone backgrounds, no heavy shadows, no stock images.

## Animation policy

Load fade (hero only), hover underline, image scale ≤1.02 — all behind `prefers-reduced-motion`. Nothing else.

## Phase 1 scope

Homepage only. Case-study pages, archive page, boards gallery, About page, CMS, contact form, and lightbox are phase 2+.
