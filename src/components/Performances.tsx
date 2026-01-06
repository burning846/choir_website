import { useEffect, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'

type Perf = { name: string; date: string; intro: string; image?: string; venue?: string }

export default function Performances() {
  const { lang } = useLang()
  const [performances, setPerformances] = useState<Perf[]>([])
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.performances)) setPerformances(d.performances)
      })
      .catch(() => {})
  }, [lang])

  return (
    <section id="performances" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang==='en'?'Performances':'演出'}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">{lang==='en'?'Upcoming and featured concerts.':'近期与精选音乐会演出。'}</p>
        </div>

        {performances.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center text-gray-600">
            {lang==='en'?'More performance info coming soon.':'敬请期待更多演出信息。'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {performances.map((p, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden ring-1 ring-black/5">
                {p.image && (
                  <div className="h-48 bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">{p.name}</h3>
                  <div className="text-sm text-gray-600">
                    {p.date} {p.venue ? `· ${p.venue}` : ''}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{p.intro}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
