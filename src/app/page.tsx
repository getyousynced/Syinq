import ToggleSection from '@/components/ToggleSection'
import FAQSection from '@/components/FAQ'
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main>
      <Hero />
      <Slider />
      <HowItWorks />
      <ToggleSection />
      <FAQSection />
    </main>
  )
}

