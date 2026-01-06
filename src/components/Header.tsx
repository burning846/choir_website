import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'
import { useLang, docUrl } from '@/lib/lang'

export default function Header() {
  const [nameCn, setNameCn] = useState('星光合唱团')
  const [logo, setLogo] = useState<string>('/logo.svg')
  const { lang, setLang } = useLang()
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        const cn = d.choirName?.includes('咏歌堂') ? '咏歌堂' : (d.choirName || nameCn)
        setNameCn(cn)
        if (d.logo) setLogo(d.logo)
        const title = lang==='en' ? (d.choirNameEn || d.choirName || 'Choir') : (cn || '合唱团')
        if (typeof document !== 'undefined') document.title = title
      })
      .catch(() => {})
  }, [lang])
  return (
    <header className="sticky top-0 z-50 text-white">
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between rounded-xl px-4 py-2 bg-gray-900 shadow-lg">
            <a href="#home" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="星光合唱团 Logo"
                className="w-10 h-10 rounded-lg object-cover ring-2 ring-white/20"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">{nameCn}</h1>
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-1">
              <a href="#about" className="relative px-3 py-2 rounded-full hover:text-white group hover:bg-white/10 transition-colors">
                <span className="hover:opacity-100 opacity-90">{lang==='en'?'About':'关于我们'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#conductor" className="relative px-3 py-2 rounded-full hover:text-white group hover:bg-white/10 transition-colors">
                <span className="hover:opacity-100 opacity-90">{lang==='en'?'Director':'指挥介绍'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#members" className="relative px-3 py-2 rounded-full hover:text-white group hover:bg-white/10 transition-colors">
                <span className="hover:opacity-100 opacity-90">{lang==='en'?'Members':'团员风采'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#videos" className="relative px-3 py-2 rounded-full hover:text-white group hover:bg-white/10 transition-colors">
                <span className="hover:opacity-100 opacity-90">{lang==='en'?'Works':'作品展示'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#performances" className="relative px-3 py-2 rounded-full hover:text-white group hover:bg-white/10 transition-colors">
                <span className="hover:opacity-100 opacity-90">{lang==='en'?'Events':'演出'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="relative px-3 py-2 rounded-full hover:text-white group hover:bg-white/10 transition-colors">
                <span className="hover:opacity-100 opacity-90">{lang==='en'?'Contact':'联系与合作'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <button className="inline-flex items-center space-x-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-md whitespace-nowrap">
                <Sparkles className="h-4 w-4" />
                <span>{lang==='en'?'Join':'加入'}</span>
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <button onClick={() => setLang('zh')} className={`px-3 py-1 rounded-full ring-1 ring-white/15 ${lang==='zh'?'bg-white/20 text-white':'text-purple-200 hover:text-white hover:bg-white/10'}`}>中文</button>
                <span className="text-purple-300">/</span>
                <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full ring-1 ring-white/15 ${lang==='en'?'bg-white/20 text-white':'text-purple-200 hover:text-white hover:bg-white/10'}`}>EN</button>
              </div>
            </div>

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-[length:200%_100%] bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-300 via-green-400 via-cyan-400 to-purple-500 animate-rainbow shadow-[0_1px_8px_rgba(0,0,0,0.3)]"></div>
    </header>
  )
}
