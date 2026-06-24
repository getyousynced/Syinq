"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Car,
  KeyRound,
  Siren,
  Star,
  MessagesSquare,
  Fingerprint,
  Mail,
  Building2,
  Check,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import Lottie from "@/components/site/Lottie";
import Marquee from "@/components/site/Marquee";
import { cn } from "@/lib/utils";

const layers = [
  {
    icon: BadgeCheck,
    title: "Verified campus members",
    text: "Everyone joins through campus verification, so you coordinate with real people from your own university, not anonymous strangers.",
  },
  {
    icon: Car,
    title: "Host vehicle & licence checks",
    text: "Hosts complete vehicle and licence verification before offering rides. Verification badges show wherever you make a decision.",
  },
  {
    icon: KeyRound,
    title: "OTP proof-of-pool",
    text: "A one-time code confirms the right members boarded the right ride, a verifiable record that a shared ride really happened.",
  },
  {
    icon: Siren,
    title: "Live status & SOS ready",
    text: "Follow live ride status, share your trip with trusted contacts, and reach safety support fast if something feels off.",
  },
  {
    icon: Star,
    title: "Two-way ratings",
    text: "Members rate each other after every ride, so reputation compounds and trust stays earned across your campus.",
  },
  {
    icon: MessagesSquare,
    title: "In-app coordination",
    text: "Routes, requests, matches and history live in one place, replacing scattered WhatsApp groups and manual DMs.",
  },
];

const verifySteps = [
  { icon: Fingerprint, label: "Campus ID" },
  { icon: Mail, label: "Student email" },
  { icon: Car, label: "Vehicle & licence", tag: "Hosts" },
  { icon: Building2, label: "Campus org" },
];

/* A member's checks stamp to green one-by-one when the band scrolls into view.
   Reduced motion shows every step already verified. */
function VerificationBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [verified, setVerified] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVerified(verifySteps.length);
      return;
    }
    if (!inView) return;
    const timers = verifySteps.map((_, i) =>
      setTimeout(() => setVerified(i + 1), 260 + i * 280),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const progress = verified / verifySteps.length;

  return (
    <div
      ref={ref}
      className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex justify-center">
        <Lottie
          src="/revamp/lottie/driving.lottie"
          label="Animated illustration of a verified member heading out to ride or host"
          className="h-40 w-40 sm:h-48 sm:w-48"
        />
      </div>
      <div className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trust/60" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-trust" />
        </span>
        How verification works
      </div>

      <div className="relative">
        {/* connecting progress line (sm+) */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-[22px] z-0 hidden h-0.5 overflow-hidden rounded-full bg-slate-200 sm:block"
        >
          <motion.div
            className="h-full w-full origin-left rounded-full bg-trust"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={
              reduce ? { duration: 0 } : { type: "spring", stiffness: 55, damping: 18 }
            }
          />
        </div>

        <ul className="relative grid grid-cols-2 gap-3 sm:flex sm:items-start sm:justify-between sm:gap-4">
          {verifySteps.map((step, i) => {
            const isVerified = i < verified;
            return (
              <motion.li
                key={step.label}
                animate={isVerified && !reduce ? { scale: [1, 1.04, 1] } : undefined}
                transition={{ duration: 0.35 }}
                className={cn(
                  "relative z-10 flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 transition-colors duration-300 sm:flex-col sm:gap-2 sm:px-4 sm:text-center",
                  isVerified ? "border-green-200 bg-green-50" : "border-slate-200 bg-white",
                )}
                aria-label={`${step.label}${step.tag ? ` (${step.tag})` : ""}, ${
                  isVerified ? "verified" : "pending"
                }`}
              >
                <span
                  className={cn(
                    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                    isVerified ? "bg-trust/10 text-trust" : "bg-slate-100 text-slate-400",
                  )}
                >
                  <step.icon size={18} aria-hidden />
                  <AnimatePresence>
                    {isVerified && (
                      <motion.span
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 520, damping: 22 }}
                        className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-trust text-white ring-2 ring-white"
                      >
                        <Check size={10} strokeWidth={3} aria-hidden />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 sm:justify-center">
                    <span
                      className={cn(
                        "text-sm font-semibold leading-tight transition-colors duration-300",
                        isVerified ? "text-slate-900" : "text-slate-500",
                      )}
                    >
                      {step.label}
                    </span>
                    {step.tag && (
                      <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        {step.tag}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[11px] font-medium transition-colors duration-300",
                      isVerified ? "text-trust" : "text-slate-400",
                    )}
                  >
                    {isVerified ? "Verified" : "Pending"}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        How a member becomes verified, each check is confirmed before they appear in your pool.
      </p>
    </div>
  );
}

export default function TrustBand() {
  return (
    <section id="trust" className="bg-page py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal className="mb-5 flex justify-center">
          <Lottie
            src="/revamp/lottie/verified-check.json"
            loop={false}
            label="Animated verified badge"
            className="h-20 w-20"
          />
        </Reveal>
        <SectionHeading
          eyebrow="Verified campus trust"
          title="Trust isn't a tagline. It's built into every ride."
          subtitle="Syinq's whole reason to exist is verified-campus trust. Here's the layer that sits under every shared ride."
        />

        <VerificationBand />

        <Reveal className="mt-10">
          <Marquee durationSec={40} className="py-2">
            {layers.map((l) => (
              <div
                key={l.title}
                className="w-[300px] shrink-0 self-stretch rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:w-[340px]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <l.icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{l.text}</p>
              </div>
            ))}
          </Marquee>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white/70 p-4 text-center text-sm text-slate-500">
          Syinq supports safer coordination but cannot guarantee any outcome. Proof-of-pool is an
          accountability tool, not a safety guarantee, always use your judgement and the in-app
          safety tools.
        </Reveal>
      </Container>
    </section>
  );
}
