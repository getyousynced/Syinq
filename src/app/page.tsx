
import ToggleSection from '@/components/ToggleSection'
import FAQSection from '@/components/FAQ'
import TopFooter from '@/components/TopFooter'
import Footer from '@/components/Footer'
import Navbar from "@/components/Navbar";
import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Calculator />
      <ToggleSection />
      <FAQSection />
      <TopFooter />
      <Footer/>
    </main>
  )
}

