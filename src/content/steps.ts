export type Step = {
  n: number;
  eyebrow: string;
  title: string;
  text: string;
  screen: string; // app screenshot
  alt: string;
};

/** SYINQ's real ride lifecycle, paired with app screens. */
export const STEPS: Step[] = [
  {
    n: 1,
    eyebrow: "Find or Offer",
    title: "Find a Pool, or offer one",
    text: "Enter where you're going. Riders see verified members heading the same way; Hosts publish spare seats on a route they're already driving. No match yet? Save it as Looking and we'll watch for one.",
    screen: "/revamp/app/find-pool.webp",
    alt: "Syinq Find a Pool screen showing campus routes and matches for verified students",
  },
  {
    n: 2,
    eyebrow: "Match & accept",
    title: "Match with people from your campus",
    text: "Syinq matches on route, timing and campus. Send a request, the Host accepts, and you agree a fair split of the running cost, your share, never a Syinq fare.",
    screen: "/revamp/app/match-found.webp",
    alt: "Syinq Match Found screen showing a verified host, rating and the rider's share of the cost",
  },
  {
    n: 3,
    eyebrow: "Proof of pool",
    title: "Board with OTP proof-of-pool",
    text: "At pickup, the Host's one-time code is entered to confirm the right people are in the right ride. It's the proof that a shared ride really happened, the heart of campus trust.",
    screen: "/revamp/app/otp-verify.webp",
    alt: "Syinq OTP proof-of-pool verification screen confirming boarding for a shared campus ride",
  },
  {
    n: 4,
    eyebrow: "Ride & rate",
    title: "Ride with live status, then rate",
    text: "Follow live ride status with SOS readiness and shared trip location. When you arrive, settle your share directly and rate each other to build campus reputation.",
    screen: "/revamp/app/rate-ride.webp",
    alt: "Syinq Rate Your Ride screen for rating your host and fellow riders after a completed campus ride",
  },
];
