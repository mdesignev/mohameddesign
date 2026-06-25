import ProjectCard from "@/components/ProjectCard";
import SectionShell from "@/components/SectionShell";
import Reveal from "@/components/motion/Reveal";
import type { Project } from "@/data/projects";

type Row = { type: "full" | "pair"; items: Project[] };

function buildRows(items: Project[]): Row[] {
  const rows: Row[] = [];
  let pair: Project[] = [];
  for (const project of items) {
    if (project.layout === "full") {
      if (pair.length) {
        rows.push({ type: "pair", items: pair });
        pair = [];
      }
      rows.push({ type: "full", items: [project] });
    } else {
      pair.push(project);
      if (pair.length === 2) {
        rows.push({ type: "pair", items: pair });
        pair = [];
      }
    }
  }
  if (pair.length) rows.push({ type: "pair", items: pair });
  return rows;
}

export default function SelectedWork({ projects }: { projects: Project[] }) {
  const rows = buildRows(projects);
  const orderOf = (project: Project) => projects.indexOf(project) + 1;

  return (
    <SectionShell
      id="work"
      index="01"
      title="Selected Work"
      cta={{ label: "Start a Project →", href: "#contact" }}
    >
      <div className="flex flex-col gap-20 md:gap-28">
        {rows.map((row) =>
          row.type === "full" ? (
            <Reveal key={row.items[0].slug}>
              <ProjectCard
                project={row.items[0]}
                ratio="16/9"
                order={orderOf(row.items[0])}
              />
            </Reveal>
          ) : (
            <div
              key={row.items.map((p) => p.slug).join("-")}
              className="grid gap-x-8 gap-y-20 md:grid-cols-2"
            >
              {row.items.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.08}>
                  <ProjectCard
                    project={project}
                    ratio="4/3"
                    order={orderOf(project)}
                  />
                </Reveal>
              ))}
            </div>
          ),
        )}
      </div>
    </SectionShell>
  );
}
