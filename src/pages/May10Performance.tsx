import { useState } from 'react'
import { ArrowLeft, Music, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '@/lib/lang'
import { useTheme } from '@/hooks/useTheme'
import Footer from '@/components/Footer'
import { uiTranslations } from '@/lib/i18n'
import { performanceMay10Data } from '@/data/performance-may-10'

interface Song {
  id?: number
  title: string
  composer: string
  language?: string
  description: string
  lyrics: string[]
  translation?: string[]
  conductor?: string
  accompanist?: string
  segmentPre?: string
  segmentPost?: string[]
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

function getPersonColorClass(name: string) {
  if (name.includes('桂') || name.includes('Nelson Kwei')) return 'text-rosegold-600 dark:text-rosegold-400'
  if (name.includes('冯') || name.includes('Foong')) return 'text-lightpurple-600 dark:text-lightpurple-400'
  if (name.includes('林') || name.includes('Lim')) return 'text-emerald-600 dark:text-emerald-400'
  return 'text-gray-400 dark:text-gray-500'
}

function SongCard({ song, index, lang }: { song: Song, index: number, lang: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-rosegold-900/30 hover:shadow-lg transition-all duration-300">
      <div 
        className="p-8 md:p-10 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`transition-all duration-300 ${isExpanded ? 'border-b border-gray-100 dark:border-rosegold-900/30 pb-6 mb-6' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1 pr-0 md:pr-4">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-rosegold-600 dark:group-hover:text-rosegold-400 transition-colors leading-snug">
                <span className="text-rosegold-500 mr-3">{song.id || index + 1}.</span>
                {song.title}
              </h4>
              {song.language && (
                <div className="mt-2.5">
                  <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-rosegold-900/30 text-gray-600 dark:text-rosegold-300 rounded-full font-medium text-sm">
                    {song.language}
                  </span>
                </div>
              )}
            </div>
            
            <div className="shrink-0 w-full md:w-64 lg:w-72 mt-4 md:mt-0 bg-slate-50/50 dark:bg-neutral-800/30 md:bg-transparent md:dark:bg-transparent rounded-lg p-4 md:p-0 border border-gray-100/50 dark:border-rosegold-900/20 md:border-0">
              <div className="grid grid-cols-[5rem_1fr] md:grid-cols-[6rem_1fr] gap-x-3 gap-y-1.5 text-sm md:text-base">
                <span className="text-gray-400 dark:text-gray-500 text-right">{lang === 'en' ? 'Composer:' : '词曲:'}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{song.composer}</span>
                
                {song.conductor && (
                  <>
                    <span className="text-gray-400 dark:text-gray-500 text-right">{lang === 'en' ? 'Cond:' : '指挥:'}</span>
                    <span className={`font-semibold ${getPersonColorClass(song.conductor)}`}>{song.conductor}</span>
                  </>
                )}
                
                {song.accompanist && (
                  <>
                    <span className="text-gray-400 dark:text-gray-500 text-right">{lang === 'en' ? 'Acc:' : '伴奏:'}</span>
                    <span className={`font-semibold ${getPersonColorClass(song.accompanist)}`}>{song.accompanist}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {song.description}
          </p>
          
          <div className="mt-6 flex items-center justify-center text-gray-400 group-hover:text-rosegold-500 transition-colors">
            {isExpanded ? (
              <div className="flex items-center space-x-2 bg-transparent px-4 py-2 rounded-full">
                <span className="text-sm font-medium uppercase tracking-wider">{lang === 'en' ? 'Hide Lyrics' : '收起歌词'}</span>
                <ChevronUp className="w-4 h-4" />
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-transparent px-4 py-2 rounded-full">
                <span className="text-sm font-medium uppercase tracking-wider">{lang === 'en' ? 'Show Lyrics' : '展开歌词'}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
        
        {/* Expanded Lyrics Area */}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4 cursor-default" onClick={(e) => e.stopPropagation()}>
              <div className={`grid gap-4 ${song.translation ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                <div className="bg-slate-50 dark:bg-black/50 dark:border dark:border-rosegold-900/30 rounded-xl p-6 md:p-8">
                  <h5 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                    {lang === 'en' ? (song.translation ? 'Original Lyrics' : 'Lyrics') : (song.translation ? '原唱歌词' : '歌词')}
                  </h5>
                  <div className="space-y-1.5 font-medium text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                    {song.lyrics.map((line, i) => (
                      <p key={i} className="min-h-[1.75rem]">{line}</p>
                    ))}
                  </div>
                </div>
                {song.translation && (
                  <div className="bg-rosegold-50/50 dark:bg-rosegold-900/10 rounded-xl p-6 md:p-8 border border-rosegold-100 dark:border-rosegold-800/30">
                    <h5 className="text-sm font-semibold text-rosegold-500 dark:text-rosegold-400 uppercase tracking-wider mb-4">
                      {lang === 'en' ? 'Translation' : '歌词大意'}
                    </h5>
                    <div className="space-y-1.5 font-medium text-gray-600 dark:text-gray-300 text-lg leading-relaxed italic">
                      {song.translation.map((line, i) => (
                        <p key={i} className="min-h-[1.75rem]">{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function May10Performance() {
  const { lang, setLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const tc = uiTranslations[lang].common
  const data = performanceMay10Data[lang] as PerformanceData

  if (!data) {
    return (
      <div className="min-h-screen bg-paper dark:bg-black transition-colors duration-300 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4 border border-red-100 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tc.error}</h2>
          <p className="text-gray-600 dark:text-gray-400">{tc.loadError}</p>
          <Link to="/" className="mt-6 px-6 py-2.5 bg-rosegold-600 hover:bg-rosegold-700 text-white font-medium rounded-lg transition-colors inline-block">
            {tc.backToHome}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-black transition-colors duration-300 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header Area */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/firstchord" className="inline-flex items-center space-x-2 text-rosegold-600 dark:text-rosegold-400 hover:text-rosegold-800 dark:hover:text-rosegold-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{lang === 'en' ? 'Back to Performance' : '返回演出介绍'}</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Program List */}
          <div className="space-y-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-rosegold-400 flex items-center justify-center space-x-3 mb-4">
              <Music className="w-8 h-8 text-rosegold-500" />
              <span>{lang === 'en' ? 'Program & Lyrics' : '节目单与歌词'}</span>
              <Music className="w-8 h-8 text-rosegold-500" />
            </h2>
            
            {data.parts.map((part, partIndex) => (
              <div key={partIndex} className="space-y-8 mb-16 last:mb-0">
                <div className="text-center space-y-2 mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-rosegold-800 dark:text-rosegold-300">{part.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{part.theme}</p>
                </div>
                
                <div className="space-y-6">
                  {part.songs.map((song, index) => (
                    <SongCard key={index} song={song} index={index} lang={lang} />
                  ))}
                </div>
                
                {partIndex === 0 && (
                  <div className="flex items-center justify-center py-12 my-8">
                    <div className="h-px bg-gray-200 dark:bg-rosegold-900/30 flex-grow max-w-xs"></div>
                    <span className="px-6 text-gray-500 dark:text-rosegold-400/80 font-medium italic whitespace-nowrap">
                      {lang === 'en' ? 'Intermission (15 minutes)' : '中场休息 (15分钟)'}
                    </span>
                    <div className="h-px bg-gray-200 dark:bg-rosegold-900/30 flex-grow max-w-xs"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center space-y-3">
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg p-2 rounded-full shadow-2xl border border-gray-200/50 dark:border-rosegold-900/50 flex flex-col space-y-2 items-center">
          <div className="flex flex-col items-center bg-slate-100/50 dark:bg-neutral-800/50 rounded-full p-1 space-y-1">
            <button 
              onClick={() => setLang('zh')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='zh'?'bg-white dark:bg-neutral-700 text-rosegold-600 dark:text-rosegold-400 shadow-md scale-105':'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50'}`}
              title="切换到中文"
            >
              中
            </button>
            <div className="w-6 h-px bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
            <button 
              onClick={() => setLang('en')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='en'?'bg-white dark:bg-neutral-700 text-rosegold-600 dark:text-rosegold-400 shadow-md scale-105':'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50'}`}
              title="Switch to English"
            >
              EN
            </button>
          </div>
          
          <button
            onClick={toggleTheme}
            aria-label={tc.toggleTheme}
            className="w-12 h-12 mt-2 flex items-center justify-center rounded-full bg-gradient-to-tr from-rosegold-100 to-lightpurple-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-rosegold-200 hover:to-lightpurple-200 dark:hover:from-neutral-700 dark:hover:to-neutral-800 transition-all shadow-md text-gray-700 dark:text-gray-200"
          >
            {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-lightpurple-600" />}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}