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
| `mustard-deep` | `#D08F1C` | Pressed state, kickers on cream |
| `cream` | `#FBF8F0` | Page ground |
| `cream-tint` | `#F7EBCB` | Value pills, soft cards |
| `sand` | `#E6DCC2` | Body text on dark grounds, hairline borders |
| `sand-warm` | `#F3DFC4` | Nav links at rest on dark |

> **Contrast guardrail.** Mustard on cream does **not** clear WCAG AA. Use it for
> fills, rules and large display type only — never for body-size text on cream.
> `mustard-deep` is the accessible choice for small text on cream.

## Typography

- **Anton** (400) — display. Uppercase, `letter-spacing: 0.02em`, line-height ~1.
- **Barlow Condensed** (500/600/700) — the label voice. Uppercase, tracking
  `0.10em`–`0.12em`. Available as `.label-voice`.
- **Barlow** (400–700) — body. Sentence case, line-height 1.6–1.7.

All three load in one Google Fonts request with `display=swap` and preconnect.
Keeping all three matters: the condensed/uppercase label voice against Anton
display and Barlow body is the site's typographic signature.

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
