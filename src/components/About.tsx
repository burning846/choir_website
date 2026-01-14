import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export default function About() {
  const [intro, setIntro] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const { lang } = useLang()
  const { doc } = useDoc()
  useEffect(() => {
    const d = doc
    if (!d) return
    if (d.intro) setIntro(d.intro)
    if (d.aboutImage) setImage(d.aboutImage)
    else if (d.images && d.images.length) setImage(d.images[0].file)
  }, [doc, lang])
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <SectionTitle title={lang==='en'?'About':'关于我们'} />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">{lang==='en'?'Choir Introduction':'合唱团简介'}</h3>
            {intro ? (
              intro.split('\n').map((p, i) => (
                <p key={i} className="text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">{p}</p>
              ))
            ) : (
              <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed">
                {lang==='en'?'We are music lovers who connect hearts through harmony and create beautiful musical experiences.':'我们是一群热爱音乐的人，用和声连接心灵，致力于创造美妙的音乐体验。'}
              </p>
            )}
            
            
          </div>
          
          <Card className="relative overflow-hidden flex items-center justify-center bg-white/50 dark:bg-white/5">
            <img src={image || "/placeholder-banner.svg"} alt={lang==='en'?"Choir Logo":"合唱团Logo"} className="w-full h-[40rem] object-contain p-6" />
          </Card>
        </div>
      </div>
    </section>
  )
}
