import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { navItems } from "@/lib/nav";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-width drawer for widths below the nav breakpoint.
 *
 * The design prototype had none of the dismissal behaviour a drawer needs —
 * the handoff flags this explicitly. Escape, outside click and focus trapping
 * are added here.
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Trap focus inside the open drawer.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Deferred so the click that opened the drawer does not immediately close it.
    const id = window.setTimeout(
      () => document.addEventListener("mousedown", onPointerDown),
      0,
    );

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-nav-drawer"
      className="absolute inset-x-0 top-full max-h-[70vh] animate-fade overflow-y-auto bg-ink"
    >
      <nav aria-label="Main" className="content-column flex flex-col py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="label-voice border-b border-mustard/[0.14] py-4 text-[20px] font-semibold text-sand-warm transition-colors hover:text-white"
          >
            {item.longLabel ?? item.label}
          </NavLink>
        ))}
        <NavLink
          to="/support"
          onClick={onClose}
          className="label-voice my-5 self-start rounded-full bg-mustard px-6 py-3 text-[16px] font-bold text-ink transition-colors hover:bg-mustard-bright"
        >
          Support Us
        </NavLink>
      </nav>
    </div>
  );
}
