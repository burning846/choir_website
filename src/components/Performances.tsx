import { useLang } from '@/lib/lang'
export default function Performances() {
  const { lang } = useLang()
  return (
    <section id="performances" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang==='en'?'Performances':'演出'}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>
        <div className="max-w-3xl mx-auto text-center text-gray-600">
          {lang==='en'?'More performance info coming soon.':'敬请期待更多演出信息。'}
        </div>
      </div>
    </section>
  )
}
