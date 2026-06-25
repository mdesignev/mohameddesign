import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal from "@/components/motion/Reveal";
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
    !!project.intro || (project.gallery?.length ?? 0) > 0 || !!project.outcome;

  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="glow left-1/2 top-0 h-[30vw] w-[30vw] max-h-[380px] max-w-[380px] -translate-x-1/2 opacity-[0.12]"
        />
        <article className="container-site relative z-10 pt-28 md:pt-36">
          <a
            href="/#work"
            data-cursor
            className="link-underline font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-stone"
          >
            ← Selected work
          </a>

          <Reveal>
            <header className="mt-8 rule-top pt-6 md:mt-10">
              <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-paper">
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
          </Reveal>

          <div className="mt-10 md:mt-12">
            <ParallaxImage
              src={project.image}
              alt={`${project.client} — brand identity`}
              className="aspect-video rounded-sm border border-line bg-surface"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-surface">
                <span
                  aria-hidden="true"
                  className="font-display text-7xl font-medium text-paper/15 md:text-8xl"
                >
                  {project.client.charAt(0)}
                </span>
              </div>
            </ParallaxImage>
          </div>

          {project.intro && (
            <Reveal>
              <div className="mt-14 max-w-[60ch] md:mt-20">
                <p className="font-display text-xl leading-relaxed text-paper md:text-2xl">
                  {project.intro}
                </p>
              </div>
            </Reveal>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-10">
              {project.gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 2) * 0.08}>
                  <div className="overflow-hidden rounded-sm border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.client} application ${i + 1}`}
                      className="w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {project.outcome && (
            <Reveal>
              <div className="mt-14 max-w-[50ch] rule-top pt-6 md:mt-20">
                <p className="meta-label">Outcome</p>
                <p className="mt-3 font-display text-xl leading-snug text-paper md:text-2xl">
                  {project.outcome}
                </p>
              </div>
            </Reveal>
          )}

          {!hasStudy && (
            <p className="mt-14 max-w-[52ch] text-sm leading-relaxed text-stone md:mt-20">
              Full case study coming soon — add an intro, application images, and
              an outcome to this project in the Studio.
            </p>
          )}
        </article>

        {next && (
          <div className="container-site relative z-10 mt-24 border-t border-line py-10 md:mt-32">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-faint">
                Next project
              </span>
              <a
                href={`/work/${next.slug}`}
                data-cursor
                className="link-underline font-display text-xl font-medium tracking-tight text-paper transition-colors duration-200 hover:text-accent-soft md:text-3xl"
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
