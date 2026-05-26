'use client';

import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

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
  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 3) : SEED_POSTS;

  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="uppercase font-mono [font-size:var(--text-xs)] tracking-[0.1em] text-muted-foreground">
          Blog
        </h2>
        <a
          href="/blog"
          className="flex items-center gap-1 transition-colors font-mono [font-size:var(--text-xs)] text-muted-foreground hover:text-[var(--text-secondary)]"
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
            className="group flex items-start justify-between gap-4 p-4 rounded-xl transition-colors duration-150 bg-(--bg-surface) border border hover:border-[var(--border-strong)]"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug font-ui text-(--text-primary)">
                {post.title}
              </p>
              <p className="text-xs mt-1 line-clamp-1 font-ui text-[var(--text-secondary)]">
                {post.description}
              </p>
              <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-muted-foreground">
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
              className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 text-muted-foreground"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
