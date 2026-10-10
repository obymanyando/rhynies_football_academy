import matchForeground from "@/assets/images/match-foreground.jpeg";
import matchSpread from "@/assets/images/match-spread.jpeg";
import teamHopsol1 from "@/assets/images/team-hopsol-1.jpeg";
import teamHopsol6 from "@/assets/images/team-hopsol-6.jpeg";

/**
 * News itself lives in the club's Google Sheet (see `src/content/sheet.ts`).
 * The club never handles images: each story shows one of the club's own
 * photographs, chosen by its category. Decorative, so shown with empty alt.
 */
export const NEWS_CATEGORIES = ["Match report", "Academy", "Community", "Coaching"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

const imageByCategory: Record<NewsCategory, string> = {
  "Match report": matchForeground,
  Academy: teamHopsol1,
  Community: matchSpread,
  Coaching: teamHopsol6,
};

export const newsImageFor = (category: NewsCategory): string => imageByCategory[category];
