'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useModeStore } from '@/store/mode-store';
import type { PostMeta } from '@/lib/mdx';

// Dynamically import the client-side Phaser component with SSR disabled
const RPGGame = dynamic(
  () => import('../mode3-rpg/RPGGame').then((mod) => mod.RPGGame).catch(err => {
    import('@/lib/error-monitoring').then(m => m.trackDynamicImportFailure('RPGGame', err));
    throw err;
  }),
  {
    ssr: false,
    loading: () => (
      <div 
        className="w-[800px] h-[600px] bg-zinc-950/40 border border-emerald-500/20 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center font-mono text-xs text-zinc-500 gap-4 shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: '0 0 50px rgba(16, 185, 129, 0.08)'
        }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="animate-pulse tracking-widest text-[10px] uppercase font-bold text-emerald-400">Initializing RPG Engine...</span>
      </div>
    ),
  }
);

interface RPGPortfolioProps {
  posts?: PostMeta[];
}

export function RPGPortfolio({ posts = [] }: RPGPortfolioProps) {
  const { setMode } = useModeStore();
  const [isMobile, setIsMobile] = useState(false);
  const [forceLaunch, setForceLaunch] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Phaser canvas dimensions are 800x600. A viewport width of < 840px starts wrapping/truncating.
      // Therefore, viewport widths < 1024px represent the mobile/tablet pre-guard warning trigger.
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive guard warning interface for mobile/tablet screens
  if (isMobile && !forceLaunch) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 relative py-12 select-none">
        {/* Abstract cyber background */}
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-950 border border-emerald-500/25 rounded-2xl p-6 shadow-2xl relative text-center flex flex-col gap-6"
             style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)' }}>
          
          {/* Neon warning icon */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center shadow-lg relative group">
            <span className="text-2xl animate-pulse select-none">🎮</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold font-mono text-white tracking-tight">
              RPG Mode works best on desktop
            </h1>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm mx-auto font-sans">
              This interactive world is built for keyboard movement (WASD / Arrows) and is optimized for larger displays.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5 pt-2 font-mono">
            <button
              onClick={() => setForceLaunch(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-emerald-500/10"
            >
              Continue Anyway
            </button>
            <button
              onClick={() => setMode(1)}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold hover:text-white hover:bg-zinc-850 active:scale-[0.98] transition-all cursor-pointer"
            >
              Switch to Professional
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Large screen rendering layout (Centering the game window with high premium layout)
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />
      
      {/* Phaser Canvas Wrap */}
      <div className="relative animate-fade-in">
        <RPGGame posts={posts} />
      </div>
    </main>
  );
}