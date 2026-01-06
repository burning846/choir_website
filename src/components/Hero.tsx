import { Heart, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'

export default function Hero() {
  const [nameCn, setNameCn] = useState('星光合唱团')
  const [logo, setLogo] = useState<string>('/logo.svg')
  const { lang } = useLang()
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        const cn = d.choirName?.includes('咏歌堂') ? '咏歌堂' : (d.choirName || nameCn)
        setNameCn(cn)
        if (d.logo) setLogo(d.logo)
      })
      .catch(() => {})
  }, [lang])
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Choir Logo" className="w-20 h-20 rounded-lg" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent tracking-wide">
            {nameCn}
          </h1>
          
          <p className="text-lg md:text-xl mb-12 text-blue-100 leading-relaxed max-w-2xl mx-auto">
            {lang==='en'
              ? 'Let music light up life and harmony warm hearts. We are a passionate choir creating beautiful musical experiences.'
              : '用音乐点亮生活，用和声温暖人心。我们是一支充满激情的合唱团，致力于创造美妙的音乐体验。'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#videos" 
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span>{lang==='en'?'Watch Our Performances':'欣赏我们的演出'}</span>
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <Star className="h-5 w-5" />
              <span>{lang==='en'?'Join Us':'加入我们'}</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 text-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
        </svg>
      </div>
    </section>
  )
}
