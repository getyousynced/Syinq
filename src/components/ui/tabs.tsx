"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (v: string) => void;
  items: { value: string; label: string }[];
}
export function PillTabs({ value, onValueChange, items }: TabsProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 bg-slate-50 border border-border p-2 rounded-lg">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onValueChange(it.value)}
          className={cn(
            "px-3 py-2 rounded-full font-semibold text-sm border text-center",
            value === it.value
              ? "bg-blue-500 text-white border-border shadow"
              : "bg-transparent text-muted border-transparent hover:bg-blue-500 hover:text-white"
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
