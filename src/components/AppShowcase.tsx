"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AppShowcase = () => {
  const slides = [
    {
      src: "/images/App%20Store%20previews.png",
      alt: "Syinq app screens",
    },
    {
      src: "/images/App%20Store%20previews%202.png",
      alt: "Syinq carpooling screens",
    },
    {
      src: "/images/App%20Store%20previews%203.png",
      alt: "Syinq safety and SOS screens",
    },
    {
      src: "/images/App%20Store%20previews%204.png",
      alt: "Syinq chat and coordination screens",
    },
  ] as const;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            One App.
            <span className="text-syinq-blue"> Unlimited Possibilities.</span>
          </h2>
          <p className="text-lg text-syinq-gray">
            Everything you need for campus life — designed to feel fast and simple.
          </p>
        </div>

        <div className="max-w-6xl mx-auto reveal-on-scroll">
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 snap-x snap-mandatory">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.src}
                className="shrink-0 w-[260px] sm:w-[280px] snap-center"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                animate={{ y: [0, -6, 0] }}
                style={{ willChange: "transform" }}
              >
                <div
                  className={
                    index % 3 === 0
                      ? "rotate-[-3deg]"
                      : index % 3 === 1
                        ? "rotate-[2deg]"
                        : "rotate-[0deg]"
                  }
                >
                  <PhoneFrame imageSrc={slide.src} alt={slide.alt} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function PhoneFrame({ imageSrc, alt }: { imageSrc: string; alt: string }) {
  return (
    <div className="relative">
      <div
        className={
          "relative w-full aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-white p-2 shadow-xl border border-gray-200"
        }
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
        <div className="absolute inset-2 rounded-[2.1rem] overflow-hidden">
          <Image src={imageSrc} alt={alt} fill sizes="280px" className="object-cover object-top" />
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black/20 rounded-full z-10" />
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/20 rounded-full blur-md" />
    </div>
  );
}

export default AppShowcase;
