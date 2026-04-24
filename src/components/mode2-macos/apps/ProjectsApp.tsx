'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/shared/icons'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/types/portfolio'

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project>(PROJECTS[0])

  return (
    <div className="h-full flex overflow-hidden text-white">
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-white/10 overflow-y-auto bg-white/[0.02]">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Projects
        </div>
        {PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors rounded-md mx-1 mb-0.5 ${
              selected.id === p.id
                ? 'bg-blue-500/20 text-blue-300'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-base leading-none">📁</span>
            <span className="truncate">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-white">{selected.title}</h2>
            <p className="text-xs text-white/40 mt-0.5">{selected.year}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {selected.url && (
              <a href={selected.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-white/60 hover:text-white px-2 py-1 rounded-md border border-white/10 hover:border-white/20 transition-colors">
                <ExternalLink size={11} /> Demo
              </a>
            )}
            {selected.github && (
              <a href={selected.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-white/60 hover:text-white px-2 py-1 rounded-md border border-white/10 hover:border-white/20 transition-colors">
                <GithubIcon size={11} /> Code
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-white/70 leading-relaxed mb-5">{selected.longDescription}</p>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {selected.tags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
