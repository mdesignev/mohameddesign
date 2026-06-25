import Reveal from "@/components/motion/Reveal";

const EMAIL = "me@mohameddesign.com";
const SITE_NAME = "Mohamed Design";

const PHONE_DISPLAY = "+20 100 404 4133";
const PHONE_TEL = "+201004044133";
const WHATSAPP_URL = "https://wa.me/201004044133";

const SOCIAL = [
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Instagram", href: "https://instagram.com/mdesignev" },
  { label: "Behance", href: "https://behance.net/mdesignev" },
];

/** The single, subtle personal signature — footer only. Set to null to drop the Arabic. */
const ARABIC_SIGNATURE: string | null = "محمد";

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 150"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M76.8,7.25v135.51c38.35,0,69.43-30.33,69.43-67.75S115.15,7.25,76.8,7.25Z" />
      <polygon points="3.76 27.01 3.76 120.88 52.99 120.88 52.99 27.01 28.38 63.16 3.76 27.01" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line bg-base">
      {/* Ambient accent + giant ghost wordmark */}
      <span aria-hidden="true" className="glow left-1/2 top-0 h-[30vw] w-[30vw] max-h-[360px] max-w-[360px] -translate-x-1/2 opacity-[0.12]" />

      <div className="container-site relative z-10 pb-12 pt-24 md:pb-14 md:pt-32">
        <Reveal>
          <p className="meta-label flex items-center gap-2.5 text-accent-soft">
            <span aria-hidden="true" className="h-2 w-2 bg-accent" />
            05 — Contact
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-paper">
            Let&apos;s build your mark.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="font-meta text-[11px] uppercase tracking-[0.12em] text-faint">
                Email
              </p>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor
                className="link-underline mt-2 inline-block font-display text-lg text-paper md:text-2xl"
              >
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="font-meta text-[11px] uppercase tracking-[0.12em] text-faint">
                Phone · WhatsApp
              </p>
              <a
                href={`tel:${PHONE_TEL}`}
                data-cursor
                dir="ltr"
                className="link-underline mt-2 inline-block font-display text-lg text-paper md:text-2xl"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="mt-3 inline-flex items-center gap-2 rounded-sm border border-line px-3 py-1.5 font-meta text-[11px] uppercase tracking-[0.08em] text-paper transition-colors duration-200 hover:border-accent-soft hover:text-accent-soft"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.05-.97.24-3.27-.68-2.76-1.09-4.5-3.92-4.64-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27a1 1 0 0 1 .72-.34h.52c.17 0 .4-.06.61.47.24.58.81 2 .88 2.14.07.14.12.31.02.49-.27.55-.56.53-.76.91-.14.27-.31.42-.16.69.15.27.68 1.12 1.46 1.81 1 .89 1.85 1.17 2.12 1.31.27.14.42.12.58-.07.18-.21.66-.77.84-1.03.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.45.2.51.31.07.11.07.62-.17 1.29Z" />
                </svg>
                <span dir="ltr">WhatsApp {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-[52ch] text-sm leading-relaxed text-stone">
            Logo design, brand identity, and brand boards — every project
            delivered as professional, production-ready files.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-6 font-meta text-[0.8125rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-6 uppercase tracking-[0.06em]">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  data-cursor
                  className="link-underline transition-colors duration-200 hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-faint">
            <Monogram className="h-4 w-4 text-paper/70" />
            <span>
              {SITE_NAME}
              {ARABIC_SIGNATURE && (
                <>
                  {" — "}
                  <span lang="ar" dir="rtl">
                    {ARABIC_SIGNATURE}
                  </span>
                </>
              )}
              {" · © "}
              {year}
            </span>
          </p>
        </div>
      </div>

      {/* Oversized brand wordmark, clipped at the baseline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 -mb-[2vw] select-none overflow-hidden"
      >
        <span className="block translate-y-[18%] text-center font-display text-[24vw] font-medium leading-none tracking-[-0.04em] text-paper/[0.035]">
          MDESIGN
        </span>
      </div>
    </footer>
  );
}
