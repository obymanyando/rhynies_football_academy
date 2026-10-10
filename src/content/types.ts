/**
 * The content model.
 *
 * Fixtures, results and news come from the club's Google Sheet, parsed into
 * these types by `src/lib/sheet.ts`. Coaches and the gallery still live in
 * typed files. Components read these interfaces either way, so a source can
 * change without touching a component.
 */

export type AgeGroupId = "u7" | "u9" | "u11" | "u12" | "u13" | "u15";

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  full: string;
  description: string;
  maxPlayers: number;
  /** False for groups that exist as squads but do not yet play league football. */
  inLeague: boolean;
}

export type Competition = "MTC HopSol" | "KSSR League";

export interface Fixture {
  id: string;
  ageGroup: AgeGroupId;
  competition: Competition;
  opponent: string;
  /** ISO date. Kick-off time is separate so a TBC time is representable. */
  date: string;
  time?: string;
  venue: string;
  home: boolean;
  result?: {
    scored: number;
    conceded: number;
    note?: string;
  };
  /** Placeholder rows are labelled in the UI so they are never read as real. */
  placeholder?: boolean;
}

export interface NewsArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body?: string;
  image?: string;
  /** The club's own Instagram post for this story. Only instagram.com links are kept. */
  link?: string;
  placeholder?: boolean;
}

export interface Coach {
  id: string;
  ageGroup: AgeGroupId;
  role: string;
  name: string;
  bio?: string;
  portrait?: string;
  placeholder?: boolean;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CoreValue {
  name: string;
  description: string;
}

export interface Programme {
  number: string;
  title: string;
  description: string;
  items: string[];
}

export interface SupportTier {
  tier: string;
  title: string;
  description: string;
  audience: string;
}
