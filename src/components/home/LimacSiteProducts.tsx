import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BatteryCharging, Bike, Layers } from 'lucide-react'
import SectionHeader from '@/components/common/SectionHeader'
import { getProducts } from '@/lib/payload'

const LIMAC_SITE_PRODUCTS = [
  {
    title: 'Lithium Single Battery',
    subtitle: 'Solar and backup battery class',
    description:
      'Standalone LiFePO4 battery options for day-to-day backup, compact solar use, and reliable home applications.',
    href: '/products?category=solar-storage',
    icon: BatteryCharging,
    category: 'solar-storage',
  },
  {
    title: 'Lithium Motorcycle Batteries',
    subtitle: 'Starter battery class',
    description:
      'Lightweight high-CCA lithium batteries for motorcycles and scooters with low maintenance and long service life.',
    href: '/products?category=motorcycle',
    icon: Bike,
    category: 'motorcycle',
  },
  {
    title: '12V Series Lithium Batteries',
    subtitle: '12V application battery class',
    description:
      '12V lithium battery series for inverters, UPS, and multi-purpose deep-cycle usage across residential and small commercial setups.',
    href: '/products?category=12v-series',
    icon: Layers,
    category: '12v-series',
  },
]

export default async function LimacSiteProducts() {
  const products = await getProducts()

  const sectionItems = LIMAC_SITE_PRODUCTS.map((item) => ({
    ...item,
    imageUrl: products.find((product) => product.category === item.category && product.imageUrl)?.imageUrl,
  }))

  return (
    <section className="bg-limac-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Our Products"
          title="Limac Battery Classification"
          subtitle="Browse Limac batteries by application class with product visuals from the local catalog images."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sectionItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-gray-900 border border-gray-800 hover:border-limac-green/40 rounded-xl overflow-hidden card-hover group"
              >
                <div className="relative h-48 overflow-hidden border-b border-gray-800">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-limac-black" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-5 bottom-5 w-12 h-12 rounded-xl bg-limac-green/15 border border-limac-green/25 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={22} className="text-limac-green" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-limac-cyan text-xs uppercase tracking-wider mb-1">{item.subtitle}</p>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-limac-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-limac-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-limac-green hover:bg-green-400 text-limac-black font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
