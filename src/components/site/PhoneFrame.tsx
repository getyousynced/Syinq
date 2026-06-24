import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Cohesive phone bezel: a single thin dark frame whose outer radius closely
 * matches the inner screen radius. No background glow behind it, the prototype
 * sits clean on the section. Parent controls width.
 * (`glow` is accepted for back-compat but intentionally ignored.)
 */
export default function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-[5px] shadow-xl ring-1 ring-slate-900/15">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-white">{children}</div>
      </div>
    </div>
  );
}
