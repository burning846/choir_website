import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'

describe('Routing', () => {
  it('renders 404 for unknown path', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({}) }) as unknown as Response))
    window.history.pushState({}, '', '/unknown')
    render(<App />)
    expect(await screen.findByText('页面不存在或已移除')).toBeInTheDocument()
  })
})
