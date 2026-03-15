import type { Metadata } from 'next'
import { Suspense } from 'react'
import BlogListClient from '@/components/blog/BlogListClient'

export const metadata: Metadata = {
  title: 'Blog & Knowledge Base',
  description:
    'Expert guides, technology comparisons, and installation tips for LiFePO4 batteries in Kerala. Learn about solar storage, battery technology, and more from Limac.',
  openGraph: {
    title: 'Battery Blog & Knowledge Base | Limac Power Tech',
    description: 'LiFePO4 battery guides, solar storage tips, and industry insights from Limac Power Tech, Kerala.',
    images: [{ url: '/og-image.jpg' }],
    siteName: 'Limac Power Tech',
  },
}

export default function BlogPage() {
  return (
    <div className="bg-limac-black pt-24">
      {/* Header */}
      <section className="py-12 px-4 border-b border-gray-800 bg-limac-navy">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block bg-limac-green/10 border border-limac-green/30 text-limac-green text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Battery Insights &{' '}
            <span className="gradient-text">Expert Guides</span>
          </h1>
          <p className="text-limac-muted text-lg max-w-2xl">
            Learn everything about LiFePO4 batteries, solar storage, and clean energy
            from Kerala&apos;s battery specialists.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 px-4 text-center text-limac-muted">Loading posts…</div>}>
        <BlogListClient />
      </Suspense>
    </div>
  )
}
