import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import { uiTranslations } from '@/lib/i18n'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export default function Performances() {
  const { lang } = useLang()
  const { doc } = useDoc()
  const ts = uiTranslations[lang].sections
  const tc = uiTranslations[lang].common
  const performances = Array.isArray(doc?.performances) 
    ? [...doc.performances].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : []

  return (
    <section id="performances" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={ts.performances} />

        {performances.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center text-gray-600">
            {tc.moreInfoComingSoon}
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
