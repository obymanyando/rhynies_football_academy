import "@testing-library/jest-dom/vitest";

/**
 * jsdom has no matchMedia. The nav depends on it to decide which navigation to
 * render, so tests install a controllable stub.
 */
let currentWidth = 1440;

export function setViewportWidth(width: number) {
  currentWidth = width;
  window.dispatchEvent(new Event("resize"));
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => {
    const match = query.match(/min-width:\s*(\d+)px/);
    const min = match ? Number(match[1]) : 0;
    return {
      get matches() {
        return currentWidth >= min;
      },
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    };
  },
});
