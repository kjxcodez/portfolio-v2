'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PROJECTS } from '@/lib/data';
import type { Project } from '@/types/portfolio';
import { trackEvent } from '@/lib/analytics';

export function ProjectsApp() {
  const [activeCategory, setActiveCategory] = useState<'featured' | 'all'>('featured');
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const filteredProjects = PROJECTS.filter(p => {
    if (activeCategory === 'featured') return p.featured;
    return true; // 'all'
  });

  // Sync selection if the currently selected project is filtered out
  useEffect(() => {
    if (filteredProjects.length > 0 && !filteredProjects.some(p => p.id === selected.id)) {
      setSelected(filteredProjects[0]);
    }
  }, [activeCategory, filteredProjects, selected]);

  return (
    <div className="h-full flex overflow-hidden text-white font-sans select-none">
      {/* 1. Left Sidebar: Category Selectors */}
      <div className="hidden md:flex w-40 shrink-0 border-r border-white/10 overflow-y-auto bg-zinc-950/40 p-2.5 flex-col gap-1">
        <div className="px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-zinc-500 mb-1">
          Explore
        </div>
        <button
          onClick={() => setActiveCategory('featured')}
          className={`w-full text-left px-2.5 py-1.5 text-xs flex items-center gap-2 transition-colors rounded-lg ${
            activeCategory === 'featured'
              ? 'bg-blue-500/20 text-blue-300 font-semibold'
              : 'text-zinc-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span>★</span>
          <span className="truncate">Featured</span>
        </button>
        <button
          onClick={() => setActiveCategory('all')}
          className={`w-full text-left px-2.5 py-1.5 text-xs flex items-center gap-2 transition-colors rounded-lg ${
            activeCategory === 'all'
              ? 'bg-blue-500/20 text-blue-300 font-semibold'
              : 'text-zinc-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span>📁</span>
          <span className="truncate">All Projects</span>
        </button>
      </div>

      {/* 2. Center Area: Project Cards Grid */}
      <div className={`flex-1 overflow-y-auto p-4 border-r border-white/10 bg-zinc-900/10 ${mobileDetailOpen ? 'hidden md:block' : 'block'}`}>
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3 select-none">
          {activeCategory === 'featured' ? 'Featured Items' : 'All Work'}
        </h3>
        <div className="flex flex-col gap-2.5">
          {filteredProjects.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setSelected(p);
                setMobileDetailOpen(true);
                try {
                  trackEvent('project_open', { projectId: p.id, source: 'Kapil OS' });
                } catch (e) {}
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                selected.id === p.id
                  ? 'bg-blue-500/15 border-blue-500/40 shadow-lg'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs leading-tight text-white">{p.title}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{p.year}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                {p.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Right Panel: Dynamic Details Sheet */}
      <div className={`overflow-y-auto p-5 bg-zinc-950/20 flex flex-col select-text ${mobileDetailOpen ? 'w-full flex' : 'hidden md:flex md:w-64 md:shrink-0'}`}>
        {selected ? (
          <>
            {/* Mobile Back Button */}
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="md:hidden flex items-center gap-1 text-xs text-blue-400 font-semibold mb-4 focus:outline-none active:opacity-75 cursor-pointer self-start"
            >
              <span>←</span> Back to list
            </button>

            <div className="flex items-start justify-between gap-4 mb-4 select-none">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-white leading-tight break-words">{selected.title}</h2>
                <span className="text-[10px] text-blue-400 mt-1 font-mono block">{selected.year}</span>
              </div>
              
              {/* Asset Links */}
              <div className="flex items-center gap-1.5 shrink-0">
                {selected.url && (
                  <a 
                    href={selected.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
                {selected.github && (
                  <a 
                    href={selected.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-colors"
                    title="Source Code"
                  >
                    <GithubIcon size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Scrollable Description */}
            <div className="text-xs text-white/75 leading-relaxed mb-4 break-words">
              {selected.longDescription}
            </div>

            {/* Tech Stack */}
            <div className="mt-auto select-none pt-3 border-t border-white/10">
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block">Tech Stack</span>
              <div className="flex flex-wrap gap-1">
                {selected.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-zinc-500">
            Select a project to view details
          </div>
        )}
      </div>
    </div>
  );
}
