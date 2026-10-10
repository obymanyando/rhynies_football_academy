import { CTAButton } from "@/components/common/CTAButton";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { supportAreas, supportTiers } from "@/content/academy";
import { club } from "@/content/club";

export default function Support() {
  return (
    <>
      <SEO
        title="Support Us"
        description="Sponsorship and donations keep ninety places open at Rhynies Stars — kit, equipment, transport and league fees."
      />

      <Section>
        <PageHeader
          kicker="Support us"
          title="Ninety places kept open by the people around them."
          lead="Rhynies Stars serves a low-income community in Windhoek West. Families contribute a monthly fee only where they are able to — and many are not. Everything else comes from sponsors, partners and donors who believe a child's circumstances should not decide whether they get to play."
        />
      </Section>

      <Section variant="tint" className="pt-0">
        <p className="label-voice text-[14px] font-bold text-mustard-ink">Where support goes</p>
        <h2 className="mt-3 text-section">Four things that keep the academy running</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportAreas.map((a) => (
            <div key={a.title} className="border-t-4 border-mustard bg-white p-6 pt-[22px]">
              <h3 className="font-display text-[21px] uppercase">{a.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-body/80">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-section">Ways to support</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {supportTiers.map((t) => (
            <article key={t.tier} className="rounded-md border border-sand bg-white p-8">
              <p className="label-voice text-[13px] font-bold text-mustard-ink">{t.tier}</p>
              <h3 className="mt-3 font-display text-[24px] uppercase leading-tight">{t.title}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-body/80">{t.description}</p>
              <p className="mt-5 border-t border-sand pt-4 text-[15px] italic text-ink-body/70">
                {t.audience}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-mustard">
        <div className="content-column flex flex-wrap items-center justify-between gap-6 py-section">
          <div>
            <h2 className="max-w-[24ch] text-section text-ink">
              Want to talk about supporting the academy?
            </h2>
            <p className="mt-4 max-w-prose text-[17px] text-ink/80">
              We will send you the Academy profile, the season plan and exactly what your
              contribution covers.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <CTAButton href={`tel:${club.phone.tel}`} variant="dark">
              {club.phone.display}
            </CTAButton>
            <CTAButton to="/contact" variant="dark">
              Contact the academy
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
