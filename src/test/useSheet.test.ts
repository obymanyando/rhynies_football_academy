import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resetSheetCache, useSheet } from "@/lib/useSheet";

const NEWS = "Date,Category,Headline,Summary,Instagram link\n2026-09-05,Academy,Trials open,U9 trials.,\n";

function mockFetch(...responses: Array<Response | Error>) {
  const fn = vi.fn();
  for (const r of responses) {
    if (r instanceof Error) fn.mockRejectedValueOnce(r);
    else fn.mockResolvedValueOnce(r);
  }
  vi.stubGlobal("fetch", fn);
  return fn;
}

describe("useSheet", () => {
  beforeEach(() => {
    resetSheetCache();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("starts loading, then returns the parsed rows", async () => {
    mockFetch(new Response(NEWS));
    const { result } = renderHook(() => useSheet("news"));
    expect(result.current.status).toBe("loading");
    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.status === "ready" && result.current.items[0].title).toBe("Trials open");
  });

  it("reports an error when Google answers with a failure", async () => {
    mockFetch(new Response("nope", { status: 404 }));
    const { result } = renderHook(() => useSheet("news"));
    await waitFor(() => expect(result.current.status).toBe("error"));
  });

  it("reports an error when a required column has been deleted from the sheet", async () => {
    mockFetch(new Response("Date,Headline\n2026-09-05,Trials open\n"));
    const { result } = renderHook(() => useSheet("news"));
    await waitFor(() => expect(result.current.status).toBe("error"));
  });

  it("gives up after the timeout and shows the error state, not an endless spinner", async () => {
    vi.useFakeTimers();
    try {
      // A fetch that never answers on its own, only to the abort signal.
      vi.stubGlobal(
        "fetch",
        vi.fn(
          (_url: string, init?: RequestInit) =>
            new Promise((_resolve, reject) =>
              init?.signal?.addEventListener("abort", () =>
                reject(new DOMException("aborted", "AbortError")),
              ),
            ),
        ),
      );
      const { result } = renderHook(() => useSheet("news"));
      expect(result.current.status).toBe("loading");
      // act() lets React flush the update; fake timers also freeze its scheduler.
      await act(() => vi.advanceTimersByTimeAsync(9_999));
      expect(result.current.status).toBe("loading");
      await act(() => vi.advanceTimersByTimeAsync(1));
      expect(result.current.status).toBe("error");
    } finally {
      vi.useRealTimers();
    }
  });

  it("shares one request between components, and retries after a failure", async () => {
    const fetchMock = mockFetch(new Error("offline"), new Response(NEWS));
    const first = renderHook(() => useSheet("news"));
    const second = renderHook(() => useSheet("news"));
    await waitFor(() => expect(first.result.current.status).toBe("error"));
    await waitFor(() => expect(second.result.current.status).toBe("error"));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const retry = renderHook(() => useSheet("news"));
    await waitFor(() => expect(retry.result.current.status).toBe("ready"));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
