import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'react'

export default function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return (
    <div
      {...rest}
      className={twMerge(
        'bg-white dark:bg-slate-900 rounded-2xl shadow-soft ring-1 ring-black/5 dark:ring-white/10',
        className
      )}
    />
  )
}
