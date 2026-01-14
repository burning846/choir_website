import { useEffect } from 'react'

export function useMeta(meta: { description?: string; keywords?: string }) {
  useEffect(() => {
    if (meta.description) {
      let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'description')
        document.head.appendChild(el)
      }
      el.setAttribute('content', meta.description)
    }
    if (meta.keywords) {
      let el = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'keywords')
        document.head.appendChild(el)
      }
      el.setAttribute('content', meta.keywords)
    }
  }, [meta.description, meta.keywords])
}

