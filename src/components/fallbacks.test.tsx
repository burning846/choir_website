import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'

describe('Fallback images', () => {
  it('uses local placeholders when doc lacks images', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ conductor: { raw: '指挥：张三' } }) }) as any))
    render(<App />)
    const conductorImg = await screen.findByAltText('Conductor')
    expect(conductorImg.getAttribute('src')).toContain('/placeholder-avatar.svg')
    const aboutImg = await screen.findByAltText('Choir Performance')
    expect(aboutImg.getAttribute('src')).toContain('/placeholder-banner.svg')
  })
})
