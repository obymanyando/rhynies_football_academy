/**
 * The club's Google Sheet: the single source for fixtures, results and news.
 *
 * Owned by the club's Google account and shared as "anyone with the link can
 * view". The site reads each tab as CSV straight from the browser: Google's
 * export endpoint allows cross-origin reads and sends `no-cache`, so an edit
 * shows on the next page load with no build or deploy.
 *
 * `gid` is the number after `#gid=` in the tab's URL.
 */
export const CLUB_SHEET = {
  id: "",
  tabs: {
    fixtures: 0,
    news: 0,
  },
} as const;

export type SheetTab = keyof typeof CLUB_SHEET.tabs;

export const sheetCsvUrl = (tab: SheetTab): string =>
  `https://docs.google.com/spreadsheets/d/${CLUB_SHEET.id}/export?format=csv&gid=${CLUB_SHEET.tabs[tab]}`;
