import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Clock, Music, Loader2, Moon, Sun } from 'lucide-react'
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
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{tc.backToHome}</span>
          </Link>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-2">
              <button onClick={() => setLang('zh')} className={`px-3 py-1 rounded-full ring-1 ring-black/10 dark:ring-white/15 ${lang==='zh'?'bg-black/5 text-gray-900 dark:bg-white/20 dark:text-white':'text-purple-700 dark:text-purple-200 hover:bg-black/5 dark:hover:bg-white/10'}`}>中文</button>
              <span className="text-purple-500 dark:text-purple-300">/</span>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full ring-1 ring-black/10 dark:ring-white/15 ${lang==='en'?'bg-black/5 text-gray-900 dark:bg-white/20 dark:text-white':'text-purple-700 dark:text-purple-200 hover:bg-black/5 dark:hover:bg-white/10'}`}>EN</button>
            </div>
            <button
              onClick={toggleTheme}
              aria-label={tc.toggleTheme}
              className="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/10 dark:ring-white/15 bg-slate-200 dark:bg-gray-800/60 hover:bg-slate-300 dark:hover:bg-white/10 transition-colors shadow-subtle"
            >
              {isDark ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {data.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-300 font-medium text-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>{data.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{data.venue}</span>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {data.description}
            </p>
          </div>

          {/* Highlights */}
          {data.highlights && data.highlights.length > 0 && (
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-16 border border-white/20 dark:border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                {lang === 'en' ? 'Concert Highlights' : '演出亮点'}
              </h2>
              <ul className="grid md:grid-cols-3 gap-6">
                {data.highlights.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 bg-white/50 dark:bg-slate-700/50 p-4 rounded-xl shadow-sm">
                    <SparklesIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                        
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 md:p-8">
                          <h5 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                            {lang === 'en' ? 'Lyrics' : '歌词'}
                          </h5>
                          <div className="space-y-2 font-medium text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                            {song.lyrics.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
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
      
      <Footer />
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}