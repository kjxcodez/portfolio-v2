'use client'

import { useState } from 'react'
import { Clock, ExternalLink } from 'lucide-react'
import type { PostMeta } from '@/lib/mdx'

interface BlogAppProps {
  posts: PostMeta[]
}

export function BlogApp({ posts }: BlogAppProps) {
  const [selected, setSelected] = useState<PostMeta | null>(posts[0] ?? null)

  return (
    <div className="h-full flex overflow-hidden text-white">
      {/* Sidebar */}
      <div className="w-52 shrink-0 border-r border-white/10 overflow-y-auto bg-white/[0.02]">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Posts
        </div>
        {posts.map(post => (
          <button
            key={post.slug}
            onClick={() => setSelected(post)}
            className={`w-full text-left px-3 py-2.5 mx-1 mb-0.5 rounded-md transition-colors ${
              selected?.slug === post.slug
                ? 'bg-blue-500/20 text-blue-300'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <p className="text-xs font-medium leading-snug line-clamp-2">{post.title}</p>
            <p className="text-[10px] text-white/30 mt-1">{post.date}</p>
          </button>
        ))}
      </div>

      {/* Detail */}
      {selected && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {selected.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-base font-bold text-white mb-2 leading-snug">{selected.title}</h2>
          <p className="text-sm text-white/50 mb-3">{selected.description}</p>

          <div className="flex items-center gap-3 text-xs text-white/30 mb-5">
            <span>{selected.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {selected.readingTime}</span>
          </div>

          <a
            href={`/blog/${selected.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/30 hover:border-blue-400/50 px-3 py-1.5 rounded-lg"
          >
            <ExternalLink size={11} />
            Read full post
          </a>
        </div>
      )}
    </div>
  )
}
