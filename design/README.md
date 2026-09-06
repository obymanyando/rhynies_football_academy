# Design source

This folder is intentionally almost empty. The full Claude Design handoff —
prototype, standalone build, screenshots, original assets and the club's source
copy — is archived in the Obsidian vault:

    OBY-2/raw/other-namibia-projects/rhynies-design-handoff-2026-09/

It lives there because `raw/` is the vault's immutable-source area, and keeping
a second copy of ~4.6MB of prototype and screenshots in this repo would carry it
in git history forever.

## What the handoff is, and is not

The handoff is the **design reference**. It is high fidelity and its colours,
typography, spacing and interaction states are deliberate — recreate them
faithfully. It is not production code: the prototype is a single file of inline
styles with all eleven pages switched by a `page` variable, which was a
constraint of the prototyping tool.

## Where this build deliberately differs

| Handoff | This build | Why |
|---|---|---|
| Suggests a static site generator over an SPA | React SPA (house stack) | The SSG argument rested on WhatsApp link previews, a requirement that was retired before this build |
| Contact page carries an enquiry form | No form; `tel:`, WhatsApp, `mailto:` and Instagram links | The form is presentational with no backend. A form that silently drops a parent's enquiry is worse than no form |
| Fixtures/news/coaches behind a small CMS | Typed content files in `src/content/` | Smallest thing that ships. Components read the interfaces in `types.ts`, so a CMS can slot in behind them later untouched |
| Raw hex tokens | HSL CSS variables + Tailwind theme | House convention across the other repos |

## Content precedence

`content.txt` in the handoff is the club's original brief and is **out of date**
in two ways: it spells the club "Rhynnies", and it lists six older core values.
The club is **Rhynies** (one n) and there are **five** values: Respect,
Discipline, Determination, Teamwork, Success.

Where the handoff README, the built design and `content.txt` disagree, the order
of precedence is: handoff README > built design > `content.txt`.
