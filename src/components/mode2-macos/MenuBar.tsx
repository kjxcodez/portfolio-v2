'use client';

import { useEffect, useRef, useState } from 'react';
import { useWindowStore } from '@/lib/window-store';
import { Wifi, Battery, Sun, Moon, Layers, ChevronDown, BookOpen, FolderOpen, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { useModeContext } from '@/components/shared/ModeProvider';
import { MODE_LABELS, MODE_DESCRIPTIONS, PortfolioMode } from '@/store/mode-store';
import Link from 'next/link';

export function MenuBar() {
  const [time, setTime] = useState('');
  const [modeOpen, setModeOpen] = useState(false);
  const activeWindow = useWindowStore((s) => s.activeWindow);
  const windows = useWindowStore((s) => s.windows);
  const { theme, setTheme } = useTheme();
  const { mode, setMode, isTransitioning } = useModeContext();
  const modeRef = useRef<HTMLDivElement>(null);
  const modes: PortfolioMode[] = [1, 2, 3, 4];

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    }
    if (modeOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [modeOpen]);

  const activeTitle = activeWindow ? windows[activeWindow]?.title : 'Finder';

  const navLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-7 px-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 text-white/80 text-xs select-none">
      {/* Left: K brand | nav links | active window title */}
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-[13px] text-blue-400 leading-none drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">K</span>
        <span className="text-white/20 font-light select-none">|</span>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-white/60 hover:text-white transition-colors duration-150 text-[11px]">
            {link.label}
          </Link>
        ))}
        <span className="text-white/20 font-light select-none">|</span>
        <span className="font-semibold text-white/90">{activeTitle}</span>
      </div>

      {/* Right: mode switcher | theme | wifi | battery | clock */}
      <div className="flex items-center gap-3.5">

        {/* Mode switcher */}
        <div ref={modeRef} className="relative">
          <button
            onClick={() => setModeOpen(!modeOpen)}
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Switch Mode"
          >
            <Layers size={11} />
            <span className="hidden sm:inline text-[11px]">{MODE_LABELS[mode]}</span>
            <ChevronDown size={9} className={`transition-transform duration-150 ${modeOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {modeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1.5 w-52 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl"
              >
                {modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setModeOpen(false); }}
                    disabled={isTransitioning}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${m === mode ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0 ${m === mode ? 'text-white' : 'bg-white/5 text-zinc-500'}`}
                      style={m === mode ? { background: 'var(--accent)' } : {}}
                    >
                      {m}
                    </span>
                    <div>
                      <p className="text-[12px] font-medium leading-none mb-0.5">{MODE_LABELS[m]}</p>
                      <p className="text-[10px] text-zinc-500 leading-none">{MODE_DESCRIPTIONS[m]}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="text-white/10 font-light select-none">|</span>

        {/* Theme toggle */}
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-white/70 hover:text-white p-0.5 rounded transition-colors cursor-pointer" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={12.5} /> : <Moon size={12.5} />}
        </button>

        <span className="text-white/10 font-light select-none">|</span>

        {/* Network & Battery */}
        <div className="flex items-center gap-2">
          <Wifi size={12} className="text-white/70" />
          <div className="flex items-center gap-1 font-mono text-[10px] text-white/70">
            <Battery size={13} strokeWidth={1.5} />
            <span>100%</span>
          </div>
        </div>

        <span className="text-white/10 font-light select-none">|</span>

        {/* Clock */}
        <span className="text-white/80 tabular-nums font-mono text-[11px]">{time}</span>
      </div>
    </div>
  );
}
