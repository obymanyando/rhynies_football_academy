import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { programmes } from "@/content/academy";

export default function Programmes() {
  return (
    <>
      <SEO
        title="Programmes"
        description="Football development, leadership and life skills, and community engagement — the three programmes that run the Academy."
      />

      <Section>
        <PageHeader
          kicker="Our programmes"
          title="Three programmes, one young person."
          lead="Everything we run sits under one of three headings — the football itself, the person playing it, and the community they come from."
        />
      </Section>

      <Section variant="tint" className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {programmes.map((p) => (
            <article key={p.number} className="rounded-md border border-sand bg-white p-8">
              <p className="label-voice text-[13px] font-bold text-mustard-deep">{p.number}</p>
              <h2 className="mt-3 font-display text-[24px] uppercase leading-tight">{p.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-body/80">{p.description}</p>
              <ul className="mt-6 space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px]">
                    <span aria-hidden="true" className="mt-2 block size-1.5 shrink-0 rounded-full bg-mustard" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
