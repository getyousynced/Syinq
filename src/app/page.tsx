import AppShowcase from "@/components/AppShowcase";
import CarPooling from "@/components/Carpooling";
import ComingSoon from "@/components/ComingSoon";
import Community from "@/components/Community";
import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import ScrollReveal from "@/components/ScrollReveal";
import Security from "@/components/Security";
import Testimonials from "@/components/Testimonials";
import HowToUse from "@/components/HowToUse";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
    <Hero />
    <CarPooling />
    <Marketplace />
    <Community />
    <Security />
    <Testimonials />
    <HowToUse />
    <AppShowcase />
    <ComingSoon />
    <ScrollReveal />
    </main>
  );
}
