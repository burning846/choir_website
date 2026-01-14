import { useEffect, useMemo, useState } from 'react'
import { useLang } from '@/lib/lang'
import { docUrl } from '@/lib/utils'
import { logError } from '@/lib/logger'
import { Doc } from '@/lib/types'
import { DocContext } from './DocContext'

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
      .then((d: Doc | null) => {
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
