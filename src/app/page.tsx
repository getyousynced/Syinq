import ToggleSection from '@/components/ToggleSection'
import FAQSection from '@/components/FAQ'
import TopFooter from '@/components/TopFooter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <ToggleSection />
      <FAQSection />
      <TopFooter />
      <Footer/>
    </main>
  )
}