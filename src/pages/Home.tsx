import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import IntroFromDoc from '@/components/IntroFromDoc'
import Conductor from '@/components/Conductor'
import Members from '@/components/Members'
import Videos from '@/components/Videos'
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
        <IntroFromDoc />
        <Conductor />
        <Members />
        <Videos />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
