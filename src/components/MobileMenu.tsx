import { useState } from 'react'
import { useLang } from '@/lib/lang'
import { Menu, X, Sparkles } from 'lucide-react'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang } = useLang()

  const menuItems = [
    { href: '#about', label: lang==='en'?'About':'关于我们' },
    { href: '#conductor', label: lang==='en'?'Artistic Director':'指挥介绍' },
    { href: '#members', label: lang==='en'?'Members':'团员风采' },
    { href: '#videos', label: lang==='en'?'Works':'作品展示' },
    { href: '#performances', label: lang==='en'?'Performances':'演出' },
    { href: '#contact', label: lang==='en'?'Contact & Collaboration':'联系与合作' }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
        aria-label={isOpen ? (lang==='en'?'Close Menu':'关闭菜单') : (lang==='en'?'Open Menu':'打开菜单')}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95">
          <div className="flex flex-col h-full pt-16 px-4 overflow-y-auto">
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleMenu}
                className="text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-white text-xl font-medium py-3 px-4 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors text-center"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex flex-col items-center space-y-4">
              <button className="inline-flex items-center space-x-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
                <Sparkles className="h-5 w-5" />
                <span>{lang==='en'?'Join':'加入'}</span>
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <button onClick={() => setLang('zh')} className={`px-3 py-1 rounded-full ring-1 ring-white/15 ${lang==='zh'?'bg-white/20 text-white':'text-purple-200 hover:text-white hover:bg-white/10'}`}>中文</button>
                <span className="text-purple-300">/</span>
                <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full ring-1 ring-white/15 ${lang==='en'?'bg-white/20 text-white':'text-purple-200 hover:text-white hover:bg-white/10'}`}>EN</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
