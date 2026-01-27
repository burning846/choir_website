import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { Member as MemberType } from '@/lib/types'

interface Member {
  id: number
  name: string
  voice: string
  role: string
  joinYear: number
  avatar: string
}

export default function Members() {
  const { lang } = useLang()
  const { doc } = useDoc()

  let members: Member[] = []
  const counts = { soprano: 0, alto: 0, tenor: 0, bass: 0 }

  if (doc) {
    let docMembers: (string | MemberType)[] = []
    let media: string[] = []
    
    if (doc.members && Array.isArray(doc.members)) docMembers = doc.members
    if (doc.images) media = doc.images.map((i) => i.file)

    if (docMembers.length > 0) {
      members = docMembers.map((m, idx) => ({
        id: idx + 1,
        name: typeof m === 'string' ? m : (m.name || `团员${idx + 1}`),
        voice: typeof m === 'string' ? '团员' : (m.role || '团员'),
        role: typeof m === 'string' ? '团员' : (m.role || '团员'),
        joinYear: typeof m === 'string' ? new Date().getFullYear() : (m.joinYear || new Date().getFullYear()),
        avatar: (() => {
          const a = typeof m === 'string' ? '' : (m.avatar || '')
          const normalized = a ? (a.startsWith('/') ? a : `/${a}`) : ''
          const localFallback = idx % 2 === 0 ? '/images/boys.JPG' : '/images/girls.JPG'
          return normalized || media[idx % (media.length || 1)] || localFallback
        })()
      }))
    } else {
      // Fallback data
      members = [
      ]
    }

    // Calculate counts
    members.forEach((m) => {
      const v = (m.voice || m.role || '').toLowerCase()
      if (v.includes('女高音') || v.includes('soprano')) counts.soprano++
      else if (v.includes('女中音') || v.includes('alto')) counts.alto++
      else if (v.includes('男高音') || v.includes('tenor')) counts.tenor++
      else if (v.includes('男低音') || v.includes('bass')) counts.bass++
    })
  }

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
        
        <div className="text-center mt-12">
          <Card className="p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{lang === 'en' ? 'Voice Sections' : '声部构成'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{counts.soprano}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang === 'en' ? 'Soprano' : '女高音'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{counts.alto}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang === 'en' ? 'Alto' : '女中音'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{counts.tenor}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang === 'en' ? 'Tenor' : '男高音'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{counts.bass}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang === 'en' ? 'Bass' : '男低音'}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
