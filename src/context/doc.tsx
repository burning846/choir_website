import { useMemo } from 'react'
import { useLang } from '@/lib/lang'
import { logError } from '@/lib/logger'
import { DocSchema } from '@/lib/types'
import { DocContext } from './DocContext'
import { choirDocData } from '@/data/choir-doc'

export function DocProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()

  const value = useMemo(() => {
    try {
      const d = choirDocData[lang]
      const parseResult = DocSchema.safeParse(d)
      if (!parseResult.success) {
        console.error('Doc schema validation failed', parseResult.error)
        logError(new Error('doc schema validation failed'), 'DocProvider')
        return { doc: null, loading: false, error: 'validation_failed' }
      }
      
      const validDoc = parseResult.data
      
      // Update document title
      const title =
        lang === 'en'
          ? (validDoc.choirNameEn || validDoc.choirName || document.title)
          : (validDoc.choirName || validDoc.choirNameEn || document.title)
      if (typeof title === 'string' && title.trim()) {
        document.title = title
      }

      return { doc: validDoc, loading: false, error: null }
    } catch (err) {
      logError(err instanceof Error ? err : new Error('doc load error'), 'DocProvider')
      return { doc: null, loading: false, error: 'failed' }
    }
  }, [lang])

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>
}
