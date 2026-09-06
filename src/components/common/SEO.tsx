import { useEffect } from "react";

import { club } from "@/content/club";

interface SEOProps {
  title: string;
  description: string;
}

/**
 * Per-page title and meta description.
 *
 * Client-side is sufficient here: search crawlers render JS, and the social
 * link-preview requirement that would have forced server-rendered meta tags
 * was retired before this build.
 */
export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = `${title} — ${club.shortName}`;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
