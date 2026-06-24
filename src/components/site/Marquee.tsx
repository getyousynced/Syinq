import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite marquee. Renders children twice and animates the track to -50% so
 * the loop is seamless. Pauses on reduced-motion (handled in globals.css).
 */
export default function Marquee({
  children,
  durationSec = 36,
  className,
}: {
  children: ReactNode;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("group relative flex w-full overflow-hidden", className)}
      style={{ "--marquee-duration": `${durationSec}s` } as CSSProperties}
    >
      <div className="marquee-track animate-marquee gap-4 pr-4">{children}</div>
      <div className="marquee-track animate-marquee gap-4 pr-4" aria-hidden="true">
        {children}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-page to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-page to-transparent" />
    </div>
  );
}
