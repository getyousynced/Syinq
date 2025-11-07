import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center border border-border rounded-lg px-2 py-1 text-xs text-muted bg-white", className)} {...props} />;
}
