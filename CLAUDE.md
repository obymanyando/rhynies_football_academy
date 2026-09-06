# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## What This Is

The public website for Rhynies Stars Football Academy, a community-based youth
football academy in Windhoek West, Namibia. Eleven pages, brochure-shaped, with
one filter interaction. Pro-bono work.

Audience: parents and guardians on mobile phones, on Namibian mobile data. Fast
first paint and low page weight beat richness every time.

---

## Commands

```bash
npm run dev        # Dev server at localhost:8080
npm run build      # Production build (Vite)
npm run lint       # ESLint
npm test           # Vitest
npm run deploy     # Build, then wrangler deploy
```

npm, not bun. No CI — deploys are manual.

---

## Stack

- **React 18 + TypeScript + Vite** (SWC transpiler)
- **Tailwind CSS 3** with HSL CSS variable tokens
- **React Router v6** (client-side routing)
- **Cloudflare Workers** static assets via `wrangler.toml`

No Supabase, no auth, no CMS — nothing here needs a database yet.

---

## Rules that are load-bearing

**The club is "Rhynies", one n.** Never "Rhynnies", whatever older content notes
say. Five core values, in order: Respect, Discipline, Determination, Teamwork,
Success. A six-value list appears in old material and is superseded.

**Never hardcode a brand hex.** Tokens live in `src/index.css`, exposed through
`tailwind.config.ts`. Mustard on cream fails WCAG AA — `mustard-deep` is the
accessible choice for small text on cream.

**Sticky offsets use `--header-total-h`, not `--header-h`.** The header is its
84px nav row plus a 2px mustard rule. This exact bug has now bitten three times;
see the header geometry section of `docs/DESIGN_TOKENS.md`.

**Exactly one navigation in the DOM at a time**, split at 1180px. Not two trees
toggled with CSS. Pinned by `src/test/nav.breakpoint.test.tsx`.

**No contact form without a backend.** The design carries one; it is
presentational. A form that silently drops a parent's enquiry is worse than no
form. Direct `tel:`/WhatsApp/`mailto:` links until submissions have somewhere
to land.

**Placeholder content stays visibly labelled** until real data replaces it. Do
not invent fixtures, results, coach names or match reports.

**This repo is public.** No secrets, no committed `.env`.

---

## Architecture

Routes in `src/App.tsx`, all wrapped by `<Layout>`:

| Route | Page | Content status |
|---|---|---|
| `/` | Home | Final |
| `/about` | About | Final |
| `/programmes` | Programmes | Final |
| `/teams` | Teams & age groups | Final |
| `/competitions` | Competitions | Final |
| `/fixtures` | Fixtures & results | Placeholder |
| `/news` | News | Placeholder |
| `/gallery` | Gallery | Real photos |
| `/coaches` | Coaches & staff | Placeholder |
| `/support` | Support Us | Final |
| `/contact` | Contact | Final |

Content lives in `src/content/` as typed files. Components read the interfaces
in `types.ts`, never the files directly, so a CMS can slot in behind them.

## Key Files

| File | Purpose |
|---|---|
| `src/index.css` | Design tokens, base styles, header geometry |
| `tailwind.config.ts` | Token surface, type scale, breakpoint |
| `src/lib/nav.ts` | Nav items and `NAV_BREAKPOINT` |
| `src/components/layout/Header.tsx` | Sticky header, chooses one nav mode |
| `src/content/types.ts` | The content model |
| `docs/DESIGN_TOKENS.md` | Colour, type, contrast and sticky-offset rules |
