
import ToggleSection from '@/components/ToggleSection'
import FAQSection from '@/components/FAQ'
import TopFooter from '@/components/TopFooter'
import Footer from '@/components/Footer'
import Navbar from "@/components/Navbar";
import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main>
      <Hero />
      <Calculator />
      <HowItWorks />
      <ToggleSection />
      <FAQSection />
      <TopFooter />
      <Footer/>
    </main>
  )
}

