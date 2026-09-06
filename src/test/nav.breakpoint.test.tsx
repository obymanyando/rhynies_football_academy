import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";
import { NAV_BREAKPOINT } from "@/lib/nav";

import { setViewportWidth } from "./setup";

/**
 * The handoff names this the single most visible failure mode: both navigations
 * rendering at once, or neither. These tests pin the boundary exactly.
 */
function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe("nav breakpoint", () => {
  beforeEach(() => setViewportWidth(1440));

  it(`renders exactly one nav at ${NAV_BREAKPOINT - 1}px`, () => {
    setViewportWidth(NAV_BREAKPOINT - 1);
    renderHeader();

    // Below the breakpoint the drawer is closed, so no <nav> is mounted at all —
    // only the Menu trigger. The desktop bar must not be present.
    expect(screen.queryAllByRole("navigation")).toHaveLength(0);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it(`renders exactly one nav at ${NAV_BREAKPOINT}px`, () => {
    setViewportWidth(NAV_BREAKPOINT);
    renderHeader();

    expect(screen.queryAllByRole("navigation")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: /menu/i })).not.toBeInTheDocument();
  });

  it("never renders both navigations at once", async () => {
    setViewportWidth(NAV_BREAKPOINT - 1);
    renderHeader();

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));

    // Drawer is open: one nav, not two.
    expect(screen.queryAllByRole("navigation")).toHaveLength(1);
  });

  it("closes the drawer on navigation", async () => {
    setViewportWidth(NAV_BREAKPOINT - 1);
    renderHeader();

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    const nav = screen.getByRole("navigation");
    await userEvent.click(within(nav).getByRole("link", { name: /^about$/i }));

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("closes the drawer on Escape", async () => {
    setViewportWidth(NAV_BREAKPOINT - 1);
    renderHeader();

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});

describe("date formatting", () => {
  it("renders September as 'Sep', not 'Sept'", async () => {
    const { formatFixtureDate, formatNewsDate } = await import("@/lib/utils");
    expect(formatFixtureDate("2026-09-12")).toBe("Sat 12 Sep");
    expect(formatNewsDate("2026-09-05")).toBe("05 Sep");
  });

  it("returns the input unchanged when the date is unparseable", async () => {
    const { formatFixtureDate } = await import("@/lib/utils");
    expect(formatFixtureDate("not-a-date")).toBe("not-a-date");
  });
});
