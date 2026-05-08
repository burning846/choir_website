import { Music } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '@/lib/lang'

export default function FirstChordFAB() {
  const { lang } = useLang()

  return (
    <Link
      to="/firstchord"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-rosegold px-4 py-3 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-rosegold-600 dark:bg-rosegold-600 dark:hover:bg-rosegold-500 md:bottom-8 md:left-8"
    >
      <Music className="h-5 w-5 animate-pulse" />
      <span className="font-semibold tracking-wide">
        {lang === 'en' ? 'FirstChord Concert' : 'FirstChord 音乐会'}
      </span>
    </Link>
  )
}
