'use client';

import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

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

export function Blog() {
  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-sm">BLOG</h2>
        <a href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
          All posts <ArrowRight size={11} />
        </a>
      </div>

      <div className="flex flex-col w-full gap-2">
        {SEED_POSTS.map((post, idx) => (
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="group flex items-start justify-between gap-4 p-3 border rounded-xl dark:bg-black/70 hover:dark:bg-zinc-950 hover:bg-slate-50 hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium group-hover:underline leading-snug">{post.title}</p>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{post.description}</p>
              <div className="flex items-center gap-2 text-[11px] text-zinc-600 mt-1.5">
                <span>{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Clock size={10} />
                  {post.readingTime}
                </span>
              </div>
            </div>
            <ArrowRight size={13} className="shrink-0 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all mt-1" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
