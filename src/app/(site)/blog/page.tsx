import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import Badge from '@/components/common/Badge'
import { BLOG_POSTS_STATIC, BLOG_CATEGORIES } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

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

interface BlogPageProps {
  searchParams: { category?: string }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const selectedCategory = searchParams.category ?? 'all'

  const filteredPosts =
    selectedCategory === 'all'
      ? BLOG_POSTS_STATIC
      : BLOG_POSTS_STATIC.filter((p) => p.category === selectedCategory)

  const categoryEmoji: Record<string, string> = {
    'battery-tech': '🔋',
    'solar-storage': '☀️',
    'installation': '🔧',
    'news': '📰',
  }

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

      {/* Category filter */}
      <div className="sticky top-16 z-30 bg-limac-black/95 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto">
          <Link
            href="/blog"
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-limac-green text-limac-black'
                : 'border border-gray-700 text-limac-muted hover:text-white hover:border-gray-600'
            }`}
          >
            All Posts
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/blog?category=${cat.value}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
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

      {/* Posts grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-limac-muted">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-900 border border-gray-800 hover:border-limac-green/40 rounded-xl overflow-hidden card-hover group flex flex-col"
                >
                  <div className="h-44 bg-gradient-to-br from-gray-800 to-limac-black flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-limac-green/5 to-transparent" />
                    <div className="text-5xl">{categoryEmoji[post.category] ?? '📄'}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="muted" size="sm">
                        {BLOG_CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-limac-muted text-xs">
                        <Calendar size={11} />
                        {formatDate(post.publishedDate)}
                      </span>
                    </div>
                    <h2 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-limac-green transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h2>
                    <p className="text-limac-muted text-xs leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-limac-green hover:text-green-300 text-sm font-medium transition-colors"
                    >
                      Read More <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
