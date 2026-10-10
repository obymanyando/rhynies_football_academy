import { NEWS_CATEGORIES, newsImageFor, type NewsCategory } from "@/content/news";
import type { AgeGroupId, Competition, Fixture, NewsArticle } from "@/content/types";

/**
 * Fixtures and news come from a Google Sheet the club edits on a phone. This
 * module turns that sheet's CSV into the site's types. The rule throughout: a
 * row that cannot be shown correctly is skipped and counted, never rendered
 * half-wrong. A parent reading a wrong kick-off date is the failure to avoid.
 */

export interface Parsed<T> {
  items: T[];
  /** Rows dropped as invalid. Logged, so a rising count is visible. */
  skipped: number;
}

/** RFC 4180 CSV: quoted fields may hold commas, doubled quotes and newlines. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/**
 * Columns are found by header name, not position, so the club can reorder
 * or add columns without breaking the site. A missing required column throws:
 * that is a broken sheet, and the page shows its error state.
 */
function table(csv: string, required: string[]) {
  const [header = [], ...body] = parseCsv(csv);
  const names = header.map((h) => h.trim().toLowerCase());
  const index = new Map(names.map((h, i) => [h, i]));
  const missing = required.filter((r) => !index.has(r.toLowerCase()));
  if (missing.length) throw new Error(`Sheet is missing column(s): ${missing.join(", ")}`);
  // A second "Date" column would silently replace the first. Refuse instead.
  const doubled = required.filter((r) => names.filter((n) => n === r.toLowerCase()).length > 1);
  if (doubled.length) throw new Error(`Sheet has duplicate column(s): ${doubled.join(", ")}`);
  return body.map((cells) => (name: string) => {
    const i = index.get(name.toLowerCase());
    return i === undefined ? "" : (cells[i] ?? "").trim();
  });
}

/**
 * ISO only (2026-09-12), which the template's Date columns are formatted to.
 * A slashed date is skipped, not guessed: if a cell loses that format, Google
 * exports it in the sheet's locale, and 10/11/2026 could be 10 Nov or 11 Oct.
 * A wrong kick-off date is the failure this site most needs to avoid.
 */
export function parseDate(raw: string): string | null {
  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!iso) return null;
  const [y, m, d] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    return null;
  }
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const AGE_GROUPS: AgeGroupId[] = ["u7", "u9", "u11", "u12", "u13", "u15"];
const COMPETITIONS: Competition[] = ["MTC HopSol", "KSSR League"];

const match = <T extends string>(options: readonly T[], raw: string): T | undefined =>
  options.find((o) => o.toLowerCase() === raw.toLowerCase());

const score = (raw: string): number | null => (/^\d{1,2}$/.test(raw) ? Number(raw) : null);

/** Two rows can produce the same id; React keys must stay unique. */
function uniqueIds<T extends { id: string }>(items: T[]): T[] {
  const seen = new Map<string, number>();
  for (const item of items) {
    const n = (seen.get(item.id) ?? 0) + 1;
    seen.set(item.id, n);
    if (n > 1) item.id = `${item.id}-${n}`;
  }
  return items;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function parseFixtures(csv: string): Parsed<Fixture> {
  const rows = table(csv, ["Date", "Age group", "Competition", "Opponent", "Home/Away"]);
  const items: Fixture[] = [];
  let skipped = 0;

  for (const get of rows) {
    const date = parseDate(get("Date"));
    const ageGroup = match(AGE_GROUPS, get("Age group"));
    const competition = match(COMPETITIONS, get("Competition"));
    const opponent = get("Opponent");
    const side = get("Home/Away").toLowerCase();
    const [ours, theirs] = [get("Our score"), get("Their score")];
    const hasScore = ours !== "" || theirs !== "";
    const [scored, conceded] = [score(ours), score(theirs)];

    if (
      !date ||
      !ageGroup ||
      !competition ||
      !opponent ||
      (side !== "home" && side !== "away") ||
      (hasScore && (scored === null || conceded === null))
    ) {
      skipped++;
      continue;
    }

    const note = get("Note");
    items.push({
      id: `${date}-${ageGroup}-${slug(opponent)}`,
      date,
      time: get("Kick-off") || undefined,
      ageGroup,
      competition,
      opponent,
      venue: get("Venue") || "TBC",
      home: side === "home",
      result: hasScore
        ? { scored: scored as number, conceded: conceded as number, note: note || undefined }
        : undefined,
    });
  }

  return { items: uniqueIds(items), skipped };
}

const SUMMARY_MAX = 280;

/**
 * Only the club's Instagram is linked. A sheet edited by a well-meaning
 * volunteer, or compromised, must not be able to send parents elsewhere.
 */
export function instagramLink(raw: string): string | undefined {
  if (!raw) return undefined;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return undefined;
  }
  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || (host !== "instagram.com" && host !== "www.instagram.com")) {
    return undefined;
  }
  return `https://www.instagram.com${url.pathname}`;
}

export function parseNews(csv: string): Parsed<NewsArticle> {
  const rows = table(csv, ["Date", "Category", "Headline", "Summary"]);
  const items: NewsArticle[] = [];
  let skipped = 0;

  for (const get of rows) {
    const date = parseDate(get("Date"));
    const category = match<NewsCategory>(NEWS_CATEGORIES, get("Category"));
    const title = get("Headline");
    let excerpt = get("Summary");

    if (!date || !category || !title || !excerpt) {
      skipped++;
      continue;
    }
    // Shortened, not rejected: an over-long summary is a style problem, not a
    // reason to hide the club's news.
    if (excerpt.length > SUMMARY_MAX) {
      excerpt = `${excerpt.slice(0, SUMMARY_MAX).replace(/\s+\S*$/, "")}…`;
    }

    items.push({
      id: `${date}-${slug(title)}`,
      date,
      category,
      title,
      excerpt,
      image: newsImageFor(category),
      link: instagramLink(get("Instagram link")),
    });
  }

  items.sort((a, b) => b.date.localeCompare(a.date));
  return { items: uniqueIds(items), skipped };
}
