import { STATS } from '@/lib/constants'

export default function StatsBar() {
  return (
    <section className="bg-limac-navy border-y border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-limac-muted text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
