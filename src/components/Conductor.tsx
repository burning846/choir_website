import { User, Music, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'

type Cond = { name: string; title: string; experience: string; education: string; achievements: string[]; bio: string; philosophy: string; avatar?: string }
export default function Conductor() {
  const [conductors, setConductors] = useState<Cond[]>([])
  const { lang } = useLang()
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        if (Array.isArray(d.conductors)) {
          const arr: Cond[] = d.conductors.map((c: any) => ({
            name: c.name || '',
            title: c.title || (lang==='en' ? 'Artistic Director & Conductor' : '艺术总监 & 指挥'),
            experience: c.experience || '',
            education: c.education || '',
            achievements: Array.isArray(c.achievements) ? c.achievements : [],
            bio: c.bio || '',
            philosophy: c.philosophy || '',
            avatar: c.avatar && (c.avatar.startsWith('/') ? c.avatar : `/${c.avatar}`)
          }))
          setConductors(arr)
        } else if (d.conductor) {
          const raw = d.conductor.raw || ''
          const parts = raw.split('：')
          const title = parts[0] || ''
          const name = parts[1] || ''
          const single: Cond = {
            name,
            title: title || (lang==='en' ? 'Artistic Director & Conductor' : '艺术总监 & 指挥'),
            experience: d.conductor.experience || '',
            education: d.conductor.education || '',
            achievements: Array.isArray(d.conductor.achievements) ? d.conductor.achievements : [],
            bio: d.conductor.bio || '',
            philosophy: d.conductor.philosophy || '',
            avatar: d.conductor.avatar && (d.conductor.avatar.startsWith('/') ? d.conductor.avatar : `/${d.conductor.avatar}`)
          }
          setConductors([single])
        }
      })
      .catch(() => {})
  }, [lang])

  return (
    <section id="conductor" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang==='en'?'Artistic Director':'指挥介绍'}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {conductors.map((c, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden ring-1 ring-black/5">
                <div className="grid md:grid-cols-3">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 md:p-8 flex flex-col items-center md:items-start md:space-y-3">
                    <img
                      src={c.avatar || "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional conductor portrait, middle-aged person, confident expression, formal conductor attire, warm lighting, musical background, artistic portrait style&image_size=square_hd"}
                      alt={lang==='en'?"Conductor":"指挥"}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-800">{c.name}</h3>
                      <p className="text-purple-700 font-medium">{c.title}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/40 text-gray-800 text-sm ring-1 ring-white/50">
                        <User className="h-4 w-4 text-gray-700" />
                        <span className="ml-1">{c.experience}</span>
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/40 text-gray-800 text-sm ring-1 ring-white/50">
                        <Music className="h-4 w-4 text-gray-700" />
                        <span className="ml-1">{c.education}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-6 border-t md:border-t-0 md:border-l border-gray-200 md:col-span-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{lang==='en'?'Biography':'个人简介'}</h4>
                      <p className="text-gray-600 leading-relaxed">{c.bio}</p>
                    </div>
                    {Array.isArray((c as any).highlights) && (c as any).highlights.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{lang==='en'?'Highlights':'重点经历'}</h4>
                        <ul className="space-y-2">
                          {(c as any).highlights.map((h: string, i: number) => (
                            <li key={i} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <Award className="h-5 w-5 text-yellow-500 mr-2" />
                        {lang==='en'?'Key Achievements':'主要成就'}
                      </h4>
                      <ul className="space-y-2">
                        {c.achievements.map((a, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 md:p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{lang==='en'?'Conducting Philosophy':'指挥理念'}</h4>
                      <p className="text-gray-600 italic leading-relaxed">{c.philosophy || (lang==='en'?"Music is a universal language; choir connects hearts in harmony.":"音乐是人类共同的语言，合唱是心灵交流的桥梁。我希望通过我们的演唱，让每一个听众都能感受到音乐的力量和美好。")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
