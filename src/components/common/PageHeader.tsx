import { cn } from "@/lib/utils";

interface PageHeaderProps {
  kicker: string;
  title: string;
  lead?: string;
  className?: string;
}

/** Every page opens with this: condensed mustard kicker, Anton title, lead. */
export function PageHeader({ kicker, title, lead, className }: PageHeaderProps) {
  return (
    <header className={cn("animate-rise", className)}>
      <p className="label-voice text-[14px] font-bold text-mustard-ink">{kicker}</p>
      <h1 className="mt-3 text-section">{title}</h1>
      {lead && <p className="mt-5 max-w-prose text-lead text-ink-body/80">{lead}</p>}
    </header>
  );
}
