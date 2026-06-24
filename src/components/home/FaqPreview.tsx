"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Car,
  ChevronDown,
  GraduationCap,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import type { Faq } from "@/content/faqs";

const CATEGORY_ICON: Record<Faq["category"], LucideIcon> = {
  Basics: Sparkles,
  "Safety & Trust": ShieldCheck,
  Cost: IndianRupee,
  Hosts: Car,
  Campuses: GraduationCap,
};

export default function FaqPreview({ items }: { items: Faq[] }) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-page py-16 sm:py-20 lg:py-24">
      {/* Faint decorative question/route motif — static, reduced-motion safe */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-10 top-12 h-64 w-64 text-brand-200/50 sm:-right-4 lg:h-80 lg:w-80"
        fill="none"
      >
        <path
          d="M24 44 C 84 22, 70 116, 128 108 S 184 156, 176 178"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 11"
        />
        <circle cx="24" cy="44" r="6" fill="currentColor" />
        <path
          d="M176 178 a 11 11 0 1 0 0.01 0 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M108 56 a 13 13 0 1 1 14 13 v 8"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="122" cy="92" r="3" fill="currentColor" />
      </svg>

      <Container>
        <SectionHeading
          eyebrow="Questions, answered"
          title="The things students actually ask"
          subtitle="Straight answers on safety, cost, legality and how pooling really works."
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {items.map((f, i) => {
            const Icon = CATEGORY_ICON[f.category];
            const isOpen = open === i;
            const triggerId = `${baseId}-trigger-${i}`;
            const panelId = `${baseId}-panel-${i}`;

            return (
              <Reveal key={f.q} delay={(i % 6) * 40}>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen((prev) => (prev === i ? null : i))}
                    className="group flex min-h-[44px] w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100"
                    >
                      <Icon size={20} />
                    </span>
                    <span className="flex-1 text-base font-semibold text-slate-900">{f.q}</span>
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 26 }
                      }
                      className="shrink-0 text-slate-400 transition-colors group-hover:text-brand-600"
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : {
                                height: { type: "spring", stiffness: 320, damping: 34 },
                                opacity: { duration: 0.2 },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-[4.75rem] pr-5 text-sm leading-relaxed text-slate-600">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 text-center">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
          >
            See all FAQs
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
