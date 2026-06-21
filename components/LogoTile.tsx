import type { LogoMark } from "@/data/logoMarks";

export default function LogoTile({
  mark,
  order,
}: {
  mark: LogoMark;
  /** 1-based position in the archive grid, rendered as a system index. */
  order: number;
}) {
  const indexLabel = String(order).padStart(2, "0");

  return (
    <li className="group relative flex aspect-square flex-col bg-paper transition-colors duration-200 hover:bg-tone-1">
      <div className="flex items-center justify-between px-3 pt-2.5">
        <span
          aria-hidden="true"
          className="font-meta text-[11px] text-stone/60 transition-colors duration-200 group-hover:text-accent"
        >
          {indexLabel}
        </span>
        {mark.year != null && (
          <span aria-hidden="true" className="font-meta text-[11px] text-stone/60">
            {mark.year}
          </span>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center">
        {mark.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mark.src}
            alt={`${mark.client} logo mark`}
            className="h-1/2 w-1/2 object-contain"
            loading="lazy"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-display text-4xl font-medium leading-none text-ink md:text-5xl"
          >
            {mark.client.charAt(0)}
          </span>
        )}
      </div>
      <div className="px-3 pb-2.5">
        <span
          aria-hidden="true"
          className="block truncate font-meta text-[11px] uppercase tracking-[0.04em] text-transparent transition-colors duration-200 group-hover:text-ink"
        >
          {mark.client}
        </span>
      </div>
      <span className="sr-only">
        {mark.client}
        {mark.year != null ? `, ${mark.year}` : ""}
      </span>
    </li>
  );
}
