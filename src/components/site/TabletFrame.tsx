import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Landscape tablet bezel. A single dark frame with a thin camera dot; the
 * content fills the screen. Height follows the content (no forced aspect) so it
 * stays responsive. Parent controls max width.
 */
export default function TabletFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      <div className="relative rounded-[2rem] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-900/15 sm:p-3.5">
        {/* front camera */}
        <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-700" />
        <div className="overflow-hidden rounded-[1.25rem] bg-white">{children}</div>
      </div>
    </div>
  );
}
