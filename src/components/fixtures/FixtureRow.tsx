import type { Fixture } from "@/content/types";
import { formatFixtureDate } from "@/lib/utils";

/**
 * Wrapping flex, not fixed columns — rows reflow on narrow screens rather than
 * clipping. The handoff is explicit about this.
 */
export function FixtureRow({ fixture }: { fixture: Fixture }) {
  const { result } = fixture;

  return (
    <li className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-sand py-5 last:border-b-0">
      <span className="label-voice w-full text-[13px] font-bold text-mustard-ink">
        {fixture.competition} · {fixture.ageGroup.toUpperCase()}
        {fixture.placeholder && (
          <span className="ml-2 font-semibold text-ink-body/50">Placeholder</span>
        )}
      </span>

      {result && (
        <span className="font-display text-[28px] leading-none text-ink-body">
          {result.scored} – {result.conceded}
        </span>
      )}

      <span className="font-display text-[20px] uppercase leading-tight">
        Rhynies Stars{" "}
        <span className="text-ink-body/60">{result ? "beat" : "v"}</span> {fixture.opponent}
      </span>

      <span className="label-voice ml-auto text-[14px] font-semibold text-ink-body/70">
        {formatFixtureDate(fixture.date)}
        {fixture.time && ` · ${fixture.time}`} · {fixture.venue}
      </span>

      {result?.note && (
        <p className="w-full text-[15px] italic text-ink-body/70">{result.note}</p>
      )}
    </li>
  );
}
