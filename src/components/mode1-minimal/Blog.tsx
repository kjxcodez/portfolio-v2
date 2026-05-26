'use client';

import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

// Seed posts as fallback — these match the real MDX files
const SEED_POSTS: BlogPost[] = [
  {
    slug: 'building-rune-lang',
    title: 'Building Rune Lang: A Programming Language From Scratch',
    description: 'Lexer, parser, AST, and tree-walk interpreter — all in Python.',
    date: '2024-11-15',
    readingTime: '12 min read',
    tags: ['Python', 'Language Design', 'Compilers'],
  },
  {
    slug: 'percept-ui-story',
    title: 'Lessons From Creating an Open Source React Component Library',
    description: 'API design, npm publishing, DX trade-offs, and growing a community.',
    date: '2024-12-01',
    readingTime: '8 min read',
    tags: ['React', 'Open Source', 'TypeScript'],
  },
  {
    slug: 'open-source-journey',
    title: 'My First 10 Merged PRs and What I Learned',
    description: 'What worked, what got rejected, and habits that made me a better collaborator.',
    date: '2025-01-10',
    readingTime: '6 min read',
    tags: ['Open Source', 'Git', 'Career'],
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
