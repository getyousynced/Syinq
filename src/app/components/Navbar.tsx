"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "../data/navLinks";
import { useTheme } from "next-themes";
// import { DarkModeToggle } from "./dark-mode-toggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  

  // Scroll event listener to toggle 'isScrolled' state
  useEffect(() => {
    console.log("Current Theme:", theme);
    console.log("Resolved Theme:", resolvedTheme);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine if the theme is dark
  // const isDarkMode = theme === 'dark' || resolvedTheme === 'dark' || (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);


  useEffect(() => {
    console.log("Current Theme:", theme);
    console.log("Resolved Theme:", resolvedTheme);
  }, [theme, resolvedTheme]);

  return (
    <nav
      className={`hidden sm:block fixed top-0 left-0 right-0 transition-all ease-in-out duration-700 z-50 py-5 px-10 ${
        isScrolled
          ? "w-[70%] shadow-lg bg-white/30 backdrop-blur-md rounded-3xl left-[15%] mt-4 py-1"
          : "w-full bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
        {isScrolled && theme!=='dark' ? (
            <Image
              src="/sync-logo.svg"
              width={80}
              height={80}
              alt="Sync Logo"
              priority
            />
          ) : (
            <Image
              src="/WhiteLogo.svg"
              width={80}
              height={80}
              alt="Sync Logo"
              priority
            />
          )}
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6">
          <ul className="flex gap-14 font-bold text-md">
            {/* <DarkModeToggle /> */}
            {NavLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  className={label === "How it works?" ? "text-blue-500" : ""}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
