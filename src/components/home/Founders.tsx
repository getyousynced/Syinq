"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import { CTAButton } from "@/components/site/buttons";
import Reveal from "@/components/site/Reveal";
import { FOUNDERS, SITE } from "@/lib/site";

export default function Founders() {
  const reduce = useReducedMotion();

  return (
    <section id="founders" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="The humans behind Syinq"
          title="Notes from the founders"
          subtitle="No faceless-startup energy here — just two campus builders shipping the verified commute network we wished already existed."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {FOUNDERS.map((f, i) => {
            const firstName = f.name.split(" ")[0];
            return (
              <motion.article
                key={f.name}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reduce ? undefined : { y: -2 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7"
              >
                <div className="flex items-start gap-5">
                  <Image
                    src={f.photo}
                    alt={`${f.name}, ${f.role} at Syinq`}
                    width={256}
                    height={320}
                    sizes="(max-width: 640px) 7rem, 8rem"
                    className="aspect-[4/5] w-28 shrink-0 rounded-xl object-cover sm:w-32"
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">{f.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-brand-600">{f.role}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {f.knowsAbout.map((k) => (
                        <li
                          key={k}
                          className="rounded-full border border-slate-200 bg-page px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-slate-700">
                  &ldquo;{f.note}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={`mailto:${f.email}?subject=Hey ${firstName}, about Syinq`}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Write to {firstName}
                  </a>
                  <Link
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center" delay={120}>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600">
            Got an idea, a bug, or a campus you want Syinq on next? We actually read every message —
            reach out and help us build the commute your campus deserves.
          </p>
          <CTAButton href={`mailto:${SITE.email}?subject=Hey Syinq team`}>
            Write to the team
            <ArrowRight size={18} aria-hidden="true" />
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  );
}
