import { createClient } from "@sanity/client";

// Public project + dataset (no secret token needed — the dataset is public-read).
// Hardcoded fallbacks mean no env setup is required on the VPS; override via env if desired.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yqklv3jo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-15",
  useCdn: true,
});
