import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import SectionHeader from '@/components/common/SectionHeader'
import Badge from '@/components/common/Badge'
import { BLOG_POSTS_STATIC } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

export default function LatestBlogPosts() {
  const posts = BLOG_POSTS_STATIC.slice(0, 3)

  const getCategoryEmoji = (category: string) => {
    if (category === 'battery-tech') return '🔋'
    if (category === 'installation') return '🔧'
    if (category === 'solar-storage') return '☀️'
    return '📰'
  }

  const getCategoryText = (category: string) => {
    if (category === 'battery-tech') return 'Battery Technology'
    if (category === 'installation') return 'Installation Guide'
    if (category === 'solar-storage') return 'Solar Storage'
    return 'News'
  }

  return (
    <section className="bg-limac-navy py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeader
            badge="Blog & Knowledge Base"
            title="Battery Insights &"
            highlight="Expert Guides"
            subtitle="Stay informed with the latest in LiFePO4 technology, solar storage, and installation guides."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-limac-green hover:text-green-300 font-medium text-sm transition-colors shrink-0 mb-12"
          >
            View All Posts <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-limac-black border border-gray-800 hover:border-limac-green/40 rounded-xl overflow-hidden card-hover group"
            >
              {/* Featured image placeholder */}
              <div className="h-44 bg-gradient-to-br from-gray-800 to-limac-black flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-limac-green/5 via-transparent to-limac-cyan/5" />
                <div className="relative text-center px-4">
                  <div className="text-4xl mb-2">
                    {getCategoryEmoji(post.category)}
                  </div>
                  <div className="text-limac-muted text-xs">
                    {getCategoryText(post.category)}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="muted" size="sm">
                    {getCategoryText(post.category)}
                  </Badge>
                  <span className="flex items-center gap-1 text-limac-muted text-xs">
                    <Calendar size={11} />
                    {formatDate(post.publishedDate)}
                  </span>
                </div>

                <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-limac-green transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-limac-muted text-xs leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-limac-green hover:text-green-300 text-sm font-medium transition-colors group-hover:gap-2"
                >
                  Read More <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
