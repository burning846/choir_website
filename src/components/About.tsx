import { useLang } from '@/lib/lang'
import { choirDocData } from "@/data/choir-doc"
import { uiTranslations } from '@/lib/i18n'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export default function About() {
  const { lang } = useLang()
  const doc = choirDocData[lang]
  const ts = uiTranslations[lang].sections
  
  const intro = doc?.intro || ''
  const aboutImage = doc?.aboutImage || '/placeholder-banner.svg'

  return (
    <section id="about" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={ts.about} />
        
        <div className={`grid ${intro ? 'md:grid-cols-2 gap-12' : 'grid-cols-1 max-w-4xl mx-auto'} items-center`}>
          {intro && (
            <div className="space-y-6">
              {intro.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          )}
          
          <Card className="overflow-hidden rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <img 
              src={aboutImage}
              alt={ts.about}
              className="w-full h-[400px] object-cover"
            />
          </Card>
        </div>
      </div>
    </section>
  )
}
