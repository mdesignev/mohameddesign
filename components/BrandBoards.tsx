import BoardCard from "@/components/BoardCard";
import SectionShell from "@/components/SectionShell";
import Reveal from "@/components/motion/Reveal";
import type { BrandBoard } from "@/data/brandBoards";

export default function BrandBoards({ boards }: { boards: BrandBoard[] }) {
  return (
    <SectionShell
      id="boards"
      index="04"
      title="Brand Boards"
      note="One-page identity summaries"
    >
      <div className="grid gap-8 sm:grid-cols-3">
        {boards.slice(0, 3).map((board, i) => (
          <Reveal key={board.id} delay={i * 0.1}>
            <BoardCard board={board} toneIndex={i} order={i + 1} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
