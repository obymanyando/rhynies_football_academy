# Editing content

Two sources. **Fixtures, results and news** live in a Google Sheet the club
edits from a phone. Everything else lives in typed files under `src/content/`.
Components read the interfaces in `types.ts` either way.

## The club's sheet: fixtures, results, news

The club owns the sheet; developers do not edit it. The site fetches each tab
as CSV from the reader's browser (`src/lib/useSheet.ts`) on every page load, so
a change shows on the next refresh with no build or deploy. Google's CSV export
allows cross-origin reads and sends `no-cache`, which is what makes this work.

- **Where it is:** sheet id and tab `gid`s in `src/content/sheet.ts`. Sharing is
  "anyone with the link can view".
- ⚠️ **The whole spreadsheet is public.** Its id is in this public repo and in
  the site's JavaScript, so anyone can read every tab. Nothing about the
  children (names lists, phone numbers, medical notes) may ever go in it. The
  sheet's own "How to" tab says the same.
- **Tabs are read by `gid`, not by name.** Renaming a tab is harmless. Deleting
  and re-creating one gives it a new `gid`, and its page shows "couldn't load"
  until `sheet.ts` is updated.
- **Template:** `docs/club-sheet/rhynies-club-sheet-template.xlsx`. It has
  dropdowns for every fixed-choice column, dates formatted `yyyy-mm-dd`, and a
  "How to" tab written for the club. To rebuild the sheet, upload it to the
  club's Google Drive, open it with Google Sheets and **File → Save as Google
  Sheets**. Then set **File → Settings → Locale** to Namibia or United Kingdom,
  so a date typed by hand is read day-first.
- **Columns are matched by heading, not position.** Required: Fixtures needs
  Date, Age group, Competition, Opponent and Home/Away; News needs Date,
  Category, Headline and Summary. If a required heading is missing, the page
  shows its "couldn't load" message.
- **Bad rows are skipped, never guessed** (`src/lib/sheet.ts`). That covers an
  unknown dropdown value, an impossible date, or only one score filled in.
  Skips are logged to the browser console as `[sheet] … skipped N row(s)`.
- **Dates are ISO only** (`2026-09-12`), the template's column format. Any
  other form is skipped, not guessed: if a cell loses its format, Google
  exports it in the sheet's locale, and `10/11/2026` could be either month.
- **Fixtures:** a row without scores is upcoming. A past one without scores is
  hidden until its score goes in. "Today" is Windhoek's date. Note only shows
  with a result (e.g. the scorers). Missing Venue shows as "TBC".
- **News:** the image is chosen by Category from the club's photos
  (`src/content/news.ts`). The club never handles images. Instagram links are
  kept only if they point at instagram.com.
- **If the sheet can't be read** (offline, Google down, sharing turned off),
  pages say so and point to the club's Instagram.

## Files

| File | Holds | Status |
|---|---|---|
| `club.ts` | Name, tagline, contacts, vision, mission, core values, stat band | **Final** |
| `academy.ts` | Age groups, capacities, programmes, competitions, support tiers | **Final** |
| `sheet.ts` | Where the club's sheet is (id and tab gids) | Config |
| `fixtures.ts` | Upcoming/results helpers over the sheet's rows | Code only |
| `news.ts` | News categories and the photo for each | Code only |
| `coaches.ts` | Coach names, roles, bios | **Placeholder** |
| `gallery.ts` | Photographs and alt text | Real, twelve images |

## Placeholders

Only coaches still use placeholders. Rows carrying `placeholder: true` are scaffolding, not fact. They render with a
visible "Placeholder" label and their page shows a note explaining the data is
not real. **Do not remove those labels until the data is real** — a parent
reading an invented kick-off time as a real one is the failure this guards
against.

Drop the flag per row as real data lands; the labels disappear on their own.

## Still needed from the Academy

- Five coach names, portraits and short bios
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
