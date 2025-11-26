import { Music, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Music className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-bold">星光合唱团</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              用音乐传递美好，用和声连接心灵。我们致力于创造美妙的音乐体验，为社区带来艺术的享受。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#conductor" className="hover:text-white transition-colors">指挥介绍</a></li>
              <li><a href="#members" className="hover:text-white transition-colors">团员风采</a></li>
              <li><a href="#videos" className="hover:text-white transition-colors">作品展示</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">联系我们</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">演出时间</h4>
            <div className="text-gray-400 space-y-2">
              <p>每周三 19:00-21:30</p>
              <p>每周日 14:00-17:00</p>
              <p>排练地点：音乐大厦8楼</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
            <span>用心制作</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>星光合唱团</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 星光合唱团. 保留所有权利. | 让音乐点亮生活
          </p>
        </div>
      </div>
    </footer>
  )
}