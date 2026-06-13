export type LogoMark = {
  id: string;
  client: string;
  year: number;
  /** Placeholder glyph shown until a real SVG is supplied via `src`. */
  glyph: string;
  /** Path under /public, e.g. "/marks/arden.svg". */
  src?: string;
};

/** Logo archive — the homepage shows the first 12. */
export const logoMarks: LogoMark[] = [
  { id: "arden", client: "Arden Coffee", year: 2026, glyph: "A" },
  { id: "vela", client: "Vela Goods", year: 2026, glyph: "◆" },
  { id: "nord", client: "Nord Atelier", year: 2025, glyph: "N" },
  { id: "solis", client: "Solis Health", year: 2025, glyph: "S" },
  { id: "onsen", client: "Onsen Bath", year: 2025, glyph: "○" },
  { id: "mirae", client: "Mirae Capital", year: 2024, glyph: "M" },
  { id: "rove", client: "Rove Travel", year: 2024, glyph: "R" },
  { id: "peak", client: "Peak Builders", year: 2024, glyph: "▲" },
  { id: "kanso", client: "Kanso Press", year: 2023, glyph: "K" },
  { id: "orbital", client: "Orbital Labs", year: 2023, glyph: "⊙" },
  { id: "grain", client: "Grain Bakery", year: 2022, glyph: "G" },
  { id: "ember", client: "Ember Candle", year: 2022, glyph: "E" },
];
