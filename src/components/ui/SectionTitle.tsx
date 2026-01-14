import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'react'

type Props = {
  title: string
  className?: string
  titleClassName?: string
  barClassName?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

export default function SectionTitle({ title, className, titleClassName, barClassName, ...rest }: Props) {
  return (
    <div {...rest} className={twMerge('text-center mb-12', className)}>
      <h2 className={twMerge('text-4xl font-bold text-gray-800 dark:text-white mb-4', titleClassName)}>{title}</h2>
      <div className={twMerge('w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto', barClassName)} />
    </div>
  )
}
