import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Small mustard text (kickers, labels) on light grounds is the site's most
 * repeated text style, and it shipped failing WCAG AA: `mustard-deep` measured
 * 2.6:1 on cream. These tests read the tokens straight from index.css, so a
 * future edit to a token value is caught here rather than on the live site.
 */

const SRC = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(SRC, "index.css"), "utf8");

function token(name: string): [number, number, number] {
  const m = css.match(new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (!m) throw new Error(`token --${name} not found in index.css`);
  return [Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100];
}

function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)];
}

function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE: [number, number, number] = [1, 1, 1];

describe("small mustard text on light grounds", () => {
  const grounds = {
    cream: hslToRgb(token("cream")),
    "cream-tint": hslToRgb(token("cream-tint")),
    white: WHITE,
  };

  for (const [name, ground] of Object.entries(grounds)) {
    it(`mustard-ink clears AA (4.5:1) on ${name}`, () => {
      expect(contrast(hslToRgb(token("mustard-ink")), ground)).toBeGreaterThanOrEqual(4.5);
    });
  }

  it("the check discriminates: mustard-deep, the colour that shipped, scores below AA on cream", () => {
    const score = contrast(hslToRgb(token("mustard-deep")), grounds.cream);
    expect(score).toBeLessThan(3);
    expect(score).toBeGreaterThan(2.4);
  });

  it("no component sets text in mustard or mustard-deep, which fail AA on every light ground", () => {
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(p);
        // Relative to src, so a clone that happens to live under a folder named
        // "test" does not exclude every file and pass vacuously.
        else if (
          /\.tsx?$/.test(entry.name) &&
          path.relative(SRC, p).split(path.sep)[0] !== "test"
        ) {
          // Plain mustard is 2.0:1 on white, failing even the 3:1 large-text bar.
          if (/\btext-mustard(-deep)?(?![\w-])/.test(fs.readFileSync(p, "utf8"))) {
            offenders.push(path.relative(SRC, p));
          }
        }
      }
    };
    walk(SRC);
    expect(offenders).toEqual([]);
  });
});
