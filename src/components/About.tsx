import { useEffect, useState } from 'react'
import { useLang, docUrl } from '@/lib/lang'

export default function About() {
  const [intro, setIntro] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const { lang } = useLang()
  useEffect(() => {
    fetch(docUrl(lang), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        if (d.intro) setIntro(d.intro)
        if (d.aboutImage) setImage(d.aboutImage)
        else if (d.images && d.images.length) setImage(d.images[0].file)
      })
      .catch(() => {})
  }, [lang])
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang==='en'?'About':'关于我们'}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{lang==='en'?'Choir Introduction':'合唱团简介'}</h3>
            {intro ? (
              intro.split('\n').map((p, i) => (
                <p key={i} className="text-gray-600 mb-6 leading-relaxed">{p}</p>
              ))
            ) : (
              <p className="text-gray-600 mb-8 leading-relaxed">
                {lang==='en'?'We are music lovers who connect hearts through harmony and create beautiful musical experiences.':'我们是一群热爱音乐的人，用和声连接心灵，致力于创造美妙的音乐体验。'}
              </p>
            )}
            
            
          </div>
          
          <div className="relative">
            <img 
              src={image || "https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=Professional choir group singing together on stage, warm lighting, elegant concert hall, diverse group of singers in formal attire, harmonious atmosphere, musical notation in background&image_size=landscape_16_9"}
              alt={lang==='en'?"Choir Performance":"合唱团演出"}
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
