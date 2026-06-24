"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Route, ShieldCheck, Car, GraduationCap, Newspaper, Download } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NAV, STORE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<string, LucideIcon> = {
  "/how-it-works": Route,
  "/safety": ShieldCheck,
  "/for-hosts": Car,
  "/for-campuses": GraduationCap,
  "/blog": Newspaper,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 90) setCompact(false);
      else if (y > lastY.current + 5) setCompact(true); // down → icons only
      else if (y < lastY.current - 5) setCompact(false); // up → labels
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labelCls = cn(
    "overflow-hidden whitespace-nowrap transition-all duration-300 ease-out",
    compact ? "max-w-0 opacity-0" : "ml-1.5 max-w-[140px] opacity-100",
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      {/* Liquid-glass floating pill (iOS-26 feel) */}
      <nav
        aria-label="Primary"
        className={cn(
          "flex max-w-[calc(100vw-1.5rem)] items-center gap-1 rounded-full bg-gradient-to-b from-white/75 to-white/45 px-2 py-1.5 ring-1 ring-white/60 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
          scrolled
            ? "shadow-[0_14px_44px_-12px_rgba(15,23,42,0.35)]"
            : "shadow-[0_6px_24px_-12px_rgba(15,23,42,0.22)]",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center px-2" aria-label="Syinq home">
          <Image src="/revamp/brand/syinq-wordmark.png" alt="Syinq" width={104} height={31} priority className="h-7 w-auto" />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = NAV_ICONS[item.href];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    "flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-brand-500/15 text-brand-700" : "text-slate-700 hover:bg-white/60",
                  )}
                >
                  {Icon && <Icon size={20} className="shrink-0" />}
                  <span className={labelCls}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <span className="mx-1 hidden h-6 w-px bg-slate-900/10 lg:block" />

        <Link href="/about" className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white/60 lg:block">
          About
        </Link>
        <a
          href={STORE.oneLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-[40px] shrink-0 items-center justify-center rounded-full bg-brand-gradient px-3.5 py-2 text-sm font-semibold text-white shadow-fab transition-all hover:brightness-[1.05] active:scale-[0.98] lg:inline-flex"
        >
          <Download size={18} className="shrink-0" />
          <span className={labelCls}>Get the app</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-white/60 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu — glass card under the pill */}
      <div
        id="mobile-menu"
        className={cn(
          "absolute left-3 right-3 top-[64px] origin-top overflow-hidden rounded-3xl bg-white/80 ring-1 ring-white/60 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 lg:hidden",
          open ? "max-h-[460px] opacity-100 shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)]" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 p-3">
          {NAV.map((item) => {
            const Icon = NAV_ICONS[item.href];
            return (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-[44px] items-center gap-3 rounded-2xl px-3 text-base font-medium text-slate-700 hover:bg-white/70">
                  {Icon && <Icon size={20} className="text-brand-600" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/about" className="flex min-h-[44px] items-center gap-3 rounded-2xl px-3 text-base font-medium text-slate-700 hover:bg-white/70">
              <GraduationCap size={20} className="text-brand-600" />
              About
            </Link>
          </li>
          <li className="pt-1">
            <a
              href={STORE.oneLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-fab"
            >
              <Download size={18} />
              Get the app
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
