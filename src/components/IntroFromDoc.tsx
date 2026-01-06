import { useEffect, useState } from 'react'
import { FileText, Download, Languages, AlertCircle } from 'lucide-react'

function usePublicFile(path: string) {
  const [content, setContent] = useState<string>('')
  useEffect(() => {
    let mounted = true
    fetch(path)
      .then((res) => (res.ok ? res.text() : ''))
      .then((text) => {
        if (mounted) setContent(text || '')
      })
      .catch(() => setContent(''))
    return () => {
      mounted = false
    }
  }, [path])
  return content
}

export default function IntroFromDoc() {
  const cnHtml = usePublicFile('/intro-cn.html')
  const enHtml = usePublicFile('/intro-en.html')
  const summaryMd = usePublicFile('/choir-intro.md')
  const [tab, setTab] = useState<'cn' | 'en'>('cn')

  const hasCn = cnHtml && cnHtml.includes('<body')
  const hasEn = enHtml && enHtml.includes('<body')

  return (
    <section id="doc-intro" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">合唱团资料介绍</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${tab === 'cn' ? 'bg-gradient-to-r from-pink-500 to-yellow-400 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setTab('cn')}
            >
              <Languages className="h-4 w-4" />
              <span>中文</span>
            </button>
            <button
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${tab === 'en' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setTab('en')}
            >
              <Languages className="h-4 w-4" />
              <span>English</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {tab === 'cn' ? (
              hasCn ? (
                <iframe src="/intro-cn.html" className="w-full h-[600px]" />
              ) : (
                <div className="p-8">
                  <div className="flex items-center text-yellow-600 mb-4"><AlertCircle className="h-5 w-5 mr-2"/>中文预览暂不可用</div>
                  <a href="/Konzert Singers - 咏歌堂 _CN.docx" className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold">
                    <Download className="h-4 w-4" />
                    <span>下载中文资料</span>
                  </a>
                </div>
              )
            ) : (
              hasEn ? (
                <iframe src="/intro-en.html" className="w-full h-[600px]" />
              ) : (
                <div className="p-8">
                  <div className="flex items-center text-yellow-600 mb-4"><AlertCircle className="h-5 w-5 mr-2"/>English preview unavailable</div>
                  <a href="/Konzert Singers _EN.docx" className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    <Download className="h-4 w-4" />
                    <span>Download English profile</span>
                  </a>
                </div>
              )
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow">
            <div className="flex items-center space-x-2 text-gray-800 mb-3">
              <FileText className="h-5 w-5" />
              <span className="font-semibold">网页摘要（Markdown）</span>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{summaryMd || '摘要生成中或不可用'}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

