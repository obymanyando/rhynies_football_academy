import { Link } from "react-router-dom";

import crest from "@/assets/images/crest-2026.jpeg";
import { club, coreValues } from "@/content/club";

const academyLinks = [
  { to: "/about", label: "About Us" },
  { to: "/programmes", label: "Our Programmes" },
  { to: "/teams", label: "Teams & Age Groups" },
  { to: "/coaches", label: "Coaches & Staff" },
];

const footballLinks = [
  { to: "/competitions", label: "Competitions" },
  { to: "/fixtures", label: "Fixtures & Results" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-sand">
      <div className="content-column grid gap-10 py-section md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream p-0.5">
              <img src={crest} alt="" width={48} height={48} className="size-full rounded-full object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl uppercase text-white">Rhynies Stars</span>
              <span className="label-voice block text-xs font-semibold text-mustard-bright">Football Academy</span>
            </span>
          </div>
          <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-sand/80">
            A community-based youth football academy in Windhoek, developing footballers and
            responsible young citizens since our Van Rhyn Primary School beginnings.
          </p>
          <p className="mt-4 font-display text-lg uppercase text-mustard-bright">{club.motto}</p>
        </div>

        <FooterColumn title="The Academy" links={academyLinks} />
        <FooterColumn title="Football" links={footballLinks} />

        <div>
          <h2 className="label-voice text-[13px] font-bold text-mustard-bright">Get In Touch</h2>
          <address className="mt-4 space-y-1 not-italic text-[15px] text-sand/80">
            <div>{club.address.venue}</div>
            <div>{club.address.street}</div>
            <div>{club.address.city}</div>
          </address>
          <div className="mt-4 space-y-1 text-[15px]">
            <a href={`tel:${club.phone.tel}`} className="block text-sand hover:text-mustard-bright">
              {club.phone.display}
            </a>
            <a href={`mailto:${club.email}`} className="block break-all text-sand hover:text-mustard-bright">
              {club.email}
            </a>
            <a
              href={club.instagram.url}
              target="_blank"
              rel="noreferrer noopener"
              className="block text-sand hover:text-mustard-bright"
            >
              {club.instagram.handle}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="content-column flex flex-wrap items-center justify-between gap-3 py-5 text-[13px]">
          <p className="text-sand/60">
            © {new Date().getFullYear()} {club.name}. A community-based youth development initiative.
          </p>
          <p className="label-voice font-semibold text-mustard-bright">
            {coreValues.map((v) => v.name).join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="label-voice text-[13px] font-bold text-mustard-bright">{title}</h2>
      <ul className="mt-4 space-y-2 text-[15px]">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sand/80 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
