import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Explicitly welcome AI search/citation crawlers (GEO). A blanket disallow or
 * blocking the search bots kills AI citations — the opposite of the goal.
 * Admin surfaces are kept out of the index.
 */
const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin-", "/admin-portal", "/admin-dashboard", "/admin-users", "/admin-rides", "/admin-notifications"] },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
