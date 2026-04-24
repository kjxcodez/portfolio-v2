'use client'

import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'
import { PERSONAL, PROJECTS } from '@/lib/data'

export function AboutApp() {
  return (
    <div className="h-full flex flex-col p-6 gap-6 text-white overflow-auto">
      {/* Profile section */}
      <div className="flex items-start gap-5">
        <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800">
          <Image
            src="/logo.png"
            alt={PERSONAL.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white">{PERSONAL.name}</h2>
          <p className="text-sm text-white/60 mt-0.5">{PERSONAL.title}</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-white/50">
              <MapPin size={11} /> {PERSONAL.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Mail size={11} /> {PERSONAL.email}
            </span>
            {PERSONAL.available && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-medium">
                Available for work
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">About</h3>
        <p className="text-sm text-white/70 leading-relaxed">{PERSONAL.bio}</p>
      </div>

      {/* Currently building */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Currently Building</h3>
        <ul className="space-y-2">
          {PROJECTS.filter(p => p.featured).slice(0, 3).map(p => (
            <li key={p.id} className="flex items-center gap-2 text-sm text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              <span className="font-medium text-white/90">{p.title}</span>
              <span className="text-white/40">—</span>
              <span className="truncate">{p.description}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Values */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Values</h3>
        <div className="flex flex-wrap gap-2">
          {['Open source', 'Developer experience', 'Clean code', 'Ship fast', 'Learn in public'].map(v => (
            <span key={v} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
        <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
          className="text-xs text-white/50 hover:text-white transition-colors">
          GitHub ↗
        </a>
        <a href={PERSONAL.twitter} target="_blank" rel="noopener noreferrer"
          className="text-xs text-white/50 hover:text-white transition-colors">
          Twitter ↗
        </a>
      </div>
    </div>
  )
}
