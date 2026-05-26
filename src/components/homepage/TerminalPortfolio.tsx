'use client';

import dynamic from 'next/dynamic';
import type { PostMeta } from '@/lib/mdx';

interface TerminalPortfolioProps {
  posts?: PostMeta[];
}

// Dynamically load the client-only Terminal component to keep Mode 1 bundle size small
const TerminalWindow = dynamic(
  () => import('../mode4-terminal/TerminalWindow').then(mod => mod.TerminalWindow),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center font-mono text-sm text-emerald-500 bg-black animate-pulse">
        Initializing KAPIL OS v1.0 CLI environment...
      </div>
    )
  }
);

export function TerminalPortfolio({ posts }: TerminalPortfolioProps) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative z-10 select-none">
      <div 
        className="w-full max-w-4xl h-[75vh] bg-black/90 rounded-xl border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] backdrop-blur-xl relative overflow-hidden flex flex-col"
        style={{
          boxShadow: '0 0 50px -12px rgba(16, 185, 129, 0.25), inset 0 0 20px rgba(16, 185, 129, 0.05)'
        }}
      >
        {/* Terminal frame window controls and title */}
        <div className="h-10 bg-zinc-950/80 border-b border-emerald-500/10 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500/40 border border-red-500/20 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500/40 border border-yellow-500/20 rounded-full" />
            <div className="w-3 h-3 bg-emerald-500/40 border border-emerald-500/20 rounded-full" />
          </div>
          <span className="text-xs font-mono text-emerald-500/50">visitor@kapil-os: ~ (bash)</span>
          <div className="w-12" /> {/* spacing spacer */}
        </div>

        {/* Console canvas viewport */}
        <div className="flex-1 min-h-0 relative">
          <TerminalWindow posts={posts} />
        </div>
      </div>
    </main>
  );
}