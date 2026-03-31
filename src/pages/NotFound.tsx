import { useLang } from '@/lib/lang'
import { uiTranslations } from '@/lib/i18n'

export default function NotFound() {
  const { lang } = useLang()
  const tc = uiTranslations[lang].common

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-gray-800 dark:text-white drop-shadow-sm">404</div>
        <div className="text-lg text-gray-600 dark:text-gray-300">{tc.pageNotFound}</div>
        <a href="/" className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-colors shadow-soft">
          {tc.backToHome}
        </a>
      </div>
    </div>
  )
}

