export type Faq = { q: string; a: string; category: "Basics" | "Safety & Trust" | "Cost" | "Hosts" | "Campuses" };

/**
 * Answer-first FAQ copy: each answer leads with a direct 1-2 sentence response
 * (good for featured snippets + AI extraction), then adds detail.
 * Voice: Host / Rider / Member, "your share", proof-of-pool. No fare/driver/cab.
 */
export const FAQS: Faq[] = [
  {
    category: "Basics",
    q: "What is Syinq?",
    a: "Syinq is a verified campus commute network. It lets verified members of the same college find, offer and coordinate shared rides with each other, then split the cost fairly. Syinq does not own vehicles — it is the coordination and trust layer between members.",
  },
  {
    category: "Basics",
    q: "How does campus carpooling on Syinq work?",
    a: "A Host offers a ride on a route with spare seats; a Rider going the same way requests to join. Once the Host accepts, you both confirm the ride with an OTP (proof-of-pool) at pickup, ride together, and settle the shared cost. If no ride exists yet, save your route as 'Looking' and Syinq notifies you when a matching Host appears.",
  },
  {
    category: "Basics",
    q: "Who can use Syinq?",
    a: "Verified members of a supported campus — students, faculty, staff and approved alumni. Everyone joins through a campus-verification step, so you are coordinating with real people from your own university network, not anonymous strangers.",
  },
  {
    category: "Basics",
    q: "Which campuses is Syinq live on?",
    a: "Syinq is rolling out campus-by-campus, starting with dense clusters in the Delhi-NCR / Greater Noida belt. Route liquidity is built one campus at a time, so availability depends on how many verified members are active on your campus and route.",
  },
  {
    category: "Safety & Trust",
    q: "Is student carpooling safe on Syinq?",
    a: "Syinq is built around verified-campus trust: only verified members can join, every ride uses OTP proof-of-pool, rides have live status and SOS readiness, and members rate each other afterwards. Syinq supports safer coordination but cannot guarantee any outcome — always use your own judgement and the in-app safety tools.",
  },
  {
    category: "Safety & Trust",
    q: "What is proof-of-pool?",
    a: "Proof-of-pool is Syinq's OTP boarding check: the Host receives a one-time code and the Rider enters it at pickup to confirm the right people are in the right ride. It creates a verifiable record that a shared ride actually happened — the foundation of campus trust and accountability.",
  },
  {
    category: "Safety & Trust",
    q: "How are members verified?",
    a: "Members verify their campus identity to join the network, and Hosts complete additional vehicle and licence checks before offering rides. Verification badges are visible wherever you make a decision, so you can see who you are coordinating with.",
  },
  {
    category: "Safety & Trust",
    q: "Is carpooling legal in India?",
    a: "Genuine cost-sharing carpooling between private individuals is widely practised in India, but rules around using a private vehicle for commercial hire vary by state and over time. Syinq is positioned as non-commercial cost-sharing between verified members — you split running costs, you do not pay a Syinq fare. Members should follow their campus and local regulations.",
  },
  {
    category: "Cost",
    q: "How is the cost split?",
    a: "You split the ride's running cost fairly between members — it is 'your share', not a Syinq fare. Syinq suggests a fair amount based on distance, seats and time, and you settle directly with your Host. Syinq never owns the ride or sets a commercial price.",
  },
  {
    category: "Cost",
    q: "Is Syinq free to download?",
    a: "Yes. Syinq is free to download on both Android and iOS, and joining your campus network is free. You only ever share the running cost of a ride with the other members on it.",
  },
  {
    category: "Hosts",
    q: "What does a Host do?",
    a: "A Host is a member who offers spare seats in their own vehicle on a route they are already travelling. You set the route, time and seats, choose who joins, and share the running cost — filling empty seats instead of driving alone.",
  },
  {
    category: "Hosts",
    q: "Do I need a car to use Syinq?",
    a: "No. If you have a vehicle and spare seats you can be a Host; if you don't, you join as a Rider. Most members are Riders looking to share a commute they make anyway.",
  },
  {
    category: "Campuses",
    q: "Can my college or club partner with Syinq?",
    a: "Yes. Syinq works with campus administrations, E-Cells, clubs and student ambassadors to launch verified ride coordination on a campus. Partnerships help reduce gate congestion and parking load while giving students safer, cheaper commutes. Reach out via the contact page to start a pilot.",
  },
  {
    category: "Basics",
    q: "What is Quick Cabpool?",
    a: "Quick Cabpool (planned) is lightweight coordination for members who want to share an external cab — for example to a station or airport. Syinq helps you group up and estimate a fair split; it is coordination only, and never a 'Syinq cab'.",
  },
];

export const faqsByCategory = (cat: Faq["category"]) => FAQS.filter((f) => f.category === cat);
export const faqPairs = (items: Faq[] = FAQS) => items.map(({ q, a }) => ({ q, a }));
