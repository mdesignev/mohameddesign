import ProjectCard from "@/components/ProjectCard";
import SectionShell from "@/components/SectionShell";
import { projects, type Project } from "@/data/projects";

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

export default function SelectedWork() {
  const rows = buildRows(projects);
  const orderOf = (project: Project) => projects.indexOf(project) + 1;

  return (
    <SectionShell
      id="work"
      index="01"
      title="Selected work"
      cta={{ label: "Start Project →", href: "#contact" }}
    >
      <div className="flex flex-col gap-16 md:gap-24">
        {rows.map((row) =>
          row.type === "full" ? (
            <ProjectCard
              key={row.items[0].slug}
              project={row.items[0]}
              ratio="16/9"
              order={orderOf(row.items[0])}
            />
          ) : (
            <div
              key={row.items.map((p) => p.slug).join("-")}
              className="grid gap-x-6 gap-y-16 md:grid-cols-2"
            >
              {row.items.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  ratio="4/3"
                  order={orderOf(project)}
                />
              ))}
            </div>
          ),
        )}
      </div>
    </SectionShell>
  );
}
