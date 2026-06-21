import type { BrandBoard } from "@/data/brandBoards";

const toneClasses = ["bg-tone-1", "bg-tone-2", "bg-tone-3"];

export default function BoardCard({
  board,
  toneIndex,
  order,
}: {
  board: BrandBoard;
  toneIndex: number;
  /** 1-based position, rendered as a system index. */
  order: number;
}) {
  const indexLabel = String(order).padStart(2, "0");
  const tone = toneClasses[toneIndex % 3];

  // Both modes share the frame, top bar, and footer meta strip. Placeholder
  // mode fills the main field with a glyph + system modules; image mode fills
  // it with the finished board, kept as a framed preview.
  return (
    <figure className="group flex aspect-[4/5] flex-col border border-hairline bg-paper">
      {/* 1. Top bar — order + year metadata, client name as the main title. */}
      <div className="border-b border-hairline px-3.5 pb-3 pt-3">
        <div className="flex items-center justify-between font-meta text-[11px] text-stone">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            {indexLabel}
          </span>
          {board.year != null && <span>{board.year}</span>}
        </div>
        <h3 className="mt-2 font-display text-2xl font-medium leading-[1.05] tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent">
          {board.client}
        </h3>
      </div>

      {board.src ? (
        // 2a. Main field — finished board, contained on a matte so the whole
        // composition is preserved; fixed-height box keeps it ratio-safe.
        <div className={`flex flex-1 items-center justify-center overflow-hidden p-3 ${tone}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={board.src}
            alt={`${board.client} brand board`}
            loading="lazy"
            className="h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <>
          {/* 2b. Main field — large mark preview, strong whitespace. */}
          <div className={`flex flex-1 items-center justify-center overflow-hidden ${tone}`}>
            <span
              aria-hidden="true"
              className="font-display text-6xl font-medium text-ink/20 md:text-7xl motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
            >
              {board.glyph}
            </span>
          </div>

          {/* 3 + 4. System modules — MARK / TYPE / COLOR, with the palette chips. */}
          <div className="grid grid-cols-3 gap-px border-t border-hairline bg-hairline">
            <div className="flex flex-col gap-2 bg-paper px-3 py-2.5">
              <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-stone">
                Mark
              </span>
              <span
                aria-hidden="true"
                className="font-display text-base font-medium leading-none"
              >
                {board.glyph}
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-paper px-3 py-2.5">
              <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-stone">
                Type
              </span>
              <span
                aria-hidden="true"
                className="font-display text-base font-medium leading-none"
              >
                Aa
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-paper px-3 py-2.5">
              <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-stone">
                Color
              </span>
              <div className="flex gap-1" aria-hidden="true">
                {board.palette.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 ring-1 ring-inset ring-ink/10"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 5. Footer meta strip. */}
      <div className="flex items-center justify-between border-t border-hairline px-3.5 py-2">
        <span className="font-meta text-[10px] uppercase tracking-[0.12em] text-stone">
          Identity system
        </span>
        <span className="font-meta text-[10px] uppercase tracking-[0.12em] text-stone/70">
          Brand board
        </span>
      </div>

      <figcaption className="sr-only">
        {board.client}, identity system
        {board.year != null ? `, ${board.year}` : ""}
      </figcaption>
    </figure>
  );
}
