import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import crest from "@/assets/images/crest-2026.jpeg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NAV_BREAKPOINT } from "@/lib/nav";

import { DesktopNav } from "./DesktopNav";
import { MobileDrawer } from "./MobileDrawer";

/**
 * Sticky header, 84px tall.
 *
 * The height is set by the --header-h token rather than a literal, because the
 * fixtures filter bar sticks directly below it and derives its own offset from
 * the same value. Hardcoding the two independently is recorded in the handoff
 * as having broken twice.
 */
export function Header() {
  const isDesktop = useMediaQuery(`(min-width: ${NAV_BREAKPOINT}px)`);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Never leave the drawer mounted once the desktop bar takes over.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-ink-header shadow-header">
      <div className="content-column flex h-header items-center gap-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Rhynies Stars Football Academy — home">
          <span className="grid size-[clamp(38px,10vw,56px)] shrink-0 place-items-center rounded-full bg-cream p-0.5 shadow-crest">
            <img
              src={crest}
              alt=""
              width={56}
              height={56}
              className="size-full rounded-full object-contain"
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[clamp(18px,3vw,24px)] uppercase tracking-[0.02em] text-white">
              Rhynies Stars
            </span>
            <span className="label-voice block text-[clamp(11px,1.6vw,13px)] font-semibold text-mustard-bright">
              Football Academy
            </span>
          </span>
        </Link>

        {/* Exactly one navigation exists in the DOM at any width. */}
        {isDesktop ? (
          <DesktopNav />
        ) : (
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className="label-voice ml-auto flex items-center gap-2 rounded-full bg-mustard px-5 py-2.5 text-[16px] font-bold text-ink transition-colors hover:bg-mustard-bright"
          >
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-[2px] w-4 bg-ink" />
              <span className="block h-[2px] w-4 bg-ink" />
              <span className="block h-[2px] w-4 bg-ink" />
            </span>
            Menu
          </button>
        )}
      </div>

      {/* Hard mustard rule directly under the header — a brand device.
          Height comes from the token so it stays in step with the sticky
          offsets that are calculated from it. */}
      <div
        aria-hidden="true"
        className="w-full bg-mustard"
        style={{ height: "var(--header-rule-h)" }}
      />

      {!isDesktop && (
        <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
