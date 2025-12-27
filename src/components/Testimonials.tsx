"use client";

import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Carpooling on Syinq made my daily commute cheaper and way more reliable. The student-only verification feels safe.",
    name: "Ananya G.",
    title: "University Student",
    accent: "blue" as const,
  },
  {
    quote:
      "The interface is clean and quick. I found a ride within minutes, and the in-app coordination is super smooth.",
    name: "Rahul V.",
    title: "Campus Commuter",
    accent: "green" as const,
  },
  {
    quote:
      "Love the campus-first vibe. Excited for Marketplace and the Forum — but carpooling alone is already a win.",
    name: "Priya P.",
    title: "Student Community",
    accent: "gray" as const,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute -left-20 top-1/3 w-80 h-80 bg-syinq-blue/5 rounded-full blur-3xl" />
      <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-syinq-green/5 rounded-full blur-3xl" />

      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Loved by students.
            <span className="block text-syinq-blue">Built for campus life.</span>
          </h2>
          <p className="text-lg text-syinq-gray">
            Real feedback from early users using Syinq for carpooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            const accentStyles =
              t.accent === "blue"
                ? {
                    ring: "ring-syinq-blue/10",
                    icon: "text-syinq-blue",
                    chip: "bg-syinq-blue/10 text-syinq-blue",
                  }
                : t.accent === "green"
                  ? {
                      ring: "ring-syinq-green/10",
                      icon: "text-syinq-green",
                      chip: "bg-syinq-green/10 text-syinq-green",
                    }
                  : {
                      ring: "ring-syinq-gray/10",
                      icon: "text-syinq-gray",
                      chip: "bg-syinq-lightgray text-syinq-gray",
                    };

            return (
              <div
                key={t.name}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 reveal-on-scroll transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${accentStyles.ring}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 rounded-xl p-2 ${accentStyles.chip}`}>
                    <Quote className={`h-5 w-5 ${accentStyles.icon}`} />
                  </div>
                  <p className="text-syinq-gray leading-relaxed">{t.quote}</p>
                </div>

                <div className="mt-6">
                  <p className="font-semibold text-syinq-dark">{t.name}</p>
                  <p className="text-sm text-syinq-gray">{t.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
