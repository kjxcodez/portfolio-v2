'use client';

import { CONTRIBUTIONS } from '@/lib/data';
import type { InteractiveTarget } from './RPGScene';

interface DialogueOverlayProps {
  target: InteractiveTarget;
  onClose: () => void;
}

export function DialogueOverlay({ target, onClose }: DialogueOverlayProps) {
  const isSkill = target.type === 'skill';

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-30 select-text">
      <div 
        className="w-full max-w-lg bg-zinc-950 border border-emerald-500/20 rounded-xl p-5 shadow-2xl relative flex flex-col max-h-[70vh]"
        style={{
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-4 shrink-0 select-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
            {isSkill ? 'Skill Stone Activated' : 'Citadel System'}
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
          {isSkill ? (
            <div className="space-y-4 font-sans text-sm">
              <h2 className="text-lg font-bold text-white leading-tight font-mono">{target.name}</h2>
              <div className="mt-2 text-zinc-300">
                <p className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider mb-2">Used in:</p>
                <ul className="space-y-2 list-none pl-0 font-mono text-xs">
                  {target.data.usedIn?.map((item: string) => (
                    <li key={item} className="flex items-center gap-2 text-zinc-350">
                      <span className="text-emerald-500 font-semibold select-none">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4 font-mono text-xs">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Open Source Activity</h2>
              <div className="space-y-3 divide-y divide-zinc-900">
                {CONTRIBUTIONS.slice(0, 5).map((c, idx) => (
                  <div 
                    key={c.id} 
                    className={`pt-2.5 ${idx === 0 ? 'pt-0 border-0' : ''} flex flex-col gap-1`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span>[{c.date}] [{c.type}]</span>
                      <span className={c.status === 'Merged' ? 'text-green-400' : 'text-yellow-400'}>
                        {c.status}
                      </span>
                    </div>
                    <a 
                      href={c.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
                    >
                      {c.repo}
                    </a>
                    <p className="text-zinc-400 text-[11px] leading-snug break-words">{c.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Escape Bar */}
        <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono select-none shrink-0">
          <span>Target: {target.name}</span>
          <span>Press ESC or click ✕ to close</span>
        </div>
      </div>
    </div>
  );
}
