import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Fuel,
  KeyRound,
  LayoutDashboard,
  Route,
  Star,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import Lottie from "@/components/site/Lottie";
import { CTAButton, StoreButtons } from "@/components/site/buttons";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Offer a Ride, For Hosts",
  description:
    "Drive to campus with empty seats? Host on Syinq to share your running cost with verified students going your way, you control who joins, with OTP proof-of-pool.",
  path: "/for-hosts",
});

type Benefit = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const benefits: Benefit[] = [
  {
    icon: Fuel,
    title: "Cover your fuel",
    text: "Offer the seats you're already driving and split the running cost. Each Rider settles their share toward fuel and wear, it's cost-sharing, never a commercial fare Syinq sets.",
  },
  {
    icon: UserCheck,
    title: "Control who joins",
    text: "You see every request and accept or decline it yourself. Only verified campus Riders heading your way can ask, so you choose your company, every time.",
  },
  {
    icon: KeyRound,
    title: "OTP proof-of-pool",
    text: "A one-time code at pickup confirms exactly who boarded your ride. It's a verifiable record that the right members joined, accountability built into every shared trip.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage it in one place",
    text: "Track active and upcoming rides, see what each Rider has settled, and review your history in the Your Rides tab, no scattered WhatsApp threads to chase.",
  },
];

type Step = {
  n: string;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    n: "1",
    title: "Publish your route & seats",
    text: "Set the route you already drive, your timing and how many seats are free. Suggest a fair split for the trip, Riders see it up front before they ask.",
  },
  {
    n: "2",
    title: "Accept Riders going your way",
    text: "Verified campus members request the seats. Check their profile and rating, then accept the ones heading the same direction. You stay in control of who comes along.",
  },
  {
    n: "3",
    title: "Board with OTP & settle your share",
    text: "Confirm each Rider with the one-time code at pickup, ride together, then settle the cost split afterwards. Two-way ratings keep the next pool just as trusted.",
  },
];

type TrustPoint = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const trustPoints: TrustPoint[] = [
  {
    icon: BadgeCheck,
    title: "Vehicle & licence verified",
    text: "Hosts complete vehicle and licence verification before offering a single seat, so Riders know they're coordinating with a real, checked campus member.",
  },
  {
    icon: Star,
    title: "Two-way ratings",
    text: "You rate your Riders and they rate you after every ride. Reputation compounds, so reliable Hosts and respectful Riders rise to the top of your campus.",
  },
  {
    icon: Route,
    title: "You set the terms",
    text: "Your route, your timing, your seats, your call on who joins. Syinq coordinates the match, you stay in the driver's seat for every decision.",
  },
];

export default function ForHostsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "For Hosts", path: "/for-hosts" },
        ])}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-page">

        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
          <Reveal>
            <span className="eyebrow">For Hosts</span>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
              Fill your empty seats. Share the cost.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A Host offers spare seats on a route they&apos;re already driving, picks who comes
              along, and splits the running cost with verified students heading the same way. Your
              Riders settle their share toward fuel and wear, it&apos;s cost-sharing, never a
              commercial fare Syinq sets for you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <StoreButtons />
              <CTAButton href="#how-hosting" variant="ghost">
                See how hosting works
              </CTAButton>
            </div>
            <p className="mt-5 text-sm text-slate-500">Free on iOS and Android.</p>
          </Reveal>

          <Reveal delay={120} className="flex justify-center">
            <div className="relative w-full max-w-[520px]">
              <div className="absolute -inset-3 -z-10 rounded-[2.2rem] bg-white/50 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                <div className="relative aspect-[4/3] sm:aspect-[3/2]">
                  <Image
                    src="/revamp/photos/host-pickup-window.webp"
                    alt="Verified Syinq Host greeting campus students through the car window at a pickup point"
                    width={1400}
                    height={933}
                    sizes="(max-width: 1024px) 92vw, 520px"
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-md">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-trust/10 text-trust">
                  <BadgeCheck size={18} />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] font-medium text-slate-500">Verified Host</span>
                  <span className="block text-sm font-semibold text-slate-900">
                    Vehicle &amp; licence checked
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why host on Syinq */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why host on Syinq"
            title="Turn an empty seat into a shared cost"
            subtitle="You're already making the drive. Hosting lets verified campus Riders chip in for the trip, on your terms, with trust built into every step."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 70}>
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
        </Container>
      </section>

      {/* How hosting works */}
      <section id="how-hosting" className="scroll-mt-24 bg-page py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="How hosting works"
            title="Three steps from empty seats to a settled pool"
            subtitle="Publish the route you already drive, accept the Riders you choose, and board with proof-of-pool, every ride runs on the same trusted lifecycle."
          />

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ol className="space-y-8">
                {steps.map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Lottie
                src="/revamp/lottie/car-gps.lottie"
                label="A host driving a shared route with GPS"
                className="mt-10 h-44 w-full max-w-sm"
              />
            </Reveal>

            <Reveal delay={100} className="flex justify-center gap-4 sm:gap-6">
              {[
                {
                  src: "/revamp/app/review-publish.webp",
                  alt: "Syinq Host screen to review the fair cost split and publish a route with open seats",
                  w: 472,
                  h: 1051,
                  caption: "Publish your route",
                  flip: false,
                },
                {
                  src: "/revamp/app/your-rides.webp",
                  alt: "Your Rides screen showing a Host's active, upcoming and completed shared rides",
                  w: 493,
                  h: 1091,
                  caption: "Manage in Your Rides",
                  flip: true,
                },
              ].map((phone) => (
                <figure
                  key={phone.src}
                  className={cn("w-full max-w-[200px]", phone.flip && "mt-8 sm:mt-12")}
                >
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 translate-y-5 rounded-[1.8rem] bg-page blur-xl" />
                    <Image
                      src={phone.src}
                      alt={phone.alt}
                      width={phone.w}
                      height={phone.h}
                      sizes="(max-width: 640px) 44vw, 200px"
                      className="h-auto w-full object-contain drop-shadow-xl"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-xs font-medium text-slate-500">
                    {phone.caption}
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Reassurance / trust strip */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Stay in control"
            title="Hosting on your terms, with verified-campus trust"
            subtitle="You decide the route, the timing and who rides along. Syinq adds the verification and accountability that make sharing with strangers feel like sharing with classmates."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point, i) => (
              <Reveal key={point.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <point.icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white/70 p-4 text-center text-sm text-slate-500">
            Syinq is a coordination platform for cost-sharing between verified campus members, not a
            taxi or transport service. Syinq does not own or operate any vehicles, and supports safer
            coordination but cannot guarantee any outcome. Always use your judgement and the in-app
            safety tools.
          </Reveal>
        </Container>
      </section>

      {/* Closing CTA band */}
      <section className="bg-page py-16 sm:py-20 lg:py-24">
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
                  Become a Host. Fill the seats you&apos;re already driving.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Get the app, verify your vehicle and licence, and start sharing the cost with
                  verified students going your way. Free on iOS and Android.
                </p>
                <div className="mt-8 flex justify-center">
                  <StoreButtons />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
