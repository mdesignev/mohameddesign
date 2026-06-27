import type { BrandBoard } from "@/data/brandBoards";
import type { HomepageContent } from "@/data/homepage";
import type { LogoMark } from "@/data/logoMarks";
import type { Project } from "@/data/projects";
import { client } from "./client";
import { urlFor } from "./image";

type ImageRef = Parameters<typeof urlFor>[0];

export async function getProjects(): Promise<Project[]> {
  const docs = await client.fetch<
    Array<{
      _id: string;
      client: string;
      slug?: string;
      sector: string;
      services?: string[];
      layout?: string;
      year?: number;
      image?: ImageRef;
    }>
  >(
    `*[_type == "project"] | order(order asc, _createdAt asc){
      _id, client, "slug": slug.current, sector, services, layout, year, image
    }`,
  );

  return docs.map((d, i) => ({
    slug: d.slug || d._id,
    client: d.client,
    sector: d.sector,
    year: d.year ?? undefined,
    services: d.services ?? [],
    layout: d.layout === "full" ? "full" : "half",
    tone: ((i % 3) + 1) as 1 | 2 | 3,
    image: d.image
      ? urlFor(d.image).width(2400).fit("max").auto("format").url()
      : undefined,
  }));
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch<string[]>(
    `*[_type == "project" && defined(slug.current)].slug.current`,
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  const d = await client.fetch<{
    _id: string;
    client: string;
    slug?: string;
    sector: string;
    services?: string[];
    layout?: string;
    year?: number;
    image?: ImageRef;
    intro?: string;
    outcome?: string;
    gallery?: ImageRef[];
  } | null>(
    `*[_type == "project" && slug.current == $slug][0]{
      _id, client, "slug": slug.current, sector, services, layout, year, image, intro, outcome, gallery
    }`,
    { slug },
  );
  if (!d) return null;
  return {
    slug: d.slug || d._id,
    client: d.client,
    sector: d.sector,
    year: d.year ?? undefined,
    services: d.services ?? [],
    layout: d.layout === "full" ? "full" : "half",
    tone: 1,
    image: d.image
      ? urlFor(d.image).width(2400).fit("max").auto("format").url()
      : undefined,
    intro: d.intro ?? undefined,
    outcome: d.outcome ?? undefined,
    gallery: (d.gallery ?? []).map((g) =>
      urlFor(g).width(2000).fit("max").auto("format").url(),
    ),
  };
}

export async function getLogoMarks(): Promise<LogoMark[]> {
  const docs = await client.fetch<
    Array<{ _id: string; client: string; year?: number; mark?: ImageRef }>
  >(
    `*[_type == "logoMark"] | order(order asc, _createdAt asc){ _id, client, year, mark }`,
  );

  return docs.map((d) => ({
    id: d._id,
    client: d.client,
    year: d.year ?? undefined,
    src: d.mark
      ? urlFor(d.mark).width(400).fit("max").auto("format").url()
      : undefined,
  }));
}

export async function getCounts(): Promise<{
  projects: number;
  marks: number;
  boards: number;
}> {
  return client.fetch(
    `{
      "projects": count(*[_type == "project"]),
      "marks": count(*[_type == "logoMark"]),
      "boards": count(*[_type == "brandBoard"])
    }`,
  );
}

export async function getBrandBoards(): Promise<BrandBoard[]> {
  const docs = await client.fetch<
    Array<{
      _id: string;
      client: string;
      year?: number;
      palette?: string[];
      board?: ImageRef;
    }>
  >(
    `*[_type == "brandBoard"] | order(order asc, _createdAt asc){ _id, client, year, palette, board }`,
  );

  return docs.map((d) => {
    const p = d.palette ?? [];
    const palette: [string, string, string] = [
      p[0] ?? "#111111",
      p[1] ?? "#6a6a6a",
      p[2] ?? "#d9d9d2",
    ];
    return {
      id: d._id,
      client: d.client,
      year: d.year ?? undefined,
      palette,
      glyph: d.client.charAt(0),
      src: d.board
        ? urlFor(d.board).width(1600).fit("max").auto("format").url()
        : undefined,
    };
  });
}

// Current site copy as a safety net — if the Sanity homepage doc is
// missing/empty, the site renders these instead of going blank.
const HOMEPAGE_DEFAULTS: HomepageContent = {
  hero: {
    eyebrowBrand: "MDESIGNEV",
    eyebrowLocation: "Egypt",
    headlineLines: ["Logo & Brand", "Identity Systems"],
    supportingLine:
      "Sharp, modern identity work built for brands that need clarity, structure, and presence.",
    services: "Logo · Identity · Brand Boards",
    status: "Available for work",
  },
  marquee: [
    "Logo Design",
    "Brand Identity",
    "Brand Boards",
    "Art Direction",
    "Visual Systems",
  ],
  about: {
    bio: "Mohamed Design creates logo and brand identity systems for businesses that need clear, distinctive, and professionally delivered visual assets.",
    services: [
      { name: "Logo design", desc: "Distinctive marks built to last decades, not seasons." },
      { name: "Brand identity", desc: "Complete visual systems — typography, color, and clear usage rules." },
      { name: "Brand boards", desc: "One-page identity summaries, ready to share with any team." },
      { name: "Final delivery", desc: "Professional, production-ready files in every format you need." },
    ],
  },
  contact: {
    siteName: "Mohamed Design",
    headline: "Let's build your mark.",
    supportingLine:
      "Logo design, brand identity, and brand boards — every project delivered as professional, production-ready files.",
    email: "me@mohameddesign.com",
    phoneDisplay: "+20 100 404 4133",
    phoneTel: "+201004044133",
    whatsappUrl: "https://wa.me/201004044133",
    instagramUrl: "https://instagram.com/mdesignev",
    behanceUrl: "https://behance.net/mdesignev",
    arabicSignature: "محمد",
  },
};

export async function getHomepage(): Promise<HomepageContent> {
  const d = await client.fetch<{
    heroEyebrowBrand?: string;
    heroEyebrowLocation?: string;
    heroHeadlineLines?: string[];
    heroSupportingLine?: string;
    heroServices?: string;
    heroStatus?: string;
    marquee?: string[];
    aboutBio?: string;
    aboutServices?: { name?: string; desc?: string }[];
    siteName?: string;
    contactHeadline?: string;
    contactSupportingLine?: string;
    email?: string;
    phoneDisplay?: string;
    instagramUrl?: string;
    behanceUrl?: string;
    arabicSignature?: string;
  } | null>(
    `*[_type == "homepage"][0]{
      heroEyebrowBrand, heroEyebrowLocation, heroHeadlineLines, heroSupportingLine,
      heroServices, heroStatus, marquee, aboutBio, aboutServices[]{name, desc},
      siteName, contactHeadline, contactSupportingLine, email, phoneDisplay,
      instagramUrl, behanceUrl, arabicSignature
    }`,
    )
    .catch(() => null); // Sanity unreachable → fall back to defaults below.

  if (!d) return HOMEPAGE_DEFAULTS;

  const dc = HOMEPAGE_DEFAULTS.contact;
  const phoneDisplay = d.phoneDisplay || dc.phoneDisplay;
  const digits = phoneDisplay.replace(/\D/g, "");

  return {
    hero: {
      eyebrowBrand: d.heroEyebrowBrand || HOMEPAGE_DEFAULTS.hero.eyebrowBrand,
      eyebrowLocation:
        d.heroEyebrowLocation || HOMEPAGE_DEFAULTS.hero.eyebrowLocation,
      headlineLines: d.heroHeadlineLines?.length
        ? d.heroHeadlineLines
        : HOMEPAGE_DEFAULTS.hero.headlineLines,
      supportingLine:
        d.heroSupportingLine || HOMEPAGE_DEFAULTS.hero.supportingLine,
      services: d.heroServices || HOMEPAGE_DEFAULTS.hero.services,
      status: d.heroStatus || HOMEPAGE_DEFAULTS.hero.status,
    },
    marquee: d.marquee?.length ? d.marquee : HOMEPAGE_DEFAULTS.marquee,
    about: {
      bio: d.aboutBio || HOMEPAGE_DEFAULTS.about.bio,
      services: d.aboutServices?.length
        ? d.aboutServices.map((s) => ({ name: s.name || "", desc: s.desc || "" }))
        : HOMEPAGE_DEFAULTS.about.services,
    },
    contact: {
      siteName: d.siteName || dc.siteName,
      headline: d.contactHeadline || dc.headline,
      supportingLine: d.contactSupportingLine || dc.supportingLine,
      email: d.email || dc.email,
      phoneDisplay,
      phoneTel: "+" + digits,
      whatsappUrl: "https://wa.me/" + digits,
      instagramUrl: d.instagramUrl || dc.instagramUrl,
      behanceUrl: d.behanceUrl || dc.behanceUrl,
      arabicSignature: d.arabicSignature || null,
    },
  };
}
