// Content now lives in Sanity (project type). This file defines the view model
// the components render; data is fetched + mapped in `sanity/fetch.ts`.
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
  /** Resolved image URL from Sanity; placeholder shown when absent. */
  image?: string;
};
