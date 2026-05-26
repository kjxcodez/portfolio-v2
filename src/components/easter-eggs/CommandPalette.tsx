'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { dispatchAchievement } from '@/lib/easter-eggs'
import { RESUME_URL, PERSONAL } from '@/lib/data'

const MatrixRain = dynamic(() => import('./MatrixRain'), { ssr: false })

interface Command {
  id: string
  label: string
  hint?: string
  action: () => void
}

interface OutputItem {
  lines: string[]
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [output, setOutput] = useState<OutputItem | null>(null)
  const [showMatrix, setShowMatrix] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const openedOnce = useRef(false)
  const router = useRouter()

  const visibleCommands: Command[] = [
    { id: 'blog', label: 'Open Blog', action: () => { router.push('/blog'); setOpen(false) } },
    { id: 'resume', label: 'Open Resume', action: () => { window.open(RESUME_URL, '_blank'); setOpen(false) } },
    { id: 'contact', label: 'Contact', action: () => { window.location.href = `mailto:${PERSONAL.email}`; setOpen(false) } },
    { id: 'terminal', label: 'Terminal mode', hint: 'Switch to Terminal OS', action: () => { router.push('/?mode=4'); setOpen(false) } },
    { id: 'secret', label: 'Secret Commands', hint: 'Some commands are hidden…', action: () => setQuery('') },
  ]

  const hiddenCommands: Command[] = [
    {
      id: 'matrix', label: 'matrix', action: () => {
        setOpen(false)
        setQuery('')
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setShowMatrix(true)
        }
      }
    },
    {
      id: 'coffee', label: 'coffee', action: () => {
        setOutput({
          lines: [
            'Current caffeine level:',
            '██████████ 100%',
            '',
            'Warning: May contain TypeScript',
          ]
        })
      }
    },
    {
      id: 'whoami', label: 'whoami', action: () => {
        setOutput({
          lines: [
            PERSONAL.name,
            PERSONAL.title,
            '',
            'Currently building:',
            '  Products',
            '  Experiments',
            '  Ideas',
          ]
        })
      }
    },
    {
      id: 'help', label: 'help', action: () => {
        setOutput({
          lines: [
            'Available commands:',
            '  matrix   — enter the matrix',
            '  coffee   — check caffeine levels',
            '  whoami   — identify the developer',
            '  help     — you found it',
          ]
        })
      }
    },
  ]

  const q = query.trim().toLowerCase()
  const allCommands = [...visibleCommands, ...hiddenCommands]
  const isHiddenQuery = hiddenCommands.some((c) => c.id === q)
  const filtered = isHiddenQuery
    ? hiddenCommands.filter((c) => c.id === q)
    : visibleCommands.filter((c) =>
        !q || c.label.toLowerCase().includes(q) || c.id.includes(q)
      )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => {
          if (!v && !openedOnce.current) {
            openedOnce.current = true
            dispatchAchievement('command-palette', 'Explorer')
          }
          return !v
        })
        setQuery('')
        setOutput(null)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
        setOutput(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setOutput(null)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  function handleSelect(cmd: Command) {
    cmd.action()
    if (!['coffee', 'whoami', 'help', 'secret'].includes(cmd.id)) {
      setQuery('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && filtered.length === 1) {
      handleSelect(filtered[0])
    }
  }

  return (
    <>
      {showMatrix && <MatrixRain onComplete={() => setShowMatrix(false)} />}
      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => { setOpen(false); setQuery(''); setOutput(null) }}
        >
          <div
            className="w-full max-w-sm bg-black/95 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <span className="text-zinc-500 text-xs font-mono">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOutput(null) }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command…"
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 outline-none font-mono"
              />
              <kbd className="text-[10px] text-zinc-600 border border-zinc-700 px-1 rounded">esc</kbd>
            </div>

            {/* Output panel */}
            {output ? (
              <div className="px-4 py-3 font-mono">
                {output.lines.map((line, i) => (
                  <p key={i} className={`text-xs ${line.startsWith('  ') ? 'text-zinc-400 pl-2' : line === '' ? 'py-0.5' : 'text-green-400'}`}>
                    {line || '\u00a0'}
                  </p>
                ))}
                <button
                  onClick={() => setOutput(null)}
                  className="mt-3 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  ← back
                </button>
              </div>
            ) : (
              <ul className="py-1 max-h-56 overflow-y-auto">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-xs text-zinc-600 font-mono">No commands found</li>
                ) : (
                  filtered.map((cmd) => (
                    <li key={cmd.id}>
                      <button
                        onClick={() => handleSelect(cmd)}
                        className="w-full text-left px-4 py-2.5 hover:bg-zinc-800/60 transition-colors flex items-center justify-between gap-4"
                      >
                        <span className="text-sm text-zinc-200 font-mono">{cmd.label}</span>
                        {cmd.hint && <span className="text-[10px] text-zinc-600">{cmd.hint}</span>}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}

            <div className="px-4 py-2 border-t border-zinc-800/60 flex items-center gap-3">
              <span className="text-[10px] text-zinc-700">↵ select</span>
              <span className="text-[10px] text-zinc-700">esc close</span>
              <span className="text-[10px] text-zinc-700 ml-auto">ctrl+k</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
