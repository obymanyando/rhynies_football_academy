import type { Config } from "tailwindcss";

/**
 * Club brand overrides any house style — the palette is mustard and black,
 * decided by the club. Colours resolve to HSL CSS variables declared in
 * src/index.css so a token is defined in exactly one place.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "hsl(var(--ink))",
        "ink-header": "hsl(var(--ink-header))",
        "ink-body": "hsl(var(--ink-body))",
        "link-hover": "hsl(var(--link-hover))",
        mustard: "hsl(var(--mustard))",
        "mustard-bright": "hsl(var(--mustard-bright))",
        "mustard-deep": "hsl(var(--mustard-deep))",
        cream: "hsl(var(--cream))",
        "cream-tint": "hsl(var(--cream-tint))",
        sand: "hsl(var(--sand))",
        "sand-warm": "hsl(var(--sand-warm))",
      },
      fontFamily: {
        // Anton display / Barlow Condensed label voice / Barlow body is the
        // site's typographic signature. Substituting one family flattens it.
        display: ["Anton", "Impact", "sans-serif"],
        condensed: ["'Barlow Condensed'", "'Arial Narrow'", "sans-serif"],
        body: ["Barlow", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(38px, 7vw, 76px)", { lineHeight: "1.02" }],
        section: ["clamp(28px, 4vw, 44px)", { lineHeight: "1.08" }],
        lead: ["clamp(19px, 2vw, 20px)", { lineHeight: "1.65" }],
      },
      spacing: {
        // Sticky offsets derive from these, never from a hardcoded number.
        header: "var(--header-h)",
        "header-total": "var(--header-total-h)",
        section: "clamp(56px, 8vw, 104px)",
        gutter: "clamp(16px, 3vw, 28px)",
      },
      maxWidth: {
        content: "1280px",
        prose: "68ch",
      },
      screens: {
        // The one hard breakpoint in the design. Everything else is fluid.
        nav: "1180px",
      },
      borderRadius: {
        // Photo cards. The design's 20-22px; text cards stay on rounded-md.
        card: "20px",
      },
      boxShadow: {
        crest: "0 4px 14px rgba(0,0,0,0.25)",
        header: "0 10px 30px rgba(16,14,11,0.18)",
        card: "0 14px 34px rgba(16,14,11,0.14)",
        "card-hover": "0 20px 46px rgba(16,14,11,0.28)",
      },
      keyframes: {
        rsRise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        rsFade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        rise: "rsRise 0.4s ease both",
        fade: "rsFade 0.18s ease both",
      },
    },
  },
  plugins: [],
} satisfies Config;
