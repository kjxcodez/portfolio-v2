import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/mdx'
import { Clock, ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Blog — Kapil Kumar Jangid' }

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen bg-[var(--bg-base)]">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs transition-colors mb-6 text-muted-foreground hover:text-[var(--text-secondary)]"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          <ArrowLeft size={12} /> Back to portfolio
        </Link>
        <p
          className="uppercase mb-1 text-muted-foreground"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
          }}
        >
          Writing
        </p>
        <h1
          className="text-2xl font-bold text-(--text-primary)"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Blog
        </h1>
        <p
          className="text-sm mt-1 text-muted-foreground"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {posts.length} posts about building things
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 p-4 rounded-xl transition-all duration-200 border border bg-(--bg-surface) hover:border-[var(--border-strong)] hover:bg-(--bg-elevated)]"
          >
            {post.cover && (
              <div className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border border">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={96}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2
                className="text-sm font-semibold group-hover:underline leading-snug text-(--text-primary)"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {post.title}
              </h2>
              <p
                className="text-xs mt-1 line-clamp-2 text-[var(--text-secondary)]"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {post.description}
              </p>
              <div
                className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span>{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Clock size={10} />
                  {post.readingTime}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded border border-[var(--tag-border)] bg-[var(--tag-bg)] text-[var(--tag-text)]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.04em',
                      padding: '1px 6px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
