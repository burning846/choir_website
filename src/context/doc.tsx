import { useEffect, useMemo, useState } from 'react'
import { useLang } from '@/lib/lang'
import { logError } from '@/lib/logger'
import { Doc, DocSchema } from '@/lib/types'
import { DocContext } from './DocContext'
import { choirDocData } from '@/data/choir-doc'

export function DocProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()
  const [doc, setDoc] = useState<Doc | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    try {
      const d = choirDocData[lang]
      const parseResult = DocSchema.safeParse(d)
      if (!parseResult.success) {
        console.error('Doc schema validation failed', parseResult.error)
        logError(new Error('doc schema validation failed'), 'DocProvider')
        setDoc(null)
        setError('validation_failed')
        setLoading(false)
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
    } catch (err) {
      setError('failed')
      logError(err instanceof Error ? err : new Error('doc load error'), 'DocProvider')
    } finally {
      setLoading(false)
    }
  }, [lang])

  const value = useMemo(() => ({ doc, loading, error }), [doc, loading, error])
  return <DocContext.Provider value={value}>{children}</DocContext.Provider>
}
