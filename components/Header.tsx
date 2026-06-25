"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SITE_NAME = "Mohamed Design";
const EMAIL = "me@mohameddesign.com";
const PHONE_DISPLAY = "+20 100 404 4133";
const WHATSAPP_URL = "https://wa.me/201004044133";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Archive", href: "/#archive" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll + ESC-to-close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-line bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between md:h-[76px]">
          <a
            href="/"
            aria-label={SITE_NAME}
            data-cursor
            className="relative z-50 flex items-center gap-2.5 whitespace-nowrap font-display text-base font-medium tracking-tight text-paper md:text-lg"
          >
            <span aria-hidden="true" className="h-2 w-2 bg-accent" />
            <span className="sm:hidden">MD</span>
            <span className="hidden sm:inline">{SITE_NAME}</span>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 sm:flex md:gap-8"
          >
            <ul className="flex items-center gap-6 font-meta text-[0.8125rem] uppercase tracking-[0.08em] text-stone md:gap-8">
              {links.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <a
                    className="link-underline transition-colors duration-200 hover:text-paper"
                    href={link.href}
                    data-cursor
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              data-cursor
              className="rounded-sm border border-line px-4 py-2 font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-paper transition-colors duration-200 hover:border-accent-soft hover:text-accent-soft"
            >
              Contact
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] sm:hidden"
          >
            <span
              className={`block h-px w-6 bg-paper transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-paper transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-paper transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-base px-5 pb-10 pt-24 sm:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="flex items-baseline gap-3 border-b border-line py-5 font-display text-4xl font-medium tracking-[-0.02em] text-paper"
                >
                  <span className="font-meta text-xs text-accent">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="mt-auto flex flex-col gap-3 font-meta text-[0.8125rem] uppercase tracking-[0.06em]"
            >
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline text-paper transition-colors hover:text-accent-soft"
              >
                {EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                dir="ltr"
                className="link-underline text-paper transition-colors hover:text-accent-soft"
              >
                WhatsApp {PHONE_DISPLAY}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
