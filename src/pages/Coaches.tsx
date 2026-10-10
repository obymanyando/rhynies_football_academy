import { CTAButton } from "@/components/common/CTAButton";
import { PageHeader } from "@/components/common/PageHeader";
import { PlaceholderNote } from "@/components/common/PlaceholderNote";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { coaches } from "@/content/coaches";

export default function Coaches() {
  return (
    <>
      <SEO
        title="Coaches & Staff"
        description="Every Rhynies Stars squad has a dedicated coach across the five age groups."
      />

      <Section>
        <PageHeader
          kicker="Coaches & staff"
          title="Five coaches. Five age groups."
          lead="Every squad has a dedicated coach."
        />
        <PlaceholderNote>
          Names, photographs and qualifications are to be supplied by the Academy — deliberately
          left blank rather than invented.
        </PlaceholderNote>
      </Section>

      <Section variant="tint" className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c) => (
            <article
              key={c.id}
              className="flex flex-col items-center rounded-md border border-sand bg-white p-8 text-center"
            >
              <span
                aria-hidden="true"
                className="grid size-24 place-items-center rounded-full bg-cream-tint font-display text-[28px] text-mustard-ink"
              >
                {c.ageGroup.toUpperCase()}
              </span>
              <h2 className="mt-5 font-display text-[21px] uppercase">{c.role}</h2>
              <p className="mt-2 text-[16px] italic text-ink-body/60">{c.name}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-section">Volunteer with us</h2>
        <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-ink-body/80">
          Qualified coaches, team managers and matchday volunteers are always welcome at the
          Academy.
        </p>
        <CTAButton to="/contact" className="mt-8">
          Get in touch
        </CTAButton>
      </Section>
    </>
  );
}
