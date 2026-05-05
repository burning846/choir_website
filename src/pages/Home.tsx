import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Conductor from '@/components/Conductor'
import Videos from '@/components/Videos'
import Performances from '@/components/Performances'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { useMeta } from '@/hooks/useMeta'
import { useLang } from '@/lib/lang'
import { choirDocData } from '@/data/choir-doc'

export default function Home() {
  const { lang } = useLang()
  const doc = choirDocData[lang]

  const description = typeof doc?.intro === 'string' ? doc.intro.slice(0, 160) : undefined
  const keywords = ''
  useMeta({ description, keywords })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Conductor />
        <Videos />
        <Performances />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
