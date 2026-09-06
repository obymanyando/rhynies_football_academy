import { NavLink } from "react-router-dom";

import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** The nine inline links plus the Support Us pill. Rendered only at >= 1180px. */
export function DesktopNav() {
  return (
    <nav aria-label="Main" className="ml-auto flex items-center">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "label-voice relative px-[11px] py-[30px] text-[16px] font-semibold transition-colors",
              "text-sand-warm hover:text-white",
              // The active page carries a 4px underline inset from each side.
              isActive &&
                "text-white after:absolute after:inset-x-[11px] after:bottom-0 after:h-1 after:bg-mustard-bright",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
      <NavLink
        to="/support"
        className="label-voice ml-3 rounded-full bg-mustard px-5 py-2.5 text-[16px] font-bold text-ink transition-colors hover:bg-mustard-bright active:bg-mustard-deep"
      >
        Support Us
      </NavLink>
    </nav>
  );
}
