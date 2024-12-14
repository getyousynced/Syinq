"use client";

import { useState } from "react";
import Image from "next/image";

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

      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <div className="relative w-64 h-64">
              <Image
                src="/assets/1.png"
                alt="Search illustration"
                width={256}
                height={256}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Search</h3>
              <p className="text-sm text-gray-600">
                Look for where you heading towards?
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="relative w-64 h-64">
              <Image
                src="/assets/2.png"
                alt="Choose illustration"
                width={256}
                height={256}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold ">Choose</h3>
              <p className="text-sm text-gray-600">
                Choose for date & time, cab & pvt vehicle
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="relative w-64 h-64">
              <Image
                src="/assets/3.png"
                alt="Publish illustration"
                width={256}
                height={256}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Publish</h3>
              <p className="text-sm text-gray-600">Get your ride published</p>
            </div>
          </div>
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
