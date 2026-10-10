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

        {/* Columns, not a grid: a grid row stretches to its tallest photo, so a
            landscape beside a portrait was cropped to a sliver and blown up past
            its resolution. Columns keep every photo at its own aspect ratio. */}
        <ul className="mt-10 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((img) => (
            <li key={img.src} className="mb-4 break-inside-avoid last:mb-0 overflow-hidden rounded-md border border-sand bg-white">
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
