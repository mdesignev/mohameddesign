import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getProject, getProjects, getProjectSlugs } from "@/sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project — Mohamed Design" };
  return {
    title: `${project.client} — Mohamed Design`,
    description: `${project.sector}. ${project.services.join(", ")}.`,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const idx = all.findIndex((p) => p.slug === slug);
  const next = idx >= 0 ? all[(idx + 1) % all.length] : undefined;
  const hasStudy =
    !!project.intro ||
    (project.gallery?.length ?? 0) > 0 ||
    !!project.outcome;

  return (
    <>
      <Header />
      <main id="main">
        <article className="container-site pt-16 md:pt-20">
          <a
            href="/#work"
            className="link-underline font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-stone"
          >
            ← Selected work
          </a>

          <header className="mt-8 border-t-2 border-ink pt-6 md:mt-10">
            <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              {project.client}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-stone">
              <span>{project.sector}</span>
              {project.year != null && <span>{project.year}</span>}
              {project.services.length > 0 && (
                <span>{project.services.join(" · ")}</span>
              )}
            </div>
          </header>

          <div className="mt-8 md:mt-10">
            {project.image ? (
              <div className="aspect-video overflow-hidden border border-hairline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.client} — brand identity`}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-hairline bg-tone-1">
                <span
                  aria-hidden="true"
                  className="font-display text-7xl font-medium text-ink/20 md:text-8xl"
                >
                  {project.client.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {project.intro && (
            <div className="mt-12 max-w-[60ch] md:mt-16">
              <p className="font-display text-xl leading-relaxed md:text-2xl">
                {project.intro}
              </p>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-10">
              {project.gallery.map((src, i) => (
                <div key={src} className="overflow-hidden border border-hairline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.client} application ${i + 1}`}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {project.outcome && (
            <div className="mt-12 max-w-[50ch] border-t-2 border-ink pt-6 md:mt-16">
              <p className="meta-label">Outcome</p>
              <p className="mt-3 font-display text-xl leading-snug md:text-2xl">
                {project.outcome}
              </p>
            </div>
          )}

          {!hasStudy && (
            <p className="mt-12 max-w-[52ch] text-sm leading-relaxed text-stone md:mt-16">
              Full case study coming soon — add an intro, application images,
              and an outcome to this project in the Studio.
            </p>
          )}
        </article>

        {next && (
          <div className="container-site mt-20 border-t border-hairline py-10 md:mt-28">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-stone">
                Next project
              </span>
              <a
                href={`/work/${next.slug}`}
                className="link-underline font-display text-xl font-medium tracking-tight transition-colors duration-200 hover:text-accent md:text-2xl"
              >
                {next.client} →
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
