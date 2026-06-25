import Reveal from "@/components/motion/Reveal";

export default function SectionShell({
  id,
  index,
  title,
  cta,
  note,
  children,
}: {
  id: string;
  index: string;
  title: string;
  cta?: { label: string; href: string };
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28 xl:py-36">
      <div className="container-site">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rule-top pt-4 md:mb-16">
            <h2 className="flex items-baseline gap-3">
              <span className="font-meta text-[0.8125rem] text-accent">
                {index}
              </span>
              <span className="font-display text-base font-medium uppercase tracking-[0.12em] text-paper md:text-lg">
                {title}
              </span>
            </h2>
            {cta && (
              <a
                href={cta.href}
                data-cursor
                className="link-underline font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-stone transition-colors duration-200 hover:text-paper"
              >
                {cta.label}
              </a>
            )}
            {note && !cta && (
              <span className="font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-faint">
                {note}
              </span>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
