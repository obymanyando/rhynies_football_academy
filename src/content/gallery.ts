import type { GalleryImage } from "./types";

import matchWide from "@/assets/images/match-wide.jpeg";
import teamHopsol1 from "@/assets/images/team-hopsol-1.jpeg";
import teamHopsol2 from "@/assets/images/team-hopsol-2.jpeg";
import teamHopsol3 from "@/assets/images/team-hopsol-3.jpeg";
import trainingDuel from "@/assets/images/training-duel.jpeg";
import trainingPitch from "@/assets/images/training-pitch.jpeg";

/**
 * The Academy's own photographs. They are phone photographs — intrinsic sizes
 * are recorded so the browser reserves space and the page does not shift as
 * they load. Do not upscale; better images are expected later.
 */
export const gallery: GalleryImage[] = [
  { src: trainingPitch, alt: "Squad training session on the pitch in Windhoek", width: 1008, height: 490 },
  { src: teamHopsol1, alt: "Rhynies Stars squad photograph at an MTC HopSol fixture", width: 1008, height: 490 },
  { src: trainingDuel, alt: "Two players competing for the ball in training", width: 490, height: 1008 },
  { src: teamHopsol2, alt: "Rhynies Stars squad lined up before kick-off", width: 1008, height: 490 },
  { src: matchWide, alt: "Wide view of a Rhynies Stars match in progress", width: 1008, height: 490 },
  { src: teamHopsol3, alt: "Rhynies Stars team group after an MTC HopSol match", width: 1008, height: 490 },
];

export { trainingPitch, trainingDuel, matchWide };
