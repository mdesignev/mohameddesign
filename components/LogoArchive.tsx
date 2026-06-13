import LogoTile from "@/components/LogoTile";
import SectionShell from "@/components/SectionShell";
import { logoMarks } from "@/data/logoMarks";

export default function LogoArchive() {
  return (
    <SectionShell
      id="archive"
      index="02"
      title="Logo archive"
      note="Full archive soon"
    >
      <ul className="grid grid-cols-3 gap-px border border-hairline bg-hairline sm:grid-cols-4 lg:grid-cols-6">
        {logoMarks.slice(0, 12).map((mark, i) => (
          <LogoTile key={mark.id} mark={mark} order={i + 1} />
        ))}
      </ul>
    </SectionShell>
  );
}
