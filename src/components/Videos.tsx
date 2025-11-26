import { Play, Calendar, MapPin } from 'lucide-react'

interface Video {
  id: string
  title: string
  date: string
  venue: string
  description: string
}

export default function Videos() {
  const videos: Video[] = [
    {
      id: "dQw4w9WgXcQ",
      title: "《茉莉花》经典合唱",
      date: "2024年春季音乐会",
      venue: "市音乐厅",
      description: "经典中国民歌的全新演绎，展现东方音乐的魅力。"
    },
    {
      id: "9bZkp7q19f0",
      title: "《欢乐颂》贝多芬第九交响曲",
      date: "2023年新年音乐会",
      venue: "大剧院",
      description: "与交响乐团合作演出贝多芬不朽名作。"
    },
    {
      id: "JGwWNGJdvx8",
      title: "《我和我的祖国》",
      date: "2023年国庆专场",
      venue: "文化广场",
      description: "深情演绎爱国歌曲，表达对祖国的热爱。"
    }
  ]

  return (
    <section id="videos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">作品展示</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            欣赏我们的精彩演出，感受合唱艺术的魅力。每一首歌曲都承载着我们的热情和用心。
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-900 relative group">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{video.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{video.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{video.venue}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">在YouTube上观看</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@starlightchoir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Play className="h-5 w-5" />
            <span className="font-medium">访问我们的YouTube频道</span>
          </a>
        </div>
      </div>
    </section>
  )
}