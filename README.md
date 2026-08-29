# Rhynies Stars Football Academy

Website for Rhynies Stars Football Academy — Windhoek West, Namibia. Affiliated with Van Rhyn Primary School.

## What's here

- `index.html` — the built site. One self-contained file: all styles, scripts and photos inlined. This is what Netlify serves.
- `src/` — the design source.
  - `Rhynies Stars FA.dc.html` — the site itself. Edit this.
  - `support.js` — runtime the source file needs.
  - `assets/` — original photos and the crest.
  - `content.txt` — copy and club facts the site was written from.

`index.html` is generated from `src/`. Edit the source, rebuild, commit both.

## Local preview

`src/Rhynies Stars FA.dc.html` needs `support.js` and `assets/` beside it — open it from inside `src/`, not on its own. Or just open `index.html`, which works anywhere with no internet connection.

## Deploy

Netlify serves `index.html` from the repository root. Connect the repo in Netlify once and every push to `main` redeploys.

## Still to add

Real fixtures and results, coach names and bios, phone/email contact details, match reports, and further photography. The layouts for all of these are built and waiting.
