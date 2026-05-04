import { useEffect, useState } from 'react'
import { ArrowLeft, Music, Loader2, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '@/lib/lang'
import { useTheme } from '@/hooks/useTheme'
import Footer from '@/components/Footer'
import { uiTranslations } from '@/lib/i18n'

interface Song {
  id?: number
  title: string
  composer: string
  language?: string
  description: string
  lyrics: string[]
  translation?: string[]
}

interface PerformancePart {
  title: string
  theme: string
  songs: Song[]
}

interface PerformanceData {
  title: string
  date: string
  time: string
  venue: string
  description: string
  highlights: string[]
  parts: PerformancePart[]
}

export default function May10Performance() {
  const { lang, setLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const tc = uiTranslations[lang].common
  const [data, setData] = useState<PerformanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    const jsonFile = lang === 'en' ? '/performance-may-10.en.json' : '/performance-may-10.json'
    fetch(jsonFile)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data')
        return res.json()
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [lang])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-300 font-medium">{tc.loading}</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4 border border-red-100 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tc.error}</h2>
          <p className="text-gray-600 dark:text-gray-400">{tc.loadError}</p>
          <Link to="/" className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-block">
            {tc.backToHome}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 text-gray-900 dark:text-gray-100">
      {/* Header Area */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/firstchord" className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{lang === 'en' ? 'Back to Performance' : '返回演出介绍'}</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Program List */}
          <div className="space-y-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white flex items-center justify-center space-x-3">
              <Music className="w-8 h-8 text-purple-500" />
              <span>{lang === 'en' ? 'Program & Lyrics' : '节目单与歌词'}</span>
              <Music className="w-8 h-8 text-purple-500" />
            </h2>
            
            {data.parts.map((part, partIndex) => (
              <div key={partIndex} className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{part.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">{part.theme}</p>
                </div>
                
                <div className="space-y-8">
                  {part.songs.map((song, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-shadow duration-300">
                      <div className="p-8 md:p-10">
                        <div className="mb-6 border-b border-gray-100 dark:border-slate-700 pb-6">
                          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                              <span className="text-purple-500 mr-3">{song.id || index + 1}.</span>
                              {song.title}
                            </h4>
                            <div className="flex flex-col md:items-end text-sm md:text-base">
                              <span className="text-gray-500 dark:text-gray-400 font-medium italic">
                                {song.composer}
                              </span>
                              {song.language && (
                                <span className="text-blue-500/80 dark:text-blue-400/80 mt-1 font-medium">
                                  {song.language}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {song.description}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 md:p-8">
                            <h5 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                              {lang === 'en' ? (song.translation ? 'Original Lyrics' : 'Lyrics') : (song.translation ? '原唱歌词' : '歌词')}
                            </h5>
                            <div className="space-y-2 font-medium text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                              {song.lyrics.map((line, i) => (
                                <p key={i}>{line}</p>
                              ))}
                            </div>
                          </div>
                          {song.translation && (
                            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-6 md:p-8 border border-blue-100 dark:border-blue-800/30">
                              <h5 className="text-sm font-semibold text-blue-400 dark:text-blue-500 uppercase tracking-wider mb-4">
                                {lang === 'en' ? 'Translation' : '歌词大意'}
                              </h5>
                              <div className="space-y-2 font-medium text-gray-600 dark:text-gray-300 text-lg leading-relaxed italic">
                                {song.translation.map((line, i) => (
                                  <p key={i}>{line}</p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {partIndex === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-px bg-gray-200 dark:bg-slate-700 w-full max-w-[10rem] md:max-w-xs mx-auto"></div>
                    <span className="px-6 text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">
                      {lang === 'en' ? 'Intermission (15 minutes)' : '中场休息 (15分钟)'}
                    </span>
                    <div className="h-px bg-gray-200 dark:bg-slate-700 w-full max-w-[10rem] md:max-w-xs mx-auto"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center space-y-3">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-2 rounded-full shadow-2xl border border-gray-200/50 dark:border-slate-700/50 flex flex-col space-y-2 items-center">
          <div className="flex flex-col items-center bg-slate-100/50 dark:bg-slate-900/50 rounded-full p-1 space-y-1">
            <button 
              onClick={() => setLang('zh')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='zh'?'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md scale-105':'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
              title="切换到中文"
            >
              中
            </button>
            <div className="w-6 h-px bg-gray-300 dark:bg-slate-600 rounded-full"></div>
            <button 
              onClick={() => setLang('en')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='en'?'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md scale-105':'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
              title="Switch to English"
            >
              EN
            </button>
          </div>
          
          <button
            onClick={toggleTheme}
            aria-label={tc.toggleTheme}
            className="w-12 h-12 mt-2 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 hover:from-blue-200 hover:to-purple-200 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all shadow-md text-gray-700 dark:text-gray-200"
          >
            {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-purple-600" />}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}