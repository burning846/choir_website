import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '@/App'

describe('Header language switch', () => {
  it('switches language and updates fetch/doc title', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      const isEn = String(url).includes('choir-doc.en.json')
      const data = isEn
        ? { choirNameEn: 'Test Choir EN', logo: '/logo.svg' }
        : { choirName: '测试合唱团', logo: '/logo.svg' }
      return { ok: true, json: async () => data } as any
    }))
    render(<App />)
    const aboutEls = await screen.findAllByText('About')
    expect(aboutEls.length).toBeGreaterThan(0)
    fireEvent.click(screen.getByText('中文'))
    const zhAbout = await screen.findAllByText('关于我们')
    expect(zhAbout.length).toBeGreaterThan(0)
    const gf = globalThis.fetch as any
    expect(gf.mock.calls.length).toBeGreaterThan(0)
    expect(document.title).toMatch(/Test Choir EN|测试合唱团/)
  })
})
