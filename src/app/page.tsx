import AppShowcase from "@/components/AppShowcase";
import CarPooling from "@/components/Carpooling";
import ComingSoon from "@/components/ComingSoon";
import Community from "@/components/Community";
import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import ScrollReveal from "@/components/ScrollReveal";
import Security from "@/components/Security";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
    <Hero />
    <CarPooling />
    <Marketplace />
    <Community />
    <Security />
    <AppShowcase />
    <ComingSoon />
    <ScrollReveal />
    </main>
  );
}
