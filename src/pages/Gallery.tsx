import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { gallery } from "@/content/gallery";

export default function Gallery() {
  return (
    <>
      <SEO
        title="Gallery"
        description="Training sessions, matchdays and squad photographs from Rhynies Stars Football Academy in Windhoek."
      />

      <Section>
        <PageHeader
          kicker="Gallery"
          title="The academy in pictures"
          lead="Training sessions, matchdays and squad photos from Windhoek."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-md border border-sand bg-white">
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
