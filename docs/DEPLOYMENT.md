# Deployment

Cloudflare Workers static assets, via `wrangler.toml` — the same shape as
`namprocure` and `von-ai-website`. No CI; deploys are manual and deliberate.

```bash
npm run build
npx wrangler deploy      # or: npm run deploy
```

`not_found_handling = "single-page-application"` makes Cloudflare serve
`index.html` for unmatched paths, so client-side routes resolve on a hard
refresh and on a shared deep link.

## Netlify

`rhynies-fa.netlify.app` also deploys from `main`, configured by `netlify.toml`
in the repo root rather than in the Netlify dashboard, so the settings are
version-controlled and reviewable.

```toml
command = "npm run build"
publish = "dist"
NODE_VERSION = "22"
```

**Why the build command is not optional.** Netlify used to serve the repo-root
`index.html` directly, because that file *was* the whole site. It is now a Vite
entry point referencing `/src/main.tsx`, which only resolves after a build.
Serving it unbuilt produces a blank page. Merging the application to `main`
without this config in place would take the live site down.

The config also carries a catch-all `/*` → `/index.html` 200 redirect. Without
it every deep link 404s — verified: a plain static server over `dist/` returns
404 for `/fixtures` and `/contact`. Netlify matches real files first, so the
catch-all never shadows a hashed asset.

Node is pinned because Netlify's default moves over time. Every dependency
supports 22; `wrangler` requires `>=22.0.0` and is the binding constraint,
though it is not invoked during the Netlify build.

## Two hosts, deliberately

The site runs on both Cloudflare Workers and Netlify. That is the safe state
during changeover, not an accident. When one is retired, delete its config in
the same commit that removes the deploy, so the repo never claims a host it no
longer uses.
