'use client';

import { useEffect, useState } from 'react';
import { useWindowStore } from '@/lib/window-store';
import { Wifi, Battery, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function MenuBar() {
  const [time, setTime] = useState('');
  const activeWindow = useWindowStore((s) => s.activeWindow);
  const windows = useWindowStore((s) => s.windows);
  const { theme, setTheme } = useTheme();

  // 10s ticking clock
  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  const activeTitle = activeWindow ? windows[activeWindow]?.title : 'Finder';

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-7 px-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 text-white/80 text-xs select-none">
      {/* Left side: K Branding Logo & Active App title */}
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-[13px] text-blue-400 leading-none drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">K</span>
        <span className="text-white/20 font-light select-none">|</span>
        <span className="font-semibold text-white/90">{activeTitle}</span>
      </div>

      {/* Right side: System info & Light/Dark Theme toggle */}
      <div className="flex items-center gap-3.5">
        {/* Dynamic theme switcher */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-white/70 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={12.5} /> : <Moon size={12.5} />}
        </button>

        <span className="text-white/10 font-light select-none">|</span>

        {/* Network & Battery Status icons */}
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
