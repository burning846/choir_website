import { twMerge } from 'tailwind-merge'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 ring-1 ring-black/5 shadow-soft',
  secondary: 'border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 shadow-subtle',
  ghost: 'bg-transparent text-inherit hover:bg-black/5 dark:hover:bg-white/10'
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-3'
}

export default function Button({ variant = 'primary', size = 'md', className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={twMerge(
        'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    />
  )
}
