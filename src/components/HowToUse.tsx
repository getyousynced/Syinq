"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  Car,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const steps = [
  {
    title: "Pick Find or Offer",
    points: ["Set pickup + destination", "Choose date/time and seats"],
    icon: Car,
    accent: "blue" as const,
  },
  {
    title: "Get matched instantly",
    points: ["See nearby matches", "Approve and confirm in one tap"],
    icon: CalendarClock,
    accent: "green" as const,
  },
  {
    title: "Ride with confidence",
    points: ["Auto-created ride group", "Call + safety tools built-in"],
    icon: ShieldCheck,
    accent: "blue" as const,
  },
];

export default function HowToUse() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden" id="how-to-use">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-syinq-blue/5 blur-3xl" />
      <div className="absolute -bottom-24 right-0 w-[420px] h-[420px] rounded-full bg-syinq-green/5 blur-3xl" />
      <div className="section-container">
        <div className="max-w-5xl mx-auto reveal-on-scroll">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold">
              How to use <span className="text-syinq-blue">Syinq</span>
            </h2>
            <p className="text-lg text-syinq-gray mt-4">
              From tap to meetup in minutes.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            {/* Mini “in-app” preview */}
            <motion.div
              className="apple-card p-6 md:p-7"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-[18px] bg-white shadow-sm flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-syinq-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-syinq-dark leading-tight">Your Ride</p>
                    <p className="text-xs text-syinq-gray">Smart matching, campus-first</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-syinq-blue/10 text-syinq-blue">
                  Live
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">North Campus → Main Gate</p>
                  <p className="text-xs text-syinq-gray">Today</p>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-syinq-blue/10 px-3 py-2">
                    <p className="text-xs text-syinq-gray">ETA</p>
                    <p className="text-sm font-semibold text-syinq-dark">10 min</p>
                  </div>
                  <div className="rounded-xl bg-syinq-green/10 px-3 py-2">
                    <p className="text-xs text-syinq-gray">Seats</p>
                    <p className="text-sm font-semibold text-syinq-dark">2 left</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 px-3 py-2 border border-gray-100">
                    <p className="text-xs text-syinq-gray">Match</p>
                    <p className="text-sm font-semibold text-syinq-dark">3</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <FlowRow
                    label="Request sent"
                    meta="Finding nearby rides"
                    tone="blue"
                    delay={0.05}
                  />
                  <FlowRow
                    label="Match found"
                    meta="Approve to confirm"
                    tone="green"
                    delay={0.15}
                  />
                  <FlowRow
                    label="Group created"
                    meta="Chat + call available"
                    tone="neutral"
                    delay={0.25}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <MiniBadge icon={Users} label="Auto groups" />
                <MiniBadge icon={Phone} label="Calling" />
                <MiniBadge icon={ShieldCheck} label="Safety" />
              </div>
            </motion.div>

            {/* Steps timeline */}
            <div className="relative">
              <div className="absolute left-[18px] top-1 bottom-1 w-px bg-gray-100" aria-hidden="true" />

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <StepItem
                    key={step.title}
                    index={index}
                    title={step.title}
                    points={step.points}
                    icon={step.icon}
                    accent={step.accent}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  index,
  title,
  points,
  icon: Icon,
  accent,
}: {
  index: number;
  title: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
}) {
  const ring = accent === "green" ? "bg-syinq-green/10 text-syinq-green" : "bg-syinq-blue/10 text-syinq-blue";
  const dot = accent === "green" ? "bg-syinq-green" : "bg-syinq-blue";

  return (
    <motion.div
      className="relative pl-12"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <div className="absolute left-0 top-2">
        <div className={`w-9 h-9 rounded-[18px] ${ring} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`w-2 h-2 rounded-full ${dot} absolute -right-1 -bottom-1 ring-2 ring-white`} />
      </div>

      <div className="apple-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-syinq-dark">{title}</p>
            <ul className="mt-2 space-y-1">
              {points.map((point) => (
                <li key={point} className="text-sm text-syinq-gray">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <span className="shrink-0 text-xs font-semibold text-syinq-gray bg-white border border-gray-100 rounded-full px-2.5 py-1">
            Step {index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FlowRow({
  label,
  meta,
  tone,
  delay,
}: {
  label: string;
  meta: string;
  tone: "blue" | "green" | "neutral";
  delay: number;
}) {
  const dotClass =
    tone === "green"
      ? "bg-syinq-green"
      : tone === "blue"
        ? "bg-syinq-blue"
        : "bg-syinq-gray";

  return (
    <motion.div
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className={`mt-2 w-2 h-2 rounded-full ${dotClass}`} />
      <div>
        <p className="text-sm font-medium text-syinq-dark">{label}</p>
        <p className="text-xs text-syinq-gray">{meta}</p>
      </div>
    </motion.div>
  );
}

function MiniBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-50 text-syinq-dark border border-gray-100">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
