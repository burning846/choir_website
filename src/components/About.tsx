import { Users, Calendar, Award } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">关于我们</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">星光合唱团简介</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              星光合唱团成立于2015年，是一支充满活力和激情的业余合唱团体。我们致力于传播美妙的和声艺术，为社区带来高质量的音乐演出。
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              合唱团现有团员60余人，来自各行各业，因为对音乐的热爱而聚集在一起。我们定期举办音乐会，参与社区文化活动，并与其他艺术团体合作演出。
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">60+</h4>
                <p className="text-sm text-gray-600">团员人数</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">9年</h4>
                <p className="text-sm text-gray-600">成立历史</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">15+</h4>
                <p className="text-sm text-gray-600">获奖次数</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional choir group singing together on stage, warm lighting, elegant concert hall, diverse group of singers in formal attire, harmonious atmosphere, musical notation in background&image_size=landscape_16_9" 
              alt="星光合唱团演出"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}