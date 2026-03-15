"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const bannerItems = [
  "Student-verified campus rides",
  "Safer pickups and smoother drop-offs",
  "Carpool in minutes with people from your campus",
  "Marketplace and community in one app",
  "Built for everyday campus movement",
];

const repeatedItems = [...bannerItems, ...bannerItems];

export default function SiteWideCtaBanner() {
  return (
    <div className="border-t border-white/10 bg-[#0b0d12] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#0b0d12] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#0b0d12] to-transparent" />

        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">

          <div className="sitewide-marquee flex-1">
            <div className="sitewide-marquee-track">
              {repeatedItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-4 pr-4 text-sm text-white/90"
                >
                  <span>{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-syinq-blue/80" />
                </span>
              ))}
            </div>
            <div className="sitewide-marquee-track" aria-hidden="true">
              {repeatedItems.map((item, index) => (
                <span
                  key={`${item}-duplicate-${index}`}
                  className="inline-flex items-center gap-4 pr-4 text-sm text-white/90"
                >
                  <span>{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-syinq-green/80" />
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/#download"
            className="hidden shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-syinq-blue to-syinq-green px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] md:inline-flex"
          >
            Download App
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
