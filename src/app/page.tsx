import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import HowItWorks from "@/components/home/HowItWorks";
import TrustBand from "@/components/home/TrustBand";
import AppShowcase from "@/components/home/AppShowcase";
import Testimonials from "@/components/home/Testimonials";
import Roadmap from "@/components/home/Roadmap";
import FaqPreview from "@/components/home/FaqPreview";
import Founders from "@/components/home/Founders";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/JsonLd";
import { FAQS, faqPairs } from "@/content/faqs";
import { softwareApplicationSchema, faqPageSchema } from "@/lib/schema";

const HOME_FAQS = [
  FAQS[0], // What is Syinq?
  FAQS[1], // How does campus carpooling work?
  FAQS[4], // Is it safe?
  FAQS[5], // What is proof-of-pool?
  FAQS[7], // Is carpooling legal in India?
  FAQS[8], // How is the cost split?
];

export default function Home() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqPageSchema(faqPairs(HOME_FAQS))]} />
      <Hero />
      <SocialProof />
      <SavingsCalculator />
      <HowItWorks />
      <TrustBand />
      <AppShowcase />
      <Testimonials />
      <Roadmap />
      <FaqPreview items={HOME_FAQS} />
      <Founders />
      <FinalCta />
    </>
  );
}
