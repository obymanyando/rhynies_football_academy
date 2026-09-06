import type { Coach } from "./types";

/**
 * PLACEHOLDER DATA. Five coaches are expected, one per age group.
 * Names, portraits and bios to be supplied by the Academy — deliberately not
 * invented here, and shown as "to be confirmed" until real ones arrive.
 */
export const coaches: Coach[] = (
  ["u7", "u9", "u11", "u13", "u15"] as const
).map((ageGroup) => ({
  id: `coach-${ageGroup}`,
  ageGroup,
  role: `${ageGroup.toUpperCase()} Head Coach`,
  name: "Name to be confirmed",
  placeholder: true,
}));
