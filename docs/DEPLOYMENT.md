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

The original design export is still live at `rhynies-fa.netlify.app`, deploying
from `main`. **Leave it running until the Cloudflare deploy is verified**, then
switch and retire it. Two live sites is the safe state during the changeover,
not a mistake.
