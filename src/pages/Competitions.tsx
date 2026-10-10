import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { leagueEntries, leagueEntriesFrom2027 } from "@/content/academy";

export default function Competitions() {
  return (
    <>
      <SEO
        title="Competitions"
        description="Rhynies Stars competes in the Khomas Schools Sport Region League and the MTC HopSol Youth Soccer League."
      />

      <Section>
        <PageHeader
          kicker="Competitions"
          title="A competitive football pathway"
          lead="Rhynies Stars provides players with opportunities to participate in organised football competitions that support both player development and competitive growth."
        />
      </Section>

      <Section variant="tint" className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-md border border-sand bg-white p-8">
            <p className="label-voice text-[13px] font-bold text-mustard-ink">
              Regional schools football
            </p>
            <h2 className="mt-3 font-display text-[24px] uppercase leading-tight">
              Khomas Schools Sport Region (KSSR) League
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-body/80">
              Through our affiliation with Van Rhyn Primary School, players participate in regional
              school football competitions that promote sporting excellence, teamwork and school
              pride.
            </p>
          </article>

          <article className="rounded-md border border-sand bg-white p-8">
            <p className="label-voice text-[13px] font-bold text-mustard-ink">
              National youth league
            </p>
            <h2 className="mt-3 font-display text-[24px] uppercase leading-tight">
              MTC HopSol Youth Soccer League
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-body/80">
              One of Namibia's most recognised youth football development competitions.
              Participation gives players valuable competitive experience and exposure to
              structured development opportunities.
            </p>
            <div className="mt-6 border-t border-sand pt-5">
              <p className="label-voice text-[13px] font-semibold text-ink-body/70">Entered</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {leagueEntries.map((g) => (
                  <li
                    key={g}
                    className="label-voice rounded-full bg-cream-tint px-4 py-2 text-[14px] font-bold text-ink"
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Section>

      <Section variant="ink">
        <p className="label-voice text-[14px] font-bold text-mustard-bright">Looking ahead</p>
        <h2 className="mt-3 text-section text-white">U7 and U15 enter league play in 2027</h2>
        <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-sand/85">
          The Academy plans to expand its MTC HopSol entry to {leagueEntriesFrom2027.join(" and ")}{" "}
          during the 2027 football season — putting all five age groups into competitive fixtures.
        </p>
      </Section>
    </>
  );
}
