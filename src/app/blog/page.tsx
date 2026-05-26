import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/mdx'
import { Clock, ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Blog — Kapil Kumar Jangid' }

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6">
          <ArrowLeft size={12} /> Back to portfolio
        </Link>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Writing</p>
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="text-sm text-zinc-500 mt-1">{posts.length} posts about building things</p>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 p-4 border rounded-xl dark:bg-black/70 hover:dark:bg-zinc-950 hover:bg-slate-50 hover:scale-[1.01] transition-all duration-200"
          >
            {post.cover && (
              <div className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border dark:border-zinc-800">
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
              <h2 className="text-sm font-semibold group-hover:underline leading-snug">{post.title}</h2>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-600">
                <span>{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5"><Clock size={10} />{post.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full border dark:border-zinc-800 dark:text-zinc-500">
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
