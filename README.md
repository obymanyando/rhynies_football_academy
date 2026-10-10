# Rhynies Stars Football Academy

Public website for Rhynies Stars Football Academy — a community-based youth
football academy in Windhoek West, Namibia, affiliated with Van Rhyn Primary
School.

The site's jobs, in order: get a parent to register a child, get a sponsor to
make contact, and let the academy community follow fixtures, results and news.
The audience is mostly parents on mobile phones on Namibian mobile data, so page
weight matters more than richness.

## Stack

React 18 + TypeScript + Vite, Tailwind CSS 3, React Router v6, deployed to
Cloudflare Workers.

```bash
npm install
npm run dev      # http://localhost:8080
npm test
npm run build
```

## Docs

| | |
|---|---|
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Layout, the nav breakpoint, how to verify responsively |
| [docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md) | Colour, type, and the header geometry warning |
| [docs/CONTENT.md](docs/CONTENT.md) | Editing content, and what the Academy still owes |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Cloudflare deploy, and the Netlify changeover |
| [design/README.md](design/README.md) | Where the design handoff lives, and where this build departs from it |

## Two things that are easy to get wrong

**The club is "Rhynies", one n.** Older content notes spell it "Rhynnies".
They are wrong — the crest, the email address and the Instagram handle all agree.

**There are five core values**, in this order: Respect, Discipline,
Determination, Teamwork, Success. An older six-value list is superseded.

## Status

The eleven pages are built. Club identity, programmes, age groups, competitions
and contact details are final. Fixtures, results and news come live from a
Google Sheet the club edits itself. Coach names are visibly-labelled
placeholders awaiting real data from the Academy. See
[docs/CONTENT.md](docs/CONTENT.md). There is deliberately no contact form; see
[design/README.md](design/README.md).
