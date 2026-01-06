import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Conductor from '@/components/Conductor'
import Members from '@/components/Members'
import Videos from '@/components/Videos'
import Performances from '@/components/Performances'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Conductor />
        <Members />
        <Videos />
        <Performances />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
