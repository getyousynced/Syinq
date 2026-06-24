import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-page py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Early members"
          title="Real campuses. Real routes. Real savings."
          subtitle="What early members are saying after pooling with verified people from their own campus."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Quote size={26} className="text-brand-200" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <Image
                    src={t.photo}
                    alt={`${t.name}, ${t.role}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <figcaption className="truncate text-sm font-semibold text-slate-900">
                      {t.name}
                    </figcaption>
                    <p className="truncate text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2 text-xs">
                  <span className="font-medium text-brand-700">{t.route}</span>
                  <span className="tnum font-bold text-trust">saves {t.saving}</span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
