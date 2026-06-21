export type BrandBoard = {
  id: string;
  client: string;
  /** Optional — omitted from the board when not set. */
  year?: number;
  palette: [string, string, string];
  glyph: string;
  /** Path under /public, e.g. "/boards/monarch.jpg" (4:5). Replaces the placeholder when set. */
  src?: string;
};

// Neutral grey swatches are placeholders until real brand colours are supplied.
const PLACEHOLDER_PALETTE: [string, string, string] = ["#111111", "#6a6a6a", "#d9d9d2"];

/** Brand boards — the homepage shows the first 3. */
export const brandBoards: BrandBoard[] = [
  { id: "monarch", client: "Monarch", glyph: "M", palette: PLACEHOLDER_PALETTE },
  { id: "bellavera", client: "Bellavera", glyph: "B", palette: PLACEHOLDER_PALETTE },
  { id: "dermark-group", client: "Dermark Group", glyph: "D", palette: PLACEHOLDER_PALETTE },
];
