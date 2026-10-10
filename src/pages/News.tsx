import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { InstagramPostLink, SheetStatus } from "@/components/common/SheetStatus";
import { useSheet } from "@/lib/useSheet";
import { formatNewsDate } from "@/lib/utils";

export default function News() {
  const sheet = useSheet("news");
  const news = sheet.status === "ready" ? sheet.items : [];

  return (
    <>
      <SEO
        title="News"
        description="Match reports, academy updates and community news from Rhynies Stars Football Academy."
      />

      <Section>
        <PageHeader kicker="News" title="From the academy" />
        {sheet.status !== "ready" ? (
          <SheetStatus status={sheet.status} what="news" />
        ) : (
          !news.length && <SheetStatus status="empty" what="news" />
        )}
      </Section>

      {news.length > 0 && (
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
                  <p className="label-voice text-[13px] font-bold text-mustard-ink">
                    {a.category} · {formatNewsDate(a.date)}
                  </p>
                  <h2 className="mt-3 font-display text-[24px] uppercase leading-tight">{a.title}</h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-body/80">
                    {a.body ?? a.excerpt}
                  </p>
                  {a.link && <InstagramPostLink href={a.link} />}
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
