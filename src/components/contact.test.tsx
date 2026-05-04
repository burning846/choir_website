import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'
import { DocProvider } from '@/context/doc'
import { LangProvider } from '@/lib/lang'
import { Doc } from '@/lib/types'

const mockData: { en: Partial<Doc>; zh: Partial<Doc> } = {
  en: {},
  zh: {}
}

vi.mock('@/data/choir-doc', () => ({
  get choirDocData() {
    return mockData
  }
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockData.en = {}
    mockData.zh = {}
  })

  it('normalizes website urls and correctly maps social icons', async () => {
    // Mock doc with specific website and social data
    mockData.en = {
      contact: {
        website: 'example.com',
        socials: [
          { name: 'Facebook', href: 'https://fb.com' },
          { name: 'UnknownPlatform', href: 'https://unknown.com' }
        ]
      }
    } as unknown as Doc

    mockData.zh = {
      contact: {
        website: 'example.com',
        socials: [
          { name: 'Facebook', href: 'https://fb.com' },
          { name: 'UnknownPlatform', href: 'https://unknown.com' }
        ]
      }
    } as unknown as Doc

    render(
      <LangProvider>
        <DocProvider>
          <Contact />
        </DocProvider>
      </LangProvider>
    )

    // Wait for context to load and render
    const websiteLink = await screen.findByText('example.com')
    expect(websiteLink).toBeInTheDocument()
    expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://example.com')

    // Social links rendering
    const socialLinks = screen.getAllByRole('link').filter(a => a.getAttribute('target') === '_blank')
    
    // We expect at least the two social links we provided
    expect(socialLinks.some(a => a.getAttribute('href') === 'https://fb.com')).toBe(true)
    expect(socialLinks.some(a => a.getAttribute('href') === 'https://unknown.com')).toBe(true)
    
    // Check aria-labels
    expect(screen.getByLabelText('Follow us on Facebook')).toBeInTheDocument()
  })

  it('filters out empty contact fields', async () => {
    mockData.en = {
      contact: {
        email: '',
        phone: '  ', // whitespace should be filtered
        address: '123 Test St',
        website: ''
      }
    } as unknown as Doc
    
    mockData.zh = {
      contact: {
        email: '',
        phone: '  ', // whitespace should be filtered
        address: '123 Test St',
        website: ''
      }
    } as unknown as Doc

    render(
      <LangProvider>
        <DocProvider>
          <Contact />
        </DocProvider>
      </LangProvider>
    )

    // Only address should render
    const address = await screen.findByText('123 Test St')
    expect(address).toBeInTheDocument()
    
    // Email/Phone/Website rows should not exist in DOM
    const links = screen.queryAllByRole('link')
    // Filter out anchor links that might be internal navigation or social
    const contactLinks = links.filter(l => {
      const href = l.getAttribute('href') || ''
      return href.startsWith('mailto:') || 
             href.startsWith('tel:') || 
             (href.startsWith('http') && !href.includes('fb.com') && !href.includes('unknown.com') && !href.includes('example.com'))
    })
    expect(contactLinks.length).toBe(0) // No mailto, tel, or external links
  })
})
