"use client";
import React, { useState } from "react";

function AboutSync() {
  const [activeNav, setActiveNav] = useState<string>("History");
  const navs = ["History", "Team", "Vision"] as const;

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <section className="bg-white min-h-screen font-manrope px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <header className="text-[#099BE4] font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-[3%] text-center sm:text-left">
            About Sync
          </header>
          <nav className="bg-[#F6F5F5] w-full sm:w-[80%] lg:w-[50%] xl:w-[36%] rounded-3xl p-1 px-2 sm:px-4 lg:px-8 drop-shadow-xl flex justify-between relative overflow-x-auto">
            {navs.map((nav) => (
              <button
                key={nav}
                className={`px-2 sm:px-4 lg:px-8 py-2 rounded-3xl font-[600] text-sm sm:text-base cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out ${activeNav === nav ? "bg-[#1BD5F533] shadow-inner" : ""
                  }`}
                onClick={() => handleNavClick(nav)}
              >
                {nav}
              </button>
            ))}
          </nav>
          <section className="flex flex-col lg:flex-row mt-6 sm:mt-8">
            <article
              className={`w-full lg:w-[60%] xl:w-[70%] font-[500] text-base sm:text-lg lg:text-xl transition-opacity duration-500 ease-in-out ${["History", "Team", "Vision"].includes(activeNav)
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            >
              {activeNav === "History" && (
                <div>
                  <h2 className="mb-3 sm:mb-5">
                    The History of Sync: From WhatsApp Group to Mobile App
                  </h2>
                  <p className="mt-3 sm:mt-5">
                    Sync originated from the "Bennett Carpooling" WhatsApp group
                    at Bennett University, where students coordinated carpools,
                    shared information, and bought and sold items. As the
                    group's admin, you recognized the need for a more organized
                    platform to enhance these interactions.
                  </p>
                  <p className="mt-3 sm:mt-5">
                    Inspired by the group's success, you envisioned Sync as a
                    mobile app that would streamline carpooling and incorporate
                    marketplace and announcement features tailored to university
                    students.
                  </p>
                </div>
              )}
              {activeNav === "Team" && <p>Information about the Sync team goes here.</p>}
              {activeNav === "Vision" && <p>Information about Sync's vision goes here.</p>}
            </article>
            <div className="mt-6 lg:mt-0 lg:ml-5 flex justify-center lg:justify-start">
              <img
                className="max-w-full h-auto transition-transform duration-500 ease-in-out"
                src="/red_car.svg"
                alt="red car"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default AboutSync;
