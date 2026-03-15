import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Battery, Filter } from 'lucide-react'
import Badge from '@/components/common/Badge'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { getProducts } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Explore Limac Power Tech\'s full range of LiFePO4 batteries — solar storage, motorcycle starters, 12V deep cycle, and lighting batteries. Best prices in Kerala.',
  openGraph: {
    title: 'LiFePO4 Battery Products | Limac Power Tech Kerala',
    description: 'Premium lithium iron phosphate batteries for every application. Solar storage, motorcycles, inverters and more.',
    images: [{ url: '/og-image.jpg' }],
    siteName: 'Limac Power Tech',
  },
}

interface ProductsPageProps {
  searchParams: { category?: string }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const selectedCategory = searchParams.category ?? 'all'

  return <ProductsContent selectedCategory={selectedCategory} />
}

async function ProductsContent({ selectedCategory }: { selectedCategory: string }) {
  const products = await getProducts()
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="bg-limac-black pt-24">
      {/* Page header */}
      <section className="py-12 px-4 border-b border-gray-800 bg-limac-navy">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block bg-limac-green/10 border border-limac-green/30 text-limac-green text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Product Catalogue
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            LiFePO4 <span className="gradient-text">Battery Range</span>
          </h1>
          <p className="text-limac-muted text-lg max-w-2xl">
            Premium lithium iron phosphate batteries engineered for South India&apos;s climate.
            All batteries include built-in BMS protection and genuine warranty.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[64px] z-30 bg-limac-black/95 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto pb-0.5">
          <Filter size={15} className="text-limac-muted shrink-0" />
          <Link
            href="/products"
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-limac-green text-limac-black'
                : 'border border-gray-700 text-limac-muted hover:text-white hover:border-gray-600'
            }`}
          >
            All Products
          </Link>
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.value
                  ? 'bg-limac-green text-limac-black'
                  : 'border border-gray-700 text-limac-muted hover:text-white hover:border-gray-600'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-limac-muted text-sm mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && (
              <> in{' '}
                <span className="text-limac-green font-medium">
                  {PRODUCT_CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                </span>
              </>
            )}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Battery size={48} className="text-gray-700 mx-auto mb-4" />
              <p className="text-limac-muted">No products found in this category.</p>
              <Link href="/products" className="text-limac-green hover:underline text-sm mt-2 inline-block">
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 border border-gray-800 hover:border-limac-green/50 rounded-2xl p-5 card-hover group flex flex-col overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="green" size="sm">
                      {PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label ?? product.category}
                    </Badge>
                    {product.featured && <Badge variant="cyan" size="sm">Featured</Badge>}
                  </div>

                  <div className="relative h-44 bg-gradient-to-br from-gray-800 to-limac-black rounded-xl border border-gray-800 mb-5 flex items-center justify-center group-hover:border-limac-green/20 transition-colors overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.imageAlt || product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-center">
                        <Battery size={36} className="text-limac-green/50 mx-auto mb-1" />
                        <div className="text-limac-green text-sm font-bold">
                          {product.specsGroup.voltage} · {product.specsGroup.capacity}
                        </div>
                      </div>
                    )}
                  </div>

                  <h2 className="text-white font-bold text-base mb-2 leading-tight group-hover:text-limac-green transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-limac-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {product.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-black/50 rounded-lg p-2 border border-gray-800">
                      <div className="text-limac-muted text-[10px]">Cycle Life</div>
                      <div className="text-white text-xs font-semibold">{product.specsGroup.cycleLife}</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-2 border border-gray-800">
                      <div className="text-limac-muted text-[10px]">Warranty</div>
                      <div className="text-white text-xs font-semibold">{product.specsGroup.warranty}</div>
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 border border-limac-green/40 text-limac-green hover:bg-limac-green hover:text-limac-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
