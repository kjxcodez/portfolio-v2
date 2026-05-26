'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { User, FolderOpen, Terminal, FileText } from 'lucide-react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Window } from './Window';
import { useWindowStore } from '@/lib/window-store';
import type { PostMeta } from '@/lib/mdx';
import { MobileDesktop } from './MobileDesktop';
import { RESUME_URL } from '@/lib/data';

interface DesktopProps {
  posts: PostMeta[];
}

// Dynamic lazy imports to isolate bundle weights from Mode 1
const AboutApp = dynamic(() => import('./apps/AboutApp').then(m => m.AboutApp), { ssr: false });
const ProjectsApp = dynamic(() => import('./apps/ProjectsApp').then(m => m.ProjectsApp), { ssr: false });
const TerminalApp = dynamic(() => import('./apps/TerminalApp').then(m => m.TerminalApp), { ssr: false });

export function Desktop({ posts }: DesktopProps) {
  const { openWindow, focusWindow, windows } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);
  const [animateIntro, setAnimateIntro] = useState(false);

  // Resize checker
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Launch About app on first mount (if not already opened)
  useEffect(() => {
    if (!windows.about.isOpen) {
      openWindow('about');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Checking LocalStorage for First-Time Intro Animation Seen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('kapil-os-intro-seen');
      if (!seen) {
        setAnimateIntro(true);
        localStorage.setItem('kapil-os-intro-seen', 'true');
      }
    }
  }, []);

  // Keyboard Escape triggers: close the currently focused active window for full accessibility compliance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Safeguard: Check if the user is currently typing in an input or textarea
        const active = document.activeElement;
        if (
          active &&
          (active instanceof HTMLInputElement ||
           active instanceof HTMLTextAreaElement ||
           active.tagName === 'INPUT' ||
           active.tagName === 'TEXTAREA')
        ) {
          // Allow the input to lose focus / blur first, keeping terminal usability intact
          (active as HTMLElement).blur();
          return;
        }

        const { activeWindow, closeWindow } = useWindowStore.getState();
        if (activeWindow) {
          closeWindow(activeWindow);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isMobile) {
    return <MobileDesktop posts={posts} />;
  }

  // Get animation delays (0ms if seen before)
  const getDelay = (d: number) => (animateIntro ? d : 0);

  const desktopIcons = [
    { id: 'about' as const,    label: 'About.app',    Icon: User,       color: 'from-blue-500 to-indigo-600', isPdf: false },
    { id: 'projects' as const, label: 'Projects.app', Icon: FolderOpen, color: 'from-amber-400 to-orange-500', isPdf: false },
    { id: 'terminal' as const, label: 'Terminal.app', Icon: Terminal,   color: 'from-zinc-800 to-zinc-950 border border-white/10', isPdf: false },
    { id: 'resume' as const,   label: 'Resume.pdf',   Icon: FileText,   color: 'from-red-500 to-rose-600', isPdf: true },
  ];

  const handleIconDoubleClick = (icon: typeof desktopIcons[0]) => {
    if (icon.isPdf) {
      if (typeof window !== 'undefined') {
        window.open(RESUME_URL, '_blank');
      }
    } else {
      const win = windows[icon.id as 'about' | 'projects' | 'terminal'];
      if (!win.isOpen) {
        openWindow(icon.id as 'about' | 'projects' | 'terminal');
      } else {
        focusWindow(icon.id as 'about' | 'projects' | 'terminal');
      }
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ paddingTop: 28 }}>
      {/* Custom Mesh Gradient Wallpaper */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animateIntro ? 0.5 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-black select-none pointer-events-none -z-10"
      >
        {/* Subtle mesh grid overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing blur accents */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" />

        {/* Brand K Watermark */}
        <div className="absolute inset-0 flex items-center justify-center font-sans">
          <span className="text-[26vw] font-black text-white/[0.02] tracking-tighter drop-shadow-[0_0_80px_rgba(255,255,255,0.01)] select-none">
            K
          </span>
        </div>
      </motion.div>

      {/* Top Menu Bar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: getDelay(0.3), duration: 0.3 }}
      >
        <MenuBar />
      </motion.div>

      {/* Desktop shortcuts icons row on the right */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: getDelay(0.6), duration: 0.3 }}
        className="absolute top-12 right-6 flex flex-col gap-5 z-20"
      >
        {desktopIcons.map(icon => (
          <div
            key={icon.label}
            onDoubleClick={() => handleIconDoubleClick(icon)}
            className="w-18 flex flex-col items-center gap-1.5 p-1.5 rounded-xl border border-transparent hover:bg-white/5 hover:border-white/5 active:bg-white/10 select-none cursor-pointer transition-all group"
            title="Double-click to open"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${icon.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
              <icon.Icon size={18} className="text-white" />
            </div>
            <span 
              className="text-[9px] font-mono text-center font-semibold drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)] text-zinc-300 group-hover:text-white leading-tight break-all"
            >
              {icon.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Workspace Area - bounds for drag-and-resize Rnd container */}
      <div className="relative w-full h-full p-4 pointer-events-none" id="desktop-area">
        <div className="w-full h-full relative pointer-events-auto">
          <Window id="about">
            <AboutApp />
          </Window>
          <Window id="projects">
            <ProjectsApp />
          </Window>
          <Window id="terminal">
            <TerminalApp posts={posts} />
          </Window>
        </div>
      </div>

      {/* Subtle Dock */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: getDelay(0.8), duration: 0.3 }}
      >
        <Dock />
      </motion.div>
    </div>
  );
}
