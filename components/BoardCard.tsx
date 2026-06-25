import type { BrandBoard } from "@/data/brandBoards";

export default function BoardCard({
  board,
  order,
}: {
  board: BrandBoard;
  toneIndex: number;
  /** 1-based position, rendered as a system index. */
  order: number;
}) {
  const indexLabel = String(order).padStart(2, "0");

  return (
    <figure className="group flex aspect-[4/5] flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors duration-300 hover:border-stone/40">
      {/* Top bar — index + year, client name as the title. */}
      <div className="border-b border-line px-4 pb-3 pt-3.5">
        <div className="flex items-center justify-between font-meta text-[11px] text-faint">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            {indexLabel}
          </span>
          {board.year != null && <span>{board.year}</span>}
        </div>
        <h3 className="mt-2 font-display text-2xl font-medium leading-[1.05] tracking-[-0.01em] text-paper transition-colors duration-200 group-hover:text-accent-soft">
          {board.client}
        </h3>
      </div>

      {board.src ? (
        <div className="flex flex-1 items-center justify-center overflow-hidden bg-elevated p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={board.src}
            alt={`${board.client} brand board`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-elevated">
            <span className="glow left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-[0.18]" />
            <span
              aria-hidden="true"
              className="relative font-display text-6xl font-medium text-paper/15 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105 md:text-7xl"
            >
              {board.glyph}
            </span>
          </div>

          {/* System modules — MARK / TYPE / COLOR. */}
          <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
            <div className="flex flex-col gap-2 bg-surface px-3 py-2.5">
              <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-faint">
                Mark
              </span>
              <span
                aria-hidden="true"
                className="font-display text-base font-medium leading-none text-paper"
              >
                {board.glyph}
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-surface px-3 py-2.5">
              <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-faint">
                Type
              </span>
              <span
                aria-hidden="true"
                className="font-display text-base font-medium leading-none text-paper"
              >
                Aa
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-surface px-3 py-2.5">
              <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-faint">
                Color
              </span>
              <div className="flex gap-1" aria-hidden="true">
                {board.palette.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-[1px] ring-1 ring-inset ring-white/10"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer meta strip. */}
      <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
        <span className="font-meta text-[10px] uppercase tracking-[0.12em] text-faint">
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
