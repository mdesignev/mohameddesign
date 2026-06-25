"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered entrance. Fades + lifts content once it enters the
 * viewport. `mask` clips the content so lines rise from behind a hard
 * edge (used for big headlines). Reduced-motion renders content static.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.85,
  once = true,
  mask = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  mask?: boolean;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, delay, ease: EASE } },
  };

  if (mask) {
    return (
      <span className={`block overflow-hidden ${className ?? ""}`}>
        <MotionTag
          initial="hidden"
          whileInView="show"
          viewport={{ once, margin: "0px 0px -12% 0px" }}
          variants={variants}
        >
          {children}
        </MotionTag>
      </span>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
