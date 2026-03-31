import { useEffect } from 'react'

export function useMeta(meta: { description?: string; keywords?: string }) {
  useEffect(() => {
    let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (meta.description) {
      if (!descEl) {
        descEl = document.createElement('meta')
        descEl.setAttribute('name', 'description')
        document.head.appendChild(descEl)
      }
      descEl.setAttribute('content', meta.description)
    } else if (descEl) {
      descEl.remove()
    }

    let kwEl = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    if (meta.keywords) {
      if (!kwEl) {
        kwEl = document.createElement('meta')
        kwEl.setAttribute('name', 'keywords')
        document.head.appendChild(kwEl)
      }
      kwEl.setAttribute('content', meta.keywords)
    } else if (kwEl) {
      kwEl.remove()
    }
  }, [meta.description, meta.keywords])
}

