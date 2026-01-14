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
import { useDoc } from '@/hooks/useDoc'
import { useMeta } from '@/hooks/useMeta'

export default function Home() {
  const { doc } = useDoc()
  const description = typeof doc?.intro === 'string' ? doc!.intro.slice(0, 160) : undefined
  const keywords = Array.isArray(doc?.keywords) ? doc!.keywords.join(',') : ''
  useMeta({ description, keywords })
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
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
