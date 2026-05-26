'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, FolderOpen, Terminal, Wifi, Battery, ChevronLeft } from 'lucide-react';
import { useWindowStore, WindowId } from '@/lib/window-store';
import { AboutApp } from './apps/AboutApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { TerminalApp } from './apps/TerminalApp';
import type { PostMeta } from '@/lib/mdx';

interface MobileDesktopProps {
  posts: PostMeta[];
}

export function MobileDesktop({ posts }: MobileDesktopProps) {
  const { windows, openWindow, closeWindow, focusWindow, activeWindow } = useWindowStore();
  const [time, setTime] = useState('');

  // Clock tick
  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  const appsList: { id: WindowId; label: string; Icon: typeof User; color: string }[] = [
    { id: 'about',    label: 'About',    Icon: User,       color: 'from-blue-500 to-indigo-600' },
    { id: 'projects', label: 'Projects', Icon: FolderOpen, color: 'from-amber-400 to-orange-500' },
    { id: 'terminal', label: 'Terminal', Icon: Terminal,   color: 'from-zinc-800 to-zinc-950 border border-white/10' },
  ];

  const handleAppClick = (id: WindowId) => {
    openWindow(id);
  };

  const getActiveAppNode = () => {
    if (!activeWindow) return null;
    const activeWin = windows[activeWindow];
    if (!activeWin.isOpen) return null;

    switch (activeWindow) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'terminal':
        return <TerminalApp posts={posts} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col overflow-hidden bg-gradient-to-b from-purple-950 via-zinc-950 to-black select-none text-white z-0">
      {/* 1. Mobile Status Bar */}
      <div className="h-9 px-4 shrink-0 flex items-center justify-between text-[11px] font-medium text-white/90 bg-black/10 select-none z-10">
        <div className="flex items-center gap-1">
          <span className="font-semibold tracking-wide">Portfolio</span>
          <Wifi size={11} className="text-white/80" />
        </div>
        <div className="font-semibold">{time}</div>
        <div className="flex items-center gap-1">
          <span className="font-mono scale-90">100%</span>
          <Battery size={13} className="text-white/80" />
        </div>
      </div>

      {/* 2. App Grid */}
      <div className="flex-1 px-6 py-6 flex flex-col justify-start">
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 w-full max-w-sm mx-auto">
          {appsList.map(app => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
            >
              <motion.div 
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg`}
              >
                <app.Icon size={24} className="text-white" />
              </motion.div>
              <span className="text-[11px] font-medium text-white/85 text-center truncate w-full">
                {app.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Bottom persistent iOS Dock */}
      <div className="px-6 pb-6 shrink-0 flex justify-center">
        <div className="w-full max-w-xs h-20 bg-zinc-900/50 backdrop-blur-2xl border border-white/5 rounded-3xl flex items-center justify-around px-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {appsList.map(app => {
            const win = windows[app.id];
            const isRunning = win.isOpen;

            return (
              <button
                key={`dock-${app.id}`}
                onClick={() => handleAppClick(app.id)}
                className="relative flex flex-col items-center focus:outline-none cursor-pointer"
              >
                <motion.div 
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-md`}
                >
                  <app.Icon size={20} className="text-white" />
                </motion.div>
                {/* Active indicator dot */}
                {isRunning && (
                  <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white/70" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. FullScreen App Overlay with smooth slide-up transition */}
      <AnimatePresence>
        {activeWindow && windows[activeWindow].isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="absolute inset-0 w-full h-full bg-zinc-950/95 backdrop-blur-3xl z-40 flex flex-col"
          >
            {/* Overlay Status Bar */}
            <div className="h-9 px-4 shrink-0 flex items-center justify-between text-[11px] font-medium text-zinc-400 bg-black/10 select-none">
              <div className="flex items-center gap-1">
                <span>Portfolio</span>
                <Wifi size={11} className="text-zinc-500" />
              </div>
              <div className="font-semibold text-zinc-300">{time}</div>
              <div className="flex items-center gap-1">
                <span className="font-mono scale-90 text-[10px]">100%</span>
                <Battery size={13} className="text-zinc-500" />
              </div>
            </div>

            {/* Overlay Navigation Bar */}
            <div className="h-11 border-b border-white/5 flex items-center justify-between px-3 shrink-0 bg-zinc-900/40 select-none">
              <button
                onClick={() => closeWindow(activeWindow)}
                className="flex items-center gap-0.5 text-xs text-blue-400 font-semibold focus:outline-none active:opacity-70 cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Home</span>
              </button>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {windows[activeWindow].title}
              </span>
              <div className="w-12" /> {/* balance spacer */}
            </div>

            {/* Application content view */}
            <div className="flex-1 min-h-0 overflow-hidden bg-zinc-900/10">
              {getActiveAppNode()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
