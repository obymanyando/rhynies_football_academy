import type { Fixture } from "./types";

/**
 * Fixtures and results live in the club's Google Sheet (see `sheet.ts`), read
 * at runtime by `useSheet("fixtures")`. A row with no score is a fixture;
 * filling in both scores turns it into a result.
 */

/**
 * Today in Windhoek as YYYY-MM-DD, whatever the reader's own timezone: the
 * sheet's dates are Windhoek dates, so a parent abroad still sees today's match.
 */
export function todayISO(now = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Windhoek" }).format(now);
}

/**
 * Unplayed and not yet past. A past match whose score was never entered drops
 * off here rather than being advertised as upcoming; it appears again under
 * results once the score goes in.
 */
export const upcomingFixtures = (fixtures: Fixture[], today = todayISO()): Fixture[] =>
  fixtures
    .filter((f) => !f.result && f.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

export const recentResults = (fixtures: Fixture[]): Fixture[] =>
  fixtures.filter((f) => f.result).sort((a, b) => b.date.localeCompare(a.date));
