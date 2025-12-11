import { Play, Calendar, MapPin, Link as LinkIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Video {
  id?: string
  title: string
  date?: string
  venue?: string
  description?: string
  search?: string
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [channel, setChannel] = useState<string>('https://www.youtube.com/@KonzertSingers')
  useEffect(() => {
    fetch('/choir-doc.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        if (Array.isArray(d.videos)) setVideos(d.videos)
        if (d.youtube && d.youtube.channel) setChannel(d.youtube.channel)
        if (!Array.isArray(d.videos)) {
          setVideos([
            { title: '拥抱夕阳', date: '近期发布', venue: '线上发布', description: 'Konzert Singers 演绎经典中文作品', search: 'https://www.youtube.com/results?search_query=%E6%8B%A5%E6%8A%B1%E5%A4%95%E9%98%B3+Konzert+Singers' },
            { title: '青春不留白', date: '近期发布', venue: '线上发布', description: 'Konzert Singers 青春主题作品', search: 'https://www.youtube.com/results?search_query=%E9%9D%92%E6%98%A5%E4%B8%8D%E7%95%99%E7%99%BD+Konzert+Singers' }
          ])
        }
      })
      .catch(() => {})
  }, [])

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
                {video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <a
                    href={video.search}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 ring-1 ring-white/20 mb-4">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-white/90">前往播放页面</p>
                    </div>
                  </a>
                )}
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
                  {video.id ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      <span className="text-sm font-medium">在YouTube上观看</span>
                    </a>
                  ) : (
                    <a
                      href={video.search}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">前往频道搜索结果</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href={channel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Play className="h-5 w-5" />
            <span className="font-medium">访问Konzert Singers频道</span>
          </a>
        </div>
      </div>
    </section>
  )
}
