import { Link } from "react-router-dom";

import { CTAButton } from "@/components/common/CTAButton";
import { PlaceholderNote } from "@/components/common/PlaceholderNote";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";
import { ValuePills } from "@/components/common/ValuePills";
import { club, stats } from "@/content/club";
import matchWide from "@/assets/images/match-wide.jpeg";
import teamHopsol2 from "@/assets/images/team-hopsol-2.jpeg";
import trainingPitch from "@/assets/images/training-pitch.jpeg";
import { news } from "@/content/news";
import { formatNewsDate } from "@/lib/utils";

/** A presentation flag in the design; a build-time choice here. */
const SHOW_STAT_BAND = true;

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description={`${club.name} — a community-based youth football academy in Windhoek West, Namibia. Under-7 to Under-15.`}
      />

      <section className="relative isolate overflow-hidden">
        <img
          src={trainingPitch}
          alt=""
          width={1008}
          height={490}
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />

        <div className="content-column py-[clamp(72px,12vw,140px)]">
          <p className="label-voice animate-rise text-[14px] font-bold text-mustard-bright">
            Windhoek · Est. Van Rhyn Primary
          </p>
          {/* Line break is explicit; no ch-width cap, or the first line wraps twice. */}
          <h1 className="mt-4 animate-rise text-balance text-hero text-white">
            Together we play.
            <br />
            Together we win.
          </h1>
          <p className="mt-6 max-w-prose animate-rise text-lead text-sand">
            A community-based youth football academy developing footballers and responsible
            young citizens — through structured coaching, education, discipline and mentorship.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <CTAButton to="/programmes">Our Programmes</CTAButton>
            <CTAButton to="/support" variant="ghost">
              Support the Academy
            </CTAButton>
          </div>
        </div>
      </section>

      {SHOW_STAT_BAND && (
        <div className="bg-ink-header">
          <div className="content-column grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[clamp(34px,5vw,52px)] leading-none text-mustard-bright">
                  {s.value}
                </p>
                <p className="label-voice mt-2 text-[13px] font-semibold text-sand">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(330px,1fr)_1.2fr] lg:items-start">
          <div>
            <p className="label-voice text-[14px] font-bold text-mustard-deep">Who we are</p>
            <h2 className="mt-3 text-section">
              Football is the reason they come. It is not the only reason they stay.
            </h2>
            <Link
              to="/about"
              className="label-voice mt-6 inline-block text-[15px] font-bold text-ink-body underline decoration-mustard decoration-2 underline-offset-4 hover:text-link-hover"
            >
              Read our story →
            </Link>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed">
            <p>
              Rhynies Stars grew out of the football programme at Van Rhyn Primary School in
              Windhoek. Teachers, coaches, parents and community members saw the same gap:
              talented young footballers with nowhere structured to go.
            </p>
            <p>
              Today the Academy runs age groups from Under-7 to Under-15, with Under-14 and
              Under-15 boys joining from next year, competing in the Khomas Schools Sport Region
              League and the MTC HopSol Youth Soccer League. Alongside the football, players work
              on confidence, communication, leadership and time management — the things that
              outlast a season.
            </p>
            <ValuePills />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          <HomeCard
            kicker="Programmes"
            title="Football development"
            body="Technical work, ball mastery, tactical understanding, physical literacy and goalkeeping."
            to="/programmes"
            image={trainingPitch}
          />
          <HomeCard
            kicker="Teams"
            title="The U7–U15 pathway"
            body="Five age groups, eighteen places each, one clear route through the Academy."
            to="/teams"
            image={teamHopsol2}
          />
          <HomeCard
            kicker="Competitions"
            title="Real league football"
            body="KSSR regional schools football and the MTC HopSol Youth Soccer League."
            to="/competitions"
            image={matchWide}
          />
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-voice text-[14px] font-bold text-mustard-deep">From the Academy</p>
            <h2 className="mt-3 text-section">Latest news</h2>
          </div>
          <Link
            to="/news"
            className="label-voice text-[15px] font-bold underline decoration-mustard decoration-2 underline-offset-4"
          >
            All news →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((a) => (
            <article key={a.id}>
              {a.image && (
                <div className="mb-5 aspect-[4/3] overflow-hidden rounded-card bg-cream-tint">
                  <img
                    src={a.image}
                    alt=""
                    width={1008}
                    height={490}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>
              )}
              <p className="label-voice text-[13px] font-bold text-mustard-deep">
                {a.category} · {formatNewsDate(a.date)}
              </p>
              <h3 className="mt-2.5 font-display text-[clamp(22px,2.2vw,28px)] uppercase leading-[1.08]">
                {a.title}
              </h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-ink-body/80">{a.excerpt}</p>
            </article>
          ))}
        </div>

        <PlaceholderNote>
          These are placeholder articles while the Academy's real updates are collected. Send
          them through and they replace these directly.
        </PlaceholderNote>
      </Section>

      <section className="bg-mustard">
        <div className="content-column flex flex-wrap items-center justify-between gap-6 py-section">
          <div>
            <h2 className="max-w-[22ch] text-section text-ink">
              No child is turned away because of what their family can afford.
            </h2>
            <p className="mt-4 max-w-prose text-[17px] text-ink/80">
              Sponsorship and donations keep ninety places open: kit, balls, transport to
              fixtures, league entry, water on matchdays.
            </p>
          </div>
          <CTAButton to="/support" variant="dark">
            Support the Academy
          </CTAButton>
        </div>
      </section>
    </>
  );
}

function HomeCard({
  kicker,
  title,
  body,
  to,
  image,
}: {
  kicker: string;
  title: string;
  body: string;
  to: string;
  image: string;
}) {
  return (
    <Link
      to={to}
      className="group relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-card bg-ink-header p-7 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Decorative: the card's text says where it goes. */}
      <img
        src={image}
        alt=""
        width={1008}
        height={490}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      {/* Darker than the design's 35% midpoint: on the bright pitch photo the kicker,
          which sits about halfway up, measured 2.6:1 there. At 70% every line of
          text clears WCAG AA (kicker worst case 6.3:1) on all three photos. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 from-[8%] via-ink/70 via-[55%] to-ink/10"
      />
      <p className="label-voice text-[13px] font-bold text-mustard-bright">{kicker}</p>
      <h3 className="mt-2.5 font-display text-[clamp(26px,2.4vw,30px)] uppercase leading-[1.04] text-white">
        {title}
      </h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-sand">{body}</p>
    </Link>
  );
}
