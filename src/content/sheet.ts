/**
 * The club's Google Sheet: the single source for fixtures, results and news.
 *
 * Shared as "anyone with the link can view". Created in Oby's Google account
 * for testing (2026-10-10); ownership is to be transferred to the club's
 * account, which keeps this id, so nothing here changes when it moves.
 *
 * The site reads each tab as CSV straight from the browser: Google's export
 * endpoint allows cross-origin reads and sends `no-cache`, so an edit shows on
 * the next page load with no build or deploy.
 *
 * `gid` is the number after `#gid=` in the tab's URL.
 */
export const CLUB_SHEET = {
  id: "1jREZU3SHd7g78m1AKjjkwSMOQIiPS-4HJRmIbly9lgw",
  tabs: {
    fixtures: 211927176,
    news: 280680790,
  },
} as const;

export type SheetTab = keyof typeof CLUB_SHEET.tabs;

const SHEETS = "https://docs.google.com/spreadsheets/d";

export const sheetCsvUrl = (tab: SheetTab): string =>
  `${SHEETS}/${CLUB_SHEET.id}/export?format=csv&gid=${CLUB_SHEET.tabs[tab]}`;
