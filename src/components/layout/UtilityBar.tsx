import { club } from "@/content/club";

/**
 * The left group truncates with an ellipsis before the right group gives way —
 * the Instagram link and hashtag stay reachable at every width.
 */
export function UtilityBar() {
  return (
    <div className="bg-ink text-[12px]">
      <div className="content-column flex min-h-[38px] items-center gap-3">
        <div className="label-voice flex min-w-0 flex-1 items-center gap-2 truncate text-sand">
          <span className="text-mustard-bright">{club.location}</span>
          <span aria-hidden="true" className="text-sand/30">
            |
          </span>
          <span className="truncate">{club.affiliation}</span>
        </div>
        <div className="label-voice flex shrink-0 items-center gap-3 text-sand">
          <a
            href={club.instagram.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sand transition-colors hover:text-mustard-bright"
          >
            Instagram
          </a>
          <span className="text-mustard-bright">{club.hashtag}</span>
        </div>
      </div>
    </div>
  );
}
