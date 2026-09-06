# Development

```bash
npm install
npm run dev        # http://localhost:8080
npm run lint
npm test           # vitest
npm run build
npm run preview
```

npm, not bun — matches the other repos in `~/dev/`.

## Layout

```
src/
  components/
    layout/    UtilityBar, Header, DesktopNav, MobileDrawer, Footer, Layout
    common/    SEO, ScrollToTop, Section, PageHeader, CTAButton, ValuePills, PlaceholderNote
    fixtures/  FilterBar, FixtureRow
    ui/        shadcn primitives, if any are ever needed
  content/     typed content — see docs/CONTENT.md
  hooks/       useMediaQuery
  lib/         utils, nav config
  pages/       one file per route
  test/        setup + nav breakpoint tests
```

## The navigation breakpoint

One hard breakpoint at **1180px** (`NAV_BREAKPOINT` in `src/lib/nav.ts`).
Exactly one navigation exists in the DOM at any width — the desktop bar above,
the drawer below. They are **not** two DOM trees toggled with CSS, because that
leaks duplicate links into the tab order and to screen readers.

The handoff calls getting this wrong the single most visible failure mode, so
it is pinned by tests in `src/test/nav.breakpoint.test.tsx`: one nav at 1179px,
one at 1180px, never two, and the drawer closes on navigation and on Escape.
Those tests use a `matchMedia` stub — jsdom has none.

## Verifying responsively

jsdom does no layout, so overflow and sticky positioning cannot be unit tested.
Check them in a real browser at 360, 390, 768, 1179, 1180 and 1440px:

- The body must never scroll horizontally at any width.
- The fixtures filter bar must sit flush under the header — see the header
  geometry warning in `docs/DESIGN_TOKENS.md`.
- Tab order: the skip link comes first and every focused element shows the
  mustard ring.
