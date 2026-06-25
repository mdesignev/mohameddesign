"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Image that drifts vertically as the frame passes through the viewport.
 * The image is over-scaled so the drift never exposes an edge. Reduced
 * motion pins it static. Placeholder children render when there is no src.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  amount = 6,
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  amount?: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { y, scale: 1.16 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        children
      )}
    </div>
  );
}
