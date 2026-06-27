"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import type { HomepageContent } from "@/data/homepage";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Self-drawing ME monogram — strokes in, then the solid fills fade up. */
function MonogramDraw({ reduce }: { reduce: boolean | null }) {
  const dPath =
    "M76.8,7.25v135.51c38.35,0,69.43-30.33,69.43-67.75S115.15,7.25,76.8,7.25Z";
  const mPath =
    "M3.76 27.01 L3.76 120.88 L52.99 120.88 L52.99 27.01 L28.38 63.16 Z";

  if (reduce) {
    return (
      <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
        <path d={dPath} fill="currentColor" />
        <path d={mPath} fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
      <motion.path
        d={dPath}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.3, ease: EASE }}
      />
      <motion.path
        d={mPath}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.55, ease: EASE }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.7, ease: "easeOut" }}
      >
        <path d={dPath} fill="currentColor" />
        <path d={mPath} fill="currentColor" />
      </motion.g>
    </svg>
  );
}

export default function Hero({
  content,
}: {
  content: HomepageContent["hero"];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Headline mask-up; delays land just after the loader wipe (~1.15s).
  const line: Variants = {
    hidden: { y: reduce ? 0 : "110%" },
    show: (i: number) => ({
      y: 0,
      transition: { duration: 1, delay: 1.2 + i * 0.12, ease: EASE },
    }),
  };
  const up: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 1.45 + i * 0.12, ease: EASE },
    }),
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Parallax accent light + faint construction grid */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduce ? undefined : glowY }}
        className="pointer-events-none absolute inset-0"
      >
        <span className="glow right-[10%] top-[15%] h-[34vw] w-[34vw] max-h-[420px] max-w-[420px] opacity-[0.14]" />
        <span className="glow left-[4%] bottom-[8%] h-[22vw] w-[22vw] max-h-[260px] max-w-[260px] opacity-[0.09]" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-soft) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage:
            "radial-gradient(circle at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 40%, black, transparent 75%)",
        }}
      />

      {/* Ghost monogram that draws itself */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-1/2 hidden h-[74vmin] w-[74vmin] max-h-[640px] max-w-[640px] -translate-y-1/2 text-paper/[0.05] lg:block"
      >
        <MonogramDraw reduce={reduce} />
      </div>

      <motion.div
        style={{ y: reduce ? undefined : contentY, opacity: reduce ? undefined : fade }}
        className="container-site relative z-10 w-full pt-28 pb-20 md:pt-32"
      >
        <motion.p
          className="meta-label flex items-center gap-2.5 text-paper"
          variants={up}
          custom={0}
          initial="hidden"
          animate="show"
        >
          <span aria-hidden="true" className="h-2 w-2 bg-accent" />
          <span>
            {content.eyebrowBrand}{" "}
            <span className="text-faint">. {content.eyebrowLocation}</span>
          </span>
        </motion.p>

        <h1 className="mt-7 max-w-[15ch] font-display text-[clamp(2.5rem,8.4vw,8rem)] font-medium leading-[1.0] tracking-[-0.02em]">
          {content.headlineLines.map((text, i) => (
            <span key={text} className="block overflow-hidden pb-[0.09em]">
              <motion.span
                className="block"
                variants={line}
                custom={i}
                initial="hidden"
                animate="show"
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-[52ch] text-lg leading-relaxed text-stone md:text-xl"
          variants={up}
          custom={2}
          initial="hidden"
          animate="show"
        >
          {content.supportingLine}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          variants={up}
          custom={3}
          initial="hidden"
          animate="show"
        >
          <a href="#work" className="btn btn-solid" data-cursor>
            View Work
          </a>
          <a href="#contact" className="btn btn-outline" data-cursor>
            Start a Project
          </a>
        </motion.div>

        <motion.dl
          className="mt-16 grid max-w-2xl gap-px rule-top border-line sm:grid-cols-2"
          variants={up}
          custom={4}
          initial="hidden"
          animate="show"
        >
          <div className="py-4 sm:pr-8">
            <dt className="font-meta text-[11px] uppercase tracking-[0.1em] text-faint">
              Services
            </dt>
            <dd className="mt-1.5 text-sm text-paper">{content.services}</dd>
          </div>
          <div className="border-t border-line py-4 sm:border-l sm:border-t-0 sm:border-line sm:pl-8">
            <dt className="font-meta text-[11px] uppercase tracking-[0.1em] text-faint">
              Status
            </dt>
            <dd className="mt-1.5 flex items-center gap-2 text-sm text-paper">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {content.status}
            </dd>
          </div>
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <span className="font-meta text-[10px] uppercase tracking-[0.25em] text-faint">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent-soft"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
      </motion.div>
    </section>
  );
}
