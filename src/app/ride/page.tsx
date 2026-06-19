"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appLinks";

export default function RideRedirectPage() {
  const source = "share";

  const [status, setStatus] = useState<"idle" | "opening" | "fallback">("idle");
  const fallbackTimerRef = useRef<number | null>(null);

  // NOTE: Update this if your app uses a different deep link scheme/route.
  const deepLink = useMemo(() => {
    const base = "syinq://ride";
    const url = new URL(base);
    if (source) url.searchParams.set("src", source);
    return url.toString();
  }, [source]);

  const handleOpen = () => {
    // Browsers require a user gesture for custom-scheme navigation.
    setStatus("opening");
    if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = window.setTimeout(() => setStatus("fallback"), 1400);
    window.location.href = deepLink;
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-syinq-blue/5 blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-[420px] h-[420px] rounded-full bg-syinq-green/5 blur-3xl" />

        <div className="section-container w-full">
          <div className="max-w-xl mx-auto text-center reveal-on-scroll">
            <div className="mx-auto w-20 h-20 rounded-[18px] bg-white shadow-sm flex items-center justify-center border border-gray-100">
              <Image
                src="/images/syinq app icon.png"
                alt="Syinq"
                width={64}
                height={64}
                className="rounded-[18px]"
                priority
              />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mt-6">
              Open your <span className="text-syinq-blue">ride</span> in Syinq
            </h1>
            <p className="text-lg text-syinq-gray mt-4">
              Tap once and we’ll take you straight to the Syinq app.
            </p>

            <div className="mt-8">
              <motion.div
                className="apple-card p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-center gap-2 text-syinq-dark">
                  {status === "opening" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-syinq-blue" />
                      <span className="font-medium">Launching your ride…</span>
                    </>
                  ) : status === "fallback" ? (
                    <>
                      <ExternalLink className="w-4 h-4 text-syinq-blue" />
                      <span className="font-medium">Can’t open the app?</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 text-syinq-blue" />
                      <span className="font-medium">Ready when you are</span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    className="apple-button flex justify-center items-center gap-2"
                    onClick={handleOpen}
                  >
                    Open in Syinq
                  </button>

                  <a
                    className="apple-button flex justify-center items-center"
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    App Store
                  </a>

                  <a
                    className="apple-button flex justify-center items-center"
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play Store
                  </a>
                </div>

                <p className="text-xs text-syinq-gray mt-4">
                  If you don’t have the app yet, download it below.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
