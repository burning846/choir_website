import { useEffect, useMemo, useState } from 'react'
import { useLang } from '@/lib/lang'
import { docUrl } from '@/lib/utils'
import { logError } from '@/lib/logger'
import { Doc, DocSchema } from '@/lib/types'
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
      .then((d: unknown) => {
        if (cancelled) return
        if (!d) {
          setDoc(null)
          setError('failed')
          logError(new Error('doc load failed'), 'DocProvider')
          return
        }
        
        const parseResult = DocSchema.safeParse(d)
        if (!parseResult.success) {
          console.error('Doc schema validation failed', parseResult.error)
          logError(new Error('doc schema validation failed'), 'DocProvider')
          // Enforce schema validation: reject invalid document
          setDoc(null)
          setError('validation_failed')
          return
        }
        
        const validDoc = parseResult.data
        setDoc(validDoc)
        
        const title =
          lang === 'en'
            ? (validDoc.choirNameEn || validDoc.choirName || document.title)
            : (validDoc.choirName || validDoc.choirNameEn || document.title)
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
