import { useLang } from '@/lib/lang'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export default function Members() {
  const { lang } = useLang()

  return (
    <section id="members" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={lang === 'en' ? 'Members' : '团员风采'} />
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <img src="/images/boys.JPG" alt={lang === 'en' ? 'Male choir' : '男生合照'} className="w-full h-80 object-cover" />
          </Card>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <img src="/images/girls.JPG" alt={lang === 'en' ? 'Female choir' : '女生合照'} className="w-full h-80 object-cover" />
          </Card>
        </div>
      </div>
    </section>
  )
}
