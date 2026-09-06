import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fixed rather than derived from toLocaleDateString: newer ICU renders
// September as "Sept" in en-GB, which does not match the design and would
// change under the user's browser. Dates on this site are deterministic.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseISODate(iso: string): Date | null {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "Sat 12 Sep" — the format the design uses on fixture rows. */
export function formatFixtureDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  const day = String(d.getDate()).padStart(2, "0");
  return `${DAYS[d.getDay()]} ${day} ${MONTHS[d.getMonth()]}`;
}

/** "05 Sep" — the format the design uses on news cards. */
export function formatNewsDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`;
}
