import { Mail, Phone, MapPin, Globe, Facebook, Instagram, QrCode } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { ContactInfo, Social } from '@/lib/types'

interface ContactItem {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string | null;
}

interface SocialLink {
  name: string;
  href: string;
  icon: typeof Facebook;
  color: string;
}

export default function Contact() {
  const { lang } = useLang()
  const { doc } = useDoc()

  let qrcode = ''
  let title = lang === 'en' ? 'Contact & Collaboration' : '联系与合作'
  let intro = '如果您对我们的演出感兴趣，或者想要加入我们，请随时与我们联系。我们期待与您分享音乐的美好。'
  let contactInfo: ContactItem[] = []
  let socialLinks: SocialLink[] = []

  if (doc) {
    if (doc.qrcode) qrcode = doc.qrcode.startsWith('/') ? doc.qrcode : `/${doc.qrcode}`
    if (doc.contact) {
      const contact = doc.contact as ContactInfo
      title = contact.title || title
      intro = contact.intro || intro
      const website = contact.website || ''
      const websiteHref = website ? (website.startsWith('http') ? website : `https://${website}`) : ''
      const labels = {
        email: lang === 'en' ? 'Email' : '邮箱',
        phone: lang === 'en' ? 'Phone' : '电话',
        address: lang === 'en' ? 'Address' : '地址',
        website: lang === 'en' ? 'Website' : '官网'
      }
      contactInfo = [
        { icon: Mail, label: labels.email, value: contact.email || '', href: contact.email ? `mailto:${contact.email}` : null },
        { icon: Phone, label: labels.phone, value: contact.phone || '', href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, '')}` : null },
        { icon: MapPin, label: labels.address, value: contact.address || '', href: null },
        { icon: Globe, label: labels.website, value: website || '', href: websiteHref || null }
      ]
      const socials = Array.isArray(contact.socials) ? contact.socials as Social[] : []
      socialLinks = socials.map((s) => ({
        name: s.name,
        href: s.href,
        icon: s.name === 'Facebook' ? Facebook : Instagram,
        color: s.name === 'Facebook' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'
      }))
    }
  }

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 dark:from-slate-950 dark:to-slate-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={title}
          barClassName="from-yellow-400 to-orange-400"
        />
        <div className="mb-12">
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {intro}
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-2">
            {lang === 'en'
              ? 'Get in touch to explore cross-cultural choir, original works, joint performances and more.'
              : '欢迎与我们联系，共同探索跨文化合唱、原创作品、联合演出等合作机会。'}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{lang === 'en' ? 'Contact Info' : '联系信息'}</h3>
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
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{lang === 'en' ? 'Follow Us' : '关注我们'}</h4>
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
                  <span className="font-semibold">{lang === 'en' ? 'Join QR Code' : '报名二维码'}</span>
                </div>
                <img src={qrcode} alt={lang === 'en' ? "Join QR Code" : "报名二维码"} className="w-56 h-56 mx-auto rounded" />
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">{lang === 'en' ? 'Scan to join the choir' : '扫码报名加入合唱团'}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
