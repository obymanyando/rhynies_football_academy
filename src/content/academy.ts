import type { AgeGroup, Programme, SupportTier } from "./types";

/** Final content. The pathway is U7–U15; U12 exists as a league entry only. */
export const ageGroups: AgeGroup[] = [
  {
    id: "u7",
    label: "U7",
    full: "Under 7",
    description:
      "Introduction to football through fun, participation, coordination and basic technical development.",
    maxPlayers: 18,
    inLeague: false,
  },
  {
    id: "u9",
    label: "U9",
    full: "Under 9",
    description: "Development of fundamental football skills and confidence.",
    maxPlayers: 18,
    inLeague: true,
  },
  {
    id: "u11",
    label: "U11",
    full: "Under 11",
    description:
      "Improved technical training and introduction to tactical concepts.",
    maxPlayers: 18,
    inLeague: true,
  },
  {
    id: "u13",
    label: "U13",
    full: "Under 13",
    description: "Advanced technical development and competitive football.",
    maxPlayers: 18,
    inLeague: true,
  },
  {
    id: "u15",
    label: "U15",
    full: "Under 15",
    description:
      "Preparation for higher levels of football participation and leadership development.",
    maxPlayers: 18,
    inLeague: false,
  },
];

export const totalCapacity = ageGroups.reduce((n, g) => n + g.maxPlayers, 0);

/**
 * The squads are U7/U9/U11/U13/U15, but the MTC HopSol entry is U9/U11/U12/U13.
 * The two lists genuinely differ — U12 plays league football without being a
 * squad in the pathway, and U7/U15 are squads not yet entered.
 */
export const leagueEntries = ["U9", "U11", "U12", "U13"] as const;
export const leagueEntriesFrom2027 = ["U7", "U15"] as const;

export const programmes: Programme[] = [
  {
    number: "Programme 01",
    title: "Football development",
    description:
      "A structured curriculum that grows with the player — from first touches at U7 to competitive match preparation at U15.",
    items: [
      "Technical development",
      "Tactical understanding",
      "Ball mastery",
      "Physical literacy",
      "Match awareness",
      "Goalkeeper development",
    ],
  },
  {
    number: "Programme 02",
    title: "Leadership & life skills",
    description:
      "Beyond football, we help young people develop the habits that carry into school, work and family life.",
    items: [
      "Confidence",
      "Communication",
      "Leadership",
      "Teamwork",
      "Time management",
      "Sportsmanship",
    ],
  },
  {
    number: "Programme 03",
    title: "Community engagement",
    description:
      "The Academy only works because the community runs it. We work closely with the people around every player to promote positive youth development through sport.",
    items: [
      "Parents and guardians",
      "Schools",
      "Community members",
      "Local football stakeholders",
    ],
  },
];

export const supportAreas = [
  {
    title: "Kit",
    description:
      "Playing strips, training bibs, socks and shin pads across five age groups.",
  },
  {
    title: "Equipment",
    description:
      "Balls, cones, goalkeeper gloves and portable goals for training sessions.",
  },
  {
    title: "Transport",
    description:
      "Getting squads to away fixtures across Windhoek, and water on matchdays.",
  },
  {
    title: "League fees",
    description:
      "Entry and registration for the KSSR and MTC HopSol competitions.",
  },
];

export const supportTiers: SupportTier[] = [
  {
    tier: "Tier one",
    title: "Kit a player",
    description:
      "A full playing strip, socks and shin pads for one child for the season.",
    audience: "Individual donors and small businesses.",
  },
  {
    tier: "Tier two",
    title: "Cover a matchday",
    description:
      "Transport, water and referee fees so a squad can travel and play.",
    audience: "Named in the matchday post on Instagram.",
  },
  {
    tier: "Tier three",
    title: "Back an age group",
    description:
      "Season-long partnership with one of our five teams — kit branding, matchday presence and a place on this website.",
    audience: "Corporate partners.",
  },
];
