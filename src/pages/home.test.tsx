import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/pages/Home'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import { ThemeProvider } from '@/context/theme'

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
  })

  it('renders loading state initially', () => {
    // Return a promise that doesn't resolve immediately to keep it in loading state
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))

    render(
      <ThemeProvider>
        <LangProvider>
          <DocProvider>
            <Home />
          </DocProvider>
        </LangProvider>
      </ThemeProvider>
    )

    // Using the English translation as default
    expect(screen.getByText('Loading content...')).toBeInTheDocument()
  })

  it('renders error state on fetch failure', async () => {
    // Mock a failed fetch
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false } as unknown as Response)))

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
      expect(screen.getByText('Failed to load content. Please try again later.')).toBeInTheDocument()
    })
  })

  it('renders error state on schema validation failure', async () => {
    // Mock a successful fetch but invalid schema
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ members: [{ invalid: true }] }) // Invalid member schema
    } as unknown as Response)))

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
