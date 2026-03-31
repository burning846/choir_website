import { Facebook, Instagram, Twitter, Youtube, Link as LinkIcon } from 'lucide-react'

export const getSocialIcon = (name: string) => {
  const n = name.trim().toLowerCase()
  switch (n) {
    case 'facebook':
    case 'fb':
      return Facebook
    case 'instagram':
    case 'ig':
      return Instagram
    case 'twitter':
    case 'x':
      return Twitter
    case 'youtube':
    case 'yt':
      return Youtube
    default:
      return LinkIcon
  }
}

export const getSocialColor = (name: string) => {
  const n = name.trim().toLowerCase()
  switch (n) {
    case 'facebook':
    case 'fb':
      return 'bg-blue-600 hover:bg-blue-700'
    case 'instagram':
    case 'ig':
      return 'bg-pink-600 hover:bg-pink-700'
    case 'twitter':
    case 'x':
      return 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
    case 'youtube':
    case 'yt':
      return 'bg-red-600 hover:bg-red-700'
    default:
      return 'bg-gray-500 hover:bg-gray-600'
  }
}
