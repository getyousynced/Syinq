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
 * Plays ONCE each time it enters the viewport (and replays when you scroll back
 * to it) — never an infinite loop. Reduced-motion shows the first frame static.
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
        if (entry.isIntersecting) {
          setInView(true);
          // Replay from the start on each re-entry (no continuous loop).
          const dl = inst.current;
          if (dl) {
            try {
              dl.setFrame(0);
              dl.play();
            } catch {
              /* instance not ready */
            }
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)} role="img" aria-label={label}>
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
