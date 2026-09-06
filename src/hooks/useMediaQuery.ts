import { useEffect, useState } from "react";

/**
 * Subscribes to a media query.
 *
 * The nav uses this to render exactly one of the two navigations rather than
 * putting both in the DOM and hiding one with CSS. Two DOM trees would leak
 * duplicate links to screen readers and to keyboard tab order.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const list = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(list.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
