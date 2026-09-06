export interface NavItem {
  to: string;
  /** Short label for the desktop bar. */
  label: string;
  /** Full label used in the drawer and footer, where there is room. */
  longLabel?: string;
}

/** The nine inline links. Home is reached through the crest lockup. */
export const navItems: NavItem[] = [
  { to: "/about", label: "About" },
  { to: "/programmes", label: "Programmes" },
  { to: "/teams", label: "Teams", longLabel: "Teams & Age Groups" },
  { to: "/competitions", label: "Competitions" },
  { to: "/fixtures", label: "Fixtures", longLabel: "Fixtures & Results" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/coaches", label: "Coaches", longLabel: "Coaches & Staff" },
  { to: "/contact", label: "Contact" },
];

/**
 * The one hard breakpoint in the design: below this the nine links collapse to
 * a drawer. Kept here as a single number because both the header and its test
 * depend on it agreeing.
 */
export const NAV_BREAKPOINT = 1180;
