import type { BrandBoard } from "@/data/brandBoards";
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
