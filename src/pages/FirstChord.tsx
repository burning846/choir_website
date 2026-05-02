import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Music, Sun, Moon } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { useTheme } from '@/hooks/useTheme'
import Footer from '@/components/Footer'
import { uiTranslations } from '@/lib/i18n'

export default function FirstChord() {
  const { lang, setLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const tc = uiTranslations[lang].common

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{tc.backToHome}</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {lang === 'en' ? 'Ode to Song · First Rhyme' : '咏歌·初韵'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {lang === 'en' ? 'Performance Information' : '演出信息'}
            </p>
          </div>

          {/* Placeholder for future content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 min-h-[300px] flex flex-col items-center justify-center border border-gray-100 dark:border-slate-700">
            <div className="w-16 h-16 bg-blue-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <Music className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {lang === 'en' ? 'More Content Coming Soon' : '更多演出内容即将更新'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              {lang === 'en' 
                ? 'We are preparing exciting details about this performance. Stay tuned!' 
                : '我们正在为您准备本次演出的更多精彩信息，敬请期待！'}
            </p>
          </div>

          {/* Link to lyrics page */}
          <div className="flex justify-center pt-8">
            <Link 
              to="/performance-may-10" 
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Music className="w-5 h-5" />
              <span>{lang === 'en' ? 'View Program & Lyrics' : '查看节目单与歌词'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center space-y-3">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-2 rounded-full shadow-2xl border border-gray-200/50 dark:border-slate-700/50 flex flex-col space-y-2 items-center">
          <div className="flex flex-col items-center bg-slate-100/50 dark:bg-slate-900/50 rounded-full p-1 space-y-1">
            <button 
              onClick={() => setLang('zh')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='zh'?'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md scale-105':'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
              title="切换到中文"
            >
              中
            </button>
            <div className="w-6 h-px bg-gray-300 dark:bg-slate-600 rounded-full"></div>
            <button 
              onClick={() => setLang('en')} 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang==='en'?'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md scale-105':'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
              title="Switch to English"
            >
              EN
            </button>
          </div>
          
          <button
            onClick={toggleTheme}
            aria-label={tc.toggleTheme}
            className="w-12 h-12 mt-2 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 hover:from-blue-200 hover:to-purple-200 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all shadow-md text-gray-700 dark:text-gray-200"
          >
            {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-purple-600" />}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
