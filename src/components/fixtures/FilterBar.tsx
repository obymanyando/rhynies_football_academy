import type { AgeGroupId } from "@/content/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  groups: { id: AgeGroupId | "all"; label: string }[];
  selected: AgeGroupId | "all";
  onSelect: (id: AgeGroupId | "all") => void;
}

/**
 * Sticks directly below the header.
 *
 * `top` derives from --header-total-h, never from a literal. Note it is the
 * TOTAL header height, not --header-h: the header is its 84px nav row plus the
 * 2px mustard rule, and offsetting by the row alone rides up over the rule.
 * The two getting out of step is a bug this design has already had twice.
 */
export function FilterBar({ groups, selected, onSelect }: FilterBarProps) {
  return (
    <div
      className="sticky z-30 border-b border-sand bg-cream/95 backdrop-blur"
      style={{ top: "var(--header-total-h)" }}
    >
      <div className="content-column flex flex-wrap items-center gap-2 py-4">
        <span className="label-voice mr-2 text-[13px] font-bold text-ink-body/60">Age group</span>
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(g.id)}
            aria-pressed={selected === g.id}
            className={cn(
              "label-voice rounded-full px-4 py-2 text-[14px] font-bold transition-colors",
              selected === g.id
                ? "bg-mustard text-ink"
                : "bg-cream-tint text-ink-body/80 hover:bg-mustard-bright hover:text-ink",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>
  );
}
