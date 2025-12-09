import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [nameCn, setNameCn] = useState('星光合唱团')
  const [nameEn, setNameEn] = useState('Starlight Choir')
  useEffect(() => {
    fetch('/choir-doc.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        const en = d.choirNameEn || d.choirName || nameEn
        const cn = d.choirName?.includes('咏歌堂') ? '咏歌堂' : (d.choirName || nameCn)
        setNameEn(en)
        setNameCn(cn)
      })
      .catch(() => {})
  }, [])
  return (
    <header className="sticky top-0 z-50 text-white">
      <div className="backdrop-blur bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center space-x-3">
              <img
                src="/logo.svg"
                alt="星光合唱团 Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-wide">{nameCn}</h1>
                <p className="text-xs md:text-sm text-purple-200">{nameEn}</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#about" className="relative py-1 hover:text-white">
                <span className="hover:opacity-100 opacity-90">关于我们</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#conductor" className="relative py-1 hover:text-white">
                <span className="hover:opacity-100 opacity-90">指挥介绍</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#members" className="relative py-1 hover:text-white">
                <span className="hover:opacity-100 opacity-90">团员风采</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#videos" className="relative py-1 hover:text-white">
                <span className="hover:opacity-100 opacity-90">作品展示</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="relative py-1 hover:text-white">
                <span className="hover:opacity-100 opacity-90">联系我们</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Sparkles className="h-4 w-4" />
                <span>加入我们</span>
              </button>
              <div className="text-sm text-purple-200">中文 / EN</div>
            </div>

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-[length:200%_100%] bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-300 via-green-400 via-cyan-400 to-purple-500 animate-rainbow"></div>
    </header>
  )
}
