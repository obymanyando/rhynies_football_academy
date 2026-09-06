/**
 * The content model.
 *
 * Fixtures, results, news, coaches and gallery change during a season and the
 * Academy will eventually need to edit them without a developer. They live in
 * typed files rather than a CMS for now — but components read these interfaces,
 * never the files directly, so the source can move behind an API later without
 * touching a single component.
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
