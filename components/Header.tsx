"use client";

import { useEffect, useState } from "react";

const SITE_NAME = "Mohamed Design";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Archive", href: "/#archive" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper transition-colors duration-300 ${
        scrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-[72px]">
        <a
          href="/"
          aria-label={SITE_NAME}
          className="flex items-center gap-2.5 whitespace-nowrap font-display text-base font-medium tracking-tight md:text-lg"
        >
          <span aria-hidden="true" className="h-2 w-2 bg-accent" />
          <span aria-hidden="true" className="sm:hidden">
            MD
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            {SITE_NAME}
          </span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 font-meta text-[11px] uppercase tracking-[0.06em] sm:gap-5 sm:text-xs md:gap-7 md:text-[0.8125rem]">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="link-underline transition-colors duration-200 hover:text-accent"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
