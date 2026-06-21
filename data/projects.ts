export type Project = {
  slug: string;
  client: string;
  sector: string;
  /** Optional — omitted from the system label when not set. */
  year?: number;
  services: string[];
  /** "full" renders a 16:9 full-width feature; "half" renders as a 4:3 two-up pair. */
  layout: "full" | "half";
  /** Placeholder background tone, cycled for gallery rhythm. */
  tone: 1 | 2 | 3;
  /** Path under /public, e.g. "/projects/fahdah-hero.jpg". Replaces the placeholder when set. */
  image?: string;
};

/**
 * Featured case studies — 4 to 6 entries. Order is display order.
 * Rhythm: full → half + half → full → half + half. Add `image` to replace a placeholder.
 */
export const projects: Project[] = [
  {
    slug: "fahdah-bakery",
    client: "Fahdah Bakery",
    sector: "Bakery truck",
    services: ["Branding", "Packaging"],
    layout: "full",
    tone: 1,
  },
  {
    slug: "monarch",
    client: "Monarch",
    sector: "Supplements",
    services: ["Brand identity"],
    layout: "half",
    tone: 2,
  },
  {
    slug: "bellavera",
    client: "Bellavera",
    sector: "Cosmetics",
    services: ["Branding"],
    layout: "half",
    tone: 3,
  },
  {
    slug: "al-joudiya",
    client: "Al Joudiya",
    sector: "Resort",
    services: ["Branding"],
    layout: "full",
    tone: 2,
  },
  {
    slug: "sautcher",
    client: "Sautcher",
    sector: "Smoked restaurant",
    services: ["Naming", "Branding"],
    layout: "half",
    tone: 1,
  },
  {
    slug: "dermark-group",
    client: "Dermark Group",
    sector: "Cosmetics & supplements",
    services: ["Branding", "Guidelines"],
    layout: "half",
    tone: 3,
  },
];
