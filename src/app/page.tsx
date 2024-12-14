
import ToggleSection from '@/components/ToggleSection'
import FAQSection from '@/components/FAQ'
import TopFooter from '@/components/TopFooter'
import Footer from '@/components/Footer'
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ToggleSection />
      <FAQSection />
      <TopFooter />
      <Footer/>
    </main>
  )
}

