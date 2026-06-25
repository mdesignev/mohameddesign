import SectionShell from "@/components/SectionShell";
import Reveal from "@/components/motion/Reveal";

const BIO =
  "Mohamed Design creates logo and brand identity systems for businesses that need clear, distinctive, and professionally delivered visual assets.";

const SERVICES = [
  {
    name: "Logo design",
    desc: "Distinctive marks built to last decades, not seasons.",
  },
  {
    name: "Brand identity",
    desc: "Complete visual systems — typography, color, and clear usage rules.",
  },
  {
    name: "Brand boards",
    desc: "One-page identity summaries, ready to share with any team.",
  },
  {
    name: "Final delivery",
    desc: "Professional, production-ready files in every format you need.",
  },
];

export default function AboutTeaser() {
  return (
    <SectionShell id="about" index="03" title="About">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Reveal>
            <p className="max-w-[26ch] font-display text-[1.75rem] font-medium leading-snug tracking-[-0.01em] text-paper md:text-[2.25rem]">
              {BIO}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#contact" className="btn btn-outline mt-10" data-cursor>
              Start a Project
            </a>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <Reveal
                key={service.name}
                delay={(i % 2) * 0.08}
                className="bg-surface p-5 transition-colors duration-300 hover:bg-elevated md:p-6"
              >
                <p className="font-meta text-[11px] uppercase tracking-[0.1em] text-accent-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-base font-medium text-paper">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {service.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
