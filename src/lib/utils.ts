import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Lang } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function docUrl(lang: Lang) {
  return lang === 'en' ? '/choir-doc.en.json' : '/choir-doc.json'
}
