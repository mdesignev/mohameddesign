import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://mohameddesign.com/sitemap.xml",
    host: "https://mohameddesign.com",
  };
}
