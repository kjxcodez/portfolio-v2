'use client';

import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'glass';
}

export function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
  void variant; // variant preserved for API compat — both now use design system surface

  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 p-5 rounded-lg transition-all duration-150"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div
        className="flex items-center gap-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.04em',
          color: 'var(--text-tertiary)',
        }}
      >
        <span>{post.date}</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={11} />
          {post.readingTime}
        </span>
      </div>

      <h3
        className="font-medium text-base leading-snug"
        style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
      >
        {post.title}
      </h3>

      <p
        className="text-sm leading-relaxed line-clamp-2"
        style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
      >
        {post.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.04em',
                color: 'var(--tag-text)',
                background: 'var(--tag-bg)',
                border: '1px solid var(--tag-border)',
                padding: '2px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight
          size={13}
          className="group-hover:translate-x-0.5 transition-transform"
          style={{ color: 'var(--text-tertiary)' }}
        />
      </div>
    </a>
  );
}
