import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/context/theme'

// Test component to access theme context
function ThemeTester() {
  const { theme, toggleTheme, isDark } = useTheme()
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <span data-testid="is-dark-value">{String(isDark)}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })
  
  afterEach(() => {
    cleanup()
  })

  it('provides default light theme', () => {
    render(
      <ThemeProvider>
        <ThemeTester />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme-value').textContent).toBe('light')
    expect(screen.getByTestId('is-dark-value').textContent).toBe('false')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('toggles theme and persists to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeTester />
      </ThemeProvider>
    )
    
    const btn = screen.getByTestId('toggle-btn')
    
    // Toggle to dark
    fireEvent.click(btn)
    expect(screen.getByTestId('theme-value').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    
    // Toggle back to light
    fireEvent.click(btn)
    expect(screen.getByTestId('theme-value').textContent).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('initializes from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    
    render(
      <ThemeProvider>
        <ThemeTester />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme-value').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
