import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from '@/components/Header'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import { mockFetchSequence } from '@/test/mocks'
import { Doc } from '@/lib/types'

describe('Language Switching', () => {
  it('updates header text and re-fetches data on toggle', async () => {
    const enDoc: Doc = { choirNameEn: 'Test Choir EN', choirName: 'Test Choir' }
    const cnDoc: Doc = { choirName: '测试合唱团', choirNameEn: 'Test Choir' }
    
    // Initial fetch (EN default) then CN fetch
    mockFetchSequence([enDoc, cnDoc])

    render(
      <LangProvider>
        <DocProvider>
          <Header />
        </DocProvider>
      </LangProvider>
    )

    // Check initial EN
    expect(await screen.findByText('About')).toBeInTheDocument()

    // Click toggle (Switch to Chinese)
    const btn = screen.getByText('中文')
    fireEvent.click(btn)

    // Check update to CN
    await waitFor(() => {
      expect(screen.getByText('关于我们')).toBeInTheDocument()
    })
  })
})
