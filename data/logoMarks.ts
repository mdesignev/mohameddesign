export type LogoMark = {
  id: string;
  client: string;
  /** Optional — omitted from the tile when not set. */
  year?: number;
  /** Optional placeholder glyph; if absent the tile shows the client initial. */
  glyph?: string;
  /** Path under /public, e.g. "/marks/monarch.svg". Replaces the placeholder when set. */
  src?: string;
};

/** Logo archive — the homepage shows the first 12; the rest are ready for a full archive page. */
export const logoMarks: LogoMark[] = [
  { id: "white-gold", client: "White Gold" },
  { id: "fahdah-bakery", client: "Fahdah Bakery" },
  { id: "let-me-in", client: "Let Me In" },
  { id: "monarch", client: "Monarch" },
  { id: "red-cap", client: "Red Cap" },
  { id: "sautcher", client: "Sautcher" },
  { id: "ana-online", client: "Ana Online" },
  { id: "al-joudiya", client: "Al Joudiya" },
  { id: "bellavera", client: "Bellavera" },
  { id: "cayan", client: "Cayan" },
  { id: "taraeb", client: "Taraeb" },
  { id: "dermark-group", client: "Dermark Group" },
  { id: "spark", client: "Spark" },
  { id: "almusairiey", client: "Almusairiey" },
  { id: "al-majlis-al-saudi", client: "Al Majlis Al Saudi" },
  { id: "nexahorizon", client: "NexaHorizon" },
  { id: "masajid", client: "Masajid" },
  { id: "farmhouse-grill", client: "Farmhouse Grill" },
];
