import { useEffect, useState } from "react";

import { sheetCsvUrl, type SheetTab } from "@/content/sheet";
import type { Fixture, NewsArticle } from "@/content/types";
import { parseFixtures, parseNews, type Parsed } from "@/lib/sheet";

type TabItem = { fixtures: Fixture; news: NewsArticle };

export type SheetState<T> =
  | { status: "loading" }
  | { status: "ready"; items: T[] }
  | { status: "error" };

const parsers = { fixtures: parseFixtures, news: parseNews } as const;

// Slow mobile data is the normal case; past this, show the fallback rather
// than a page that looks empty for good.
const TIMEOUT_MS = 10_000;

// One request per tab per page load, shared by every component that asks
// (Home and News both read news). A failure is evicted so the next visit retries.
const cache = new Map<SheetTab, Promise<Parsed<unknown>>>();

async function load<K extends SheetTab>(tab: K): Promise<Parsed<TabItem[K]>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(sheetCsvUrl(tab), { signal: controller.signal });
    if (!res.ok) throw new Error(`Sheet ${tab}: HTTP ${res.status}`);
    const parsed = parsers[tab](await res.text()) as Parsed<TabItem[K]>;
    if (parsed.skipped) {
      // Visible in the console, so a rising count shows the guide needs work.
      console.warn(`[sheet] ${tab}: skipped ${parsed.skipped} row(s) that could not be read`);
    }
    return parsed;
  } finally {
    clearTimeout(timer);
  }
}

export function useSheet<K extends SheetTab>(tab: K): SheetState<TabItem[K]> {
  const [state, setState] = useState<SheetState<TabItem[K]>>({ status: "loading" });

  useEffect(() => {
    let live = true;
    let pending = cache.get(tab) as Promise<Parsed<TabItem[K]>> | undefined;
    if (!pending) {
      pending = load(tab);
      cache.set(tab, pending);
      pending.catch(() => cache.delete(tab));
    }
    pending.then(
      ({ items }) => live && setState({ status: "ready", items }),
      (err: unknown) => {
        console.error(`[sheet] ${tab}:`, err);
        if (live) setState({ status: "error" });
      },
    );
    return () => {
      live = false;
    };
  }, [tab]);

  return state;
}

/** Test seam: forget cached requests between tests. */
export function resetSheetCache() {
  cache.clear();
}
