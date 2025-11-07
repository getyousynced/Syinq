import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "success" | "danger";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const base = "btn transition border";
  const styles: Record<string,string> = {
    default: "bg-primary text-white border-transparent hover:bg-blue-400",
    outline: "bg-white text-primary border-primary hover:bg-blue-50",
    ghost: "bg-red-100 text-muted border-transparent hover:bg-slate-50",
    success: "bg-green-500 text-white border-transparent hover:brightness-95",
    danger: "bg-red-500 text-white border-transparent hover:brightness-95",
  };
  return <button className={cn(base, styles[variant], className)} {...props} />;
}
