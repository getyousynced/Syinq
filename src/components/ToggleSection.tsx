"use client";

import { useState } from "react";
import Image from "next/image";
import { toggleData } from "@/data/ToggleData";

export default function ToggleSection() {
  const [mode, setMode] = useState<"publish" | "request">("publish");

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setMode("publish")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === "publish"
              ? "bg-black text-white"
              : "bg-white text-black border border-gray-200"
          }`}
        >
          Publish
        </button>
        <button
          onClick={() => setMode("request")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === "request"
              ? "bg-black text-white"
              : "bg-white text-black border border-gray-200"
          }`}
        >
          Request
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image src="/assets/Frame.png" alt="frame" width={156} height={156} />
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
          {toggleData[mode].map((item, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="relative w-64 h-64">
                <Image
                  src={item.imageSrc}
                  alt={`${item.title} illustration`}
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <Image
                  src="/assets/circle.svg"
                  alt="circle"
                  height={156}
                  width={156}
                />
                <h3 className="text-lg font-semibold sm:-mt-14 -mt-12">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-7">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Curved connecting lines */}
        <div className="absolute top-1/2 left-0 right-0 -z-10 hidden md:block">
          <svg
            className="w-full"
            height="100"
            viewBox="0 0 800 100"
            fill="none"
          >
            <path
              d="M 0,50 C 200,50 200,20 400,20 C 600,20 600,80 800,80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
