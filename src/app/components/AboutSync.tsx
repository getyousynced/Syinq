"use client";
import Image from "next/image";
import React, { useState } from "react";
import { aboutSectionContent } from "../data/navLinks";

function AboutSync() {
  const [activeNav, setActiveNav] = useState("History");
  const navs = ["History", "Team", "Vision"];

  const handlenavClick = (nav : string) => {
    setActiveNav(nav);
  };

  
  return (
    <section className="bg-white min-h-screen font-manrope px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <header className="text-[#099BE4] font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-[3%] text-center sm:text-left">
            About Sync
          </header>
          <div className="flex justify-center lg:justify-start ">
          <nav className="bg-[#F6F5F5] w-[75%] sm:w-[80%] lg:w-[50%] xl:w-[36%] rounded-3xl p-1 px-2 sm:px-4 lg:px-8 drop-shadow-xl flex justify-between relative overflow-x-auto">
            {navs.map((nav) => (
              <button
                key={nav}
                className={`px-2 sm:px-4 lg:px-8 py-2 rounded-3xl font-[600] text-sm sm:text-base cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out ${
                  activeNav === nav ? "bg-[#1BD5F533] shadow-inner" : ""
                }`}
                onClick={() => handlenavClick(nav)}
              >
                {nav}
              </button>
            ))}
          </nav>
          </div>
          
          <section className="flex flex-col lg:flex-row mt-6 sm:mt-8">
              {aboutSectionContent
                .filter(({ contName }) => activeNav === contName)
                .map(({ id, contHeading, contText }) => (
                  <article
                    key={id}
                    className="font-[500] w-[100%] lg:w-[75%] p-3 text-base sm:text-lg lg:text-xl transition-opacity duration-500 ease-in-out"
                  >
                    <h2 className="text-xl sm:text-2xl mb-4">
                      {contHeading}
                    </h2>
                    <p className="mt-3 sm:mt-5 whitespace-pre-line">
                      {contText}
                    </p>
                  </article>
                ))}

            <div className="mt-6 lg:mt-0 lg:ml-5 flex justify-center lg:justify-start ">
              <Image
                className="max-w-full object-contain h-auto transition-transform duration-500 ease-in-out"
                src="/redCar.svg"
                alt="red car"
                width={700}
                height={700}
                
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default AboutSync;
