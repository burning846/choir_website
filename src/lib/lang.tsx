import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'zh'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'zh') setLang(saved)
  }, [])
  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function docUrl(lang: Lang) {
  return lang === 'en' ? '/choir-doc.en.json' : '/choir-doc.json'
}

