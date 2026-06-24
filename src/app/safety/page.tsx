import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Car,
  KeyRound,
  Siren,
  Share2,
  Star,
  ShieldCheck,
  Scale,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import Lottie from "@/components/site/Lottie";
import { CTAButton, StoreButtons } from "@/components/site/buttons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { faqsByCategory, faqPairs } from "@/content/faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Safety & Trust",
  description:
    "How Syinq keeps campus carpooling safe: verified members, OTP proof-of-pool, live ride status, SOS readiness and two-way ratings — plus a clear take on carpooling legality in India.",
  path: "/safety",
});

const SAFETY_FAQS = faqsByCategory("Safety & Trust");

const HERO_PILLS = [
  "Verified members",
  "OTP proof-of-pool",
  "Live status & SOS",
  "Two-way ratings",
];

const LAYERS = [
  {
    icon: BadgeCheck,
    title: "Verified campus members",
    text: "Everyone joins through campus verification, so you coordinate with real people from your own university — not anonymous strangers.",
  },
  {
    icon: Car,
    title: "Host vehicle & licence checks",
    text: "Hosts complete vehicle and licence checks before offering rides, and verification badges show wherever you make a decision.",
  },
  {
    icon: KeyRound,
    title: "OTP proof-of-pool",
    text: "A one-time code confirms the right members boarded the right ride — a verifiable record that a shared ride really happened.",
  },
  {
    icon: Siren,
    title: "Live ride status & SOS readiness",
    text: "Follow each ride's live status and reach safety support fast, with SOS readiness if something ever feels off.",
  },
  {
    icon: Share2,
    title: "Share live trip with trusted contacts",
    text: "Send a live trip link to people you trust, so the ones who matter can follow your ride from pickup to drop-off.",
  },
  {
    icon: Star,
    title: "Two-way ratings & reputation",
    text: "Members rate each other after every ride, so reputation is earned and trust compounds across your campus.",
  },
];

const LIVE_SAFETY_POINTS = [
  "Live ride status keeps everyone on the same page from pickup to drop-off.",
  "Report an issue or talk to the team without leaving the ride.",
  "SOS readiness and trip sharing put help and trusted eyes one tap away.",
];

const POOL_POINTS = [
  "Codes are generated per ride and checked at pickup, so a match on screen becomes a confirmed pool.",
  "Every confirmed boarding adds to a member's ride history and reputation.",
  "It is an accountability tool, not a safety guarantee — Syinq supports safer coordination but cannot guarantee any outcome.",
];

const COST_SHARING = [
  "Verified members split a ride's running costs as your share.",
  "Private individuals who are already heading the same way.",
  "Syinq is the coordination and trust layer, and owns no vehicles.",
];

const COMMERCIAL_HIRE = [
  "A set fare paid to a service that operates a vehicle for profit.",
  "A commercial ride-hailing or vehicle-hire operation.",
  "Syinq never sets a fare, dispatches vehicles, or owns a fleet.",
];

function Phone({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={440}
      height={950}
      sizes="(max-width: 768px) 50vw, 240px"
      className={cn("h-auto w-full object-contain drop-shadow-xl", className)}
    />
  );
}

export default function SafetyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Safety & Trust", path: "/safety" },
          ]),
          faqPageSchema(faqPairs(SAFETY_FAQS)),
        ]}
      />

      {/* Hero */}
      <section className="bg-brand-soft py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">Safety &amp; Trust</span>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Is campus carpooling safe? How Syinq builds trust
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
              Campus carpooling on Syinq is built for safety: every member joins through campus
              verification, each ride boards with OTP proof-of-pool, trips carry live status, SOS
              readiness and trip sharing, and members rate each other afterwards. Syinq supports
              safer coordination, but it cannot guarantee any outcome — your judgement still matters.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {HERO_PILLS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-slate-700"
                >
                  <ShieldCheck size={15} className="text-brand-600" />
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Verification layers */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Verification layers"
            title="Trust is layered into every shared ride"
            subtitle="Syinq's whole reason to exist is verified-campus trust. Here are the layers that sit under each pool — from who can join to how a ride is proven, watched and rated."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map((l, i) => (
              <Reveal key={l.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <l.icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{l.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Two-phone live-safety showcase */}
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow">Live safety, in your hand</span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                When a ride is live, safety stays one tap away
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Once a pool starts, the app keeps the ride accountable in real time. Members can
                follow the trip, reach support, share their live location with trusted contacts, and
                trigger SOS if a situation escalates.
              </p>
              <ul className="mt-6 space-y-3">
                {LIVE_SAFETY_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-trust" />
                    {point}
                  </li>
                ))}
              </ul>
              <Lottie
                src="/revamp/lottie/map-search-gps.lottie"
                label="Live location and route tracking for a shared campus ride"
                className="mt-8 h-48 w-full max-w-md"
              />
            </Reveal>

            <Reveal delay={80} className="relative flex justify-center gap-4 sm:gap-6">
              <div className="pointer-events-none absolute inset-0 -z-10 translate-y-10 rounded-[3rem] bg-brand-soft blur-2xl" />
              <Phone
                src="/revamp/app/safety-support.webp"
                alt="Syinq in-app safety and support screen to report an issue or talk to the team during a campus carpool"
                className="w-[44%] max-w-[220px] translate-y-6"
              />
              <Phone
                src="/revamp/app/sos-alert.webp"
                alt="Syinq SOS alert screen notifying emergency contacts during a live shared campus ride"
                className="w-[44%] max-w-[220px]"
              />
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl rounded-xl border border-slate-200 bg-page/70 p-4 text-center text-sm text-slate-500">
            Syinq supports safer coordination but cannot guarantee any outcome. These tools build
            accountability — they are not a safety guarantee, so always use your judgement and the
            in-app safety tools.
          </Reveal>
        </Container>
      </section>

      {/* Proof-of-pool explainer */}
      <section className="bg-page py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="flex justify-center lg:order-2">
              <div className="relative w-full max-w-[260px]">
                <div className="pointer-events-none absolute inset-0 -z-10 translate-y-8 rounded-[2.4rem] bg-brand-soft blur-2xl" />
                <Phone
                  src="/revamp/app/otp-verify.webp"
                  alt="Syinq OTP proof-of-pool verification screen confirming the right members boarded the shared campus ride"
                />
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:order-1">
              <span className="eyebrow">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <KeyRound size={13} />
                </span>
                Proof-of-pool
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                What is proof-of-pool?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                Proof-of-pool is Syinq's OTP boarding check. The Host gets a one-time code and the
                Rider enters it at pickup, confirming the right members are in the right ride. It
                turns &ldquo;someone said they&rsquo;d carpool&rdquo; into a verifiable record that a
                shared ride actually happened — the backbone of campus accountability.
              </p>
              <ul className="mt-6 space-y-3">
                {POOL_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-trust" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Legality */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">
              <Scale size={15} className="text-brand-600" />
              Carpooling &amp; the law
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Is carpooling legal in India?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
              Genuine cost-sharing between private individuals is widely practised across India, while
              using a private vehicle for commercial hire is regulated and varies by state and over
              time. Syinq is positioned as non-commercial cost-sharing: members split a ride&rsquo;s
              running costs as your share — never a Syinq fare. Always follow your campus and local
              rules.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-trust/30 bg-trust/5 p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-trust/10 text-trust">
                  <ShieldCheck size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Non-commercial cost-sharing — how Syinq works
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {COST_SHARING.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-trust" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-2xl border border-slate-200 bg-page p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200/70 text-slate-500">
                  <Scale size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Commercial hire — what Syinq is not
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {COMMERCIAL_HIRE.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-8 flex flex-col items-center gap-4 text-center">
            <CTAButton href="/blog/is-carpooling-legal-in-india" variant="secondary">
              Read: Is carpooling legal in India?
              <ArrowRight size={16} />
            </CTAButton>
            <p className="mx-auto max-w-2xl text-sm text-slate-500">
              This is general information, not legal advice. Syinq supports safer, lower-cost
              coordination but cannot guarantee any outcome — members are responsible for following
              the rules that apply on their campus and route.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Safety FAQ */}
      <section className="bg-page py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Safety FAQ"
            title="Carpool safety questions, answered"
            subtitle="Straight answers on how Syinq keeps verified campus pooling safe, accountable and on the right side of the rules."
          />

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
            <Accordion type="single" collapsible>
              {SAFETY_FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`safety-${i}`} className="last:border-b-0">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-slate-900 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* Closing CTA band */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
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
                  Trust you can verify, every ride.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Join your campus network, ride with verified members, and keep safety one tap away
                  with OTP proof-of-pool, live status and SOS readiness. Free on iOS and Android.
                </p>
                <div className="mt-8 flex justify-center">
                  <StoreButtons />
                </div>
                <p className="mx-auto mt-6 max-w-lg text-xs text-white/70">
                  Syinq supports safer coordination but cannot guarantee any outcome.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
