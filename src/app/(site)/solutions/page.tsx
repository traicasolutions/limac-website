import type { Metadata } from 'next'
import Link from 'next/link'
import { Sun, Home, Building2, Bike, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react'
import SectionHeader from '@/components/common/SectionHeader'
import { LIMAC } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'LiFePO4 battery solutions for every need — residential solar, commercial, motorcycle, and street lighting. Limac Power Tech, Thrissur, Kerala.',
  openGraph: {
    title: 'Battery Solutions | Limac Power Tech Kerala',
    description: 'Complete LiFePO4 battery solutions for solar, residential, commercial, and automotive applications.',
    images: [{ url: '/og-image.jpg' }],
    siteName: 'Limac Power Tech',
  },
}

const SOLUTIONS = [
  {
    icon: Home,
    title: 'Residential Solar Storage',
    description:
      'Power your home through outages and reduce reliance on grid electricity. Our residential LiFePO4 packs pair perfectly with rooftop solar systems across Kerala.',
    benefits: [
      'Store excess solar energy for night-time use',
      'Zero maintenance — no water topping needed',
      '10-year expected lifespan (3x lead-acid)',
      'Compact — 1/3 the weight of equivalent lead-acid',
    ],
    products: ['12V 100AH', '12V 200AH', '24V 100AH'],
    href: '/products?category=solar-storage',
  },
  {
    icon: Building2,
    title: 'Commercial & Industrial',
    description:
      'Reliable energy storage for shops, offices, hospitals, and industrial units. Our commercial LiFePO4 solutions provide uninterrupted power at lower total cost of ownership.',
    benefits: [
      '48V systems for high-capacity solar inverters',
      'Supports UPS and critical power backup',
      'Lower replacement frequency than lead-acid',
      'Stackable for expandable capacity',
    ],
    products: ['48V 50AH', '48V 100AH', 'Custom packs'],
    href: '/products?category=solar-storage',
  },
  {
    icon: Bike,
    title: 'Motorcycle & Automotive',
    description:
      "Replace your heavy, maintenance-prone lead-acid motorcycle battery with Limac's lightweight lithium starters. Instant cranking, even after months of storage.",
    benefits: [
      '70% lighter than lead-acid equivalents',
      'Superior cold cranking amps (CCA)',
      'No sulfation — stays charged during storage',
      'Fits standard battery compartments',
    ],
    products: ['Motorcycle 5AH', 'Scooter 4AH', 'ATV 8AH'],
    href: '/products?category=motorcycle',
  },
  {
    icon: Lightbulb,
    title: 'Solar Street Lighting',
    description:
      'Dedicated LiFePO4 solutions for outdoor solar lighting — street lights, garden lights, and security lights that run all night, every night.',
    benefits: [
      'Optimized discharge curves for LED efficiency',
      'IP67-compatible battery configurations',
      'Auto-recovery BMS for long unattended cycles',
      'Operates in Kerala\'s full temperature range',
    ],
    products: ['12V 30AH', '12V 50AH', 'Custom'],
    href: '/products?category=lifepo4-lighting',
  },
]

export default function SolutionsPage() {
  return (
    <div className="bg-limac-black pt-24">
      {/* Header */}
      <section className="py-12 px-4 border-b border-gray-800 bg-limac-navy">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block bg-limac-green/10 border border-limac-green/30 text-limac-green text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            LiFePO4 Solutions for <span className="gradient-text">Every Need</span>
          </h1>
          <p className="text-limac-muted text-lg max-w-2xl">
            From homes to highways, Limac Power Tech provides tailored LiFePO4 battery
            solutions for Kerala&apos;s unique energy challenges and climate.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-8">
        {SOLUTIONS.map((solution, i) => {
          const Icon = solution.icon
          return (
            <div
              key={solution.title}
              className={`grid lg:grid-cols-2 gap-8 items-center bg-gray-900 border border-gray-800 rounded-2xl p-8 ${
                i % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="w-12 h-12 bg-limac-green/10 border border-limac-green/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-limac-green" />
                </div>
                <h2 className="text-white font-bold text-2xl mb-3">{solution.title}</h2>
                <p className="text-limac-muted leading-relaxed mb-5">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-limac-muted text-sm">
                      <CheckCircle size={14} className="text-limac-green mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 bg-limac-green hover:bg-green-400 text-limac-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  View Products <ArrowRight size={15} />
                </Link>
              </div>

              {/* Visual */}
              <div className={`bg-limac-black rounded-xl border border-gray-800 p-8 flex flex-col items-center justify-center h-64 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <Icon size={56} className="text-limac-green/40 mb-4" strokeWidth={1} />
                <div className="text-center">
                  <div className="text-white font-bold text-sm mb-2">Available in</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {solution.products.map((p) => (
                      <span key={p} className="bg-limac-green/10 border border-limac-green/20 text-limac-green text-xs px-3 py-1 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-limac-navy to-limac-black border border-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a custom <span className="gradient-text">battery solution?</span>
          </h2>
          <p className="text-limac-muted mb-8">
            Our engineers can design custom LiFePO4 battery packs for unique applications.
            Contact us to discuss your specific voltage, capacity, and form-factor requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-limac-green hover:bg-green-400 text-limac-black font-semibold px-6 py-3 rounded-lg transition-colors">
              Get a Custom Quote
            </Link>
            <a
              href={`https://wa.me/${LIMAC.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-limac-green/40 text-limac-green hover:bg-limac-green/10 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
