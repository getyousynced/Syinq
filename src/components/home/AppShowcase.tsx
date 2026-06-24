"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { StoreButtons } from "@/components/site/buttons";

const highlights = [
  "Map-first home that reads like a route",
  "Looking / Watchlist captures demand when no ride exists yet",
  "Fare adjuster keeps the split fair, budget, fair or premium",
  "Your Rides: active, upcoming, completed and what you've saved",
];

export default function AppShowcase() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Autoplay (muted) when the phone scrolls into view; pause when it leaves.
  // Skipped entirely when the visitor prefers reduced motion.
  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.4, 1] },
    );

    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="See it in action"
              title="The whole commute, in one calm app"
              subtitle="No logistics homework, no spreadsheet of WhatsApp messages. Just a clean, route-led app built for fast, trusted decisions."
            />
            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <StoreButtons />
            </div>
          </Reveal>

          <Reveal delay={80} className="flex justify-center">
            <div className="mx-auto w-full max-w-[300px]">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="block h-auto w-full"
                  poster="/revamp/media/app-demo-poster.jpg"
                  preload="metadata"
                  playsInline
                  muted
                  loop
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src="/revamp/media/app-demo.webm" type="video/webm" />
                  <source src="/revamp/media/app-demo.mp4" type="video/mp4" />
                </video>

                {reduce && !playing ? (
                  // Reduced-motion fallback: poster + a clear, central Play button.
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label="Play Syinq app demo"
                    className="absolute inset-0 flex items-center justify-center bg-slate-900/15 transition hover:bg-slate-900/10"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand-600 shadow-lg">
                      <Play size={26} className="ml-1 fill-current" />
                    </span>
                  </button>
                ) : (
                  // Persistent stop/play control so visitors can pause the loop.
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? "Pause app demo" : "Play app demo"}
                    className="absolute bottom-3 right-3 flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-slate-900/70 text-white shadow-md backdrop-blur transition hover:bg-slate-900/85"
                  >
                    {playing ? (
                      <Pause size={18} className="fill-current" />
                    ) : (
                      <Play size={18} className="ml-0.5 fill-current" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
