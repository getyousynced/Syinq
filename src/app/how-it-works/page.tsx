import type { Metadata } from "next";
import Image from "next/image";
import {
  Search,
  Sparkles,
  Handshake,
  Navigation,
  KeyRound,
  Route,
  Flag,
  Star,
  Radar,
  Bell,
  CircleCheck,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { CTAButton, StoreButtons } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, howToSchema } from "@/lib/schema";
import { STEPS } from "@/content/steps";
import { STORE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "How Campus Carpooling Works",
  description:
    "See how Syinq campus carpooling works, find or offer a ride, match with verified students, board with OTP proof-of-pool, then split the cost and rate. Step by step.",
  path: "/how-it-works",
});

/** Deep-dive detail layered on top of the shared STEPS content. */
const STEP_DETAILS: Record<number, { lead: string; points: string[] }> = {
  1: {
    lead: "Open Syinq, set your campus and where you're headed, and the network does the sorting. Riders browse verified members already going the same way; Hosts publish the spare seats on a route they're driving anyway. Nothing matches today? Save it and Looking keeps the search alive for you.",
    points: [
      "Riders search live routes and see only verified campus members",
      "Hosts list spare seats on a trip they already planned to take",
      "No match yet saves as Looking, so your demand is never lost",
    ],
  },
  2: {
    lead: "Syinq matches on the three things that actually matter, route, timing and shared campus, so you only see realistic pools. Send a request, the Host reviews and accepts, and together you agree a fair split of the running cost. That's your share, never a fare Syinq invents.",
    points: [
      "Matching weighs route overlap, departure timing and your campus",
      "Verification badges and ratings show before you commit",
      "You and the Host agree your share of the running cost upfront",
    ],
  },
  3: {
    lead: "At pickup, the Host's one-time code is entered in the app to confirm the right members climbed into the right ride. This is proof-of-pool, a verifiable record that a shared campus ride genuinely happened, and the accountability layer the whole network is built on.",
    points: [
      "The Host shares a one-time code at the pickup point",
      "Entering it confirms the correct pool boarded the correct ride",
      "Each verified boarding becomes a trust record on both profiles",
    ],
  },
  4: {
    lead: "Once you're moving, follow live ride status on the map, share your trip with trusted contacts, and keep SOS within reach if anything feels off. When you arrive, settle your share directly with your Host and rate each other so campus reputation keeps compounding.",
    points: [
      "Live status, shared trip location and SOS readiness travel with you",
      "Settle your share directly with your Host when the ride ends",
      "Two-way ratings build a reputation that makes future pools easier",
    ],
  },
};

/** The three-beat Looking flow shown in the watchlist callout. */
const LOOKING_FLOW = [
  {
    icon: Search,
    label: "No match yet",
    text: "Your search finds no live pool on the route today.",
  },
  {
    icon: Radar,
    label: "Saved as Looking",
    text: "Syinq keeps the demand on its watchlist for you.",
  },
  {
    icon: Bell,
    label: "You're notified",
    text: "A matching Host appears and you get the ping.",
  },
];

/** Every ride state the lifecycle handles, in order. */
const RIDE_STATES = [
  { icon: Search, label: "Looking", text: "Demand is saved when no ride exists yet." },
  { icon: Sparkles, label: "Match found", text: "A verified Host on your route appears." },
  { icon: Handshake, label: "Request accepted", text: "The Host confirms your seat and the split." },
  { icon: Navigation, label: "Host en route", text: "Track the approach to your pickup point." },
  { icon: KeyRound, label: "OTP verification", text: "A one-time code confirms the right pool boards." },
  { icon: Route, label: "Ride in progress", text: "Live status, shared trip and SOS stay on hand." },
  { icon: Flag, label: "Completed", text: "Arrival is logged with a clear ride summary." },
  { icon: Star, label: "Settle & rate", text: "Settle your share, then rate each other." },
];

const HERO_LEAD =
  "Campus carpooling on Syinq runs one trusted lifecycle: you find a ride or offer your own, match with verified students heading the same way on route and timing, board with OTP proof-of-pool, then ride with live status and settle your share, splitting the running cost, never paying a fare Syinq sets.";

const LOOKING_LEAD =
  "When no ride matches yet, your search doesn't vanish, it becomes Looking, a saved record of where and when you need to go. Syinq keeps watching the network, and the moment a verified Host publishes a matching route, you're notified so demand turns into a real pool instead of a dead end.";

const LOOKING_POINTS = [
  "A failed search is captured as saved demand, not discarded",
  "Syinq watches the network for a Host on your route and timing",
  "You're notified the moment a matching pool becomes available",
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
          howToSchema(
            "How to carpool to campus with Syinq",
            STEPS.map((s) => ({ name: s.title, text: s.text })),
          ),
        ]}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-page">
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">How it works</span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              How campus carpooling works on Syinq
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              {HERO_LEAD}
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href={STORE.oneLink} variant="ghost" external>
                Get the app
              </CTAButton>
            </div>
            <div className="mt-10 flex justify-center">
              <Lottie
                src="/revamp/lottie/ui-ux.lottie"
                label="Syinq app interface in motion"
                className="h-44 w-full max-w-md sm:h-52"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The 4-step lifecycle in depth */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="The ride lifecycle"
            title="Four steps from search to settled"
            subtitle="Every ride, whether you find one or host one, runs the same trusted lifecycle. Here's exactly what happens at each stage, and what you see in the app."
          />

          <div className="mt-14 space-y-16 lg:space-y-24">
            {STEPS.map((step, i) => {
              const flip = i % 2 === 1;
              const detail = STEP_DETAILS[step.n];
              return (
                <div
                  key={step.n}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <Reveal className={cn(flip && "lg:order-2")}>
                    <span className="eyebrow">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-[11px] font-bold text-white">
                        {step.n}
                      </span>
                      {step.eyebrow}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-700">{step.text}</p>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{detail.lead}</p>
                    <ul className="mt-6 space-y-3">
                      {detail.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CircleCheck
                            size={20}
                            className="mt-0.5 shrink-0 text-brand-600"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-slate-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal
                    delay={80}
                    className={cn("flex justify-center", flip && "lg:order-1")}
                  >
                    <div className="relative w-full max-w-[300px]">
                      <div className="absolute inset-0 -z-10 translate-y-6 rounded-[2rem] bg-page blur-xl" />
                      <div className="rounded-[1.8rem] border border-slate-200 bg-white p-1.5 shadow-lg">
                        <Image
                          src={step.screen}
                          alt={step.alt}
                          width={440}
                          height={950}
                          sizes="(max-width: 768px) 70vw, 300px"
                          className="h-auto w-full rounded-[1.4rem]"
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Looking / Watchlist explainer */}
      <Section className="bg-page">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow">Looking · Watchlist</span>
              <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                When there&apos;s no ride yet, Syinq remembers
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                {LOOKING_LEAD}
              </p>
              <ul className="mt-6 space-y-3">
                {LOOKING_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CircleCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-slate-600">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <span className="eyebrow">How Looking works</span>
                <ol className="mt-6 space-y-5">
                  {LOOKING_FLOW.map((stage, i) => (
                    <li key={stage.label} className="relative flex gap-4">
                      {i < LOOKING_FLOW.length - 1 && (
                        <span
                          className="absolute bottom-[-1.25rem] left-[1.375rem] top-12 w-px bg-slate-200"
                          aria-hidden="true"
                        />
                      )}
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <stage.icon size={22} aria-hidden="true" />
                      </span>
                      <div className="pt-0.5">
                        <p className="text-base font-semibold text-slate-900">{stage.label}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{stage.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Ride-states / edge-handling strip */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Every state, handled"
            title="The full lifecycle, end to end"
            subtitle="From the first search to the final rating, every state of a campus pool has a clear, accountable step in the app, nothing is left to a guess."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RIDE_STATES.map((state, i) => (
              <Reveal key={state.label} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <state.icon size={22} aria-hidden="true" />
                    </span>
                    <span className="tnum text-sm font-semibold text-slate-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{state.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{state.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white/70 p-4 text-center text-sm text-slate-500">
            Syinq supports safer coordination but cannot guarantee any outcome. Proof-of-pool and
            live status are accountability tools, not safety guarantees, always use your judgement
            and the in-app safety tools.
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA band */}
      <Section className="bg-page">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center sm:px-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="relative mx-auto max-w-2xl">
                <Image
                  src="/revamp/brand/syinq-wordmark.png"
                  alt="Syinq"
                  width={140}
                  height={42}
                  className="mx-auto h-9 w-auto brightness-0 invert"
                />
                <h2 className="mt-6 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Ready to run your first pool?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Find or offer a ride, board with proof-of-pool, and split the cost with verified
                  students from your campus. Free on iOS and Android.
                </p>
                <div className="mt-8 flex justify-center">
                  <StoreButtons />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
