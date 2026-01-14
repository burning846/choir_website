import { Users, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

interface Member {
  id: number
  name: string
  voice: string
  role: string
  joinYear: number
  avatar: string
}

export default function Members() {
  const [docMembers, setDocMembers] = useState<any[]>([])
  const [media, setMedia] = useState<string[]>([])
  const { lang } = useLang()
  const { doc } = useDoc()
  useEffect(() => {
    const d = doc
    if (!d) return
    if (d.members && Array.isArray(d.members)) setDocMembers(d.members)
    if (d.images) setMedia(d.images.map((i: any) => i.file))
  }, [doc, lang])
  const members: Member[] = docMembers.length
    ? docMembers.map((m: any, idx: number) => ({
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
    : [
      {
        id: 1,
        name: "张雅文",
        voice: "女高音声部长",
        role: "资深团员",
        joinYear: 2016,
        avatar: "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional portrait of a female singer, elegant appearance, warm smile, formal attire, artistic lighting, professional headshot style&image_size=square_hd"
      },
    {
      id: 2,
      name: "王志强",
      voice: "男高音声部长",
      role: "资深团员",
      joinYear: 2017,
      avatar: "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional portrait of a male singer, confident expression, formal attire, warm lighting, professional headshot style&image_size=square_hd"
    },
    {
      id: 3,
      name: "李美玲",
      voice: "女中音",
      role: "优秀团员",
      joinYear: 2018,
      avatar: "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional portrait of a female singer, graceful appearance, gentle smile, elegant attire, soft lighting&image_size=square_hd"
    },
    {
      id: 4,
      name: "陈建国",
      voice: "男低音",
      role: "优秀团员",
      joinYear: 2019,
      avatar: "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional portrait of a male singer, mature appearance, distinguished look, formal attire, professional lighting&image_size=square_hd"
    },
    {
      id: 5,
      name: "刘小雨",
      voice: "女高音",
      role: "新团员",
      joinYear: 2023,
      avatar: "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional portrait of a young female singer, fresh appearance, bright smile, modern attire, vibrant lighting&image_size=square_hd"
    },
    {
      id: 6,
      name: "赵文博",
      voice: "男高音",
      role: "新团员",
      joinYear: 2023,
      avatar: "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional portrait of a young male singer, energetic appearance, friendly smile, contemporary attire, dynamic lighting&image_size=square_hd"
    }
  ]

  const counts = (() => {
    const c = { soprano: 0, alto: 0, tenor: 0, bass: 0 }
    members.forEach((m) => {
      const v = (m.voice || m.role || '').toLowerCase()
      if (v.includes('女高音') || v.includes('soprano')) c.soprano++
      else if (v.includes('女中音') || v.includes('alto')) c.alto++
      else if (v.includes('男高音') || v.includes('tenor')) c.tenor++
      else if (v.includes('男低音') || v.includes('bass')) c.bass++
    })
    return c
  })()

  return (
    <section id="members" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={lang==='en'?'Members':'团员风采'} />
        
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
                    <span className="text-sm text-gray-600 dark:text-slate-300">{lang==='en'?`Joined in ${member.joinYear}`:`${member.joinYear}年加入`}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Card className="p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{lang==='en'?'Voice Sections':'声部构成'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{counts.soprano}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang==='en'?'Soprano':'女高音'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{counts.alto}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang==='en'?'Alto':'女中音'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{counts.tenor}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang==='en'?'Tenor':'男高音'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{counts.bass}</div>
                <div className="text-sm text-gray-600 dark:text-slate-300">{lang==='en'?'Bass':'男低音'}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
