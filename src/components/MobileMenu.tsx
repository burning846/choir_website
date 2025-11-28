import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '#about', label: '关于我们' },
    { href: '#conductor', label: '指挥介绍' },
    { href: '#members', label: '团员风采' },
    { href: '#videos', label: '作品展示' },
    { href: '#contact', label: '联系我们' }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95">
          <div className="flex flex-col h-full pt-16 px-4">
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleMenu}
                className="text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-white text-xl font-medium py-3 px-4 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors text-center"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex flex-col items-center space-y-4">
              <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Sparkles className="h-5 w-5" />
                <span>加入我们</span>
              </button>
              <div className="text-sm text-purple-200">中文 / EN</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
