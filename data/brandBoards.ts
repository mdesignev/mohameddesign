export type BrandBoard = {
  id: string;
  client: string;
  year: number;
  palette: [string, string, string];
  glyph: string;
  /** Path under /public, e.g. "/boards/arden.jpg" (4:5). */
  src?: string;
};

/** Brand boards — one-page identity summaries at 4:5. The homepage shows the first 3. */
export const brandBoards: BrandBoard[] = [
  {
    id: "arden",
    client: "Arden Coffee",
    year: 2026,
    palette: ["#2e2a24", "#c9a06a", "#efe9dd"],
    glyph: "A",
  },
  {
    id: "solis",
    client: "Solis Health",
    year: 2025,
    palette: ["#1f3a33", "#9fb8ad", "#f2efe8"],
    glyph: "S",
  },
  {
    id: "mirae",
    client: "Mirae Capital",
    year: 2024,
    palette: ["#14181f", "#7c8597", "#e9e7e1"],
    glyph: "M",
  },
];
