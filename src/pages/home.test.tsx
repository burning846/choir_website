import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/pages/Home'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import { ThemeProvider } from '@/context/theme'
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

// Setup matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Setup localStorage mock
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
    removeItem(key: string) {
      delete store[key]
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock useMeta to prevent side effects
vi.mock('@/hooks/useMeta', () => ({
  useMeta: vi.fn()
}))

// Mock ScrollToTop
vi.mock('@/components/ScrollToTop', () => ({
  default: () => null
}))

describe('Home Page Status Rendering', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    // Reset mockData
    mockData.en = { choirName: 'Test Choir', choirNameEn: 'Test Choir En' }
    mockData.zh = { choirName: '测试合唱团', choirNameEn: 'Test Choir' }
  })

  it('renders correctly on successful load', async () => {
    render(
      <ThemeProvider>
        <LangProvider>
          <DocProvider>
            <Home />
          </DocProvider>
        </LangProvider>
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.queryByText('Loading content...')).not.toBeInTheDocument()
      expect(screen.queryByText('An error occurred')).not.toBeInTheDocument()
    })
  })

  it('renders error state on schema validation failure', async () => {
    // Mock an invalid schema
    mockData.en = { members: [{ invalid: true }] as unknown as Doc['members'] }
    mockData.zh = { members: [{ invalid: true }] as unknown as Doc['members'] }

    render(
      <ThemeProvider>
        <LangProvider>
          <DocProvider>
            <Home />
          </DocProvider>
        </LangProvider>
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeInTheDocument()
    })
  })
})
