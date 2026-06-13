const EMAIL = "hello@mohameddesign.com";
const SITE_NAME = "Mohamed Design";

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/mohameddesign" },
  { label: "Behance", href: "https://behance.net/mohameddesign" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohameddesign" },
];

/** The single, subtle personal signature — footer only. Set to null to drop the Arabic. */
const ARABIC_SIGNATURE: string | null = "محمد";

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 23V9l8 10 8-10v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-20 bg-ink text-paper">
      <div className="container-site pb-10 pt-[4.5rem] md:pb-12 md:pt-28">
        <div className="border-t-2 border-paper pt-4">
          <h2 className="flex items-baseline gap-3">
            <span className="font-meta text-[0.8125rem] text-accent-soft">
              05
            </span>
            <span className="font-display text-lg font-medium uppercase tracking-[0.08em]">
              Contact
            </span>
          </h2>
        </div>
        <p className="mt-10 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.01em]">
          Let&apos;s build your mark.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="link-underline mt-6 inline-block font-meta text-lg text-accent-soft md:text-xl"
        >
          {EMAIL}
        </a>
        <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-stone">
          Logo design, brand identity, and brand boards — every project
          delivered as professional, production-ready files.
        </p>
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-6 font-meta text-[0.8125rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-5 uppercase tracking-[0.06em]">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors duration-300 hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2">
            <Monogram className="h-4 w-4 text-paper/80" />
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
    </footer>
  );
}
