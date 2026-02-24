import { Play, Calendar, MapPin, Link as LinkIcon } from 'lucide-react'
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
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                    <Play className="h-6 w-6 text-red-600 ml-1" fill="currentColor" />
                  </div>
                </a>
              </div>
              
              <div className="p-5">
                <a href={getWatchUrl(video)} target="_blank" rel="noopener noreferrer" className="block group/title">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover/title:text-blue-600 transition-colors">{video.title}</h3>
                </a>
                
                {(video.date || video.venue) && (
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500 dark:text-slate-400">
                    {video.date && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{video.date}</span>
                      </div>
                    )}
                    {video.venue && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{video.venue}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">{video.description}</p>
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
