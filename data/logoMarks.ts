// Content now lives in Sanity (logoMark type). Fetched + mapped in `sanity/fetch.ts`.
export type LogoMark = {
  id: string;
  client: string;
  /** Optional — omitted from the tile when not set. */
  year?: number;
  /** Optional placeholder glyph; if absent the tile shows the client initial. */
  glyph?: string;
  /** Resolved image URL from Sanity; client initial shown when absent. */
  src?: string;
};
