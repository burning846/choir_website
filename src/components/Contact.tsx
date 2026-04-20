import { Mail, Phone, MapPin, Globe, QrCode } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { useDoc } from '@/hooks/useDoc'
import { uiTranslations } from '@/lib/i18n'
import { getSocialIcon, getSocialColor } from '@/lib/social'
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
  icon: typeof Mail;
  color: string;
}

export default function Contact() {
  const { lang } = useLang()
  const { doc } = useDoc()
  const ts = uiTranslations[lang].sections
  const tc = uiTranslations[lang].common

  let qrcode = ''
  let title = ts.contact
  let intro = uiTranslations[lang].contact.defaultIntro
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
      const labels = uiTranslations[lang].contact
      
      const potentialContactInfo = [
        { icon: Mail, label: labels.email, value: contact.email || '', href: contact.email ? `mailto:${contact.email}` : null },
        { icon: Phone, label: labels.phone, value: contact.phone || '', href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, '')}` : null },
        { icon: MapPin, label: labels.address, value: contact.address || '', href: null },
        { icon: Globe, label: labels.website, value: website || '', href: websiteHref || null }
      ]
      contactInfo = potentialContactInfo.filter(item => item.value.trim() !== '')

      const socials = Array.isArray(contact.socials) ? contact.socials as Social[] : []
      socialLinks = socials.map((s) => ({
        name: s.name,
        href: s.href,
        icon: getSocialIcon(s.name),
        color: getSocialColor(s.name)
      }))
    }
  }

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 dark:from-slate-950 dark:to-slate-900 dark:text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={title}
          barClassName="from-yellow-400 to-orange-400"
        />
        <div className="mb-12">
          {intro.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-2 first:mt-0">
                {paragraph}
              </p>
            )
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{uiTranslations[lang].contact.contactInfo}</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="rounded-full p-2 mt-1 ring-1 ring-black/10 bg-black/5 dark:ring-white/20 dark:bg-white/10 flex-shrink-0">
                    <item.icon className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 dark:text-yellow-300">{item.label}</h4>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="inline-block text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors break-words break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 break-words break-all">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {socialLinks.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{uiTranslations[lang].contact.followUs}</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={uiTranslations[lang].contact.followOn.replace('{platform}', social.name)}
                      title={uiTranslations[lang].contact.followOn.replace('{platform}', social.name)}
                      className={`${social.color} text-white p-3 rounded-full transition-colors shadow-subtle`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1 flex justify-center w-full px-2 sm:px-0">
            {qrcode && (
              <Card className="p-4 sm:p-6 md:p-8 text-gray-800 dark:text-slate-200 text-center w-full max-w-sm mx-auto overflow-hidden">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <QrCode className="h-5 w-5 text-gray-700 dark:text-slate-300 flex-shrink-0" />
                  <span className="font-semibold text-base sm:text-lg whitespace-nowrap">{tc.joinQrCode}</span>
                </div>
                <div className="w-full max-w-[200px] sm:max-w-[240px] aspect-square mx-auto bg-white rounded-xl shadow-sm ring-1 ring-black/5 overflow-hidden">
                  <img src={qrcode} alt={tc.joinQrCode} className="w-full h-full object-contain" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 mt-4 break-words">{tc.scanToJoin}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
