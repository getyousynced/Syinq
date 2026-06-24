export type Block =
  | { t: "answer"; text: string }
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  readingMins: number;
  tag: string;
  body: Block[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "is-carpooling-legal-in-india",
    title: "Is carpooling legal in India? A student's guide",
    description:
      "A clear, answer-first guide to carpooling laws in India for students, cost-sharing vs commercial hire, what's allowed, and how verified campus pooling stays on the right side.",
    datePublished: "2026-05-10",
    dateModified: "2026-06-20",
    readingMins: 5,
    tag: "Legality",
    body: [
      {
        t: "answer",
        text: "Genuine cost-sharing carpooling, where private individuals split the running cost of a trip they were already making, is widely practised in India. What is restricted is using a private (white-plate) vehicle as a commercial taxi for profit. The line is profit: sharing fuel costs is fine; running a private car as a paid hire service generally is not.",
      },
      { t: "h2", text: "Cost-sharing vs commercial hire, the key distinction" },
      {
        t: "p",
        text: "Indian motor-vehicle rules separate private vehicles from commercial transport vehicles, which need permits, commercial registration and a commercial driving licence. Carpooling stays in the private lane when members only split actual running costs (fuel, tolls) and nobody is profiting.",
      },
      {
        t: "p",
        text: "Syinq is built precisely around this distinction. Members share 'their share' of the running cost and settle directly with the Host. Syinq never sets a fare, never takes the ride as its own, and never positions a member as a commercial driver.",
      },
      { t: "h2", text: "What students should keep in mind" },
      {
        t: "ul",
        items: [
          "Treat it as cost-sharing, not income, split fuel and tolls, don't run a profit.",
          "Keep your documents valid: licence, registration and insurance.",
          "Follow your campus and local rules, which can vary by state and change over time.",
          "Pool with verified people, Syinq limits coordination to your campus network.",
        ],
      },
      { t: "h2", text: "How verified campus pooling helps" },
      {
        t: "p",
        text: "Because Syinq restricts rides to verified campus members and records a shared ride with OTP proof-of-pool, it keeps pooling transparent and accountable, closer to friends sharing a commute than to anonymous paid rides. This guide is general information, not legal advice; check your state's current rules.",
      },
    ],
  },
  {
    slug: "what-is-proof-of-pool",
    title: "What is proof-of-pool? Syinq's OTP boarding explained",
    description:
      "Proof-of-pool is Syinq's OTP boarding check that confirms a shared campus ride really happened. Here's how it works and why it matters for trust.",
    datePublished: "2026-05-22",
    dateModified: "2026-06-18",
    readingMins: 4,
    tag: "Trust",
    body: [
      {
        t: "answer",
        text: "Proof-of-pool is Syinq's OTP-based boarding check: the Host receives a one-time code and the Rider enters it at pickup. It confirms the right members are in the right ride and creates a verifiable record that a shared ride actually took place, the foundation of campus trust and accountability.",
      },
      { t: "h2", text: "Why a shared ride needs proof" },
      {
        t: "p",
        text: "In informal WhatsApp coordination there's no record that a ride happened, who was in it, or whether plans changed at the last minute. That ambiguity is exactly what makes campus coordination feel risky. Proof-of-pool replaces 'I think they showed up' with a confirmed boarding event.",
      },
      { t: "h2", text: "How OTP boarding works on Syinq" },
      {
        t: "ul",
        items: [
          "The Host accepts a Rider's request and starts the ride.",
          "Syinq issues a one-time code to the Host.",
          "At pickup, the Rider enters the code to confirm boarding.",
          "The ride moves to an active, tracked state with SOS readiness.",
        ],
      },
      {
        t: "p",
        text: "Putting the code on the Host's side means the Host controls when the ride actually starts, and the Rider's entry confirms the physical match. Proof-of-pool is an accountability tool, not a safety guarantee, always use your judgement and Syinq's in-app safety features.",
      },
    ],
  },
  {
    slug: "how-to-start-a-campus-carpool",
    title: "How to start a campus carpool (and actually keep it running)",
    description:
      "A practical playbook for students and clubs to start a verified campus carpool that survives past week one, routes, timing, trust and habit.",
    datePublished: "2026-06-02",
    readingMins: 6,
    tag: "Playbook",
    body: [
      {
        t: "answer",
        text: "To start a campus carpool that lasts, pick one busy repeating route (like campus → metro), get a handful of verified members and Hosts on it, fix rough departure windows, and use proof-of-pool plus ratings so people trust each round. Density on one route beats spreading thin across many.",
      },
      { t: "h2", text: "1. Pick one route with real, repeating demand" },
      {
        t: "p",
        text: "The campus gate to the nearest metro, station or housing cluster usually has dozens of students moving at the same times. Concentrating on one such route creates the liquidity that makes matches happen quickly.",
      },
      { t: "h2", text: "2. Seed both sides, Riders and Hosts" },
      {
        t: "p",
        text: "A carpool needs people with spare seats (Hosts) and people who need them (Riders). Recruit a few regular Hosts who drive that route daily, and let Riders save their route as Looking so demand is visible even before a ride exists.",
      },
      { t: "h2", text: "3. Make trust and habit automatic" },
      {
        t: "ul",
        items: [
          "Keep coordination verified, campus members only.",
          "Use OTP proof-of-pool every ride so boarding is confirmed.",
          "Rate each ride to build reputation that compounds.",
          "Share costs fairly so it stays cheaper than going solo.",
        ],
      },
      {
        t: "p",
        text: "Clubs and E-Cells make great anchors: they already coordinate students and can run a route as a service to members. If you want to launch pooling formally on your campus, Syinq partners with administrations and student bodies to get started.",
      },
    ],
  },
];

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
