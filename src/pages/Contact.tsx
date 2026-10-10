import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { club } from "@/content/club";

/**
 * There is deliberately no enquiry form here.
 *
 * The design carries one, but it is presentational with no backend — a parent
 * who fills it in and presses Send gets silence, and the enquiry is lost. Until
 * there is somewhere for submissions to land, direct channels that provably
 * work are the honest option. A real form can replace this block later.
 */
export default function Contact() {
  const channels = [
    {
      label: "Phone / WhatsApp",
      value: club.phone.display,
      href: `tel:${club.phone.tel}`,
      secondary: { label: "Message on WhatsApp", href: `https://wa.me/${club.phone.whatsapp}` },
    },
    { label: "Email", value: club.email, href: `mailto:${club.email}` },
    { label: "Instagram", value: club.instagram.handle, href: club.instagram.url },
  ];

  return (
    <>
      <SEO
        title="Contact"
        description={`Contact Rhynies Stars Football Academy — ${club.phone.display}, ${club.email}, Windhoek West, Namibia.`}
      />

      <Section>
        <PageHeader
          kicker="Contact"
          title="Get in touch"
          lead="Enquiring about a place for your child, coaching, or sponsorship — call or message us directly and we will come back to you."
        />
      </Section>

      <Section variant="tint" className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-sand bg-white p-8">
            <h2 className="font-display text-[24px] uppercase">Talk to the academy</h2>
            <dl className="mt-6 space-y-6">
              {channels.map((c) => (
                <div key={c.label}>
                  <dt className="label-voice text-[13px] font-bold text-mustard-ink">{c.label}</dt>
                  <dd className="mt-1">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="break-words font-display text-[22px] uppercase text-ink-body underline decoration-mustard decoration-2 underline-offset-4 hover:text-link-hover"
                    >
                      {c.value}
                    </a>
                    {c.secondary && (
                      <a
                        href={c.secondary.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="label-voice mt-2 block text-[14px] font-bold text-ink-body/70 hover:text-ink-body"
                      >
                        {c.secondary.label} →
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-md border border-sand bg-white p-8">
            <h2 className="font-display text-[24px] uppercase">Where to find us</h2>
            <p className="label-voice mt-6 text-[13px] font-bold text-mustard-ink">Base</p>
            <address className="mt-1 space-y-1 not-italic text-[17px] leading-relaxed">
              <div className="font-semibold">{club.address.venue}</div>
              <div>{club.address.street}</div>
              <div>{club.address.city}</div>
            </address>
            <p className="mt-6 text-[16px] leading-relaxed text-ink-body/80">
              Training and home fixtures are based at Van Rhyn Primary School in Windhoek West.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
