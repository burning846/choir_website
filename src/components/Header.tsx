import { Sparkles, Moon, Sun } from 'lucide-react'
 
import MobileMenu from './MobileMenu'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import { useTheme } from '@/hooks/useTheme'

export default function Header() {
  const { lang, setLang } = useLang()
  const { doc } = useDoc()
  const { isDark, toggleTheme } = useTheme()
  const logo = typeof doc?.logo === 'string' ? doc!.logo : '/logo.svg'
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 border-b border-black/5 dark:border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <a href="#home" className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 flex-shrink-0 min-w-0">
              <img
                src={logo}
                alt="Logo"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 max-w-none rounded-lg object-contain p-1 dark:invert"
              />
            </a>

            <nav className="hidden md:flex items-center space-x-3 flex-nowrap overflow-x-auto">
              <a href="#about" className="relative px-3 py-2 rounded-full group transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <span className="text-gray-800 dark:text-white whitespace-nowrap">{lang==='en'?'About':'关于我们'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#conductor" className="relative px-3 py-2 rounded-full group transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <span className="text-gray-800 dark:text-white whitespace-nowrap">{lang==='en'?'Director':'指挥介绍'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#members" className="relative px-3 py-2 rounded-full group transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <span className="text-gray-800 dark:text-white whitespace-nowrap">{lang==='en'?'Members':'团员风采'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#videos" className="relative px-3 py-2 rounded-full group transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <span className="text-gray-800 dark:text-white whitespace-nowrap">{lang==='en'?'Works':'作品展示'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#performances" className="relative px-3 py-2 rounded-full group transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <span className="text-gray-800 dark:text-white whitespace-nowrap">{lang==='en'?'Events':'演出'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="relative px-3 py-2 rounded-full group transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <span className="text-gray-800 dark:text-white whitespace-nowrap">{lang==='en'?'Contact':'联系与合作'}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-3 flex-shrink-0 whitespace-nowrap">
              <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-md whitespace-nowrap">
                <Sparkles className="h-4 w-4" />
                <span>{lang==='en'?'Join':'加入'}</span>
              </button>
              <div className="flex items-center space-x-3 text-sm">
                <button onClick={() => setLang('zh')} className={`px-3 py-1 rounded-full ring-1 ring-black/10 dark:ring-white/15 ${lang==='zh'?'bg-black/5 text-gray-900 dark:bg-white/20 dark:text-white':'text-purple-700 dark:text-purple-200 hover:bg-black/5 dark:hover:bg-white/10'}`}>中文</button>
                <span className="text-purple-500 dark:text-purple-300">/</span>
                <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full ring-1 ring-black/10 dark:ring-white/15 ${lang==='en'?'bg-black/5 text-gray-900 dark:bg-white/20 dark:text-white':'text-purple-700 dark:text-purple-200 hover:bg-black/5 dark:hover:bg-white/10'}`}>EN</button>
              </div>
              <button
                onClick={toggleTheme}
                aria-label="切换主题"
                className="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/10 dark:ring-white/15 bg-slate-200 dark:bg-gray-800/60 hover:bg-slate-300 dark:hover:bg-white/10 transition-colors shadow-subtle"
              >
                {isDark ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4 text-slate-700" />}
              </button>
            </div>

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-[length:200%_100%] bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-300 via-green-400 via-cyan-400 to-purple-500 animate-rainbow shadow-[0_1px_8px_rgba(0,0,0,0.15)]"></div>
    </header>
  )
}
