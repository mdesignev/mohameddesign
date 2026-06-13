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
    <section id={id} className="scroll-mt-20 py-[4.5rem] md:py-24 xl:py-36">
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-4 md:mb-14">
          <h2 className="flex items-baseline gap-3">
            <span className="font-meta text-[0.8125rem] text-accent">
              {index}
            </span>
            <span className="font-display text-lg font-medium uppercase tracking-[0.08em]">
              {title}
            </span>
          </h2>
          {cta && (
            <a
              href={cta.href}
              className="link-underline font-meta text-[0.8125rem] uppercase tracking-[0.06em] transition-colors duration-200 hover:text-accent"
            >
              {cta.label}
            </a>
          )}
          {note && !cta && (
            <span className="font-meta text-[0.8125rem] uppercase tracking-[0.06em] text-stone">
              {note}
            </span>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
