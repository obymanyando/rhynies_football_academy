import { describe, expect, it } from "vitest";

import { CLUB_SHEET, sheetCsvUrl } from "@/content/sheet";

/**
 * With an empty id every page shows "couldn't load"; with equal gids, News
 * fetches the Fixtures tab and fails its column check. Both are silent at
 * build time, so they are pinned here.
 */
describe("CLUB_SHEET", () => {
  it("has a real Google Sheets id", () => {
    expect(CLUB_SHEET.id).toMatch(/^[A-Za-z0-9_-]{20,}$/);
  });

  it("points Fixtures and News at different tabs", () => {
    expect(CLUB_SHEET.tabs.fixtures).not.toBe(CLUB_SHEET.tabs.news);
  });

  it("builds the CSV export URL the site fetches", () => {
    expect(sheetCsvUrl("news")).toBe(
      `https://docs.google.com/spreadsheets/d/${CLUB_SHEET.id}/export?format=csv&gid=${CLUB_SHEET.tabs.news}`,
    );
  });
});
