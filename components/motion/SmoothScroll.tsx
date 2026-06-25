"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Site-wide inertia scrolling (Lenis). Disabled entirely under
 * prefers-reduced-motion, where native scrolling takes over.
 * Also upgrades in-page hash links to smooth, eased scrolls.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href) return;
      // Match "#id" and "/#id" (cross-page anchors back to home).
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : "";
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
