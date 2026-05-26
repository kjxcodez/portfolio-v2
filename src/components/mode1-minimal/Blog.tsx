'use client';

import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

// Seed posts as fallback — these match the real MDX files
const SEED_POSTS: BlogPost[] = [
  {
    slug: 'building-products-taught-me-more-than-tutorials-did',
    title: 'Building Products Taught Me More Than Tutorials Did',
    description: 'I learned a lot from courses and tutorials, but building real products exposed problems that never show up in controlled learning environments.',
    date: '2026-05-26',
    readingTime: '5 min read',
    tags: ['Development', 'Learning', 'Products'],
  },
  {
    slug: 'things-i-underestimated-while-building-a-headless-cms',
    title: 'Things I Underestimated While Building a Headless CMS',
    description: 'I thought building a headless CMS mostly meant creating CRUD screens and APIs. I underestimated everything around the actual content itself.',
    date: '2026-05-26',
    readingTime: '6 min read',
    tags: ['Next.js', 'Backend', 'Architecture'],
  },
  {
    slug: 'why-i-built-a-programming-language-just-to-understand-programming-better',
    title: 'Why I Built a Programming Language Just to Understand Programming Better',
    description: 'Building Rune Lang was less about creating a new language and more about understanding what happens behind the code I write every day.',
    date: '2026-05-26',
    readingTime: '7 min read',
    tags: ['Python', 'Language Design', 'Learning'],
  },
];

interface BlogProps {
  posts?: BlogPost[];
}

export function Blog({ posts }: BlogProps) {
  const displayPosts = (posts && posts.length > 0) ? posts.slice(0, 3) : SEED_POSTS;

  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <div className="flex items-center justify-between w-full">
        <h2
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            color: 'var(--text-tertiary)',
          }}
        >
          Blog
        </h2>
        <a
          href="/blog"
          className="flex items-center gap-1 transition-colors"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
        >
          All posts <ArrowRight size={11} />
        </a>
      </div>

      <div className="flex flex-col w-full gap-3">
        {displayPosts.map((post, idx) => (
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="group flex items-start justify-between gap-4 p-4 rounded-xl transition-colors duration-150"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
            }}
          >
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium leading-snug transition-colors"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
              >
                {post.title}
              </p>
              <p
                className="text-xs mt-1 line-clamp-1"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
              >
                {post.description}
              </p>
              <div
                className="flex items-center gap-2 mt-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-tertiary)',
                }}
              >
                <span>{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Clock size={10} />
                  {post.readingTime}
                </span>
              </div>
            </div>
            <ArrowRight
              size={13}
              className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--text-tertiary)' }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
