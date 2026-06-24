import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Reveal from "@/components/site/Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-shell", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tinted = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", tinted && "bg-white", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
