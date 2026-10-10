# Editing content

No CMS. Content lives in typed files under `src/content/`, and every component
reads the interfaces in `types.ts` rather than the files directly — so a CMS can
replace the source later without touching a component.

| File | Holds | Status |
|---|---|---|
| `club.ts` | Name, tagline, contacts, vision, mission, core values, stat band | **Final** |
| `academy.ts` | Age groups, capacities, programmes, competitions, support tiers | **Final** |
| `fixtures.ts` | Fixtures and results | **Placeholder** |
| `news.ts` | News articles | **Placeholder** |
| `coaches.ts` | Coach names, roles, bios | **Placeholder** |
| `gallery.ts` | Photographs and alt text | Real, twelve images |

## Placeholders

Rows carrying `placeholder: true` are scaffolding, not fact. They render with a
visible "Placeholder" label and their page shows a note explaining the data is
not real. **Do not remove those labels until the data is real** — a parent
reading an invented kick-off time as a real one is the failure this guards
against.

Drop the flag per row as real data lands; the labels disappear on their own.

## Still needed from the Academy

- Real fixtures and results for the season calendar
- Five coach names, portraits and short bios
- Real news items and match reports
- Further photography (the current twelve are phone photographs; do not upscale)

## Adding an image

Put the file in `src/assets/images/`, import it in `gallery.ts`, and record its
intrinsic `width`/`height`. The dimensions are not optional — they reserve space
so the page does not shift as images load, which matters on slow connections.

Check a photo for location data before adding it — these are photographs of
children. WhatsApp exports usually carry none, but a phone's original does.

**Order matters.** The gallery flows in columns, and a portrait is as tall as
four landscapes. Keep portraits where the comment in `gallery.ts` puts them, or
one column ends far short of the others. Check `/gallery` at 1024px and 1280px
after any change.
