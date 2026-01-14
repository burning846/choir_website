import { Mail, Phone, MapPin, Globe, Facebook, Instagram, QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export default function Contact() {
  const [qrcode, setQrcode] = useState<string>('')
  const [title, setTitle] = useState<string>('联系我们')
  const [intro, setIntro] = useState<string>('如果您对我们的演出感兴趣，或者想要加入我们，请随时与我们联系。我们期待与您分享音乐的美好。')
  const [contactInfo, setContactInfo] = useState<any[]>([])
  const [socialLinks, setSocialLinks] = useState<any[]>([])
  const { lang } = useLang()
  const { doc } = useDoc()
  useEffect(() => {
    const d = doc
    if (!d) return
    if (d.qrcode) setQrcode(d.qrcode.startsWith('/') ? d.qrcode : `/${d.qrcode}`)
    if (d.contact) {
      setTitle(d.contact.title || title)
      setIntro(d.contact.intro || intro)
      const website = d.contact.website || ''
      const websiteHref = website ? (website.startsWith('http') ? website : `https://${website}`) : ''
      const labels = {
        email: lang==='en' ? 'Email' : '邮箱',
        phone: lang==='en' ? 'Phone' : '电话',
        address: lang==='en' ? 'Address' : '地址',
        website: lang==='en' ? 'Website' : '官网'
      }
      setContactInfo([
        { icon: Mail, label: labels.email, value: d.contact.email || '', href: d.contact.email ? `mailto:${d.contact.email}` : null },
        { icon: Phone, label: labels.phone, value: d.contact.phone || '', href: d.contact.phone ? `tel:${d.contact.phone.replace(/\s+/g,'')}` : null },
        { icon: MapPin, label: labels.address, value: d.contact.address || '', href: null },
        { icon: Globe, label: labels.website, value: website || '', href: websiteHref || null }
      ])
      const socials = Array.isArray(d.contact.socials) ? d.contact.socials : []
      setSocialLinks(socials.map((s: any) => ({
        name: s.name,
        href: s.href,
        icon: s.name === 'Facebook' ? Facebook : Instagram,
        color: s.name === 'Facebook' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'
      })))
    }
  }, [doc, lang])

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 dark:from-gray-900 dark:to-blue-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={lang==='en'?'Contact & Collaboration':'联系与合作'}
          barClassName="from-yellow-400 to-orange-400"
        />
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {intro}
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-2">
            {lang==='en'
              ? 'Get in touch to explore cross-cultural choir, original works, joint performances and more.'
              : '欢迎与我们联系，共同探索跨文化合唱、原创作品、联合演出等合作机会。'}
          </p>
        
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{lang==='en'?'Contact Info':'联系信息'}</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="rounded-full p-2 mt-1 ring-1 ring-black/10 bg-black/5 dark:ring-white/20 dark:bg-white/10">
                    <item.icon className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-yellow-300">{item.label}</h4>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{lang==='en'?'Follow Us':'关注我们'}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-3 rounded-full transition-colors shadow-subtle`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {qrcode && (
              <Card className="p-6 text-gray-800 dark:text-slate-200 text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <QrCode className="h-5 w-5 text-gray-700 dark:text-slate-300" />
                  <span className="font-semibold">{lang==='en'?'Join QR Code':'报名二维码'}</span>
                </div>
                <img src={qrcode} alt={lang==='en'?"Join QR Code":"报名二维码"} className="w-56 h-56 mx-auto rounded" />
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">{lang==='en'?'Scan to join the choir':'扫码报名加入合唱团'}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
