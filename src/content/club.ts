import type { CoreValue } from "./types";

/**
 * Club identity. All final content — confirmed against the design handoff.
 *
 * Two corrections the older content notes get wrong, recorded so nobody
 * reintroduces them:
 *  - The club is "Rhynies", one n. Never "Rhynnies".
 *  - There are five core values. An older six-value list (with Inclusion,
 *    Excellence and Integrity) is superseded.
 */
export const club = {
  name: "Rhynies Stars Football Academy",
  shortName: "Rhynies Stars",
  hashtag: "#RhyniesFA",
  tagline:
    "Developing Footballers. Empowering Young People. Transforming Communities.",
  motto: "Together we play. Together we win.",
  affiliation: "Affiliated with Van Rhyn Primary School",
  location: "Windhoek, Namibia",
  address: {
    venue: "Van Rhyn Primary School",
    street: "Harvey Street, Windhoek West",
    city: "Windhoek, Namibia",
  },
  phone: {
    display: "+264 81 603 5328",
    tel: "+264816035328",
    whatsapp: "264816035328",
  },
  email: "rhyniesstars.fa@gmail.com",
  instagram: {
    handle: "@rhynies_football_academy",
    url: "https://www.instagram.com/rhynies_football_academy/",
  },
  vision:
    "To become one of Namibia's leading community-based football academies, developing talented footballers and responsible young citizens.",
  mission:
    "To provide accessible football development opportunities that promote football excellence, education, leadership, discipline, teamwork and community engagement.",
} as const;

/** In this order. The order is part of the brand. */
export const coreValues: CoreValue[] = [
  {
    name: "Respect",
    description:
      "Respect for teammates, coaches, officials, opponents and the community.",
  },
  {
    name: "Discipline",
    description:
      "Good habits, responsibility and accountability — at training and at school.",
  },
  {
    name: "Determination",
    description: "Turning up, working hard and keeping going when it is difficult.",
  },
  {
    name: "Teamwork",
    description: "Working together to achieve common goals.",
  },
  {
    name: "Success",
    description: "Progress measured on the pitch and in the classroom alike.",
  },
];

export const stats = [
  { value: "7–15", label: "Years of age" },
  { value: "5", label: "Age-group teams" },
  { value: "90", label: "Target player places" },
  { value: "2", label: "Leagues contested" },
];
