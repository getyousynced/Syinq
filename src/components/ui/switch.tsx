"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative h-6 w-11 cursor-pointer rounded-full bg-gray-200 transition-colors dark:bg-gray-700 data-[state=checked]:bg-blue-600",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block absolute top-0.5 left-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white transition-transform data-[state=checked]:translate-x-full data-[state=checked]:border-white rtl:data-[state=checked]:-translate-x-full"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
