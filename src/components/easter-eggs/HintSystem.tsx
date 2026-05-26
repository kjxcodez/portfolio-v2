'use client'

import { useEffect } from 'react'
import { getFoundSecrets, HINTS } from '@/lib/easter-eggs'

interface HintSystemProps {
  onClose: () => void
}

export function HintSystem({ onClose }: HintSystemProps) {
  const found = getFoundSecrets().length
  const visibleCount = found === 0 ? 1 : found <= 2 ? 2 : found <= 4 ? 3 : 4
  const hints = HINTS.slice(0, visibleCount)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[140]"
      onClick={onClose}
    >
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black border border-zinc-700 rounded-xl px-5 py-4 shadow-2xl min-w-[220px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Hints</p>
        <ul className="flex flex-col gap-1.5">
          {hints.map((hint, i) => (
            <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
              <span className="text-zinc-600 shrink-0">•</span>
              {hint}
            </li>
          ))}
          {visibleCount < HINTS.length && (
            <li className="text-xs text-zinc-600 flex items-start gap-2">
              <span className="shrink-0">•</span>
              Find more secrets to unlock more hints
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
