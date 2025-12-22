import { useLang } from '@/lib/lang'
export default function Collaboration() {
  const { lang } = useLang()
  return (
    <section id="collab" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang==='en'?'Collaboration':'合作与探索'}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>
        <div className="max-w-3xl mx-auto text-center text-gray-600">
          {lang==='en'?'Get in touch to explore cross-cultural choir, original works, joint performances and more.':'欢迎与我们联系，共同探索跨文化合唱、原创作品、联合演出等合作机会。'}
        </div>
      </div>
    </section>
  )
}
