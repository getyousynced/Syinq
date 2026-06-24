"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, TrendingUp, Fuel, Users, CalendarDays } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import TabletFrame from "@/components/site/TabletFrame";
import Lottie from "@/components/site/Lottie";
import type { PetrolPrice } from "@/lib/petrol";

const MILEAGE_KMPL = 15;
const SOLO_PER_KM = 17;
const MIN_SOLO = 60;
const WEEKS_PER_MONTH = 4.3;

const CAMPUSES = [
  "Bennett University",
  "Sharda University",
  "Galgotias University",
  "GNIOT",
  "Other / my campus",
];

function useCountUp(value: number, duration = 600) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduce]);
  return display;
}

function Stepper({
  label,
  icon: Icon,
  value,
  set,
  min,
  max,
  suffix,
}: {
  label: string;
  icon: typeof Users;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <Icon size={16} className="text-brand-600" />
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => set(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100 disabled:opacity-40"
        >
          <Minus size={18} />
        </button>
        <span className="tnum w-14 text-center text-xl font-bold text-slate-900">
          {value}
          {suffix && <span className="ml-1 text-sm font-medium text-slate-400">{suffix}</span>}
        </span>
        <button
          type="button"
          onClick={() => set(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100 disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

/* A bar that animates its fill via transform (scaleX). */
function Meter({
  label,
  valueText,
  pct,
  tone,
}: {
  label: string;
  valueText: string;
  pct: number;
  tone: "solo" | "pool";
}) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="tnum font-bold text-slate-900">{valueText}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={tone === "solo" ? "h-full origin-left rounded-full bg-amber-400" : "h-full origin-left rounded-full bg-brand-gradient"}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: Math.max(0.04, Math.min(1, pct)) }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 22 }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default function SavingsCalculatorClient({ petrol }: { petrol: PetrolPrice }) {
  const [campus, setCampus] = useState(CAMPUSES[0]);
  const [distance, setDistance] = useState(9);
  const [tripsPerWeek, setTripsPerWeek] = useState(10);
  const [people, setPeople] = useState(3);

  const { solo, share, monthly, fuelPct } = useMemo(() => {
    const runningPerKm = petrol.price / MILEAGE_KMPL;
    const soloTrip = Math.max(MIN_SOLO, distance * SOLO_PER_KM);
    const shareTrip = (distance * runningPerKm) / people;
    const monthlySave = Math.max(0, (soloTrip - shareTrip) * tripsPerWeek * WEEKS_PER_MONTH);
    return {
      solo: Math.round(soloTrip),
      share: Math.round(shareTrip),
      monthly: Math.round(monthlySave / 10) * 10,
      fuelPct: 1 / people, // your share of the fuel vs going solo
    };
  }, [distance, tripsPerWeek, people, petrol.price]);

  const animatedMonthly = useCountUp(monthly);
  const maxCost = Math.max(solo, share, 1);

  return (
    <section id="savings" className="bg-page py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why pool to campus"
          title="Watch what you'd save pooling to campus"
          subtitle="Going solo burns fuel and cash. Drag the numbers and watch your monthly saving move — this is your share of the running cost, never a Syinq fare."
        />

        {/* Final saving — shown OUTSIDE the tablet */}
        <Reveal className="mx-auto mt-10 max-w-4xl text-center">
          <p className="text-sm font-medium text-slate-500">Estimated monthly saving</p>
          <p className="tnum mt-1 text-6xl font-bold leading-none sm:text-7xl">
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              ₹{animatedMonthly.toLocaleString("en-IN")}
            </span>
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-4xl">
          <TabletFrame>
            <div className="grid md:grid-cols-2 md:items-stretch">
              {/* Left half — the calculator (inputs + breakdown), no coins */}
              <div className="space-y-5 p-6 sm:p-7">
                <div>
                  <label htmlFor="campus" className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <TrendingUp size={16} className="text-brand-600" />
                    Your campus
                  </label>
                  <select
                    id="campus"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {CAMPUSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="distance" className="flex items-center justify-between text-sm font-medium text-slate-600">
                    <span className="flex items-center gap-2">
                      <Fuel size={16} className="text-brand-600" />
                      One-way distance
                    </span>
                    <span className="tnum font-semibold text-slate-900">{distance} km</span>
                  </label>
                  <input
                    id="distance"
                    type="range"
                    min={2}
                    max={40}
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="mt-3 w-full accent-brand-500"
                    aria-valuetext={`${distance} kilometres`}
                  />
                </div>

                <div className="space-y-4 border-y border-slate-100 py-4">
                  <Stepper label="Trips / week" icon={CalendarDays} value={tripsPerWeek} set={setTripsPerWeek} min={2} max={20} />
                  <Stepper label="Sharing with" icon={Users} value={people} set={setPeople} min={2} max={4} suffix="ppl" />
                </div>

                <div className="space-y-3">
                  <Meter label="Going solo, per trip" valueText={`₹${solo}`} pct={solo / maxCost} tone="solo" />
                  <Meter label="Your share pooling" valueText={`₹${share}`} pct={share / maxCost} tone="pool" />
                  <p className="text-xs text-slate-400">
                    Split {people} ways, you burn just {Math.round(fuelPct * 100)}% of a solo trip&apos;s fuel.
                  </p>
                </div>
              </div>

              {/* Right half — embedded UI/UX animation */}
              <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-8">
                <Lottie
                  src="/revamp/lottie/ui-ux.lottie"
                  loop
                  label="Syinq app interface in motion"
                  className="h-full min-h-[260px] w-full max-w-[360px]"
                />
              </div>
            </div>
          </TabletFrame>

          <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
            Estimate only. Assumes petrol ≈ ₹{petrol.price}/L{" "}
            {petrol.source === "live" ? `(live, ${petrol.asOf})` : "(reference)"}, ~{MILEAGE_KMPL} km/L, a solo short ride ≈ ₹{SOLO_PER_KM}/km,
            and an even split of running cost between members. Your actual share is agreed with your Host in the app.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
