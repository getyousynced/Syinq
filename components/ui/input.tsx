import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full border border-border rounded-xl px-3 py-2 outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
