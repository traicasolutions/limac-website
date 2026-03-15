'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Battery, Filter } from 'lucide-react'
import Badge from '@/components/common/Badge'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import type { Product } from '@/lib/types'

interface ProductsListClientProps {
  products: Product[]
}

export default function ProductsListClient({ products }: ProductsListClientProps) {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category') ?? 'all'

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  return (
    <>
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
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/products?category=${category.value}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-limac-green text-limac-black'
                  : 'border border-gray-700 text-limac-muted hover:text-white hover:border-gray-600'
              }`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-limac-muted text-sm mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && (
              <> in{' '}
                <span className="text-limac-green font-medium">
                  {PRODUCT_CATEGORIES.find((category) => category.value === selectedCategory)?.label}
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
                      {PRODUCT_CATEGORIES.find((category) => category.value === product.category)?.label ?? product.category}
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
    </>
  )
}
