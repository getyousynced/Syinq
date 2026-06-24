import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Explicitly welcome AI search/citation crawlers (GEO). A blanket disallow or
 * blocking the search bots kills AI citations, the opposite of the goal.
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

const ADMIN_DISALLOW = ["/admin-", "/admin-portal", "/admin-dashboard", "/admin-users", "/admin-rides", "/admin-notifications"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ADMIN_DISALLOW },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/", disallow: ADMIN_DISALLOW })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
