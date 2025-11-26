import { Music } from 'lucide-react'
import MobileMenu from './MobileMenu'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Music className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold">星光合唱团</h1>
              <p className="text-sm text-purple-200">Starlight Choir</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-yellow-400 transition-colors">关于我们</a>
            <a href="#conductor" className="hover:text-yellow-400 transition-colors">指挥介绍</a>
            <a href="#members" className="hover:text-yellow-400 transition-colors">团员风采</a>
            <a href="#videos" className="hover:text-yellow-400 transition-colors">作品展示</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">联系我们</a>
          </nav>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}