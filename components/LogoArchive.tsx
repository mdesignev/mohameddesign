import LogoTile from "@/components/LogoTile";
import SectionShell from "@/components/SectionShell";
import type { LogoMark } from "@/data/logoMarks";

export default function LogoArchive({ marks }: { marks: LogoMark[] }) {
  return (
    <SectionShell
      id="archive"
      index="02"
      title="Logo Archive"
      note="Marks shipped"
    >
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4 lg:grid-cols-6">
        {marks.slice(0, 12).map((mark, i) => (
          <LogoTile key={mark.id} mark={mark} order={i + 1} />
        ))}
      </ul>
    </SectionShell>
  );
}
