"use client";

import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lock, Sparkles, Download } from "lucide-react";
import {
  UilCar,
  UilUsersAlt,
  UilShoppingBag,
  UilCommentDots,
  type UniconProps,
} from "@iconscout/react-unicons";
import { Container, SectionHeading } from "@/components/site/primitives";
import Lottie from "@/components/site/Lottie";
import { STORE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Module icons rendered with Iconscout Unicons (line set).
type IconScoutIcon = ComponentType<UniconProps>;

// Each module sits in one of three reveal tiers:
//  - full    → shown clearly once the roadmap is peeked (Stage 1, Live).
//  - glimpse → partially revealed teaser (Stage 2, Planned) — "up next", not open.
//  - locked  → stays blurred behind a teaser veil (Stages 3-4, Concept).
type Tier = "full" | "glimpse" | "locked";

const phases: { icon: IconScoutIcon; name: string; status: string; text: string; tier: Tier }[] = [
  {
    icon: UilCar,
    name: "Rides",
    status: "Live",
    tier: "full",
    text: "Peer-to-peer ridesharing between verified campus members, with route matching, Looking and proof-of-pool.",
  },
  {
    icon: UilUsersAlt,
    name: "Quick Cabpool",
    status: "Planned",
    tier: "glimpse",
    text: "Lightweight coordination to share an external cab to stations, airports and events. Coordination only — never a Syinq cab.",
  },
  {
    icon: UilShoppingBag,
    name: "Campus Exchange",
    status: "Concept",
    tier: "locked",
    text: "A verified, campus-only space to buy, sell, rent and exchange — books, electronics, hostel essentials.",
  },
  {
    icon: UilCommentDots,
    name: "Pulse",
    status: "Concept",
    tier: "locked",
    text: "The verified campus bulletin board: events, lost-and-found, route alerts and student discussion.",
  },
];

// Commerce-themed Lottie used as the Campus Exchange teaser visual.
const EXCHANGE_LOTTIE = "/revamp/lottie/shopping-cart-check.lottie";

const statusStyle: Record<string, string> = {
  Live: "bg-trust/10 text-trust",
  Planned: "bg-amber-50 text-amber-600",
  Concept: "bg-slate-100 text-slate-500",
};

// Primary CTA styling matched to the shared button system (CTAButton is a link,
// so the in-section reveal trigger reuses the same classes on a real <button>).
const ctaClass =
  "inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-fab transition-all duration-200 hover:brightness-[1.04] hover:shadow-lg active:scale-[0.98] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

export default function Roadmap() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Only lock once JS has hydrated. SSR / no-JS / reduced-motion users get the
  // fully readable cards (blur is purely visual, content stays in the DOM).
  // The roadmap stays a deliberate secret — it only opens on click.
  useEffect(() => {
    setMounted(true);
  }, []);

  const effectsActive = mounted && !reduce;
  const secret = effectsActive && !revealed; // initial locked panel over the grid
  const tiered = effectsActive && revealed; // per-card teaser tiers after the peek
  const showAppCta = !secret; // app download CTA: after peek, and for no-JS/reduced

  // Blur strength per card. Heavy while secret; tier-graded after the peek.
  const blurFor = (tier: Tier) => {
    if (!effectsActive) return 0;
    if (!revealed) return 10;
    if (tier === "full") return 0;
    if (tier === "glimpse") return 2.5;
    return 6;
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="The bigger picture"
          title="Starting with commute. Building something bigger."
          subtitle="The wedge is rides — but the roadmap runs deeper. Reveal what's live today, catch a glimpse of what's next, and unlock the rest in the app."
        />

        <div className="relative mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((p, i) => {
              const blur = blurFor(p.tier);
              return (
                <div
                  key={p.name}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="flex h-full flex-col p-6"
                    style={{
                      filter: `blur(${blur}px)`,
                      transition: reduce
                        ? undefined
                        : `filter 0.5s ease ${revealed && p.tier !== "locked" ? i * 0.08 : 0}s`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <p.icon size={22} color="#0577B0" />
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                          statusStyle[p.status],
                        )}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
                  </div>

                  {/* Stage 2 glimpse — a peek, not a full open. */}
                  <AnimatePresence>
                    {tiered && p.tier === "glimpse" && (
                      <motion.div
                        key="glimpse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-white via-white/75 to-transparent p-4 pt-12"
                      >
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-600">
                          <Sparkles size={13} aria-hidden="true" />
                          Up next
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Stages 3-4 stay locked — teased, never opened on the site. */}
                  <AnimatePresence>
                    {tiered && p.tier === "locked" && (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/55 p-4 text-center backdrop-blur-sm"
                      >
                        {p.name === "Campus Exchange" ? (
                          <Lottie
                            src={EXCHANGE_LOTTIE}
                            label="Campus Exchange — a verified campus marketplace, coming later"
                            className="h-12 w-12"
                          />
                        ) : (
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                            <Lock size={20} aria-hidden="true" />
                          </span>
                        )}
                        <span className="text-sm font-semibold text-slate-700">{p.name}</span>
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          More coming
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Initial locked secret panel — peeks the roadmap, never opens it fully. */}
          <AnimatePresence>
            {secret && (
              <motion.div
                key="roadmap-lock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gradient-to-b from-white/30 to-white/60 p-4"
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white/90 p-7 text-center shadow-lg backdrop-blur-sm"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-fab">
                    <motion.span
                      className="inline-flex"
                      animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Lock size={26} aria-hidden="true" />
                    </motion.span>
                  </span>
                  <span className="eyebrow mt-4">Peek the roadmap</span>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    Something bigger is coming
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Rides are live today. Peek the roadmap to see a glimpse of what&apos;s next — the
                    rest stays under wraps until it ships.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className={cn(ctaClass, "mt-5 w-full")}
                  >
                    <Sparkles size={18} aria-hidden="true" />
                    Reveal what&apos;s next
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Second CTA — routes to the app download; never opens Stages 3-4 on the site. */}
        <AnimatePresence>
          {showAppCta && (
            <motion.div
              key="roadmap-app-cta"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 flex flex-col items-center gap-2 text-center"
            >
              <a
                href={STORE.oneLink}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass}
              >
                <Download size={18} aria-hidden="true" />
                Get early access in the app
              </a>
              <p className="text-xs text-slate-500">
                Campus Exchange and Pulse are still concepts — get the app to be first in line.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
