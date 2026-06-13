import type { Project } from "@/data/projects";

const toneClasses: Record<Project["tone"], string> = {
  1: "bg-tone-1",
  2: "bg-tone-2",
  3: "bg-tone-3",
};

export default function ProjectCard({
  project,
  ratio,
  order,
}: {
  project: Project;
  ratio: "16/9" | "4/3";
  /** 1-based position in the archive, rendered as a quiet system index. */
  order: number;
}) {
  const ratioClass = ratio === "16/9" ? "aspect-video" : "aspect-[4/3]";
  const indexLabel = String(order).padStart(2, "0");

  return (
    <article className="group">
      {project.image ? (
        <div className={`${ratioClass} overflow-hidden border border-hairline`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.client} — brand identity work`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div
          className={`relative ${ratioClass} ${toneClasses[project.tone]} overflow-hidden border border-hairline`}
        >
          {/* Light construction grid — system lines, not decoration. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/[0.05]" />
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/[0.05]" />
          </div>
          <span
            aria-hidden="true"
            className="absolute left-4 top-3 font-meta text-[11px] text-stone/60"
          >
            {indexLabel}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-4 top-3 font-meta text-[11px] text-stone/50"
          >
            {ratio === "16/9" ? "16:9" : "4:3"}
          </span>
          <div className="flex h-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <span
              aria-hidden="true"
              className="font-display text-7xl font-medium text-ink/20 md:text-8xl"
            >
              {project.client.charAt(0)}
            </span>
          </div>
          <span className="absolute bottom-3 left-4 font-meta text-[11px] uppercase tracking-[0.08em] text-stone/50">
            Identity
          </span>
        </div>
      )}
      <div className="mt-4 border-t-2 border-ink pt-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-medium leading-none tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent md:text-[1.875rem]">
            {project.client}
          </h3>
          <span className="shrink-0 font-meta text-[0.8125rem] text-stone transition-colors duration-200 group-hover:text-accent">
            {indexLabel}
          </span>
        </div>
        <p className="mt-2.5 font-meta text-[0.75rem] uppercase tracking-[0.08em] text-stone">
          {project.sector} · {project.year}
        </p>
      </div>
    </article>
  );
}
