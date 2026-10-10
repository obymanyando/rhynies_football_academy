import { club } from "@/content/club";

/**
 * What a reader sees while the club's sheet loads, when it has nothing in it,
 * or when it cannot be read (offline, Google down, sheet unshared). Points to Instagram, where the club
 * posts the same news, so a parent is never left with a blank page.
 */
export function SheetStatus({
  status,
  what,
}: {
  status: "loading" | "error" | "empty";
  what: string;
}) {
  if (status === "empty") {
    return (
      <p className="mt-6 text-[17px] text-ink-body/80">
        No {what} yet. Follow the club on{" "}
        <a
          href={club.instagram.url}
          className="font-semibold underline decoration-mustard decoration-2 underline-offset-4 hover:text-link-hover"
        >
          Instagram
        </a>{" "}
        for the latest.
      </p>
    );
  }
  if (status === "loading") {
    return (
      <p className="mt-6 text-[17px] text-ink-body/70" role="status">
        Loading {what}…
      </p>
    );
  }
  return (
    <p className="mt-6 text-[17px] text-ink-body/80" role="status">
      We couldn&apos;t load the latest {what} just now. The club posts every update on{" "}
      <a
        href={club.instagram.url}
        className="font-semibold underline decoration-mustard decoration-2 underline-offset-4 hover:text-link-hover"
      >
        Instagram
      </a>
      .
    </p>
  );
}

/** "See it on Instagram →" under a story the club also posted there. */
export function InstagramPostLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label-voice mt-3 inline-block text-[14px] font-bold underline decoration-mustard decoration-2 underline-offset-4 hover:text-link-hover"
    >
      See it on Instagram →
    </a>
  );
}
