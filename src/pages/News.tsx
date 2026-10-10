import { PageHeader } from "@/components/common/PageHeader";
import { PlaceholderNote } from "@/components/common/PlaceholderNote";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { news } from "@/content/news";
import { formatNewsDate } from "@/lib/utils";

export default function News() {
  return (
    <>
      <SEO
        title="News"
        description="Match reports, academy updates and community news from Rhynies Stars Football Academy."
      />

      <Section>
        <PageHeader kicker="News" title="From the academy" />
        <PlaceholderNote>
          Placeholder articles — replace with real Academy updates and Instagram posts.
        </PlaceholderNote>
      </Section>

      <Section variant="tint" className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {news.map((a) => (
            <article key={a.id} className="overflow-hidden rounded-md border border-sand bg-white">
              {a.image && (
                <img
                  src={a.image}
                  alt=""
                  width={1008}
                  height={490}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
              )}
              <div className="p-8">
                <p className="label-voice text-[13px] font-bold text-mustard-deep">
                  {a.category} · {formatNewsDate(a.date)}
                </p>
                <h2 className="mt-3 font-display text-[24px] uppercase leading-tight">{a.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-body/80">
                  {a.body ?? a.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
