import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

type Perf = { name: string; date: string; intro: string; image?: string; venue?: string }

export default function Performances() {
  const { lang } = useLang()
  const [performances, setPerformances] = useState<Perf[]>([])
  const { doc } = useDoc()
  useEffect(() => {
    const d = doc
    if (d && Array.isArray(d.performances)) setPerformances(d.performances)
    else setPerformances([])
  }, [doc, lang])

  return (
    <section id="performances" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={lang==='en'?'Performances':'演出'} />

        {performances.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center text-gray-600">
            {lang==='en'?'More performance info coming soon.':'敬请期待更多演出信息。'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {performances.map((p, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow">
                {p.image && (
                  <div className="h-48 bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{p.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-slate-300">
                    {p.date} {p.venue ? `· ${p.venue}` : ''}
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{p.intro}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
