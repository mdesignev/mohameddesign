# mohameddesign.com — Design spec

## v2 art direction (2026-06-13) — Swiss / Bauhaus interface portfolio

The serif "Quiet Gallery" look below is superseded. Current built direction:

- **Not retro Bauhaus posters** — a modern, interface-like, structured-grid portfolio with restrained geometric personality.
- **Sans-serif only.** Type system: **Space Grotesk** (display/headings), **Inter** (body/UI), **IBM Plex Mono** (meta/system labels). No serif anywhere.
- **Palette:** paper `#F2F1EC`, ink `#111111`, muted `#6A6A6A`, border `#D9D9D2`, single accent `#2957FF` (electric blue) used *sparingly* — hover/active states, index numbers, small geometric cues (the 8px square, status dot). Tone fills `#E9E8E0 / #E1E0D7 / #D8D7CC` for placeholder blocks.
- **Geometric cues, functional not decorative:** 2px ink top-rules on section headers and project placards; numbered system indices (`01`, `02 / SECTOR / YEAR`); modular 1px-divider logo grid; hero system strip (Services / Index / Status); 8px accent square as a recurring mark.
- **Hero:** eyebrow "Mohamed Design"; H1 "Logo & Brand Identity Systems"; support line "Sharp, modern identity work built for brands that need clarity, structure, and presence."; two buttons — View Work (solid, hovers to accent) + Start Project (outline).
- **Layout:** slightly asymmetric where useful (About = left statement / right numbered services grid). Work stays the focus.
- Animation unchanged: load fade, hover underline, image scale ≤1.02, all behind `prefers-reduced-motion`.
- Signature unchanged: footer-only monogram + optional `محمد` sign-off, bidi-isolated.

Everything from here down is the original v1 serif spec, kept for history.

---

# mohameddesign.com — Design spec v1 (superseded)

Direction: "The Quiet Gallery" (editorial minimal, work-first) + one subtle personal signature.
Approved 2026-06-12.

Hard constraints from Mohamed:
- Not a bilingual/cultural-identity site. No RTL/LTR toggle. No kinetic bilingual hero wordmark.
- The identity layer must never compete with the portfolio work.
- Premium, minimal, fast. Logo and brand identity work is the focus.

---

## 1. Concept statement

**A quiet gallery for loud marks.**

mohameddesign.com is a near-silent editorial space — warm paper, ink type, generous air — where bold logo marks and identity systems do all the talking. The site borrows the manners of a gallery: work hung large, labeled with small placards, paced with whitespace. One personal signature is whispered, never shouted: a single monogram and a footer sign-off.

Design principles:
1. **Work first** — every layout decision defers to the project imagery.
2. **Quiet surface, loud marks** — the site stays neutral so high-contrast logo work pops.
3. **Editorial pacing** — scroll rhythm like a magazine feature: full-bleed, two-up, breathe, repeat.
4. **One signature, whispered** — the personal layer is a detail you discover, not a concept you're shown.
5. **Fast is premium** — load speed and stability are part of the aesthetic.

### The signature (the only borrow from Direction 2)
- **MD monogram** — a single mark designed by Mohamed. Brief: legible at 16 px (favicon), single ink color; the counterform *may* quietly echo the meem (م) — readable to those who know, invisible to those who don't. Used in: favicon, nav (optional, small), footer.
- **Footer sign-off** — `Mohamed Design — محمد` set small in Stone gray, footer only — and **optional**: drop the Arabic if it ever disturbs the clean rhythm (toggle in `src/data/site.ts`). This is the single bilingual moment on the entire site.
- **Brass accent** — one warm metallic-leaning tone used for hover underlines and the monogram. Total accent usage < 2% of any screen.

Rules: signature elements never animate beyond a simple fade, never appear in the hero, never appear inside case-study content. Identity layer ≤ 5% of visual weight on any screen.

---

## 2. Homepage wireframe (top to bottom)

| # | Section | Contents | Behavior / notes |
|---|---------|----------|------------------|
| 0 | **Nav** | Wordmark "Mohamed Design" left (serif); links right: Work · Archive · About · Contact | 72 px tall, transparent over paper; hairline bottom border appears on scroll. Sticky. |
| 1 | **Hero** | Mono eyebrow ("Independent brand designer"); H1: **"Premium Logo & Brand Identity Design"**; support line: **"A quiet gallery for bold marks, clear systems, and brands built to last."**; services strip in mono (logo design · brand identity · brand boards · final delivery) | ≈70vh. The headline must state the service plainly in the first 3 seconds — editorial but never abstract. Single staged fade on load — no other hero animation. |
| 2 | **Selected work** | Section header "01 — Selected work" + "All work →". 4–6 featured projects: alternating full-bleed 16:9 blocks and two-up 4:3 pairs, each with a placard (client name in serif; sector · year · services in mono) | Hover: image scales 1.02, brass underline draws under client name. Cards link to case-study pages (stubs in phase 1). |
| 3 | **Logo archive teaser** | Section header "02 — Logo archive" + "View all marks →". 6-column grid of 12 marks, 1:1 tiles, ink on paper, hairline borders | Hover: tile reveals client + year caption. Links to archive page (stub in phase 1). |
| 4 | **About teaser** | Section header "03 — About". 2–3 line bio statement in serif; services grid (4 items: logo design, brand identity, brand boards, final delivery — each with a one-line description); "Start a project →" link | The services grid carries the commercial-clarity requirement. No portrait on homepage. |
| 5 | **Brand boards teaser** | Section header "04 — Brand boards". 3 boards at 4:5 with client captions | Full boards gallery is phase 2. |
| 6 | **Footer / contact** | Inverted ink band, "05 — Contact". Serif CTA "Let's build your mark."; large email link; one-line services reminder; social links; sign-off line `Mohamed Design — محمد · © 2026` with monogram | The only dark surface and the only bilingual moment on the site. |

---

## 3. Visual system

### 3.1 Color palette

| Token | Hex | Role | Approx. share |
|-------|-----|------|---------------|
| `paper` | `#FAF9F6` | Background canvas | ~80% |
| `ink` | `#131210` | Primary text, footer surface | ~12% |
| `stone` | `#82807B` | Secondary text, captions, meta | ~4% |
| `hairline` | `#E7E5E0` | Borders, dividers, tile strokes | ~2% |
| `brass` | `#9C7C4C` | Accent: hover underlines, monogram, selected states | < 2% |
| `brass-on-ink` | `#C9A06A` | Brass variant for AA contrast on the dark footer | footer only |

Project imagery supplies all other color. No gradients, no shadows beyond a barely-there image lift on hover.

### 3.2 Typography

| Slot | First choice (licensed) | Free build alternative | Used for |
|------|------------------------|------------------------|----------|
| Display serif | GT Sectra or Editorial New | Fraunces (variable) | Headlines, project names, pull quotes |
| Text grotesque | Neue Haas Grotesk or Suisse Int'l | Inter | Body, UI, nav |
| Meta mono | Söhne Mono | IBM Plex Mono | Placards, labels, section indices |

**Build v1 decision (2026-06-12): use the free trio — Fraunces (display), Inter (body/UI), IBM Plex Mono (meta). Premium faces are a later upgrade, not a launch blocker.**

Type scale (desktop / mobile):

| Token | Size | Face | Notes |
|-------|------|------|-------|
| `display` | clamp(3rem, 6.5vw, 5.5rem) | serif | lh 1.05, ls −0.01em — hero only |
| `h2` | clamp(1.75rem, 3vw, 2.5rem) | serif | section statements |
| `h3` | 1.625rem / 1.25rem | serif | project names on placards |
| `body` | 1.125rem / 1rem | sans | lh 1.65, max measure ~68ch |
| `ui` | 0.9375rem | sans | nav, buttons, links |
| `meta` | 0.8125rem | mono | uppercase, ls +0.06em — placards/labels only |

Rules: serif never in UI controls. Mono never for running text. Max two weights per family (400/500 region). Subset to Latin + the few Arabic glyphs needed for the footer sign-off.

### 3.3 Spacing
8 px base unit. Token ladder: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
Section vertical padding: 160 px desktop / 96 px tablet / 72 px mobile.
Image → placard gap: 16 px. Placard internal gaps: 8 px.

### 3.4 Grid

| Breakpoint | Columns | Gutter | Outer margin |
|------------|---------|--------|--------------|
| ≥1200 px | 12 | 24 px | 64 px |
| 768–1199 px | 6 | 20 px | 32 px |
| <768 px | 4 | 16 px | 20 px |

Content max-width 1440 px; full-bleed images may span the viewport up to 1920 px.

### 3.5 Image ratios

| Ratio | Use |
|-------|-----|
| 16:9 | Full-bleed feature images, case-study heroes |
| 3:2 | Standard editorial insets |
| 4:3 | Two-up pairs |
| 1:1 | Logo marks (archive tiles, mark presentations) |
| 4:5 | Brand boards, mobile crops |

Export: ≥2400 px wide for full-bleed, AVIF/WebP with JPEG fallback, every image ratio-locked in layout (zero CLS).

---

## 4. Portfolio structure

Three tiers — case studies for depth, archive for breadth, boards for speed.

### 4.1 Featured case studies (4–6 at launch, minimum 3)
Template flow per case study:
1. 16:9 hero image
2. Placard meta row: client · sector · year · services (≤4)
3. 100–150 word intro (brief → idea)
4. The mark: 1:1, ink on paper, generous air
5. Identity system: construction grid, typography, palette
6. Applications: 6–10 images alternating full-bleed / two-up
7. One-line outcome
8. Next-project link

### 4.2 Logo marks archive
- 12–24 marks at launch; grows over time.
- 1:1 tiles, **single-ink rule**: every mark shown in ink on paper — equalizes the collection and reads premium.
- Hover reveals client + year. No individual pages; optional lightbox in a later phase. Sector filter later.

### 4.3 Brand boards
- 6–10 boards, 4:5, two-column gallery.
- Each board is one self-contained composition: mark + palette + type + one application.
- Doubles as social/Behance content.

Site map: Home → Work index (can fold into Home initially) → Case-study pages → Archive → About → Contact (footer).

---

## 5. Component list

**Layout**
1. Nav bar (sticky, hairline-on-scroll)
2. Footer / contact band (inverted ink)
3. Section shell (mono index + title + optional CTA link)
4. Grid container (12/6/4-col)

**Content**
5. Display statement (hero)
6. Project feature card A — full-bleed 16:9 + placard
7. Project feature card B — two-up 4:3 pair + placards
8. Placard (client serif + meta mono)
9. Marks tile (1:1, hover caption)
10. Marks grid (6/4/3-col responsive)
11. Board card (4:5)
12. Bio teaser block
13. Client list strip (optional)
14. Pull quote (case studies, phase 2)

**Interactive**
15. Text link with brass underline draw-in
16. Scroll-reveal wrapper (fade + 8 px rise, fires once, respects `prefers-reduced-motion`)
17. Image hover (scale 1.02, 400 ms ease-out)
18. Skip-to-content link

**Utility**
19. Responsive image component (lazy below fold, LQIP blur-up, ratio-locked)
20. SEO head / OG meta
21. Favicon + touch icons (monogram)
22. 404 (phase 2)

---

## 6. Content requirements (what Mohamed supplies)

| Item | Spec |
|------|------|
| Positioning statement | 6–10 words + support line ≤20 words |
| Case studies ×4–6 | Client, sector, year, services (≤4), 100–150-word narrative, outcome line, 8–14 images at spec ratios (≥2400 px), mark as SVG |
| Archive marks | 12–24 single-color SVGs + client + year each |
| Brand boards | 6–10 at 4:5, ≥1600×2000 px |
| Bio | 80–120 words; optional portrait (3:2 or 4:5) for About page |
| Contact | Email + up to 3 social links |
| Monogram | Designed by Mohamed: legible at 16 px, single color, optional quiet meem nod |
| Client / recognition list | Optional, text only |

**Imagery art direction (critical):** consistent neutral paper-tone backgrounds across all mockups, no glossy device mockups, no heavy drop shadows, daylight color temperature. The gallery concept only works if the work photography is consistent.

---

## 7. First-build scope — homepage only

**In scope**
- All six homepage sections per the wireframe.
- Responsive 360–1920 px.
- Motion limited to: hero load fade, scroll reveals, hover states. `prefers-reduced-motion` respected.
- Placeholder-tolerant: build needs minimum 3 projects + 8 marks; structure accepts 6 + 24.
- Favicon (monogram) + OG image.
- Semantic HTML, AA contrast, full keyboard navigation.
- Performance budget: LCP < 2.0 s on fast 4G, CLS < 0.05, total JS ≤ 30 KB gzipped, ≤ 4 subset woff2 font files, Lighthouse ≥ 95 across categories.

**Out of scope (phase 2+)**
Case-study pages (cards link to stubs), archive page (teaser links to stub), boards page, About page (teaser only), CMS, contact form (mailto only), lightbox, analytics, blog, RTL/multilingual anything.

**Definition of done**
- [ ] Six sections match wireframe and visual system tokens
- [ ] Renders correctly 360 / 768 / 1200 / 1440 / 1920
- [ ] Performance budget met (measured, not assumed)
- [ ] Keyboard + reduced-motion verified
- [ ] Footer signature present; identity layer passes the "≤5% visual weight" squint test

**Open decisions before build**
1. ~~Font licensing~~ — resolved 2026-06-12: free trio (Fraunces + Inter + IBM Plex Mono) for build v1
2. Monogram design (Mohamed's task)
3. Content readiness: which 3+ case studies launch
4. Hosting/stack (static-first; decide at build kickoff)
