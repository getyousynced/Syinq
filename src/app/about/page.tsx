import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  FileQuestion,
  KeyRound,
  MapPin,
  MessagesSquare,
  Route,
  Scale,
  UserX,
  Wallet,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { CTAButton, StoreButtons } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { SITE, FOUNDERS } from "@/lib/site";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = pageMeta({
  title: "About Syinq",
  description:
    "Syinq is building India\u2019s verified campus commute network \u2014 founded by Raunak Shukla and Rupesh Shandillya to replace messy WhatsApp ride coordination with trusted campus pooling.",
  path: "/about",
});

const heroChips = [
  { icon: BadgeCheck, label: "Verified campus members" },
  { icon: KeyRound, label: "OTP proof-of-pool" },
  { icon: Route, label: "Route-led, not hype-led" },
];

const problems = [
  {
    icon: MessagesSquare,
    title: "Scattered WhatsApp groups",
    text: "Routes, requests and timings get lost across noisy chats and manual DMs, so coordination is fragile and easy to miss.",
  },
  {
    icon: Wallet,
    title: "Expensive solo rides",
    text: "Without an easy way to find someone going your way, students pay full price alone for trips they could comfortably share.",
  },
  {
    icon: UserX,
    title: "Unverified strangers",
    text: "Ad-hoc lifts mean climbing in with people you can\u2019t verify \u2014 the exact uncertainty that makes sharing feel risky.",
  },
  {
    icon: FileQuestion,
    title: "No proof it happened",
    text: "When a shared ride is just a chat thread, there\u2019s no accountable record that the right members boarded the right ride.",
  },
];

const values = [
  {
    icon: Route,
    title: "Route-led, not marketing-led",
    text: "We grow where real routes exist. Liquidity beats hype \u2014 one campus that pools reliably is worth more than ten that don\u2019t.",
  },
  {
    icon: Eye,
    title: "Trust is visible, not claimed",
    text: "Verification badges, OTP proof-of-pool and two-way ratings sit wherever you make a decision \u2014 trust you can see on the screen.",
  },
  {
    icon: Scale,
    title: "Honest framing",
    text: "Cost is your share, split fairly and settled with your Host. Syinq is a coordinator \u2014 we never own vehicles, set fares or guarantee outcomes.",
  },
  {
    icon: MapPin,
    title: "Campus by campus",
    text: "We launch cluster by cluster \u2014 Delhi-NCR and Greater Noida first \u2014 so route liquidity and trust build before we expand.",
  },
];


export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          ...FOUNDERS.map(personSchema),
        ]}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-brand-soft">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-brand-100/50 blur-3xl" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">About Syinq</span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Building India&rsquo;s verified campus commute network
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Most campus problems are really trust problems. Syinq makes campus coordination
              simple, trusted and structured &mdash; starting with the daily commute. Rides are our
              wedge; verified campus trust is the moat. We&rsquo;re building the network that lets
              students move together with confidence, one campus at a time.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-wrap gap-2.5">
            {heroChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <chip.icon size={16} className="text-brand-600" />
                {chip.label}
              </span>
            ))}
          </Reveal>

          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-52 w-52 -translate-y-1/2 lg:block xl:h-60 xl:w-60">
            <Lottie
              src="/revamp/lottie/splash.lottie"
              label="Syinq brand animation"
              className="h-full w-full"
            />
          </div>
        </Container>
      </section>

      {/* The problem / mission */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow">Why we exist</span>
              <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Campus coordination is broken. We&rsquo;re fixing the trust layer.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Getting around campus today means scattered WhatsApp groups, expensive solo rides,
                and climbing in with strangers you can&rsquo;t verify &mdash; with no record that a
                shared ride ever happened. Syinq replaces that chaos with one structured, verified
                network where every ride runs on the same trusted lifecycle.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {problems.map((p, i) => (
                  <Reveal key={p.title} delay={(i % 2) * 70}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <p.icon size={20} />
                      </span>
                      <h3 className="mt-3 text-base font-semibold text-slate-900">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-y-6 rounded-[2rem] bg-brand-soft blur-xl" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                  <Image
                    src="/revamp/photos/students-group-phone.webp"
                    alt="Verified campus students coordinating a shared ride on the Syinq app"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Founders */}
      <section id="founders" className="bg-page py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="The founders"
            title="Built by people who lived the problem"
            subtitle="Syinq is operated by Rasync Global Solutions Private Limited and built by a founding team focused on turning messy campus coordination into a verified, structured network."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {FOUNDERS.map((founder, i) => (
              <Reveal key={founder.name} delay={(i % 2) * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200">
                      <Image
                        src={founder.photo}
                        alt={`${founder.name}, ${founder.role} of Syinq`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{founder.name}</h3>
                      <span className="mt-1 inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                        {founder.role}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{founder.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.knowsAbout.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values / how we build */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we build"
            title="Principles that keep Syinq honest"
            subtitle="We're a coordinator for verified campus members — not a ride operator. These principles shape every decision, screen and route."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 70}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <v.icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white/70 p-4 text-center text-sm text-slate-500">
            Syinq supports safer coordination but cannot guarantee any outcome. Verification and
            proof-of-pool are accountability tools, not safety guarantees &mdash; always use your
            judgement and the in-app safety tools.
          </Reveal>
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
                  alt={SITE.name}
                  width={140}
                  height={42}
                  className="mx-auto h-9 w-auto brightness-0 invert"
                />
                <h2 className="mt-6 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Move with your campus, not against it.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Join the verified network and stop paying solo. Free on iOS and Android &mdash; or
                  bring Syinq to your campus.
                </p>
                <div className="mt-8 flex justify-center">
                  <StoreButtons />
                </div>
                <div className="mt-6">
                  <CTAButton
                    href="/for-campuses"
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    Partner with us
                    <ArrowRight size={16} />
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
