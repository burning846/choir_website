import { User, Music, Award } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { choirDocData } from "@/data/choir-doc"
import { uiTranslations } from '@/lib/i18n'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { Conductor as ConductorType } from '@/lib/types'

export default function Conductor() {
  const { lang } = useLang()
  const doc = choirDocData[lang]
  const ts = uiTranslations[lang].sections

  const conductors: ConductorType[] = Array.isArray(doc?.conductors) 
    ? doc.conductors.map(c => ({
        ...c,
        title: c.title || (lang === 'en' ? 'Artistic Director & Conductor' : '艺术总监 & 指挥'),
        avatar: c.avatar && c.avatar.startsWith('/') ? c.avatar : c.avatar ? `/${c.avatar}` : '/placeholder-avatar.svg'
      }))
    : []

  return (
    <section id="conductor" className="py-16 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={ts.conductor} />
        
        <div className="max-w-6xl mx-auto">
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
        </div>
      </div>
    </section>
  )
}
