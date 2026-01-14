import { describe, it, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import App from '@/App'

describe('Meta management', () => {
  it('sets description and keywords', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ intro: '一段简介文本用于 SEO 描述。', keywords: ['choir', 'music', 'harmony'] })
    }) as any))
    render(<App />)
    await waitFor(() => {
      const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      const kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
      expect(desc).not.toBeNull()
      expect(kw).not.toBeNull()
      expect(desc!.getAttribute('content')).toContain('一段简介文本')
      expect(kw!.getAttribute('content')).toContain('choir')
    })
  })
})
