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
import { useLang } from '@/lib/lang'
import { uiTranslations } from '@/lib/i18n'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function Home() {
  const { doc, loading, error } = useDoc()
  const { lang } = useLang()
  const tc = uiTranslations[lang].common

  const description = typeof doc?.intro === 'string' ? doc!.intro.slice(0, 160) : undefined
  const keywords = Array.isArray(doc?.keywords) ? doc!.keywords.join(',') : ''
  useMeta({ description, keywords })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-300 font-medium">{tc.loading}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4 border border-red-100 dark:border-red-900/30">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tc.error}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {tc.loadError}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

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
