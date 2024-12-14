import ToggleSection from '@/components/ToggleSection'
import FAQSection from '@/components/FAQ'
import TopFooter from '@/components/TopFooter'
import Footer from '@/components/Footer'
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main>
      <HowItWorks/>
      <ToggleSection />
      <FAQSection />
      <TopFooter />
      <Footer/>
    </main>
  )
}