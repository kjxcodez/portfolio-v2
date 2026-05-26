'use client';

import { PROJECTS } from '@/lib/data';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import type { InteractiveTarget } from './RPGScene';

interface ProjectOverlayProps {
  target: InteractiveTarget;
  onClose: () => void;
}

export function ProjectOverlay({ target, onClose }: ProjectOverlayProps) {
  // Query corresponding project record from central data
  const project = PROJECTS.find(p => p.id === target.data.id);

  if (!project) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-30 select-text">
      <div 
        className="w-full max-w-lg bg-zinc-950 border border-amber-500/20 rounded-xl p-5 shadow-2xl relative flex flex-col max-h-[75vh]"
        style={{
          boxShadow: '0 0 40px rgba(245, 158, 11, 0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-4 shrink-0 select-none">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">
            Project Terminal Connected
          </span>
          <button 
            onClick={onClose}
            className="text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 select-none">
              <div>
                <h2 className="text-base font-bold text-white leading-tight font-mono">{project.title}</h2>
                <span className="text-[10px] text-amber-400 font-mono mt-1 block">{project.year}</span>
              </div>
              
              {/* Asset Links */}
              <div className="flex items-center gap-2 shrink-0">
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span className="font-mono text-[10px] font-semibold">Demo</span>
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 transition-colors"
                  >
                    <GithubIcon size={12} />
                    <span className="font-mono text-[10px] font-semibold">Code</span>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed font-sans break-words">
              {project.longDescription}
            </p>

            {/* Tech Tags */}
            <div className="pt-2 select-none">
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono mb-2 block">Stack</span>
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400 font-medium font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Escape Bar */}
        <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono select-none shrink-0">
          <span>Target: {project.title}</span>
          <span>Press ESC or click ✕ to close</span>
        </div>
      </div>
    </div>
  );
}
