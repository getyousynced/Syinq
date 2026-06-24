"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * Styled FAQ accordion matching the home FaqPreview look:
 * flat rounded-xl cards, brand-tinted on open, answer-first body.
 * Accepts any list of {q,a} pairs (Faq[] is structurally compatible),
 * so it works with faqsByCategory(...) directly.
 */
export default function FaqAccordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <Accordion type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((f, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="rounded-xl border border-slate-200 bg-white px-5 transition-colors data-[state=open]:border-brand-200 data-[state=open]:bg-brand-50/40"
        >
          <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900 hover:no-underline [&[data-state=open]>svg]:text-brand-600">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm leading-relaxed text-slate-600">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
