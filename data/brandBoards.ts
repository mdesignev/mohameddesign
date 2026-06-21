// Content now lives in Sanity (brandBoard type). Fetched + mapped in `sanity/fetch.ts`.
export type BrandBoard = {
  id: string;
  client: string;
  /** Optional — omitted from the board when not set. */
  year?: number;
  palette: [string, string, string];
  glyph: string;
  /** Resolved image URL from Sanity; placeholder shown when absent. */
  src?: string;
};
