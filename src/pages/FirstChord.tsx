import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Music, Sun, Moon, Calendar, MapPin, Clock, Heart, Users, Star, Quote, User, Award, Download } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { useTheme } from '@/hooks/useTheme'
import { useDoc } from '@/hooks/useDoc'
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'
import { uiTranslations } from '@/lib/i18n'
import { firstChordData } from '@/data/firstchord'
import { Conductor as ConductorType } from '@/lib/types'

export default function FirstChord() {
  const { lang, setLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const { doc } = useDoc()
  const tc = uiTranslations[lang].common
  const d = firstChordData[lang as keyof typeof firstChordData] || firstChordData.en

  const conductors: ConductorType[] = Array.isArray(doc?.conductors) 
    ? doc.conductors.map(c => ({
        ...c,
        title: c.title || (lang === 'en' ? 'Artistic Director & Conductor' : '艺术总监 & 指挥'),
        avatar: c.avatar && c.avatar.startsWith('/') ? c.avatar : c.avatar ? `/${c.avatar}` : '/placeholder-avatar.svg'
      }))
    : []

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{tc.backToHome}</span>
          </Link>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Konzert Singers
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/90"></div>
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-widest uppercase mb-8">
            {d.hero.subtitle}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100 drop-shadow-sm">
            {d.hero.title}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 text-lg text-blue-50/90 font-medium">
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5 mr-3 text-blue-300"/> 
              {d.hero.date}
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Clock className="w-5 h-5 mr-3 text-blue-300"/> 
              {d.hero.time}
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
              <MapPin className="w-5 h-5 mr-3 text-blue-300"/> 
              {d.hero.location}
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/performance-may-10" 
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Music className="w-5 h-5" />
              <span>{lang === 'en' ? 'View Program & Lyrics' : '查看节目单与歌词'}</span>
            </Link>
            <a 
              href="/Konzert_Singers_First_Chord_Brochure.pdf" 
              download="Konzert_Singers_First_Chord_Brochure.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-blue-800/50 hover:bg-blue-700/50 border border-blue-400/30 text-white rounded-full font-bold backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{d.intro.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-blue-600 dark:text-blue-400 font-medium">{d.intro.subtitle}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-slate-700">
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {d.intro.paragraphs.map((p, i) => (
                <p key={i} className={i === d.intro.paragraphs.length - 1 ? "font-bold text-center text-xl text-blue-800 dark:text-blue-300 mt-8" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{d.legacy.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100 dark:border-slate-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{d.legacy.subtitle}</h3>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {d.legacy.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl p-8 md:p-10 shadow-lg border border-purple-100 dark:border-slate-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-purple-500 text-white rounded-2xl shadow-md">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{d.legacy.visionTitle}</h3>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {d.legacy.visionParagraphs.map((p, i) => (
                  <p key={i} className={i >= d.legacy.visionParagraphs.length - 2 ? "font-bold text-purple-800 dark:text-purple-300" : ""}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{d.conductors.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {conductors.map((c, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-3">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 p-8 flex flex-col items-center justify-center h-full space-y-4">
                    <img
                      src={c.avatar || "/images/3.jpg"}
                      alt={lang === 'en' ? "Conductor" : "指挥"}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white dark:ring-white/70 shadow"
                    />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{c.name}</h3>
                      <p className="text-purple-700 dark:text-purple-300 font-medium mb-4">{c.title}</p>
                      
                      <div className="flex flex-col space-y-3 w-full mt-4">
                        {c.experience && (
                          <div className="flex items-center text-sm px-4 py-2 rounded-lg bg-white/50 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm text-gray-700 dark:text-slate-300 w-full">
                            <User className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                            <span className="text-left leading-tight">{c.experience}</span>
                          </div>
                        )}
                        {c.education && (
                          <div className="flex items-center text-sm px-4 py-2 rounded-lg bg-white/50 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm text-gray-700 dark:text-slate-300 w-full">
                            <Music className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                            <span className="text-left leading-tight">{c.education}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                    <div className="p-6 md:p-8 space-y-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-white/10 md:col-span-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{lang === 'en' ? 'Biography' : '个人简介'}</h4>
                        <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{c.bio}</p>
                      </div>
                      {c.highlights && c.highlights.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{lang === 'en' ? 'Highlights' : '重点经历'}</h4>
                          <ul className="space-y-2">
                            {c.highlights.map((h, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 dark:text-slate-300">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                        <Award className="h-5 w-5 text-yellow-500 mr-2" />
                        {lang === 'en' ? 'Key Achievements' : '主要成就'}
                      </h4>
                      <ul className="space-y-2">
                        {c.achievements.map((a, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-slate-300">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4 md:p-6">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{lang === 'en' ? 'Conducting Philosophy' : '指挥理念'}</h4>
                      <p className="text-gray-600 dark:text-slate-300 italic leading-relaxed">{c.philosophy || (lang === 'en' ? "Music is a universal language; choir connects hearts in harmony." : "音乐是人类共同的语言，合唱是心灵交流的桥梁。我希望通过我们的演唱，让每一个听众都能感受到音乐的力量和美好。")}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{d.program.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-slate-700">
            {/* First Half */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6 pb-2 border-b border-gray-200 dark:border-slate-700">{d.program.firstHalf.title}</h3>
              <div className="space-y-3">
                {d.program.firstHalf.items.map(item => (
                  <div key={item.no} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors gap-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-blue-500 w-8">{item.no}</span>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium whitespace-nowrap">{item.lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intermission */}
            <div className="flex items-center justify-center py-8">
              <div className="h-px bg-gray-200 dark:bg-slate-700 flex-grow"></div>
              <span className="px-6 text-gray-500 dark:text-gray-400 font-medium italic">{d.program.intermission}</span>
              <div className="h-px bg-gray-200 dark:bg-slate-700 flex-grow"></div>
            </div>

            {/* Second Half */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6 pb-2 border-b border-gray-200 dark:border-slate-700">{d.program.secondHalf.title}</h3>
              <div className="space-y-3">
                {d.program.secondHalf.items.map(item => (
                  <div key={item.no} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors gap-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-blue-500 w-8">{item.no}</span>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium whitespace-nowrap">{item.lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center pt-8 border-t border-gray-200 dark:border-slate-700">
              <Link 
                to="/performance-may-10" 
                className="group inline-flex items-center space-x-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Music className="w-6 h-6 group-hover:animate-pulse" />
                <span className="text-lg">{d.program.buttonText}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Assembly of Talents */}
        <section className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{d.talents.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {d.talents.sections.map((section, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col hover:shadow-2xl transition-shadow group">
                {section.imagePrefix && (
                  <div className="w-full aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-slate-700 relative">
                    <picture>
                      <source srcSet={`/images/${section.imagePrefix}.webp`} type="image/webp" />
                      <img 
                        src={`/images/${section.imagePrefix}.jpg`} 
                        alt={section.part} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                        loading="lazy" 
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col flex-grow items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 transform -translate-y-12 md:-translate-y-14 shadow-lg border-4 border-white dark:border-slate-800 z-10">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 -mt-6 md:-mt-8">{section.part}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{d.gratitude.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-slate-700 text-center mb-12">
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light italic mb-10">
              "{d.gratitude.subtitle}"
            </p>

            <div className="grid md:grid-cols-2 gap-12 text-left">
              {/* Acknowledgements */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2 inline-block">{d.gratitude.acknowledgements.title}</h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{d.gratitude.acknowledgements.venue.role}</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{d.gratitude.acknowledgements.venue.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{d.gratitude.acknowledgements.photography.role}</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white whitespace-pre-line">{d.gratitude.acknowledgements.photography.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{d.gratitude.acknowledgements.concertPhotography.role}</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white whitespace-pre-line">{d.gratitude.acknowledgements.concertPhotography.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                      <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">{d.gratitude.acknowledgements.platinum.role}</span>
                      {d.gratitude.acknowledgements.platinum.names.map(name => (
                        <span key={name} className="block text-lg font-bold text-blue-600 dark:text-blue-400">{name}</span>
                      ))}
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                      <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">{d.gratitude.acknowledgements.gold.role}</span>
                      {d.gratitude.acknowledgements.gold.names.map(name => (
                        <span key={name} className="block text-lg font-bold text-purple-600 dark:text-purple-400">{name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* EXCO & Teams */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-purple-500 pb-2 inline-block">{d.gratitude.exco.title}</h3>
                <div className="space-y-3">
                  {d.gratitude.exco.members.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{m.role}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{m.name}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {d.gratitude.exco.teams.map((t, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{t.name}</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.members}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Founder's Note */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/5">
              <Quote className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Quote className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="text-3xl font-bold text-white">{d.gratitude.founderNoteTitle}</h3>
              </div>
              <div className="space-y-6 text-lg text-blue-50 leading-relaxed">
                <p>{d.gratitude.founderNote}</p>
                <p className="text-right font-bold text-xl text-blue-200 pt-4">
                  {d.gratitude.founderName}
                </p>
              </div>
            </div>
          </div>
        </section>

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