"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  wrap,
} from "framer-motion";

/**
 * Kinetic type strip. Scrolls continuously, speeds up and reverses
 * direction with scroll velocity — the signature awwwards motion.
 * Reduced motion renders a single static row.
 */
export default function Marquee({
  items,
  baseVelocity = 2,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const directionFactor = useRef(1);

  // Each copy is one-third of the track; wrap keeps the loop seamless.
  const x = useTransform(baseX, (v) => `${wrap(-33.333, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const Row = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <span
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
    >
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-10 md:gap-16">
          <span className="font-display text-[clamp(2.25rem,7vw,5.5rem)] font-medium uppercase leading-none tracking-[-0.02em] text-paper/90">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rotate-45 bg-accent md:h-3 md:w-3"
          />
        </span>
      ))}
    </span>
  );

  if (reduce) {
    return (
      <div className="flex flex-nowrap overflow-hidden whitespace-nowrap py-2">
        <Row />
      </div>
    );
  }

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap py-2">
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        <Row />
        <Row ariaHidden />
        <Row ariaHidden />
      </motion.div>
    </div>
  );
}
