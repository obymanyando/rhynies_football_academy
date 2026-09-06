import type { Fixture } from "./types";

/**
 * PLACEHOLDER DATA.
 *
 * Every row below carries `placeholder: true` and the UI labels them as such.
 * They exist so the layout can be seen and reviewed, not so anyone can read a
 * date off this page. Replace with the real season calendar when the Academy
 * supplies it, and drop the `placeholder` flag as each real row lands.
 */
export const fixtures: Fixture[] = [
  {
    id: "f1",
    ageGroup: "u13",
    competition: "MTC HopSol",
    opponent: "Quest Eleven FA",
    date: "2026-09-12",
    time: "09:00",
    venue: "Windhoek",
    home: true,
    placeholder: true,
  },
  {
    id: "f2",
    ageGroup: "u11",
    competition: "KSSR League",
    opponent: "Khomasdal Primary",
    date: "2026-09-19",
    time: "10:30",
    venue: "Windhoek West",
    home: true,
    placeholder: true,
  },
  {
    id: "r1",
    ageGroup: "u12",
    competition: "MTC HopSol",
    opponent: "Quest 11",
    date: "2026-09-05",
    venue: "Windhoek",
    home: true,
    result: {
      scored: 4,
      conceded: 0,
      note: "Goals: John, Sumar, Destin, Jayden. Great team. Great spirit. Great win.",
    },
    placeholder: true,
  },
];

export const upcomingFixtures = (): Fixture[] =>
  fixtures
    .filter((f) => !f.result)
    .sort((a, b) => a.date.localeCompare(b.date));

export const recentResults = (): Fixture[] =>
  fixtures
    .filter((f) => f.result)
    .sort((a, b) => b.date.localeCompare(a.date));
