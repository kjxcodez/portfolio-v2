'use client';

import Image from 'next/image';
import { MapPin, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PERSONAL, PROJECTS, RESUME_URL } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

export function AboutApp() {
  return (
    <div className="h-full flex flex-col p-5 gap-5 text-white overflow-y-auto scrollbar-thin select-text">
      {/* Photo, Name, and Role block */}
      <div className="flex items-center gap-4 shrink-0 bg-white/5 border border-white/5 p-4 rounded-xl">
        <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-zinc-800 relative">
          <Image
            src="/logo.png"
            alt={PERSONAL.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-white leading-tight">{PERSONAL.name}</h2>
          <p className="text-xs text-blue-400 mt-0.5 font-medium">{PERSONAL.title}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="flex items-center gap-0.5 text-[10px] text-white/55">
              <MapPin size={10} /> {PERSONAL.location}
            </span>
            <span className="text-white/30">•</span>
            {PERSONAL.available && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase tracking-wider">
                Available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Short Bio */}
      <div className="shrink-0">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-1.5 select-none">Bio</h3>
        <p className="text-xs text-white/75 leading-relaxed">{PERSONAL.bio}</p>
      </div>

      {/* Currently Building */}
      <div className="shrink-0">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-1.5 select-none">Currently Building</h3>
        <ul className="space-y-1.5">
          {PROJECTS.filter(p => p.featured).slice(0, 2).map(p => (
            <li key={p.id} className="flex items-start gap-2 text-xs text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white/95">{p.title}</span>
                <span className="text-white/40"> — </span>
                <span className="text-white/60">{p.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      <div className="mt-auto pt-3 border-t border-white/10 shrink-0 select-none">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          <a 
            href={PERSONAL.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 text-white/60 transition-colors"
          >
            <GithubIcon size={12} />
            <span>GitHub</span>
          </a>
          <a 
            href={RESUME_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_click', { source: 'AboutApp Quick Links' })}
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 text-white/60 transition-colors"
          >
            <ExternalLink size={11} />
            <span>Resume</span>
          </a>
          <a 
            href={PERSONAL.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 text-white/60 transition-colors"
          >
            <ExternalLink size={11} />
            <span>Twitter</span>
          </a>
          <a 
            href={`mailto:${PERSONAL.email}`}
            onClick={() => trackEvent('contact_click', { source: 'AboutApp Quick Links' })}
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 text-white/60 transition-colors"
          >
            <Mail size={11} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
}
