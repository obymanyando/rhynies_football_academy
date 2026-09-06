import { coreValues } from "@/content/club";

/** Respect · Discipline · Determination · Teamwork · Success. Five, in order. */
export function ValuePills() {
  return (
    <ul className="flex flex-wrap gap-3">
      {coreValues.map((v) => (
        <li
          key={v.name}
          className="label-voice rounded-full bg-cream-tint px-[18px] py-[9px] text-[15px] font-bold text-ink"
        >
          {v.name}
        </li>
      ))}
    </ul>
  );
}
