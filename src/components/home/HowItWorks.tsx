"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Search, Handshake, KeyRound, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Lottie from "@/components/site/Lottie";
import { CTAButton } from "@/components/site/buttons";
import Reveal from "@/components/site/Reveal";
import { STEPS } from "@/content/steps";
import { cn } from "@/lib/utils";

const STEP_ICONS: LucideIcon[] = [Search, Handshake, KeyRound, Star];

const STEP_LOTTIE = [
  { src: "/revamp/lottie/choose-place.lottie", label: "Choosing your campus destination" },
  { src: "/revamp/lottie/map-routing.lottie", label: "Matching members along the route" },
  { src: "/revamp/lottie/map-routing.lottie", label: "Confirming the pool with proof-of-pool" },
  { src: "/revamp/lottie/car-gps.lottie", label: "Following the live ride" },
];


function useIsLarge() {
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setLarge(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return large;
}

/* Static, fully-accessible fallback (reduced motion / mobile). Frameless phones. */
function StaticSteps() {
  return (
    <ol className="relative mt-10 space-y-10 sm:mt-12 lg:space-y-16">
      {STEPS.map((step, i) => {
        const flip = i % 2 === 1;
        const Icon = STEP_ICONS[i];
        return (
          <li key={step.n} className="grid items-center gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-14">
            <Reveal className={cn(flip && "lg:order-2")}>
              <span className="eyebrow">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-[11px] font-bold text-white">
                  {step.n}
                </span>
                {step.eyebrow}
              </span>
              <h3 className="mt-3 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {Icon && <Icon size={20} className="shrink-0 text-brand-600" />}
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600 sm:mt-3 sm:text-base">{step.text}</p>
            </Reveal>
            <Reveal delay={80} className={cn("flex justify-center", flip && "lg:order-1")}>
              <div className="relative mx-auto aspect-[480/1080] w-full max-w-[180px] sm:max-w-[230px] lg:max-w-[270px]">
                <Image
                  src={step.screen}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 270px"
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

/* Build a smooth serpentine road through evenly spaced stations. */
function buildRoad(h: number, lw: number) {
  const ys = [0.08, 0.37, 0.64, 0.92].map((p) => Math.round(p * h));
  const xs = [lw * 0.3, lw * 0.7, lw * 0.3, lw * 0.7];
  const stations = ys.map((y, i) => ({ x: Math.round(xs[i]), y }));
  let d = `M ${stations[0].x},${stations[0].y}`;
  for (let i = 1; i < stations.length; i++) {
    const p0 = stations[i - 1];
    const p1 = stations[i];
    const dy = (p1.y - p0.y) * 0.5;
    d += ` C ${p0.x},${p0.y + dy} ${p1.x},${p1.y - dy} ${p1.x},${p1.y}`;
  }
  return { d, stations };
}

function ScrollyRoute() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const laneRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [active, setActive] = useState(0);
  const [railH, setRailH] = useState(560);
  const [len, setLen] = useState(0);
  const [car, setCar] = useState({ x: 0, y: 0 });
  const [dash, setDash] = useState(0);

  const LW = 92;
  const { d, stations } = buildRoad(railH, LW);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const el = laneRef.current;
    if (!el) return;
    const update = () => setRailH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const total = pathRef.current.getTotalLength();
      setLen(total);
      setDash(total);
      const p0 = pathRef.current.getPointAtLength(0);
      setCar({ x: p0.x, y: p0.y });
    }
  }, [railH, d]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = Math.max(0, Math.min(1, v));
    setActive(Math.max(0, Math.min(STEPS.length - 1, Math.floor(t * STEPS.length))));
    const path = pathRef.current;
    if (path && len) {
      const pt = path.getPointAtLength(t * len);
      setCar({ x: pt.x, y: pt.y });
      setDash(len * (1 - t));
    }
  });

  const lottie = STEP_LOTTIE[active];

  return (
    <section id="how-it-works" className="bg-white">
      <Container>
        <div className="pt-16 sm:pt-20 lg:pt-24">
          <SectionHeading
            eyebrow="How it works"
            title="Ride the route. Learn it as you scroll."
            subtitle="Every Syinq ride follows the same trusted journey — scroll and the road fills in beneath you, stop by stop."
          />
        </div>
      </Container>

      <div ref={sectionRef} className="relative h-[340vh]">
        <div className="sticky top-[68px] flex min-h-[calc(100vh-68px)] items-center">
          <Container className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Winding road + stations + steps */}
            <div ref={laneRef} className="relative flex min-h-[520px] gap-5">
              <div className="relative shrink-0" style={{ width: LW }}>
                <svg width={LW} height={railH} viewBox={`0 0 ${LW} ${railH}`} className="overflow-visible" aria-hidden="true">
                  {/* base road */}
                  <path d={d} fill="none" stroke="#E2E8F0" strokeWidth={8} strokeLinecap="round" />
                  <path d={d} fill="none" stroke="#fff" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" />
                  {/* traveled road */}
                  <path
                    ref={pathRef}
                    d={d}
                    fill="none"
                    stroke="url(#roadgrad)"
                    strokeWidth={8}
                    strokeLinecap="round"
                    style={{ strokeDasharray: len, strokeDashoffset: dash }}
                  />
                  <defs>
                    <linearGradient id="roadgrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#53C9FF" />
                      <stop offset="100%" stopColor="#1A64E4" />
                    </linearGradient>
                  </defs>
                  {stations.map((s, i) => (
                    <circle
                      key={i}
                      cx={s.x}
                      cy={s.y}
                      r={7}
                      fill={active >= i ? "#099BE4" : "#fff"}
                      stroke={active >= i ? "#fff" : "#CBD5E1"}
                      strokeWidth={3}
                    />
                  ))}
                </svg>
                {/* the riding car */}
                <div
                  className="pointer-events-none absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white shadow-fab ring-4 ring-white"
                  style={{ transform: `translate(${car.x - 18}px, ${car.y - 18}px)` }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h.5A1.5 1.5 0 0 1 21 12.5V17a1 1 0 0 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4a1 1 0 0 1-1-1v-4.5A1.5 1.5 0 0 1 4.5 11H5zm2.2-1h9.6l-1-3H8.2l-1 3z" />
                  </svg>
                </div>
              </div>

              {/* Steps — stops along the route */}
              <ol className="flex flex-1 flex-col justify-between py-1">
                {STEPS.map((step, i) => {
                  const Icon = STEP_ICONS[i];
                  return (
                    <li key={step.n}>
                      <motion.div animate={{ opacity: active === i ? 1 : 0.45 }} transition={{ duration: 0.3 }}>
                        <span className="eyebrow">
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                              active >= i ? "bg-brand-gradient text-white" : "bg-slate-200 text-slate-500",
                            )}
                          >
                            {step.n}
                          </span>
                          {step.eyebrow}
                        </span>
                        <h3 className="mt-1.5 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
                          {Icon && <Icon size={20} className="text-brand-600" />}
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{step.text}</p>
                      </motion.div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Phone (frameless) + route Lottie to the right */}
            <div className="relative flex justify-center">
              <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[360px]">
                <div className="relative mx-auto aspect-[480/1080] w-full">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={STEPS[active].screen}
                        alt={STEPS[active].alt}
                        fill
                        sizes="360px"
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute -right-3 top-10 z-20 hidden sm:block lg:-right-28">
                  <div className="rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-100">
                    <div className="relative h-32 w-32 overflow-hidden rounded-xl sm:h-40 sm:w-40">
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={lottie.src + active}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Lottie src={lottie.src} label={lottie.label} className="h-full w-full" />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <p className="mt-1.5 px-1 text-center text-[11px] font-semibold text-slate-500">{lottie.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="pb-16 text-center sm:pb-20 lg:pb-24">
          <CTAButton href="/how-it-works" variant="secondary">
            See the full ride lifecycle
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const isLarge = useIsLarge();

  if (reduce || !isLarge) {
    return (
      <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Ride the route. Learn it as you scroll."
            subtitle="Every Syinq ride follows the same trusted journey — scroll and the road fills in beneath you, stop by stop."
          />
          <StaticSteps />
          <div className="mt-14 text-center">
            <CTAButton href="/how-it-works" variant="secondary">
              See the full ride lifecycle
            </CTAButton>
          </div>
        </Container>
      </section>
    );
  }

  return <ScrollyRoute />;
}
