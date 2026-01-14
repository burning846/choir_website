import { Play, Calendar, MapPin, Link as LinkIcon, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

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
  const { doc } = useDoc()
  useEffect(() => {
    const d = doc
    if (!d) return
    if (Array.isArray(d.videos)) setVideos(d.videos)
    else setVideos([])
    if (d.youtube && d.youtube.channel) setChannel(d.youtube.channel)
  }, [doc, lang])

  return (
    <section id="videos" className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={lang==='en'?'Works':'作品展示'} />
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
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
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{video.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600 dark:text-slate-300">{video.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600 dark:text-slate-300">{video.venue}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{video.description}</p>
                
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
          </Card>
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
