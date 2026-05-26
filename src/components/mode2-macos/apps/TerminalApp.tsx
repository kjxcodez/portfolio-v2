'use client';

import { TerminalWindow } from '../../mode4-terminal/TerminalWindow';
import type { PostMeta } from '@/lib/mdx';

interface TerminalAppProps {
  posts?: PostMeta[];
}

export function TerminalApp({ posts }: TerminalAppProps) {
  return (
    <div className="w-full h-full bg-zinc-950 text-white overflow-hidden relative">
      <TerminalWindow posts={posts} />
    </div>
  );
}
