"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { LogoMark } from "@/data/logoMarks";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LogoTile({
  mark,
  order,
}: {
  mark: LogoMark;
  /** 1-based position in the archive grid, rendered as a system index. */
  order: number;
}) {
  const reduce = useReducedMotion();
  const indexLabel = String(order).padStart(2, "0");
  const ref = useRef<HTMLLIElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.li
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: ((order - 1) % 6) * 0.05, ease: EASE }}
      className="group relative flex aspect-square flex-col bg-surface transition-colors duration-300 hover:bg-elevated"
    >
      <div className="flex items-center justify-between px-3 pt-2.5">
        <span
          aria-hidden="true"
          className="font-meta text-[11px] text-faint transition-colors duration-200 group-hover:text-accent-soft"
        >
          {indexLabel}
        </span>
        {mark.year != null && (
          <span aria-hidden="true" className="font-meta text-[11px] text-faint">
            {mark.year}
          </span>
        )}
      </div>

      <motion.div
        style={{ x, y }}
        className="flex flex-1 items-center justify-center"
      >
        {mark.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mark.src}
            alt={`${mark.client} logo mark`}
            className="h-1/2 w-1/2 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-display text-4xl font-medium leading-none text-paper/70 transition-colors duration-300 group-hover:text-paper md:text-5xl"
          >
            {mark.client.charAt(0)}
          </span>
        )}
      </motion.div>

      <div className="px-3 pb-2.5">
        <span
          aria-hidden="true"
          className="block truncate font-meta text-[11px] uppercase tracking-[0.04em] text-transparent transition-colors duration-300 group-hover:text-stone"
        >
          {mark.client}
        </span>
      </div>
      <span className="sr-only">
        {mark.client}
        {mark.year != null ? `, ${mark.year}` : ""}
      </span>
    </motion.li>
  );
}
