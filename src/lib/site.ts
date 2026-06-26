/**
 * Canonical site configuration & brand facts.
 * Source of truth for metadata, schema (sameAs), nav, and store links.
 *
 * NOTE FOR THE TEAM: social/profile URLs marked `// verify` are best-effort
 * and should be confirmed against the live accounts. Only confirmed URLs are
 * placed in JSON-LD `sameAs` (see lib/schema.ts) to keep entity resolution clean.
 */

export const SITE = {
  name: "Syinq",
  legalName: "Rasync Global Solutions Private Limited",
  url: "https://syinq.com",
  // ≤60-char default; pages override.
  title: "Campus Ridesharing with Verified Members | Syinq",
  tagline: "One App, For Every Campus Move.",
  description:
    "Syinq is India's verified campus commute network. Find, offer and coordinate shared rides with verified students from your own college, split costs fairly with OTP proof-of-pool.",
  email: "support@syinq.com",
  locale: "en_IN",
} as const;

export const STORE = {
  apple: "https://apps.apple.com/in/app/syinq/id6755780778",
  google: "https://play.google.com/store/apps/details?id=com.rasync.sync",
  // Platform-agnostic smart download link (routes to the right store / opens the app).
  oneLink: "https://onelink.to/7x25s5",
  appleId: "6755780778",
  androidPackage: "com.rasync.sync",
} as const;

// Confirmed official profiles.
export const SOCIAL = {
  instagram: "https://www.instagram.com/_syinq_",
  linkedin: "https://www.linkedin.com/company/rasync",
} as const;

/** App facts for SoftwareApplication schema, keep accurate, never inflate. */
export const APP_FACTS = {
  operatingSystem: "ANDROID, IOS",
  applicationCategory: "TravelApplication",
  priceINR: "0",
  // Review counts are tiny (~10 Play / 2 Apple), rating markup intentionally omitted.
} as const;

export const FOUNDERS = [
  {
    name: "Raunak Shukla",
    role: "Co-founder & CEO",
    bio: "Leads product and campus strategy at Syinq, turning everyday campus movement into a verified, structured network students can trust.",
    note: "Campus already moves together every single day, we're giving that energy a home. My vision for Syinq is simple: make every campus move feel trusted, effortless and shared, then grow that into the network India's students actually run their day on.",
    photo: "/revamp/photos/founder-raunak.webp",
    linkedin: "https://www.linkedin.com/in/raunak-shukla",
    email: "rsworks.in@gmail.com",
    knowsAbout: ["Campus mobility", "Ridesharing", "Product strategy", "Trust & safety"],
  },
  {
    name: "Rupesh Shandillya",
    role: "Co-founder & CTO",
    bio: "Builds Syinq's matching, verification and ride-lifecycle systems, the proof-of-pool and trust layer underneath every shared ride.",
    note: "I obsess over the boring stuff that makes trust real: matching, verification, OTP proof-of-pool. If a shared ride feels safe and just works, that's the whole game. We're engineering Syinq to feel faster than a WhatsApp message.",
    photo: "/revamp/photos/founder-rupesh.webp",
    linkedin: "https://www.linkedin.com/in/rupeshshandilya",
    email: "rupeshkshandilya@gmail.com",
    knowsAbout: ["Mobile engineering", "Route matching", "Verification systems"],
  },
] as const;

export type NavItem = { label: string; href: string; soon?: boolean };

export const NAV: NavItem[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Safety & Trust", href: "/safety" },
  { label: "For Hosts", href: "/for-hosts" },
  { label: "For Campuses", href: "/for-campuses" },
  { label: "Resources", href: "/blog" },
];

export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Safety & Trust", href: "/safety" },
      { label: "For Hosts", href: "/for-hosts" },
      { label: "For Campuses", href: "/for-campuses" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Resources", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Account Deletion", href: "/account-deletion" },
    ],
  },
];
