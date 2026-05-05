import { Music, Heart } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { choirDocData } from "@/data/choir-doc"
import { FooterInfo } from '@/lib/types'
import { uiTranslations } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLang()
  const doc = choirDocData[lang]
  const ts = uiTranslations[lang].sections
  const tf = uiTranslations[lang].footer

  let footer: FooterInfo = {}
  let nameCn = ''

  if (doc) {
    if (doc.footer) footer = doc.footer
    nameCn = doc.choirName || ''
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Music className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-bold">{nameCn || '合唱团'}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {footer.about || '用音乐传递美好，用和声连接心灵。我们致力于创造美妙的音乐体验，为社区带来艺术的享受。'}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{tf.quickLinks}</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#about" className="hover:text-gray-900 dark:hover:text-white transition-colors">{ts.about}</a></li>
              <li><a href="#conductor" className="hover:text-gray-900 dark:hover:text-white transition-colors">{ts.conductor}</a></li>
              <li><a href="#videos" className="hover:text-gray-900 dark:hover:text-white transition-colors">{ts.videos}</a></li>
              <li><a href="#contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">{ts.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{tf.rehearsalTime}</h4>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              {(footer.schedule || ['每周三 19:00-21:30', '每周日 14:00-17:00']).map((s, i) => (
                <p key={i}>{s}</p>
              ))}
              <p>{footer.location || (lang === 'en' ? 'Rehearsal: Music Building, 8F' : '排练地点：音乐大厦8楼')}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
            <span>{tf.madeWithCare}</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>{nameCn || '合唱团'}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {footer.copyright || (lang === 'en' ? '© 2026 Konzert Singers. All rights reserved. | Let music light up life' : '© 2026 咏歌堂. 保留所有权利. | 让音乐点亮生活')}
          </p>
        </div>
      </div>
    </footer>
  )
}
