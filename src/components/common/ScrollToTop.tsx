import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Navigation should land at the top of the new page, as it would on a real site. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
