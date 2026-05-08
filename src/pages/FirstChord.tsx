import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Music, Sun, Moon, Calendar, MapPin, Clock, Heart, Users, Star, Quote, User, Award, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { useTheme } from '@/hooks/useTheme'
import { choirDocData } from "@/data/choir-doc"
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'
import { uiTranslations } from '@/lib/i18n'
import { firstChordData } from '@/data/firstchord'
import { performanceMay10Data } from '@/data/performance-may-10'
import { Conductor as ConductorType } from '@/lib/types'

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

function getPersonColorClass(name: string) {
  if (name.includes('桂') || name.includes('Nelson Kwei')) return 'text-rosegold-600 dark:text-rosegold-400'
  if (name.includes('冯') || name.includes('Foong')) return 'text-lightpurple-600 dark:text-lightpurple-400'
  if (name.includes('林') || name.includes('Lim')) return 'text-emerald-600 dark:text-emerald-400'
  return 'text-paper-text/80 dark:text-gray-400'
}

function SongCard({ song, index, lang }: { song: Song, index: number, lang: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-paper-surface dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden border border-paper-border dark:border-rosegold-900/30 hover:shadow-lg transition-all duration-300">
      <div 
        className="p-5 md:p-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`transition-all duration-300 ${isExpanded ? 'border-b border-paper-border dark:border-rosegold-900/30 pb-4 mb-4' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1 pr-0 md:pr-4">
              <h4 className="text-lg md:text-xl font-bold text-paper-text dark:text-white group-hover:text-rosegold-600 dark:group-hover:text-rosegold-400 transition-colors leading-snug">
                <span className="text-rosegold-500 mr-2">{song.id || index + 1}.</span>
                {song.title}
              </h4>
              {song.language && (
                <div className="mt-2.5">
                  <span className="px-2.5 py-0.5 bg-paper-hover dark:bg-rosegold-900/30 text-paper-text/80 dark:text-rosegold-300 rounded-full font-medium text-xs">
                    {song.language}
                  </span>
                </div>
              )}
            </div>
            
            <div className="shrink-0 w-full md:w-64 lg:w-72 mt-3 md:mt-0 bg-paper/50 dark:bg-neutral-800/30 md:bg-transparent md:dark:bg-transparent rounded-lg p-3 md:p-0 border border-paper-border/50 dark:border-rosegold-900/20 md:border-0">
              <div className="grid grid-cols-[5rem_1fr] md:grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
                <span className="text-paper-text/80 dark:text-gray-400 text-right">{lang === 'en' ? 'Composer:' : '词曲:'}</span>
                <span className="font-semibold text-paper-text/90 dark:text-gray-300">{song.composer}</span>
                
                {song.conductor && (
                  <>
                    <span className="text-paper-text/80 dark:text-gray-400 text-right">{lang === 'en' ? 'Cond:' : '指挥:'}</span>
                    <span className={`font-semibold ${getPersonColorClass(song.conductor)}`}>{song.conductor}</span>
                  </>
                )}
                
                {song.accompanist && song.accompanist !== 'Nil' && (
                  <>
                    <span className="text-paper-text/80 dark:text-gray-400 text-right">{lang === 'en' ? 'Acc:' : '伴奏:'}</span>
                    <span className={`font-semibold ${getPersonColorClass(song.accompanist)}`}>{song.accompanist}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end text-paper-text/80 group-hover:text-rosegold-500 transition-colors">
            {isExpanded ? (
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium uppercase tracking-wider">{lang === 'en' ? 'Hide Lyrics' : '收起歌词'}</span>
                <ChevronUp className="w-4 h-4" />
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium uppercase tracking-wider">{lang === 'en' ? 'Show Lyrics' : '展开歌词'}</span>
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
                <div className="bg-paper dark:bg-black/50 dark:border dark:border-rosegold-900/30 rounded-xl p-5 md:p-6">
                  <h5 className="text-sm font-semibold text-paper-text/80 dark:text-gray-400 uppercase tracking-wider mb-4">
                    {lang === 'en' ? (song.translation ? 'Original Lyrics' : 'Lyrics') : (song.translation ? '原唱歌词' : '歌词')}
                  </h5>
                  <div className="space-y-1.5 font-medium text-paper-text/90 dark:text-gray-200 text-base leading-relaxed">
                    {song.lyrics.map((line, i) => (
                      <p key={i} className="min-h-[1.5rem]">{line}</p>
                    ))}
                  </div>
                </div>
                {song.translation && (
                  <div className="bg-rosegold-50/50 dark:bg-rosegold-900/10 rounded-xl p-5 md:p-6 border border-rosegold-100 dark:border-rosegold-800/30">
                    <h5 className="text-sm font-semibold text-rosegold-500 dark:text-rosegold-400 uppercase tracking-wider mb-4">
                      {lang === 'en' ? 'Translation' : '歌词大意'}
                    </h5>
                    <div className="space-y-1.5 font-medium text-paper-text/80 dark:text-gray-300 text-base leading-relaxed italic">
                      {song.translation.map((line, i) => (
                        <p key={i} className="min-h-[1.5rem]">{line}</p>
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

export default function FirstChord() {
  const { lang, setLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const doc = choirDocData[lang]
  const tc = uiTranslations[lang].common
  const d = firstChordData[lang as keyof typeof firstChordData] || firstChordData.en
  const pd = performanceMay10Data[lang as keyof typeof performanceMay10Data] || performanceMay10Data.en

  const conductors: ConductorType[] = Array.isArray(doc?.conductors) 
    ? doc.conductors.map(c => ({
        ...c,
        title: c.title || (lang === 'en' ? 'Artistic Director & Conductor' : '艺术总监 & 指挥'),
        avatar: c.avatar && c.avatar.startsWith('/') ? c.avatar : c.avatar ? `/${c.avatar}` : '/placeholder-avatar.svg'
      }))
    : []

  return (
    <div className="min-h-screen bg-paper dark:bg-black transition-colors duration-300 font-sans">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-paper/80 dark:bg-black/80 backdrop-blur-md border-b border-paper-border dark:border-rosegold-900/30 transition-colors duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center space-x-2 text-rosegold-600 dark:text-rosegold-400 hover:text-rosegold-800 dark:hover:text-rosegold-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{tc.backToHome}</span>
          </Link>
          <div className="flex items-center space-x-3">
            <img src="/images/logo-01.png" alt="Konzert Singers Logo" className="h-8 w-auto object-contain dark:hidden" />
            <img src="/images/logo-02.png" alt="Konzert Singers Logo" className="h-8 w-auto object-contain hidden dark:block" />
            <div className="hidden sm:block text-sm font-medium text-paper-text/80 dark:text-rosegold-400/80 border-l border-paper-border dark:border-rosegold-900/50 pl-3">
              {lang === 'zh' ? '咏歌堂' : 'Konzert Singers'}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-paper dark:bg-black text-paper-text dark:text-white">
        <div className="absolute inset-0 bg-[url('/images/background_light.png')] dark:bg-[url('/images/background_dark.png')] bg-cover bg-[75%_center] md:bg-center opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-paper/40 to-paper/80 dark:from-transparent dark:to-black/90"></div>
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="mb-8 flex justify-center">
            <img src="/images/logo-03.png" alt="Konzert Singers Logo" className="h-20 w-auto object-contain drop-shadow-lg opacity-90 dark:hidden" />
            <img src="/images/logo-04.png" alt="Konzert Singers Logo" className="h-20 w-auto object-contain drop-shadow-lg opacity-90 hidden dark:block" />
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-rosegold-900/20 backdrop-blur-md border border-rosegold-500/20 dark:border-rosegold-500/20 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm text-rosegold-800 dark:text-rosegold-200">
            {d.hero.subtitle}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rosegold-800 to-lightpurple-800 dark:from-rosegold-200 dark:to-rosegold-500 drop-shadow-sm dark:drop-shadow-md">
            {d.hero.title}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 text-lg font-medium">
            <div className="flex items-center bg-white/50 dark:bg-rosegold-900/10 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm border border-rosegold-800/10 dark:border-rosegold-800/30 text-paper-text dark:text-rosegold-100">
              <Calendar className="w-5 h-5 mr-3 text-rosegold-600 dark:text-rosegold-400"/> 
              {d.hero.date}
            </div>
            <div className="flex items-center bg-white/50 dark:bg-rosegold-900/10 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm border border-rosegold-800/10 dark:border-rosegold-800/30 text-paper-text dark:text-rosegold-100">
              <Clock className="w-5 h-5 mr-3 text-rosegold-600 dark:text-rosegold-400"/> 
              {d.hero.time}
            </div>
            <div className="flex items-center bg-white/50 dark:bg-rosegold-900/10 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm border border-rosegold-800/10 dark:border-rosegold-800/30 text-paper-text dark:text-rosegold-100">
              <MapPin className="w-5 h-5 mr-3 text-rosegold-600 dark:text-rosegold-400"/> 
              {d.hero.location}
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/Konzert_Singers_First_Chord_Brochure.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              download="Konzert_Singers_First_Chord_Brochure.pdf"
              key={lang}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-neutral-900/80 border border-rosegold-400/50 dark:border-rosegold-500/50 text-rosegold-800 dark:text-rosegold-400 rounded-full font-bold backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>{lang === 'en' ? 'Download Brochure' : '下载电子宣传册'}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 space-y-24 max-w-5xl">
        
        {/* Intro Section */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paper-text dark:text-rosegold-400 mb-4">{d.intro.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rosegold-500 to-lightpurple-500 dark:from-rosegold-600 dark:to-rosegold-400 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-rosegold-600 dark:text-rosegold-400/80 font-medium">{d.intro.subtitle}</p>
          </div>
          <div className="bg-paper-surface dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border border-paper-border dark:border-rosegold-900/30">
            <div className="aspect-[21/9] w-full bg-paper-hover dark:bg-neutral-950 relative overflow-hidden">
              <img 
                src="/images/about.jpg"
                alt={d.intro.title} 
                className="w-full h-full object-cover object-center"
                loading="lazy" 
              />
            </div>
            <div className="p-8 md:p-12">
              <div className="space-y-6 text-lg text-paper-text/90 dark:text-gray-300 leading-relaxed">
                {d.intro.paragraphs.map((p, i) => (
                  <p key={i} className={i === d.intro.paragraphs.length - 1 ? "font-bold text-center text-xl text-rosegold-800 dark:text-rosegold-300 mt-8" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paper-text dark:text-rosegold-400 mb-4">{d.legacy.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rosegold-500 to-lightpurple-500 dark:from-rosegold-600 dark:to-rosegold-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-rosegold-50 to-orange-50 dark:from-neutral-900 dark:to-black rounded-3xl p-8 md:p-10 shadow-lg border border-rosegold-100 dark:border-rosegold-900/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-rosegold-500 dark:bg-rosegold-900/50 dark:text-rosegold-400 text-white rounded-2xl shadow-md dark:border dark:border-rosegold-800/50">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-paper-text dark:text-rosegold-100">{d.legacy.subtitle}</h3>
              </div>
              <div className="space-y-4 text-paper-text/90 dark:text-gray-300 leading-relaxed">
                {d.legacy.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-lightpurple-50 to-pink-50 dark:from-neutral-900 dark:to-black rounded-3xl p-8 md:p-10 shadow-lg border border-lightpurple-100 dark:border-rosegold-900/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-lightpurple-500 dark:bg-rosegold-900/50 dark:text-rosegold-400 text-white rounded-2xl shadow-md dark:border dark:border-rosegold-800/50">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-paper-text dark:text-rosegold-100">{d.legacy.visionTitle}</h3>
              </div>
              <div className="space-y-4 text-paper-text/90 dark:text-gray-300 leading-relaxed">
                {d.legacy.visionParagraphs.map((p, i) => (
                  <p key={i}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conductors Section */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paper-text dark:text-rosegold-400 mb-4">{d.conductors.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rosegold-500 to-lightpurple-500 dark:from-rosegold-600 dark:to-rosegold-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {conductors.map((c, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow border-0 dark:border dark:border-rosegold-900/30 dark:bg-neutral-900">
                <div className="grid md:grid-cols-3">
                  <div className="bg-gradient-to-br from-lightpurple-100 to-rosegold-100 dark:from-neutral-950 dark:to-black p-8 flex flex-col items-center justify-center h-full space-y-4 border-b md:border-b-0 md:border-r border-transparent dark:border-rosegold-900/50">
                    <img
                      src={c.avatar || "/images/3.jpg"}
                      alt={lang === 'en' ? "Conductor" : "指挥"}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white dark:ring-rosegold-900/50 shadow"
                    />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-paper-text dark:text-rosegold-100">{c.name}</h3>
                      <p className="text-lightpurple-700 dark:text-rosegold-400 font-medium mb-4">{c.title}</p>
                      
                      <div className="flex flex-col space-y-3 w-full mt-4">
                        {c.experience && (
                          <div className="flex items-center text-sm px-4 py-2 rounded-lg bg-paper-surface/50 dark:bg-rosegold-900/20 ring-1 ring-black/5 dark:ring-rosegold-800/30 backdrop-blur-sm text-paper-text/90 dark:text-rosegold-200 w-full">
                            <User className="h-4 w-4 mr-2 text-lightpurple-600 dark:text-rosegold-400 flex-shrink-0" />
                            <span className="text-left leading-tight">{c.experience}</span>
                          </div>
                        )}
                        {c.education && (
                          <div className="flex items-center text-sm px-4 py-2 rounded-lg bg-paper-surface/50 dark:bg-rosegold-900/20 ring-1 ring-black/5 dark:ring-rosegold-800/30 backdrop-blur-sm text-paper-text/90 dark:text-rosegold-200 w-full">
                            <Music className="h-4 w-4 mr-2 text-lightpurple-600 dark:text-rosegold-400 flex-shrink-0" />
                            <span className="text-left leading-tight">{c.education}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-6 border-t md:border-t-0 md:border-l border-paper-border dark:border-rosegold-900/50 md:col-span-2">
                    <div>
                      <h4 className="text-lg font-semibold text-paper-text dark:text-rosegold-300 mb-2">{lang === 'en' ? 'Biography' : '个人简介'}</h4>
                      <p className="text-paper-text/80 dark:text-gray-300 leading-relaxed">{c.bio}</p>
                    </div>
                    {c.highlights && c.highlights.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-paper-text dark:text-rosegold-300 mb-2">{lang === 'en' ? 'Highlights' : '重点经历'}</h4>
                        <ul className="space-y-2">
                          {c.highlights.map((h, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-rosegold-500 dark:bg-rosegold-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-paper-text/80 dark:text-gray-300">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-paper-text dark:text-rosegold-300 mb-2 flex items-center">
                        <Award className="h-5 w-5 text-yellow-500 dark:text-rosegold-500 mr-2" />
                        {lang === 'en' ? 'Key Achievements' : '主要成就'}
                      </h4>
                      <ul className="space-y-2">
                        {c.achievements.map((a, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-lightpurple-500 dark:bg-rosegold-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-paper-text/80 dark:text-gray-300">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-lightpurple-50 to-rosegold-50 dark:from-rosegold-900/20 dark:to-neutral-900 rounded-lg p-4 md:p-6 dark:border dark:border-rosegold-900/30">
                      <h4 className="text-lg font-semibold text-paper-text dark:text-rosegold-300 mb-2">{lang === 'en' ? 'Conducting Philosophy' : '指挥理念'}</h4>
                      <p className="text-paper-text/80 dark:text-rosegold-200/80 italic leading-relaxed">{c.philosophy || (lang === 'en' ? "Music is a universal language; choir connects hearts in harmony." : "音乐是人类共同的语言，合唱是心灵交流的桥梁。我希望通过我们的演唱，让每一个听众都能感受到音乐的力量和美好。")}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Program Section */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paper-text dark:text-rosegold-400 mb-4">{d.program.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rosegold-500 to-lightpurple-500 dark:from-rosegold-600 dark:to-rosegold-400 mx-auto rounded-full mb-8"></div>
            
            <div className="flex justify-center mb-12">
              <Link 
                to="/performance-may-10" 
                className="group inline-flex items-center space-x-2 text-rosegold-600 hover:text-rosegold-800 dark:text-rosegold-400 dark:hover:text-rosegold-300 text-sm font-medium transition-colors"
              >
                <span>{d.program.buttonText}</span>
                <ArrowLeft className="w-4 h-4 rotate-180 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="bg-transparent">
            {pd.parts.map((part, partIndex) => (
              <div key={partIndex} className="mb-16 last:mb-0">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-rosegold-800 dark:text-rosegold-300 mb-2">{part.title}</h3>
                  <p className="text-lg text-paper-text/80 dark:text-gray-400 font-medium">{part.theme}</p>
                </div>
                
                <div className="space-y-6">
                  {part.songs.map((song, index) => (
                    <SongCard key={index} song={song} index={index} lang={lang} />
                  ))}
                </div>

                {partIndex === 0 && (
                  <div className="flex items-center justify-center py-12 my-8">
                    <div className="h-px bg-gray-200 dark:bg-rosegold-900/30 flex-grow max-w-xs"></div>
                    <span className="px-6 text-paper-text/80 dark:text-rosegold-400/80 font-medium italic whitespace-nowrap">
                      {d.program.intermission}
                    </span>
                    <div className="h-px bg-gray-200 dark:bg-rosegold-900/30 flex-grow max-w-xs"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Assembly of Talents */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paper-text dark:text-rosegold-400 mb-4">{d.talents.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rosegold-500 to-lightpurple-500 dark:from-rosegold-600 dark:to-rosegold-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {d.talents.sections.map((section, i) => (
              <div key={i} className="bg-paper-surface dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl border border-paper-border dark:border-rosegold-900/30 flex flex-col hover:shadow-2xl transition-shadow group">
                {section.imagePrefix && (
                  <div className="w-full aspect-[3/2] overflow-hidden bg-paper-hover dark:bg-neutral-950 relative">
                    <picture>
                      <source srcSet={`/images/${section.imagePrefix}.webp`} type="image/webp" />
                      <img 
                        src={`/images/${section.imagePrefix}.webp`} 
                        alt={section.part} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                        loading="lazy" 
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col flex-grow items-center text-center">
                  <div className="w-16 h-16 bg-rosegold-100 dark:bg-neutral-950 rounded-full flex items-center justify-center text-rosegold-600 dark:text-rosegold-400 transform -translate-y-12 md:-translate-y-14 shadow-lg border-4 border-white dark:border-neutral-900 z-10">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-paper-text dark:text-white mb-4 -mt-6 md:-mt-8">{section.part}</h3>
                  <p className="text-paper-text/80 dark:text-gray-300 leading-relaxed font-medium">
                    {section.names}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* With Gratitude */}
        <section className="scroll-mt-24 pb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paper-text dark:text-rosegold-400 mb-4">{d.gratitude.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rosegold-500 to-lightpurple-500 dark:from-rosegold-600 dark:to-rosegold-400 mx-auto rounded-full"></div>
          </div>

          <div className="bg-paper-surface dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-xl border border-paper-border dark:border-rosegold-900/30 text-center mb-12">
            <p className="text-xl md:text-2xl text-paper-text/90 dark:text-rosegold-200/80 leading-relaxed font-light italic mb-10">
              "{d.gratitude.subtitle}"
            </p>

            <div className="grid md:grid-cols-2 gap-12 text-left">
              {/* Acknowledgements */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-paper-text dark:text-rosegold-100 border-b-2 border-rosegold-500 dark:border-rosegold-700 pb-2 inline-block">{d.gratitude.acknowledgements.title}</h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-paper-text/80 dark:text-gray-400 uppercase tracking-wider">{d.gratitude.acknowledgements.venue.role}</span>
                    <span className="text-lg font-medium text-paper-text dark:text-rosegold-200">{d.gratitude.acknowledgements.venue.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-paper-text/80 dark:text-gray-400 uppercase tracking-wider">{d.gratitude.acknowledgements.photography.role}</span>
                    <span className="text-lg font-medium text-paper-text dark:text-white whitespace-pre-line">{d.gratitude.acknowledgements.photography.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-paper-text/80 dark:text-gray-400 uppercase tracking-wider">{d.gratitude.acknowledgements.concertPhotography.role}</span>
                    <span className="text-lg font-medium text-paper-text dark:text-white whitespace-pre-line">{d.gratitude.acknowledgements.concertPhotography.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-paper dark:bg-black/50 p-4 rounded-xl dark:border dark:border-rosegold-900/30">
                      <span className="text-sm text-paper-text/80 dark:text-gray-400 uppercase tracking-wider block mb-1">{d.gratitude.acknowledgements.platinum.role}</span>
                      {d.gratitude.acknowledgements.platinum.names.map(name => (
                        <span key={name} className="block text-lg font-bold text-rosegold-600 dark:text-rosegold-400">{name}</span>
                      ))}
                    </div>
                    <div className="bg-paper dark:bg-black/50 p-4 rounded-xl dark:border dark:border-rosegold-900/30">
                      <span className="text-sm text-paper-text/80 dark:text-gray-400 uppercase tracking-wider block mb-1">{d.gratitude.acknowledgements.gold.role}</span>
                      {d.gratitude.acknowledgements.gold.names.map(name => (
                        <span key={name} className="block text-lg font-bold text-lightpurple-600 dark:text-lightpurple-400">{name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* EXCO & Teams */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-paper-text dark:text-rosegold-100 border-b-2 border-lightpurple-500 dark:border-lightpurple-800 pb-2 inline-block">{d.gratitude.exco.title}</h3>
                <div className="space-y-3">
                  {d.gratitude.exco.members.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-baseline border-b border-paper-border dark:border-rosegold-900/30 pb-2 gap-x-4">
                      <span className="text-paper-text/80 dark:text-gray-400 text-sm md:text-base text-left leading-snug">{m.role}</span>
                      <span className="font-bold text-paper-text dark:text-white text-right shrink-0">{m.name}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {d.gratitude.exco.teams.map((t, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs text-paper-text/80 dark:text-gray-400 uppercase tracking-wider mb-1">{t.name}</span>
                      <span className="text-sm font-medium text-paper-text dark:text-gray-200">{t.members}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Founder's Note */}
          <div className="bg-gradient-to-br from-paper-text to-rosegold-900 dark:from-neutral-950 dark:to-black dark:border dark:border-rosegold-900/50 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/5">
              <Quote className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-paper-surface/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Quote className="w-6 h-6 text-rosegold-200" />
                </div>
                <h3 className="text-3xl font-bold text-white">{d.gratitude.founderNoteTitle}</h3>
              </div>
              <div className="space-y-6 text-lg text-rosegold-50 leading-relaxed">
                <p>{d.gratitude.founderNote}</p>
                <p className="text-right font-bold text-xl text-rosegold-200 pt-4">
                  {d.gratitude.founderName}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center space-y-3">
        <div className="bg-paper-surface/80 dark:bg-black/80 backdrop-blur-lg p-2 rounded-full shadow-2xl border border-paper-border/50 dark:border-rosegold-900/50 flex flex-col space-y-2 items-center">
          <div className="flex flex-col items-center bg-paper-hover/50 dark:bg-neutral-800/50 rounded-full p-1 space-y-1">
            <button 
              onClick={() => setLang('zh')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='zh'?'bg-paper-surface dark:bg-neutral-700 text-rosegold-600 dark:text-rosegold-400 shadow-md scale-105':'text-paper-text/80 dark:text-gray-400 hover:text-paper-text dark:hover:text-white hover:bg-paper-surface/50 dark:hover:bg-neutral-700/50'}`}
              title="切换到中文"
            >
              中
            </button>
            <div className="w-6 h-px bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
            <button 
              onClick={() => setLang('en')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='en'?'bg-paper-surface dark:bg-neutral-700 text-rosegold-600 dark:text-rosegold-400 shadow-md scale-105':'text-paper-text/80 dark:text-gray-400 hover:text-paper-text dark:hover:text-white hover:bg-paper-surface/50 dark:hover:bg-neutral-700/50'}`}
              title="Switch to English"
            >
              EN
            </button>
          </div>
          
          <button
            onClick={toggleTheme}
            aria-label={tc.toggleTheme}
            className="w-12 h-12 mt-2 flex items-center justify-center rounded-full bg-gradient-to-tr from-rosegold-100 to-lightpurple-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-rosegold-200 hover:to-lightpurple-200 dark:hover:from-neutral-700 dark:hover:to-neutral-800 transition-all shadow-md text-paper-text/90 dark:text-gray-200"
          >
            {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-lightpurple-600" />}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}