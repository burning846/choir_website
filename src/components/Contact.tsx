import { Mail, Phone, MapPin, Globe, Facebook, Instagram, QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Contact() {
  const [qrcode, setQrcode] = useState<string>('')
  useEffect(() => {
    fetch('/choir-doc.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        if (d.qrcode) setQrcode(d.qrcode.startsWith('/') ? d.qrcode : `/${d.qrcode}`)
      })
      .catch(() => {})
  }, [])
  const contactInfo = [
    {
      icon: Mail,
      label: "邮箱",
      value: "info@starlightchoir.com",
      href: "mailto:info@starlightchoir.com"
    },
    {
      icon: Phone,
      label: "电话",
      value: "+86 138-0000-0000",
      href: "tel:+8613800000000"
    },
    {
      icon: MapPin,
      label: "地址",
      value: "北京市朝阳区音乐大厦8楼",
      href: null
    },
    {
      icon: Globe,
      label: "官网",
      value: "www.starlightchoir.com",
      href: "https://www.starlightchoir.com"
    }
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/starlightchoir",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/starlightchoir",
      color: "bg-pink-600 hover:bg-pink-700"
    }
  ]

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">联系我们</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            如果您对我们的演出感兴趣，或者想要加入我们，请随时与我们联系。我们期待与您分享音乐的美好。
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6">联系信息</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-yellow-500 rounded-full p-2 mt-1">
                    <item.icon className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400">{item.label}</h4>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-3 rounded-full transition-colors`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 text-gray-800">
              <h3 className="text-2xl font-semibold mb-6">发送消息</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    主题
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入消息主题"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    消息内容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入您的消息内容"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                >
                  发送消息
                </button>
              </form>
            </div>
            {qrcode && (
              <div className="bg-white rounded-lg p-6 mt-6 text-gray-800 text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <QrCode className="h-5 w-5 text-gray-700" />
                  <span className="font-semibold">报名二维码</span>
                </div>
                <img src={qrcode} alt="报名二维码" className="w-48 h-48 mx-auto rounded" />
                <p className="text-sm text-gray-600 mt-2">扫码报名加入合唱团</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
