import { Play, Calendar, MapPin, Link as LinkIcon, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'

interface Video {
  id?: string
  title: string
  date?: string
  venue?: string
  description?: string
  url?: string
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [channel, setChannel] = useState<string>('https://www.youtube.com/@KonzertSingers')
  const getVideoId = (url?: string) => {
    if (!url) return ''
    const m = url.match(/[?&]v=([\w-]+)/) || url.match(/youtu\.be\/([\w-]+)/)
    return m ? m[1] : ''
  }
  const getWatchUrl = (video: Video) => (video.id ? `https://www.youtube.com/watch?v=${video.id}` : (video.url || channel))
  const getThumbUrl = (video: Video) => {
    const vidId = video.id || getVideoId(video.url)
    return vidId ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg` : ''
  }
  const { lang } = useLang()
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        if (Array.isArray(d.videos)) setVideos(d.videos)
        if (d.youtube && d.youtube.channel) setChannel(d.youtube.channel)
        if (!Array.isArray(d.videos)) setVideos([])
      })
      .catch(() => {})
  }, [lang])

  return (
    <section id="videos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang==='en'?'Works':'作品展示'}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang==='en' ? 'Enjoy our performances and feel the charm of choral art. Every song carries our passion and care.' : '欣赏我们的精彩演出，感受合唱艺术的魅力。每一首歌曲都承载着我们的热情和用心。'}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-900 relative group">
                {getThumbUrl(video) ? (
                  <img src={getThumbUrl(video)} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LinkIcon className="h-10 w-10 text-white/80" />
                  </div>
                )}
                <a
                  href={getWatchUrl(video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center"
                >
                  <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Youtube className="h-5 w-5" />
                    <span>{lang==='en'?'Play on YouTube':'在 YouTube 播放'}</span>
                  </div>
                </a>
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  YouTube
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
                    href={getWatchUrl(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">{lang==='en'?'Watch on YouTube':'在YouTube上观看'}</span>
                  </a>
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
            <span className="font-medium">{lang==='en'?'Visit Channel':'访问频道'}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
