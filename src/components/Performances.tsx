import { Link } from 'react-router-dom'
import { useLang } from '@/lib/lang'
import { choirDocData } from "@/data/choir-doc"
import { uiTranslations } from '@/lib/i18n'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { ArrowRight } from 'lucide-react'

export default function Performances() {
  const { lang } = useLang()
  const doc = choirDocData[lang]
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
            {performances.map((p, i) => {
              const content = (
                <Card key={i} className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  {p.image && (
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{p.name}</h3>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {p.date} {p.venue ? `· ${p.venue}` : ''}
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 leading-relaxed flex-grow">{p.intro}</p>
                    
                    {p.link && (
                      <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        <span>{lang === 'en' ? 'Learn More' : '查看详情'}</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                </Card>
              )

              return p.link ? (
                p.link.startsWith('http') ? (
                  <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="block h-full outline-none">
                    {content}
                  </a>
                ) : (
                  <Link key={i} to={p.link} className="block h-full outline-none">
                    {content}
                  </Link>
                )
              ) : (
                <div key={i} className="block h-full outline-none">
                  {content}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
