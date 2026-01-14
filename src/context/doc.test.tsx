import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { LangProvider } from '@/lib/lang'
import { DocProvider, useDocContext } from '@/context/doc'

function Probe() {
  const { doc, loading, error } = useDocContext()
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="error">{String(error)}</span>
      <span data-testid="name">{doc?.choirName || ''}</span>
    </div>
  )
}

describe('DocProvider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      return {
        ok: true,
        json: async () => ({ choirName: '测试合唱团', choirNameEn: 'Test Choir' }),
      } as any
    }))
  })

  it('loads doc and provides context', async () => {
    const r = render(
      <LangProvider>
        <DocProvider>
          <Probe />
        </DocProvider>
      </LangProvider>
    )
    await waitFor(() => {
      expect(r.getByTestId('loading').textContent).toBe('false')
      expect(r.getByTestId('error').textContent).toBe('null')
      expect(r.getByTestId('name').textContent).toBe('测试合唱团')
    })
  })
})
