'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { User, FolderOpen, Terminal } from 'lucide-react';
import { useWindowStore, WindowId } from '@/lib/window-store';

interface AppConfig {
  id: WindowId;
  label: string;
  Icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
}

const APPS: AppConfig[] = [
  { id: 'about',    label: 'About',    Icon: User,       color: 'from-blue-500 to-indigo-600' },
  { id: 'projects', label: 'Projects', Icon: FolderOpen, color: 'from-amber-400 to-orange-500' },
  { id: 'terminal', label: 'Terminal', Icon: Terminal,   color: 'from-zinc-800 to-zinc-950 border border-white/10' },
];

const BASE_SIZE = 48;
const MAX_SIZE = 58; // Capped at exactly ~1.20x magnification
const MAGNIFY_RADIUS = 80;

export function Dock() {
  const { windows, openWindow, focusWindow, activeWindow } = useWindowStore();
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(e.clientX - rect.left);
  }

  function getScale(index: number): number {
    if (mouseX === null) return 1;
    const iconCenter = index * (BASE_SIZE + 12) + BASE_SIZE / 2;
    const dist = Math.abs(mouseX - iconCenter);
    if (dist > MAGNIFY_RADIUS) return 1;
    return 1 + ((1 - dist / MAGNIFY_RADIUS) * (MAX_SIZE / BASE_SIZE - 1));
  }

  function handleClick(id: WindowId) {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      focusWindow(id);
    } else {
      focusWindow(id);
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] select-none pointer-events-auto">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
        className="flex items-end gap-3 px-4 py-2.5 bg-zinc-900/70 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl shadow-black/80"
      >
        {APPS.map((app, i) => {
          const scale = getScale(i);
          const win = windows[app.id];

          return (
            <div key={app.id} className="relative flex flex-col items-center group" style={{ width: BASE_SIZE }}>
              <motion.button
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={() => handleClick(app.id)}
                style={{ width: BASE_SIZE, height: BASE_SIZE, originY: 1 }}
                className={`rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
                aria-label={`Open ${app.label}`}
              >
                <app.Icon size={20} className="text-white" />
              </motion.button>

              {/* Active indicator dot */}
              {win.isOpen && (
                <span 
                  className={`absolute -bottom-1.5 rounded-full transition-all duration-200 ${
                    win.isOpen && !win.isMinimized && activeWindow === app.id
                      ? 'w-1.5 h-1.5 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                      : win.isOpen && !win.isMinimized && activeWindow !== app.id
                      ? 'w-1 h-1 bg-white/60'
                      : 'w-1 h-1 bg-white/20'
                  }`} 
                />
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-zinc-950/90 text-white text-[10px] font-mono rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/5">
                {app.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
