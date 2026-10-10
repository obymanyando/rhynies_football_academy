import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FixtureRow } from "@/components/fixtures/FixtureRow";
import type { Fixture } from "@/content/types";

/**
 * Once the club's sheet is live, every score they enter is rendered here. The
 * row used to say "beat" for any result, so a 0–3 loss read as a win.
 */
const base: Fixture = {
  id: "x",
  ageGroup: "u13",
  competition: "MTC HopSol",
  opponent: "Khomasdal Primary",
  date: "2026-10-03",
  venue: "Windhoek",
  home: true,
};

const line = (f: Fixture) => {
  render(
    <ul>
      <FixtureRow fixture={f} />
    </ul>,
  );
  return screen.getByText(/Rhynies Stars/).textContent?.replace(/\s+/g, " ").trim();
};

describe("FixtureRow", () => {
  it.each([
    [3, 1, "Rhynies Stars beat Khomasdal Primary"],
    [1, 1, "Rhynies Stars drew with Khomasdal Primary"],
    [0, 3, "Rhynies Stars lost to Khomasdal Primary"],
  ])("a %i–%i result reads as the right outcome", (scored, conceded, expected) => {
    expect(line({ ...base, result: { scored, conceded } })).toBe(expected);
  });

  it("an unplayed fixture reads 'v'", () => {
    expect(line(base)).toBe("Rhynies Stars v Khomasdal Primary");
  });
});
