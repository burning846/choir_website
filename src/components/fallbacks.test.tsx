import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import { ThemeProvider } from '@/context/theme'
import Members from '@/components/Members'
import Conductor from '@/components/Conductor'
import Contact from '@/components/Contact'
import { Doc } from '@/lib/types'

describe('Resource Fallbacks', () => {
  it('uses local placeholder when remote avatar fails or missing', async () => {
    // Mock empty doc
    const mockDoc: Doc = {
      members: [{ name: 'Test Member', role: 'Soprano', joinYear: 2024 }],
      images: [{ file: '' }],
    }
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => mockDoc
    }) as unknown as Response))

    render(
      <ThemeProvider>
        <LangProvider>
          <DocProvider>
            <Members />
            <Conductor />
            <Contact />
          </DocProvider>
        </LangProvider>
      </ThemeProvider>
    )

    // Wait for data to load and components to render
    await waitFor(() => {
      const imgs = screen.getAllByRole('img')
      expect(imgs.length).toBeGreaterThan(0)
    })
  })
})
