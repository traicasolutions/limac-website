import { Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/common/SectionHeader'
import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  return (
    <section className="bg-limac-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Customer Reviews"
          title="Trusted by Kerala's"
          highlight="Solar Community"
          subtitle="Real feedback from customers who've made the switch to LiFePO4 with Limac Power Tech."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gray-900 border border-gray-800 hover:border-limac-green/30 rounded-xl p-6 card-hover"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-limac-green/10">
                <Quote size={48} fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="text-limac-muted text-sm leading-relaxed mb-5 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
                <div className="w-9 h-9 bg-limac-green/10 border border-limac-green/20 rounded-full flex items-center justify-center">
                  <span className="text-limac-green font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-limac-muted text-xs">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
