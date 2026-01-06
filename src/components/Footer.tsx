import { Music, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'

export default function Footer() {
  const [footer, setFooter] = useState<any>({})
  const [nameCn, setNameCn] = useState<string>('')
  const { lang } = useLang()
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        if (d.footer) setFooter(d.footer)
        const cn = d.choirName || d.choirNameEn || ''
        setNameCn(cn)
      })
      .catch(() => {})
  }, [lang])
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Music className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-bold">{nameCn || '合唱团'}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {footer?.about || '用音乐传递美好，用和声连接心灵。我们致力于创造美妙的音乐体验，为社区带来艺术的享受。'}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{lang==='en'?'Quick Links':'快速链接'}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">{lang==='en'?'About':'关于我们'}</a></li>
              <li><a href="#conductor" className="hover:text-white transition-colors">{lang==='en'?'Artistic Director':'指挥介绍'}</a></li>
              <li><a href="#members" className="hover:text-white transition-colors">{lang==='en'?'Members':'团员风采'}</a></li>
              <li><a href="#videos" className="hover:text-white transition-colors">{lang==='en'?'Works':'作品展示'}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{lang==='en'?'Contact & Collaboration':'联系与合作'}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{lang==='en'?'Schedule':'演出时间'}</h4>
            <div className="text-gray-400 space-y-2">
              {(footer?.schedule || ['每周三 19:00-21:30', '每周日 14:00-17:00']).map((s: string, i: number) => (
                <p key={i}>{s}</p>
              ))}
              <p>{footer?.location || (lang==='en'?'Rehearsal: Music Building, 8F':'排练地点：音乐大厦8楼')}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
            <span>{lang==='en'?'Made with care':'用心制作'}</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>{nameCn || '合唱团'}</span>
          </div>
          <p className="text-gray-500 text-sm">
            {footer?.copyright || (lang==='en'?'© 2024 Konzert Singers. All rights reserved. | Let music light up life':'© 2024 星光合唱团. 保留所有权利. | 让音乐点亮生活')}
          </p>
        </div>
      </div>
    </footer>
  )
}
