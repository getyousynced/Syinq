import type { Metadata } from "next";
import { Container } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { CTAButton, StoreButtons } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";
import FaqAccordion from "@/components/site/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { faqsByCategory, faqPairs, type Faq } from "@/content/faqs";

export const metadata: Metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Answers about Syinq campus carpooling, how it works, safety and OTP proof-of-pool, splitting costs, hosting, carpooling legality in India, and campus partnerships.",
  path: "/faq",
});

type CategoryBlock = {
  category: Faq["category"];
  subtitle: string;
};

const CATEGORIES: CategoryBlock[] = [
  {
    category: "Basics",
    subtitle:
      "What Syinq is, how campus carpooling works, and who can join the verified network.",
  },
  {
    category: "Safety & Trust",
    subtitle:
      "Verification, OTP proof-of-pool, live status and SOS readiness, and where cost-sharing stands in India.",
  },
  {
    category: "Cost",
    subtitle:
      "How members split the running cost of a ride. It is always your share, never a Syinq fare.",
  },
  {
    category: "Hosts",
    subtitle:
      "Offering spare seats on a route you already travel, and whether you need a car at all.",
  },
  {
    category: "Campuses",
    subtitle:
      "Bringing verified ride coordination to your college, club or E-Cell through a pilot.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqPageSchema(faqPairs()),
        ]}
      />

      {/* Page hero */}
      <section className="bg-page">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">FAQ</span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Syinq FAQ, campus carpooling, answered
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Straight answers on how Syinq works, why verified-campus trust and
              OTP proof-of-pool matter, how members split the running cost, what
              it takes to host, and how campuses can partner with us. Grouped by
              topic so you can jump to what you need.
            </p>
            <div className="mt-10 flex justify-center">
              <Lottie
                src="/revamp/lottie/choose-place.lottie"
                label="Animated illustration of choosing a campus pickup place"
                className="h-44 w-full max-w-md sm:h-52"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* One section per FAQ category, alternating backgrounds */}
      {CATEGORIES.map(({ category, subtitle }, i) => {
        const items = faqsByCategory(category);
        const tinted = i % 2 === 1;
        const isSafety = category === "Safety & Trust";

        return (
          <section
            key={category}
            id={category.toLowerCase().replace(/[^a-z]+/g, "-")}
            className={
              tinted
                ? "bg-page py-16 sm:py-20 lg:py-24"
                : "bg-white py-16 sm:py-20 lg:py-24"
            }
          >
            <Container>
              <Reveal className="max-w-2xl text-left">
                <span className="eyebrow">
                  {items.length} {items.length === 1 ? "answer" : "answers"}
                </span>
                <h2 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  {category}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {subtitle}
                </p>
              </Reveal>

              <Reveal delay={80} className="mt-8 max-w-3xl">
                <FaqAccordion items={items} />

                {isSafety && (
                  <p className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-4 text-sm leading-relaxed text-slate-500">
                    Every ride starts with trust. Verified campus members, and
                    built-in safety features create accountability before the
                    journey even begins, so you can focus on getting there
                    together.
                  </p>
                )}
              </Reveal>
            </Container>
          </section>
        );
      })}

      {/* Closing CTA band */}
      <section className="bg-page py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center sm:px-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Still have questions?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Reach the team and we will help, or get the app and see how
                  your campus pools. Free on iOS and Android.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <CTAButton href="/contact" variant="secondary">
                    Contact the team
                  </CTAButton>
                  <StoreButtons className="justify-center" />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
