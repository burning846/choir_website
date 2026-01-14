import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import Home from '@/pages/Home'
import { Doc } from '@/lib/types'

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
    const mockDoc: Doc = { choirNameEn: 'Meta Choir', choirName: 'Meta' }
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => mockDoc
    }) as unknown as Response))

    render(
      <LangProvider>
        <DocProvider>
          <Home />
        </DocProvider>
      </LangProvider>
    )

    // DocProvider updates document.title
    // We wait for the effect
    await vi.waitFor(() => {
      expect(document.title).toBe('Meta Choir')
    })
  })
})
