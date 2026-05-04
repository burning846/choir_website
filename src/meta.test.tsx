import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import { ThemeProvider } from '@/context/theme'
import Home from '@/pages/Home'

vi.mock('@/data/choir-doc', () => ({
  choirDocData: {
    en: { choirNameEn: 'Meta Choir', choirName: 'Meta' },
    zh: { choirNameEn: 'Meta Choir', choirName: 'Meta' }
  }
}))

// Mock useMeta since it's used in Home
vi.mock('@/hooks/useMeta', () => ({
  useMeta: vi.fn()
}))

// Mock ScrollToTop
vi.mock('@/components/ScrollToTop', () => ({
  default: () => null
}))

describe('Meta Info', () => {
  it('updates document title based on doc', async () => {
    render(
      <ThemeProvider>
        <LangProvider>
          <DocProvider>
            <Home />
          </DocProvider>
        </LangProvider>
      </ThemeProvider>
    )

    // DocProvider updates document.title
    // We wait for the effect
    await vi.waitFor(() => {
      expect(document.title).toBe('Meta Choir')
    })
  })
})
