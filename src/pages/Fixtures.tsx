import { useMemo, useState } from "react";

import { FilterBar } from "@/components/fixtures/FilterBar";
import { FixtureRow } from "@/components/fixtures/FixtureRow";
import { PageHeader } from "@/components/common/PageHeader";
import { PlaceholderNote } from "@/components/common/PlaceholderNote";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { ageGroups } from "@/content/academy";
import { recentResults, upcomingFixtures } from "@/content/fixtures";
import type { AgeGroupId } from "@/content/types";

// U12 plays league football without being a squad in the pathway, so it is not
// in `ageGroups` — but it still needs a filter. Merged and sorted by age so the
// row reads U7, U9, U11, U12, U13, U15 rather than leaving U12 stranded at the end.
const filters: { id: AgeGroupId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  ...[...ageGroups.map((g) => ({ id: g.id, label: g.label })), { id: "u12" as const, label: "U12" }].sort(
    (a, b) => Number(a.label.slice(1)) - Number(b.label.slice(1)),
  ),
];

export default function Fixtures() {
  const [filter, setFilter] = useState<AgeGroupId | "all">("all");

  const upcoming = useMemo(
    () => upcomingFixtures().filter((f) => filter === "all" || f.ageGroup === filter),
    [filter],
  );
  const results = useMemo(
    () => recentResults().filter((f) => filter === "all" || f.ageGroup === filter),
    [filter],
  );

  return (
    <>
      <SEO
        title="Fixtures & Results"
        description="Upcoming fixtures and recent results for Rhynies Stars age groups in the KSSR and MTC HopSol leagues."
      />

      <Section className="pb-8">
        <PageHeader kicker="Fixtures & results" title="Matchday" />
        <PlaceholderNote>
          The fixtures and results below are placeholders while the season calendar is confirmed.
          Send us the real dates and we will drop them straight in.
        </PlaceholderNote>
      </Section>

      <FilterBar groups={filters} selected={filter} onSelect={setFilter} />

      <Section className="pt-10">
        <h2 className="text-section">Upcoming fixtures</h2>
        {upcoming.length ? (
          <ul className="mt-6">
            {upcoming.map((f) => (
              <FixtureRow key={f.id} fixture={f} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-[17px] text-ink-body/70">
            No fixtures listed for this age group yet.
          </p>
        )}
      </Section>

      <Section variant="tint" className="pt-0">
        <h2 className="text-section">Recent results</h2>
        {results.length ? (
          <ul className="mt-6">
            {results.map((f) => (
              <FixtureRow key={f.id} fixture={f} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-[17px] text-ink-body/70">
            No results listed for this age group yet.
          </p>
        )}
      </Section>
    </>
  );
}
