import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import { render, waitFor, cleanup } from '@testing-library/react'
import { LangProvider } from '@/lib/lang'
import { DocProvider } from '@/context/doc'
import { useDoc } from '@/hooks/useDoc'

import { Doc } from '@/lib/types'

// Create a variable we can modify in tests
const mockData: { en: Partial<Doc>; zh: Partial<Doc> } = {
  en: { choirName: 'Test Choir', choirNameEn: 'Test Choir En' },
  zh: { choirName: '测试合唱团', choirNameEn: 'Test Choir' }
}

vi.mock('@/data/choir-doc', () => ({
  get choirDocData() {
    return mockData
  }
}))

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
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset mockData
    mockData.en = { choirName: 'Test Choir', choirNameEn: 'Test Choir En' }
    mockData.zh = { choirName: '测试合唱团', choirNameEn: 'Test Choir' }
  })
  afterEach(() => {
    cleanup()
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
      expect(r.getByTestId('name').textContent).toBe('Test Choir')
    })
  })

  it('sets error on invalid schema', async () => {
    mockData.en = { choirName: '测试合唱团', members: [{ invalid_member_key: 'foo' }] as unknown as Doc['members'] }
    mockData.zh = { choirName: '测试合唱团', members: [{ invalid_member_key: 'foo' }] as unknown as Doc['members'] }

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
