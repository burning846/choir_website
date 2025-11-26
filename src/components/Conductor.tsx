import { User, Music, Award } from 'lucide-react'

export default function Conductor() {
  const conductor = {
    name: "李明华",
    title: "音乐总监 & 首席指挥",
    experience: "20年",
    education: "中央音乐学院指挥系硕士",
    achievements: [
      "全国合唱比赛金奖获得者",
      "国际合唱联盟认证指挥",
      "多部原创作品首演指挥"
    ],
    bio: "李明华老师毕业于中央音乐学院指挥系，拥有20年的合唱指挥经验。他曾在多个国际合唱比赛中担任评委，并带领多支合唱团获得国内外大奖。李老师注重团员个人能力的培养和团队整体音乐素养的提升，致力于将星光合唱团打造成具有国际水准的业余合唱团体。"
  }

  return (
    <section id="conductor" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">指挥介绍</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 text-center">
                <img 
                  src="https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional conductor portrait, middle-aged man, confident expression, wearing formal conductor attire, warm lighting, musical background, artistic portrait style&image_size=square_hd" 
                  alt="李明华指挥"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">{conductor.name}</h3>
                <p className="text-purple-600 font-medium mb-4">{conductor.title}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{conductor.experience} 经验</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Music className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{conductor.education}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">个人简介</h4>
                  <p className="text-gray-600 leading-relaxed">{conductor.bio}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    主要成就
                  </h4>
                  <ul className="space-y-2">
                    {conductor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">指挥理念</h4>
                  <p className="text-gray-600 italic leading-relaxed">
                    "音乐是人类共同的语言，合唱是心灵交流的桥梁。我希望通过我们的演唱，让每一个听众都能感受到音乐的力量和美好。"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}