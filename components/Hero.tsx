import { getCounts } from "@/sanity/fetch";

const EYEBROW = "Mohamed Design";
const HEADLINE = "Logo & Brand Identity Systems";
const SUPPORTING_LINE =
  "Sharp, modern identity work built for brands that need clarity, structure, and presence.";

const pad = (n: number) => String(n).padStart(2, "0");

export default async function Hero() {
  const counts = await getCounts();
  return (
    <section id="top">
      <div className="container-site flex min-h-[70svh] flex-col justify-center pt-16 md:pt-20">
        <p className="meta-label hero-fade flex items-center gap-2.5 text-ink">
          <span aria-hidden="true" className="h-2 w-2 bg-accent" />
          {EYEBROW}
        </p>
        <h1
          className="hero-fade mt-8 max-w-[1000px] font-display text-[clamp(2.75rem,6.5vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.02em]"
          style={{ animationDelay: "120ms" }}
        >
          {HEADLINE}
        </h1>
        <p
          className="hero-fade mt-7 max-w-[52ch] text-lg leading-relaxed text-stone md:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          {SUPPORTING_LINE}
        </p>
        <div
          className="hero-fade mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "360ms" }}
        >
          <a href="#work" className="btn btn-solid">
            View Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Start Project
          </a>
        </div>
        <div
          className="hero-fade mt-16 grid border-t border-hairline sm:grid-cols-3 md:mt-20"
          style={{ animationDelay: "480ms" }}
        >
          <div className="border-b border-hairline py-4 sm:border-b-0 sm:pr-6">
            <p className="font-meta text-[11px] uppercase tracking-[0.06em] text-stone">
              Services
            </p>
            <p className="mt-1 text-sm">
              Logo · Identity · Boards · Delivery
            </p>
          </div>
          <div className="border-b border-hairline py-4 sm:border-b-0 sm:border-l sm:border-hairline sm:px-6">
            <p className="font-meta text-[11px] uppercase tracking-[0.06em] text-stone">
              Index
            </p>
            <p className="mt-1 text-sm">
              {pad(counts.projects)} projects · {pad(counts.marks)} marks ·{" "}
              {pad(counts.boards)} boards
            </p>
          </div>
          <div className="py-4 sm:border-l sm:border-hairline sm:pl-6">
            <p className="font-meta text-[11px] uppercase tracking-[0.06em] text-stone">
              Status
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-accent"
              />
              Available for new projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
