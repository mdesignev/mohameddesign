export type Project = {
  slug: string;
  client: string;
  sector: string;
  year: number;
  services: string[];
  /** "full" renders a 16:9 full-width feature; "half" renders as a 4:3 two-up pair. */
  layout: "full" | "half";
  /** Placeholder background tone, cycled for gallery rhythm. */
  tone: 1 | 2 | 3;
  /** Path under /public, e.g. "/projects/arden-hero.jpg". Replaces the placeholder when set. */
  image?: string;
};

/**
 * Featured case studies — 4 to 6 entries. Order is display order.
 * Recommended rhythm: full → half + half → full.
 */
export const projects: Project[] = [
  {
    slug: "arden-coffee",
    client: "Arden Coffee",
    sector: "Specialty coffee",
    year: 2026,
    services: ["Logo design", "Brand identity", "Packaging"],
    layout: "full",
    tone: 1,
  },
  {
    slug: "nord-atelier",
    client: "Nord Atelier",
    sector: "Architecture studio",
    year: 2025,
    services: ["Logo design", "Brand identity"],
    layout: "half",
    tone: 2,
  },
  {
    slug: "solis-health",
    client: "Solis Health",
    sector: "Wellness clinic",
    year: 2025,
    services: ["Logo design", "Brand board"],
    layout: "half",
    tone: 3,
  },
  {
    slug: "mirae-capital",
    client: "Mirae Capital",
    sector: "Investment firm",
    year: 2024,
    services: ["Brand identity", "Guidelines"],
    layout: "full",
    tone: 2,
  },
];
