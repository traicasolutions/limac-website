import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'cyan' | 'blue' | 'muted'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({
  children,
  variant = 'green',
  size = 'sm',
  className,
}: BadgeProps) {
  const variantClasses = {
    green: 'bg-limac-green/10 text-limac-green border border-limac-green/30',
    cyan: 'bg-limac-cyan/10 text-limac-cyan border border-limac-cyan/30',
    blue: 'bg-limac-blue/10 text-limac-cyan border border-limac-blue/30',
    muted: 'bg-gray-800 text-limac-muted border border-gray-700',
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}
