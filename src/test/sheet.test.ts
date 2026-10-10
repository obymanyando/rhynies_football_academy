import { describe, expect, it } from "vitest";

import { recentResults, todayISO, upcomingFixtures } from "@/content/fixtures";
import { parseCsv, parseFixtures, parseNews } from "@/lib/sheet";

/**
 * The club edits a Google Sheet from a phone; the site reads it as CSV. These
 * pin down what happens with the mistakes a phone editor will make: a row that
 * cannot be shown correctly is skipped and counted, never shown half-wrong.
 */

const FIXTURE_HEADER = "Date,Kick-off,Age group,Competition,Opponent,Venue,Home/Away,Our score,Their score,Note";
const NEWS_HEADER = "Date,Category,Headline,Summary,Instagram link";

describe("parseCsv", () => {
  it("handles quoted commas, escaped quotes and newlines inside quotes", () => {
    const rows = parseCsv('a,b\n"x, y","say ""hi""\nthere"\r\n');
    expect(rows).toEqual([
      ["a", "b"],
      ["x, y", 'say "hi"\nthere'],
    ]);
  });

  it("drops fully blank lines, which a phone editor leaves behind", () => {
    expect(parseCsv("a,b\n,\n\n1,2\n")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });
});

describe("parseFixtures", () => {
  it("maps an upcoming fixture and a result", () => {
    const csv = [
      FIXTURE_HEADER,
      "2026-10-17,09:00,U13,MTC HopSol,Quest Eleven FA,Windhoek,Home,,,",
      "2026-09-12,,u12,mtc hopsol,Quest Eleven FA,Windhoek,Away,4,0,Goals: John and Sumar",
    ].join("\n");
    const { items, skipped } = parseFixtures(csv);
    expect(skipped).toBe(0);
    expect(items[0]).toMatchObject({
      date: "2026-10-17",
      time: "09:00",
      ageGroup: "u13",
      competition: "MTC HopSol",
      opponent: "Quest Eleven FA",
      venue: "Windhoek",
      home: true,
    });
    expect(items[0].result).toBeUndefined();
    // Dropdown values match case-insensitively.
    expect(items[1]).toMatchObject({
      date: "2026-09-12",
      ageGroup: "u12",
      competition: "MTC HopSol",
      home: false,
      result: { scored: 4, conceded: 0, note: "Goals: John and Sumar" },
    });
    expect(new Set(items.map((f) => f.id)).size).toBe(2);
  });

  it("finds columns by header name, so reordering columns breaks nothing", () => {
    const csv = [
      "Opponent,Date,Age group,Home/Away,Competition,Venue",
      "Khomasdal Primary,2026-10-24,U11,Home,KSSR League,Windhoek West",
    ].join("\n");
    const { items, skipped } = parseFixtures(csv);
    expect(skipped).toBe(0);
    expect(items[0]).toMatchObject({ opponent: "Khomasdal Primary", competition: "KSSR League" });
  });

  it.each([
    ["an impossible date", "2026-02-30,,U13,MTC HopSol,X,Windhoek,Home,,,"],
    ["a US-style date", "10/17/2026,,U13,MTC HopSol,X,Windhoek,Home,,,"],
    // Ambiguous: 11 Oct or 10 Nov, depending on the sheet's locale. Skipped, not guessed.
    ["a slashed date that could be either month", "10/11/2026,,U13,MTC HopSol,X,Windhoek,Home,,,"],
    ["a day-first date", "12/09/2026,,U13,MTC HopSol,X,Windhoek,Home,,,"],
    ["an unknown age group", "2026-10-17,,U10,MTC HopSol,X,Windhoek,Home,,,"],
    ["an unknown competition", "2026-10-17,,U13,Friendly Cup,X,Windhoek,Home,,,"],
    ["a missing opponent", "2026-10-17,,U13,MTC HopSol,,Windhoek,Home,,,"],
    ["only one score filled in", "2026-10-17,,U13,MTC HopSol,X,Windhoek,Home,3,,"],
    ["a non-numeric score", "2026-10-17,,U13,MTC HopSol,X,Windhoek,Home,three,1,"],
    ["neither Home nor Away", "2026-10-17,,U13,MTC HopSol,X,Windhoek,Neutral,,,"],
  ])("skips and counts a row with %s", (_why, row) => {
    const { items, skipped } = parseFixtures(`${FIXTURE_HEADER}\n${row}`);
    expect(items).toEqual([]);
    expect(skipped).toBe(1);
  });

  it("treats a missing venue as TBC rather than skipping the fixture", () => {
    const { items } = parseFixtures(`${FIXTURE_HEADER}\n2026-10-17,,U13,MTC HopSol,X,,Home,,,`);
    expect(items[0].venue).toBe("TBC");
  });

  it("throws when a required column is missing, so the page shows its error state", () => {
    expect(() => parseFixtures("Date,Opponent\n2026-10-17,X")).toThrow(/Age group/);
  });

  it("throws on a duplicated required column rather than silently using the last one", () => {
    expect(() => parseFixtures(`${FIXTURE_HEADER},Date\n2026-10-17,,U13,MTC HopSol,X,W,Home,,,,2026-12-25`)).toThrow(
      /duplicate column\(s\): Date/,
    );
  });

  it("returns nothing for a sheet with only its header row", () => {
    expect(parseFixtures(FIXTURE_HEADER)).toEqual({ items: [], skipped: 0 });
  });
});

describe("parseNews", () => {
  it("maps an article, normalises the Instagram link and sorts newest first", () => {
    const csv = [
      NEWS_HEADER,
      "2026-09-05,Match report,Four goals past Quest Eleven,A 4-0 win in the league.,instagram.com/p/abc123/",
      "2026-09-20,Academy,Trials open,U9 trials on Saturday.,",
    ].join("\n");
    const { items, skipped } = parseNews(csv);
    expect(skipped).toBe(0);
    expect(items.map((a) => a.title)).toEqual(["Trials open", "Four goals past Quest Eleven"]);
    expect(items[1]).toMatchObject({
      category: "Match report",
      date: "2026-09-05",
      excerpt: "A 4-0 win in the league.",
      link: "https://www.instagram.com/p/abc123/",
    });
    expect(items[0].link).toBeUndefined();
    expect(items[0].image).toBeTruthy();
  });

  it.each([
    ["a link to another site", "https://evil.example/instagram.com/p/x"],
    ["a lookalike domain", "https://instagram.com.evil.example/p/x"],
    ["a non-https scheme", "javascript:alert(1)"],
  ])("drops %s but keeps the article", (_why, link) => {
    const { items, skipped } = parseNews(`${NEWS_HEADER}\n2026-09-05,Academy,Title,Summary,${link}`);
    expect(skipped).toBe(0);
    expect(items[0].link).toBeUndefined();
  });

  it.each([
    ["a missing headline", "2026-09-05,Academy,,Summary,"],
    ["a bad date", "sometime,Academy,Title,Summary,"],
    ["an unknown category", "2026-09-05,Gossip,Title,Summary,"],
  ])("skips and counts an article with %s", (_why, row) => {
    const { items, skipped } = parseNews(`${NEWS_HEADER}\n${row}`);
    expect(items).toEqual([]);
    expect(skipped).toBe(1);
  });

  it("keeps ids unique when two same-day headlines slug alike", () => {
    const { items } = parseNews(`${NEWS_HEADER}\n2026-09-05,Academy,U13 win!,A,\n2026-09-05,Academy,U13 win,B,`);
    expect(new Set(items.map((a) => a.id)).size).toBe(2);
  });

  it("shortens an over-long summary instead of rejecting the article", () => {
    const long = "word ".repeat(100).trim();
    const { items } = parseNews(`${NEWS_HEADER}\n2026-09-05,Academy,Title,${long},`);
    expect(items[0].excerpt.length).toBeLessThanOrEqual(281);
    expect(items[0].excerpt.endsWith("…")).toBe(true);
  });
});

describe("todayISO", () => {
  it("is Windhoek's date, whatever the reader's timezone", () => {
    // 23:30 UTC on 16 Oct is already 17 Oct in Windhoek (UTC+2).
    expect(todayISO(new Date("2026-10-16T23:30:00Z"))).toBe("2026-10-17");
    expect(todayISO(new Date("2026-10-16T21:30:00Z"))).toBe("2026-10-16");
  });
});

describe("upcomingFixtures / recentResults", () => {
  const csv = [
    FIXTURE_HEADER,
    "2026-10-24,,U11,KSSR League,Later FC,Windhoek,Home,,,",
    "2026-10-17,,U13,MTC HopSol,Today FC,Windhoek,Home,,,",
    "2026-10-03,,U13,MTC HopSol,No Score FC,Windhoek,Away,,,",
    "2026-09-12,,U12,MTC HopSol,Quest Eleven FA,Windhoek,Away,4,0,",
    "2026-10-03,,U9,MTC HopSol,Recent FC,Windhoek,Home,1,1,",
  ].join("\n");
  const { items } = parseFixtures(csv);

  it("lists unplayed fixtures from today on, soonest first", () => {
    expect(upcomingFixtures(items, "2026-10-17").map((f) => f.opponent)).toEqual([
      "Today FC",
      "Later FC",
    ]);
  });

  it("drops a past match with no score instead of advertising it as upcoming", () => {
    const all = [...upcomingFixtures(items, "2026-10-17"), ...recentResults(items)];
    expect(all.map((f) => f.opponent)).not.toContain("No Score FC");
  });

  it("lists results newest first", () => {
    expect(recentResults(items).map((f) => f.opponent)).toEqual(["Recent FC", "Quest Eleven FA"]);
  });
});
