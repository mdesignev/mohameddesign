import SectionShell from "@/components/SectionShell";

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
          <p className="max-w-[28ch] font-display text-2xl font-medium leading-snug tracking-[-0.01em] md:text-[1.75rem]">
            {BIO}
          </p>
          <a href="#contact" className="btn btn-outline mt-10">
            Start Project
          </a>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                className="border-t border-hairline pt-4"
              >
                <p className="font-meta text-[11px] uppercase tracking-[0.06em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[0.9375rem] font-medium">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
