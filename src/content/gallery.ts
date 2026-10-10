import type { GalleryImage } from "./types";

import matchForeground from "@/assets/images/match-foreground.jpeg";
import matchSpread from "@/assets/images/match-spread.jpeg";
import matchWide from "@/assets/images/match-wide.jpeg";
import teamHopsol1 from "@/assets/images/team-hopsol-1.jpeg";
import teamHopsol2 from "@/assets/images/team-hopsol-2.jpeg";
import teamHopsol3 from "@/assets/images/team-hopsol-3.jpeg";
import teamHopsol4 from "@/assets/images/team-hopsol-4.jpeg";
import teamHopsol5 from "@/assets/images/team-hopsol-5.jpeg";
import teamHopsol6 from "@/assets/images/team-hopsol-6.jpeg";
import trainingDuel from "@/assets/images/training-duel.jpeg";
import trainingPitch from "@/assets/images/training-pitch.jpeg";
import trainingTackle from "@/assets/images/training-tackle.jpeg";

/**
 * The Academy's own photographs. They are phone photographs — intrinsic sizes
 * are recorded so the browser reserves space and the page does not shift as
 * they load. Do not upscale; better images are expected later.
 *
 * The gallery flows in columns, top to bottom, so order decides which photos
 * stack together. A portrait is as tall as four landscapes, so the order is
 * portrait, 2 landscapes, 6 landscapes, portrait, 2 landscapes: at three
 * columns that puts a portrait atop the outer columns and balances all three,
 * and at two columns it splits evenly at the midpoint. Two portraits placed
 * anywhere else left a ~600px hole under one column.
 */
export const gallery: GalleryImage[] = [
  { src: trainingDuel, alt: "Two players competing for the ball in training", width: 490, height: 1008 },
  { src: teamHopsol1, alt: "Rhynies Stars squad photograph at an MTC HopSol fixture", width: 1008, height: 490 },
  { src: matchWide, alt: "Wide view of a Rhynies Stars match in progress", width: 1008, height: 490 },
  { src: teamHopsol4, alt: "Rhynies Stars players in maroon and gold, arm in arm at the MTC HopSol backdrop", width: 1008, height: 490 },
  { src: trainingPitch, alt: "Squad training session on the pitch in Windhoek", width: 1008, height: 490 },
  { src: teamHopsol5, alt: "The Rhynies Stars squad with their goalkeeper at an MTC HopSol fixture", width: 1008, height: 490 },
  { src: teamHopsol3, alt: "Rhynies Stars team group after an MTC HopSol match", width: 1008, height: 490 },
  { src: teamHopsol2, alt: "Rhynies Stars squad lined up before kick-off", width: 1008, height: 490 },
  { src: matchForeground, alt: "A player in a bib watches play unfold across the pitch", width: 1008, height: 490 },
  { src: trainingTackle, alt: "A Rhynies player, arm outstretched, chases a bibbed opponent who reaches the ball first", width: 490, height: 1008 },
  { src: matchSpread, alt: "Players spread across the pitch during a game in Windhoek", width: 1008, height: 490 },
  { src: teamHopsol6, alt: "Rhynies Stars players posing behind their kneeling goalkeeper", width: 1008, height: 490 },
];
