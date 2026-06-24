"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Official LottieFiles player, client-only (wasm). Lazy-mounted on first view.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

type DotLottieLike = { play: () => void; stop: () => void; setFrame: (f: number) => void };

/**
 * Lazy-mounts on first view. By default plays ONCE per entry (replays when you
 * scroll back). With `loop`, it loops while in view and stops when scrolled
 * off-screen to save CPU/battery. Reduced-motion shows the first frame static.
 */
export default function Lottie({
  src,
  loop = false,
  className,
  label,
}: {
  src: string;
  loop?: boolean;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inst = useRef<DotLottieLike | null>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const dl = inst.current;
        if (entry.isIntersecting) {
          setInView(true);
          // Replay from the start on each re-entry.
          if (dl) {
            try {
              dl.setFrame(0);
              dl.play();
            } catch {
              /* instance not ready */
            }
          }
        } else if (dl) {
          // Stop when off-screen so a looping animation doesn't keep running.
          try {
            dl.stop();
          } catch {
            /* instance not ready */
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {inView && (
        <DotLottieReact
          src={src}
          loop={loop && !reduced}
          autoplay={!reduced}
          dotLottieRefCallback={(dl) => {
            inst.current = (dl as DotLottieLike | null) ?? null;
          }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
