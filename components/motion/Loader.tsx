"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Brief cinematic intro. Covers the viewport for ~1.1s while the
 * wordmark sets and an accent line fills, then wipes upward to reveal
 * the page. Skipped entirely under reduced motion. Content renders in
 * the DOM beneath it, so crawlers and no-JS clients are unaffected.
 */
export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1150);
    return () => clearTimeout(t);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-display text-2xl font-medium uppercase tracking-[0.35em] text-paper"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            MDesign
          </motion.span>
          <div className="mt-6 h-px w-40 overflow-hidden bg-line">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="mt-5 font-meta text-[11px] uppercase tracking-[0.2em] text-faint">
            Brand Identity . Egypt
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
