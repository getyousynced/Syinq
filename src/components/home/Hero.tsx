"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, User, Car } from "lucide-react";
import { StoreButtons } from "@/components/site/buttons";
import { Container } from "@/components/site/primitives";
import Lottie from "@/components/site/Lottie";
import { cn } from "@/lib/utils";

type Mode = "rider" | "host";

const MODES: Record<Mode, { label: string; icon: typeof User; image: string; alt: string; caption: string }> = {
  rider: {
    label: "Rider",
    icon: User,
    image: "/revamp/app/hero-rider.webp",
    alt: "Syinq rider home screen with a campus map and the next shared ride to Galgotias University",
    caption: "Find a verified pool going your way and split the cost fairly.",
  },
  host: {
    label: "Host",
    icon: Car,
    image: "/revamp/app/hero-host.webp",
    alt: "Syinq host home screen showing offer-a-ride and vehicle and licence verification steps",
    caption: "Offer your empty seats and share the running cost, coordination, not a taxi.",
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("rider");
  const m = MODES[mode];
  const fade = reduce ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="relative overflow-hidden bg-page">

      <Container className="relative flex flex-col items-center py-16 text-center sm:py-20 lg:py-24">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-200 backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-trust" />
          India&apos;s verified campus commute network
        </motion.span>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          One App.{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">For Every Campus Move.</span>
        </motion.h1>

        {/* Hero illustration, man waiting for a campus ride */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 w-full"
        >
          <Lottie
            src="/revamp/lottie/man-waiting-car.lottie"
            label="A student waiting for a shared campus ride"
            className="mx-auto h-60 w-full max-w-[540px] sm:h-80"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex flex-col items-center gap-3"
          id="get-the-app"
        >
          <StoreButtons className="justify-center" />
          <a href="#how-it-works" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            See how it works
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Rider / Host toggle (centered) */}
        <div className="mt-10">
          <div role="tablist" aria-label="Choose your view" className="inline-flex rounded-full bg-white/80 p-1 ring-1 ring-brand-200 backdrop-blur">
            {(Object.keys(MODES) as Mode[]).map((key) => {
              const active = mode === key;
              const Icon = MODES[key].icon;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(key)}
                  className="relative min-h-[40px] rounded-full px-6 py-2 text-sm font-semibold"
                >
                  {active && (
                    <motion.span
                      layoutId="hero-toggle"
                      className="absolute inset-0 rounded-full bg-brand-gradient shadow-fab"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={cn("relative z-10 flex items-center gap-1.5 transition-colors", active ? "text-white" : "text-slate-600")}>
                    <Icon size={16} />
                    I&apos;m a {MODES[key].label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caption, single line, bigger, headline colour (reacts to the toggle) */}
        <div className="mt-8 w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={fade}
              className="mx-auto max-w-3xl text-balance bg-brand-gradient bg-clip-text text-lg font-bold text-transparent sm:text-xl"
            >
              {m.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* App prototype (left) + user-reviews animation (right), fills the vacant sides */}
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={fade}
                className="relative aspect-[823/1300] w-full max-w-[290px]"
              >
                <Image src={m.image} alt={m.alt} fill sizes="290px" priority className="object-contain drop-shadow-2xl" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center lg:justify-start">
            <Lottie
              src="/revamp/lottie/user-reviews.lottie"
              loop
              label="Students sharing reviews of their verified campus pools on Syinq"
              className="h-[340px] w-full max-w-[460px] sm:h-[440px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
