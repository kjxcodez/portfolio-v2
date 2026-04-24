'use client';

import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'glass';
}

export function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
  const base =
    variant === 'glass'
      ? 'group flex flex-col gap-3 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-colors'
      : 'group flex flex-col gap-3 p-5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors';

  return (
    <a href={`/blog/${post.slug}`} className={base}>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span>{post.date}</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={11} />
          {post.readingTime}
        </span>
      </div>

      <h3 className="text-white font-semibold text-base leading-snug group-hover:text-zinc-200 transition-colors">
        {post.title}
      </h3>

      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{post.description}</p>

      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight
          size={14}
          className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </a>
  );
}
