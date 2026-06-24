import Image from "next/image";
import type { Metadata } from "next";
import {
  Building2,
  Rocket,
  Users,
  UserCheck,
  TrafficCone,
  MapPinned,
  BadgeCheck,
  CalendarDays,
  Leaf,
  Megaphone,
  Handshake,
  Sprout,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { CTAButton } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMeta({
  title: "For Campuses & Clubs",
  description:
    "Partner with Syinq to launch verified student ride coordination on your campus, cut gate congestion and parking load while giving students safer, cheaper commutes.",
  path: "/for-campuses",
});

const partners = [
  {
    icon: Building2,
    title: "Campus administration",
    text: "Work with us to ease gate congestion and parking pressure with verified, accountable ride coordination, no vehicles for you to run or manage.",
  },
  {
    icon: Rocket,
    title: "E-Cells & entrepreneurship clubs",
    text: "Bring a real, student-built mobility product to your campus and give your members a launch to rally behind, learn from and help grow.",
  },
  {
    icon: Users,
    title: "Student clubs & councils",
    text: "Coordinate movement around fests, events and late practices for your members, with proof-of-pool boarding and live status built in.",
  },
  {
    icon: UserCheck,
    title: "Campus ambassadors",
    text: "Student leaders seed the first routes, onboard verified members and earn recognition for building daily commute liquidity on campus.",
  },
];

const benefits = [
  {
    icon: TrafficCone,
    title: "Reduced gate congestion & parking load",
    text: "Pooled rides mean fewer solo cars arriving at peak hours, easing pressure at gates and on limited campus parking.",
  },
  {
    icon: MapPinned,
    title: "Safer movement visibility",
    text: "Live ride status, trip sharing and SOS-ready tools give members and contacts visibility into who is moving where, when it matters.",
  },
  {
    icon: BadgeCheck,
    title: "A verified-only network",
    text: "Every member joins through campus verification, and Hosts pass vehicle and licence checks, so coordination stays within your community.",
  },
  {
    icon: CalendarDays,
    title: "Event & fest mobility coordination",
    text: "Spin up routes around fests, tech events and tournaments so attendees pool in instead of clogging entry roads with single-rider cars.",
  },
  {
    icon: Leaf,
    title: "A real sustainability story",
    text: "Fewer solo rides is a measurable, ownable sustainability narrative for your campus, fewer trips, lower emissions, less congestion.",
  },
  {
    icon: Megaphone,
    title: "Launch & ambassador support",
    text: "We help with rollout, ambassador onboarding and the first routes, so your campus gets daily liquidity rather than a one-off pilot.",
  },
];

const steps = [
  {
    icon: Handshake,
    title: "Partner & verify your campus",
    text: "We set up your campus as a verified community and align on goals, congestion, fest mobility, safety visibility or all three.",
  },
  {
    icon: Sprout,
    title: "Seed routes & ambassadors",
    text: "Campus ambassadors onboard the first verified members and seed the routes students already travel, building the initial pool of Hosts and Riders.",
  },
  {
    icon: TrendingUp,
    title: "Build daily route liquidity",
    text: "As verified members and routes compound, daily matches become reliable. We grow campus-by-campus so each community reaches real route density.",
  },
];

export default function ForCampusesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "For Campuses", path: "/for-campuses" },
        ])}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-page">

        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
          <Reveal>
            <span className="eyebrow">For Campuses</span>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Bring verified ride coordination to your campus
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Syinq partners with colleges, E-Cells, clubs and ambassadors to launch verified
              campus pooling, reducing gate congestion and parking load while giving students
              safer, cheaper commutes. No vehicles to run and no pricing to manage, just verified
              members splitting the running cost of routes they already travel.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTAButton href="/contact">
                Talk to us
                <ArrowRight size={18} />
              </CTAButton>
              <CTAButton href="/how-it-works" variant="secondary">
                See how it works
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute inset-0 -z-10 translate-y-6 rounded-[2rem] bg-white/50 blur-2xl" />
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-1.5 shadow-lg">
                <Image
                  src="/revamp/photos/students-group-phone.webp"
                  alt="Verified campus students checking the Syinq app together to coordinate a shared ride"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 768px) 80vw, 420px"
                  priority
                  className="h-auto w-full rounded-[1.4rem] object-cover"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Who we partner with */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Who we partner with"
            title="Built with the people who already lead your campus"
            subtitle="Syinq plugs into the communities that move students every day. We bring the verified network and the product; you bring the campus, the routes and the trust."
          />

          <Reveal className="mt-10 flex justify-center">
            <Lottie
              src="/revamp/lottie/drivers-community.lottie"
              label="Animated illustration of a verified campus community pooling rides together"
              className="h-44 w-full max-w-md sm:h-52"
            />
          </Reveal>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2">
                {partners.map((p, i) => (
                  <Reveal key={p.title} delay={(i % 2) * 80}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <p.icon size={22} />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-slate-900">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={120} className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-y-6 rounded-[2rem] bg-page blur-2xl" />
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <Image
                    src="/revamp/photos/team-table.webp"
                    alt="Student club and E-Cell team planning a campus ride coordination launch together at a table"
                    width={1400}
                    height={933}
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="aspect-[3/2] w-full rounded-[1.4rem] object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What your campus gets */}
      <Section className="bg-page">
        <Container>
          <SectionHeading
            eyebrow="What your campus gets"
            title="Verified coordination that pays off across your whole campus"
            subtitle="A verified pooling network does more than save students money. It eases the operational load on your campus and gives you a story worth telling."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <b.icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white/70 p-4 text-center text-sm text-slate-500">
            Syinq supports safer coordination but cannot guarantee any outcome. Verification and
            proof-of-pool are accountability tools that help your community coordinate with
            confidence, not safety guarantees.
          </Reveal>
        </Container>
      </Section>

      {/* How a campus launch works */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="How a campus launch works"
            title="From partnership to daily route liquidity in three steps"
            subtitle="Syinq grows campus-by-campus on purpose. We build real route density inside one community before expanding, so matches stay reliable instead of spread too thin."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <s.icon size={22} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
            We started in the Delhi-NCR and Greater Noida campus clusters for exactly this reason, 
            dense, verified communities where shared routes overlap every day.
          </Reveal>
        </Container>
      </Section>

      {/* Ambassador callout */}
      <Section className="bg-page">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-brand-100 bg-page px-6 py-12 sm:px-12">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                    <Megaphone size={24} />
                  </span>
                  <h2 className="mt-5 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    Are you a student who wants to launch Syinq on your campus?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                    Campus ambassadors are the first movers, onboarding verified members, seeding
                    the routes everyone already travels and building the daily liquidity that makes
                    pooling reliable. Get early access, hands-on launch support and recognition for
                    bringing verified ride coordination to your community.
                  </p>
                </div>
                <div className="flex lg:justify-end">
                  <CTAButton href="/contact">
                    Become a campus ambassador
                    <ArrowRight size={18} />
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA band */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center sm:px-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Start a pilot on your campus
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Tell us about your campus, club or E-Cell and we&apos;ll map out a verified
                  pooling launch, routes, ambassadors and rollout support included.
                </p>
                <div className="mt-8 flex justify-center">
                  <CTAButton
                    href="/contact"
                    variant="secondary"
                    className="bg-white text-brand-700 ring-0 hover:bg-white/90"
                  >
                    Talk to us
                    <ArrowRight size={18} />
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
