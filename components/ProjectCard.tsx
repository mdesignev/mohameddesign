"use client";

import ParallaxImage from "@/components/motion/ParallaxImage";
import type { Project } from "@/data/projects";

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
    <a href={`/work/${project.slug}`} data-cursor className="group block">
      <div
        className={`relative ${ratioClass} overflow-hidden rounded-sm border border-line bg-surface`}
      >
        <ParallaxImage
          src={project.image}
          alt={`${project.client} — brand identity work`}
          className="h-full w-full"
        >
          {/* Placeholder — construction grid + ghost initial */}
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper/[0.04]" />
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/[0.04]" />
            </div>
            <span
              aria-hidden="true"
              className="font-display text-7xl font-medium text-paper/10 transition-transform duration-700 ease-out group-hover:scale-105 md:text-8xl"
            >
              {project.client.charAt(0)}
            </span>
            <span className="absolute bottom-3 left-4 font-meta text-[11px] uppercase tracking-[0.08em] text-faint">
              Identity
            </span>
          </div>
        </ParallaxImage>

        {/* Hover veil + view cue */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-base/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="font-meta text-[11px] uppercase tracking-[0.12em] text-paper">
            View case
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-paper">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <span
          aria-hidden="true"
          className="absolute left-4 top-3 font-meta text-[11px] text-paper/60"
        >
          {indexLabel}
        </span>
      </div>

      <div className="mt-5 rule-top pt-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-medium leading-none tracking-[-0.01em] text-paper transition-colors duration-200 group-hover:text-accent-soft md:text-[1.875rem]">
            {project.client}
          </h3>
          <span className="shrink-0 font-meta text-[0.8125rem] text-faint transition-colors duration-200 group-hover:text-accent-soft">
            {indexLabel}
          </span>
        </div>
        <p className="mt-2.5 font-meta text-[0.75rem] uppercase tracking-[0.08em] text-stone">
          {project.sector}
          {project.year != null && ` · ${project.year}`}
        </p>
      </div>
    </a>
  );
}
