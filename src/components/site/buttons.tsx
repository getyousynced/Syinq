import Link from "next/link";
import { cn } from "@/lib/utils";
import { STORE } from "@/lib/site";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 focus-visible:outline-none active:scale-[0.98] min-h-[44px]";

const variants = {
  primary:
    "bg-brand-gradient text-white shadow-fab hover:brightness-[1.04] hover:shadow-lg px-5 py-3 text-sm",
  secondary:
    "bg-white text-slate-800 ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 px-5 py-3 text-sm",
  ghost: "text-brand-600 hover:text-brand-700 hover:bg-brand-50 px-4 py-2.5 text-sm",
} as const;

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 384 512" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 512 512" width="18" height="18" aria-hidden="true">
      <path fill="#34A853" d="M325 256 76 12c5 2 12 5 19 9l205 116z" />
      <path fill="#FBBC04" d="m400 213-75-43-49 86 49 86 75-43c22-12 22-74 0-86z" />
      <path fill="#EA4335" d="M325 256 100 383c-7 4-14 7-19 9l244-263z" />
      <path fill="#4285F4" d="M52 18C45 25 41 36 41 50v412c0 14 4 25 11 32l239-238z" />
    </svg>
  );
}

export function StoreButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={STORE.apple}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-2.5 text-white transition-transform hover:scale-[1.02]"
        aria-label="Download Syinq on the App Store"
      >
        <AppleGlyph />
        <span className="text-left leading-tight">
          <span className="block text-[10px] opacity-80">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
      <a
        href={STORE.google}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-2.5 text-white transition-transform hover:scale-[1.02]"
        aria-label="Get Syinq on Google Play"
      >
        <PlayGlyph />
        <span className="text-left leading-tight">
          <span className="block text-[10px] opacity-80">Get it on</span>
          <span className="block text-sm font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
