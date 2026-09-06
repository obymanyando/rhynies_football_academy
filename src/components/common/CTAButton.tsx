import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

interface CTAButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}

const base =
  "label-voice inline-flex items-center justify-center rounded-full px-7 py-4 text-[17px] font-bold transition-colors";

const variants = {
  primary: "bg-mustard text-ink hover:bg-mustard-bright active:bg-mustard-deep",
  ghost: "border-2 border-white/70 text-white hover:border-white hover:bg-white/10",
  dark: "bg-ink-header text-white hover:bg-link-hover",
} as const;

export function CTAButton({ to, href, children, variant = "primary", className }: CTAButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to ?? "/"} className={classes}>
      {children}
    </Link>
  );
}
