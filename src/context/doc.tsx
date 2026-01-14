import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'
import { logError } from '@/lib/logger'

type Doc = Record<string, any>

type DocContextValue = {
  doc: Doc | null
  loading: boolean
  error: string | null
}

const DocContext = createContext<DocContextValue>({ doc: null, loading: false, error: null })

export function DocProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()
  const [doc, setDoc] = useState<Doc | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return
        if (!d) {
          setDoc(null)
          setError('failed')
          logError(new Error('doc load failed'), 'DocProvider')
          return
        }
        setDoc(d)
        const title =
          lang === 'en'
            ? (d.choirNameEn || d.choirName || document.title)
            : (d.choirName || d.choirNameEn || document.title)
        if (typeof title === 'string' && title.trim()) {
          document.title = title
        }
      })
      .catch(() => {
        if (cancelled) return
        setError('failed')
        logError(new Error('doc load error'), 'DocProvider')
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  const value = useMemo(() => ({ doc, loading, error }), [doc, loading, error])
  return <DocContext.Provider value={value}>{children}</DocContext.Provider>
}

export function useDocContext() {
  return useContext(DocContext)
}
