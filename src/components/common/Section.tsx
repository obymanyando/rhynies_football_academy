import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Dark ground sections invert the text colours. */
  variant?: "cream" | "ink" | "tint";
  id?: string;
}

export function Section({ children, className, variant = "cream", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-section",
        variant === "cream" && "bg-cream text-ink-body",
        variant === "tint" && "bg-cream-tint text-ink-body",
        variant === "ink" && "bg-ink-header text-sand",
        className,
      )}
    >
      <div className="content-column">{children}</div>
    </section>
  );
}
