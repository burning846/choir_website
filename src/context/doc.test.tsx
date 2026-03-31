import { describe, expect, it, vi, afterEach } from 'vitest'
import { render, waitFor, cleanup } from '@testing-library/react'
import { LangProvider } from '@/lib/lang'
import { DocProvider } from '@/context/doc'
import { useDoc } from '@/hooks/useDoc'

function Probe() {
  const { doc, loading, error } = useDoc()
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="error">{String(error)}</span>
      <span data-testid="name">{doc?.choirName || ''}</span>
    </div>
  )
}

describe('DocProvider', () => {
  afterEach(() => {
    cleanup()
  })

  it('loads doc and provides context', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      return {
        ok: true,
        json: async () => ({ choirName: '测试合唱团', choirNameEn: 'Test Choir' }),
      } as unknown as Response
    }))

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

  it('sets error on invalid schema', async () => {
    // Provide an invalid payload, e.g., members with incorrect type
    vi.stubGlobal('fetch', vi.fn(async () => {
      return {
        ok: true,
        json: async () => ({ choirName: '测试合唱团', members: [{ invalid_member_key: 'foo' }] }),
      } as unknown as Response
    }))

    const r = render(
      <LangProvider>
        <DocProvider>
          <Probe />
        </DocProvider>
      </LangProvider>
    )
    
    await waitFor(() => {
      expect(r.getByTestId('loading').textContent).toBe('false')
      expect(r.getByTestId('error').textContent).toBe('validation_failed')
      expect(r.getByTestId('name').textContent).toBe('')
    })
  })
})
