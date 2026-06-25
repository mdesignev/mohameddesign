"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Desktop-only accent cursor. A small ring that trails the pointer and
 * swells over interactive elements. Rendered only for fine pointers and
 * when motion is allowed — touch and reduced-motion users never see it,
 * and it never intercepts pointer events.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor]",
      );
      setActive(!!t);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        animate={{
          width: active ? 46 : 14,
          height: active ? 46 : 14,
          opacity: visible ? 1 : 0,
          backgroundColor: active
            ? "rgba(255,255,255,0)"
            : "rgba(255,255,255,1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
