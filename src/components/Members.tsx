import { Users, Star } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import { uiTranslations } from '@/lib/i18n'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export default function Members() {
  const { lang } = useLang()
  const { doc } = useDoc()
  const ts = uiTranslations[lang].sections

  // Note: Members section is currently disabled unless explicit data is provided.
  // We removed the hardcoded fallback data to keep the site content-driven.
  // Wait, I should just hide it if empty.
  const docMembers = Array.isArray(doc?.members) ? doc.members : []
  
  if (docMembers.length === 0) {
    return null
  }

  const counts = { soprano: 0, alto: 0, tenor: 0, bass: 0 }
  
  const members = docMembers.map((m, idx) => ({
    id: idx + 1,
    name: m.name || `团员${idx + 1}`,
    voice: m.voice || m.role || '团员',
    role: m.role || '团员',
    joinYear: m.joinYear || new Date().getFullYear(),
    avatar: m.avatar ? (m.avatar.startsWith('/') ? m.avatar : `/${m.avatar}`) : (idx % 2 === 0 ? '/images/boys.JPG' : '/images/girls.JPG')
  }))

  members.forEach((m) => {
    const v = (m.voice || m.role || '').toLowerCase()
    if (v.includes('女高音') || v.includes('soprano')) counts.soprano++
    else if (v.includes('女中音') || v.includes('alto')) counts.alto++
    else if (v.includes('男高音') || v.includes('tenor')) counts.tenor++
    else if (v.includes('男低音') || v.includes('bass')) counts.bass++
  })

  return (
    <section id="members" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={ts.members} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-xl transition-shadow hover:-translate-y-0.5 transition-transform">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-300 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                    <p className="text-purple-600 dark:text-purple-300 text-sm font-medium">{member.voice}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                    <span className="text-sm text-gray-600 dark:text-slate-300">{member.role}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-slate-300">{lang === 'en' ? `Joined in ${member.joinYear}` : `${member.joinYear}年加入`}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
