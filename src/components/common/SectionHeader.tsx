interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  const alignClass = centered ? 'text-center mx-auto' : ''
  const maxWidth = centered ? 'max-w-2xl' : 'max-w-xl'

  return (
    <div className={`${alignClass} ${maxWidth} mb-12`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}>
          <span className="inline-block bg-limac-green/10 border border-limac-green/30 text-limac-green text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        {title}{' '}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-3 text-limac-muted text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
