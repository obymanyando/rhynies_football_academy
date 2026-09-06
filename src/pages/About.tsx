import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { club, coreValues } from "@/content/club";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Rhynies Stars Football Academy grew out of the football programme at Van Rhyn Primary School in Windhoek West, Namibia."
      />

      <Section>
        <PageHeader
          kicker="About us"
          title="Built by a school. Owned by a community."
          lead={club.tagline}
        />
      </Section>

      <Section variant="tint">
        <h2 className="text-section">Our story</h2>
        <div className="mt-6 max-w-prose space-y-5 text-[17px] leading-relaxed">
          <p>
            {club.name} was founded from the football programme of Van Rhyn Primary School in
            Windhoek, Namibia.
          </p>
          <p>
            Over time, teachers, coaches, parents and community members recognised the need for a
            football development structure that could serve both learners from the school and
            talented young footballers from the wider community.
          </p>
          <p>
            The Academy has since evolved into a community-focused development programme dedicated
            to nurturing football talent while promoting education, discipline, leadership and
            positive social values.
          </p>
          <p className="font-semibold">
            We believe that no child should be denied the opportunity to participate in organised
            sport because of financial circumstances.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-md border-t-4 border-mustard bg-white p-8">
            <h2 className="font-display text-[26px] uppercase">Vision</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-body/85">{club.vision}</p>
          </div>
          <div className="rounded-md border-t-4 border-mustard bg-white p-8">
            <h2 className="font-display text-[26px] uppercase">Mission</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-body/85">{club.mission}</p>
          </div>
        </div>
      </Section>

      <Section variant="ink">
        <p className="label-voice text-[14px] font-bold text-mustard-bright">What we stand for</p>
        <h2 className="mt-3 text-section text-white">Our core values</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v) => (
            <div key={v.name} className="border-t-4 border-mustard pt-[22px]">
              <h3 className="font-display text-[22px] uppercase text-mustard-bright">{v.name}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-sand/85">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
