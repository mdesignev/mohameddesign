import BoardCard from "@/components/BoardCard";
import SectionShell from "@/components/SectionShell";
import { brandBoards } from "@/data/brandBoards";

export default function BrandBoards() {
  return (
    <SectionShell
      id="boards"
      index="04"
      title="Brand boards"
      note="One-page identity summaries"
    >
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {brandBoards.slice(0, 3).map((board, i) => (
          <BoardCard key={board.id} board={board} toneIndex={i} order={i + 1} />
        ))}
      </div>
    </SectionShell>
  );
}
