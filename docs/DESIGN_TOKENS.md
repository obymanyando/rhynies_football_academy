# Design tokens

Defined once in `src/index.css` as HSL triples, exposed through
`tailwind.config.ts`. Never hardcode a brand hex in a component.

## Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | `#100E0B` | Utility bar, mobile drawer, footer, text on mustard |
| `ink-header` | `#1E1B16` | Header bar, dark section grounds, default link |
| `ink-body` | `#141210` | Body text on cream |
| `link-hover` | `#3D372D` | Link hover on light grounds |
| `mustard` | `#EFA91B` | Primary accent, buttons, focus ring |
| `mustard-bright` | `#FFC93B` | Hover fill, active nav underline, accent on dark |
| `mustard-deep` | `#D08F1C` | Pressed state of mustard buttons. **Never text** |
| `mustard-ink` | `#7F620B` | Small mustard text (kickers, labels) on cream, white and cream-tint |
| `cream` | `#FBF8F0` | Page ground |
| `cream-tint` | `#F7EBCB` | Value pills, soft cards |
| `sand` | `#E6DCC2` | Body text on dark grounds, hairline borders |
| `sand-warm` | `#F3DFC4` | Nav links at rest on dark |

> **Contrast guardrail.** Mustard on a light ground does **not** clear WCAG AA at
> any size: 2.0:1 on white, short of even the 3:1 large-text bar. Use it for fills
> and rules only. The Teams age-group labels were 40px mustard on white until
> 2026-10 and failed.
> `mustard-deep` fails too (2.6:1 on cream); it was used for kickers until
> 2026-10 and every one of them failed. Use `mustard-ink`: 5.4:1 on cream,
> 5.8:1 on white, 4.8:1 on cream-tint. It is a shade darker than the design's
> `#8A6A0C`, which falls just short (4.3:1) on cream-tint, where the fixture
> results and the Support page's "Where support goes" label sit. It is **not**
> for `sand` or `sand-warm` grounds (4.2 and 4.4:1). `src/test/contrast.test.ts` reads the tokens from `index.css` and
> fails if `mustard-ink` drops below AA or any component sets text in plain
> `mustard` or `mustard-deep`.

## Typography

- **Anton** (400) — display. Uppercase, `letter-spacing: 0.02em`, line-height ~1.
- **Barlow Condensed** (500/600/700) — the label voice. Uppercase, tracking
  `0.10em`–`0.12em`. Available as `.label-voice`.
- **Barlow** (400–700) — body. Sentence case, line-height 1.6–1.7.

All three load in one Google Fonts request with `display=swap` and preconnect.
Keeping all three matters: the condensed/uppercase label voice against Anton
display and Barlow body is the site's typographic signature.

## Cards

Two shapes, kept apart on purpose:

- **Bordered cards and image frames** (Programmes, Teams, Competitions, Support,
  Contact, Coaches, the gallery and the News page) use `rounded-md`.
- **Photo cards** (the Home page's three section cards and its news preview)
  use `rounded-card` (20px) and `shadow-card`, lifting to `shadow-card-hover`.

The two design sources disagree here: the handoff README asks for 4–8px,
"square-ish" cards, while the design file draws these photo cards at 20–22px.
The owner pointed at the design file, so it wins for photo cards only.

Text laid over a photo sits on a bottom-up `ink` gradient: 95% at the foot, 70%
at the midpoint, 10% at the top. The design's midpoint was 35%, which left the
small mustard kicker at 2.6:1 on the bright pitch photo. At 70% every line on
all three cards measures WCAG AA or better. Do not lighten it.

## Header geometry — read before touching sticky positioning

Three related tokens, and the distinction is load-bearing:

```
--header-h: 84px          /* the nav row only */
--header-rule-h: 2px      /* the mustard brand rule beneath it */
--header-total-h: calc(--header-h + --header-rule-h)   /* 86px */
```

Anything that sticks *below* the header must offset by **`--header-total-h`**.
Using `--header-h` puts the element 2px too high, where it covers the brand rule.
The fixtures filter bar is the current case. The handoff records that hardcoding
the header height and the sticky offset independently broke twice; this build hit
a third variant of the same bug, which is why the rule's own height is a token
rather than a Tailwind literal.
