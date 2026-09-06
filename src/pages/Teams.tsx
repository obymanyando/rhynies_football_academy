import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { ageGroups, totalCapacity } from "@/content/academy";

export default function Teams() {
  return (
    <>
      <SEO
        title="Teams & Age Groups"
        description="Five age groups from Under-7 to Under-15, eighteen places in each — ninety player places in total."
      />

      <Section>
        <PageHeader
          kicker="Teams"
          title="The academy development pathway"
          lead="Five age groups. Eighteen places in each. A player joining at U7 can stay with the Academy for eight seasons."
        />
        <p className="mt-6 max-w-prose rounded border-l-4 border-mustard bg-cream-tint px-4 py-3 text-[16px]">
          Current intake is Under-7 to Under-15, with Under-14 and Under-15 boys joining next year.
        </p>
      </Section>

      <Section variant="tint" className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ageGroups.map((g) => (
            <article key={g.id} className="rounded-md border border-sand bg-white p-7">
              <p className="font-display text-[40px] leading-none text-mustard">{g.label}</p>
              <h2 className="mt-3 font-display text-[21px] uppercase">{g.full}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-body/80">{g.description}</p>
              <p className="label-voice mt-5 border-t border-sand pt-4 text-[13px] font-semibold text-ink-body/70">
                Max players <span className="ml-2 font-display text-[18px] text-ink-body">{g.maxPlayers}</span>
              </p>
            </article>
          ))}

          <article className="rounded-md border-2 border-mustard bg-cream p-7">
            <p className="label-voice text-[13px] font-bold text-mustard-deep">Total</p>
            <h2 className="mt-3 font-display text-[21px] uppercase">Full academy capacity</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-body/80">
              Across all five age groups.
            </p>
            <p className="label-voice mt-5 border-t border-sand pt-4 text-[13px] font-semibold text-ink-body/70">
              Player places{" "}
              <span className="ml-2 font-display text-[28px] text-mustard-deep">{totalCapacity}</span>
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
