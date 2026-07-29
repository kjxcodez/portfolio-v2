'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { dispatchAchievement } from '@/lib/easter-eggs'
import { RESUME_URL, PERSONAL, PROJECTS } from '@/lib/data'
import type { PostMeta } from '@/lib/mdx'
import { useModeContext } from '@/components/shared/ModeProvider'

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

interface NavItem {
  id: string
  label: string
  hint: string
  href: string
}

interface CommandPaletteProps {
  posts?: PostMeta[]
}

export function CommandPalette({ posts = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [output, setOutput] = useState<OutputItem | null>(null)
  const [showMatrix, setShowMatrix] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const activeItemRef = useRef<HTMLButtonElement>(null)
  const openedOnce = useRef(false)
  
  const router = useRouter()
  const { setMode } = useModeContext()

  // Visible action commands (with proper setMode triggers and routing to home page)
  const visibleCommands: Command[] = [
    { id: 'mode-1', label: 'Professional mode', hint: 'Switch layout to Professional', action: () => { setMode(1); router.push('/'); setOpen(false) } },
    { id: 'mode-2', label: 'Desktop OS mode', hint: 'Switch layout to Desktop OS', action: () => { setMode(2); router.push('/'); setOpen(false) } },
    { id: 'mode-3', label: 'RPG World mode', hint: 'Switch layout to RPG World', action: () => { setMode(3); router.push('/'); setOpen(false) } },
    { id: 'terminal', label: 'Terminal mode', hint: 'Switch layout to Terminal OS', action: () => { setMode(4); router.push('/'); setOpen(false) } },
    { id: 'blog', label: 'Open Blog', action: () => { router.push('/blog'); setOpen(false) } },
    { id: 'resume', label: 'Open Resume', action: () => { window.open(RESUME_URL, '_blank'); setOpen(false) } },
    { id: 'contact', label: 'Contact', action: () => { window.location.href = `mailto:${PERSONAL.email}`; setOpen(false) } },
    { id: 'secret', label: 'Secret Commands', hint: 'Some commands are hidden...', action: () => setQuery('') },
  ]

  // Hidden easter-egg commands (unchanged from original)
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

  // Dynamic nav items (ported from retired QuickNav)
  const navItems: NavItem[] = [
    { id: 'nav-home',     label: 'Home',     hint: 'Mode selector',           href: '/'         },
    { id: 'nav-projects', label: 'Projects', hint: 'All projects',            href: '/projects' },
    { id: 'nav-now',      label: 'Now',      hint: "What I'm focused on now", href: '/now'      },
    { id: 'nav-uses',     label: 'Uses',     hint: 'My tools and setup',      href: '/uses'     },
    ...PROJECTS.map((p) => ({
      id: `nav-project-${p.id}`,
      label: p.title,
      hint: p.description,
      href: `/projects/${p.id}`,
    })),
    ...posts.map((p) => ({
      id: `nav-post-${p.slug}`,
      label: p.title,
      hint: p.description ?? 'Blog post',
      href: `/blog/${p.slug}`,
    })),
  ]

  // Filtering -- hidden-command gate preserved exactly from original
  const q = query.trim().toLowerCase()
  const isHiddenQuery = hiddenCommands.some((c) => c.id === q)

  const filteredCommands = isHiddenQuery
    ? hiddenCommands.filter((c) => c.id === q)
    : visibleCommands.filter((c) =>
        !q || c.label.toLowerCase().includes(q) || c.id.includes(q)
      )

  const filteredNav = !isHiddenQuery
    ? navItems.filter(
        (n) =>
          !q ||
          n.label.toLowerCase().includes(q) ||
          n.hint.toLowerCase().includes(q)
      )
    : []

  // Combine commands and nav items for single flat list keyboard index selection
  const combinedList = [
    ...filteredCommands.map(c => ({ type: 'command' as const, data: c, id: c.id, label: c.label, hint: c.hint })),
    ...filteredNav.map(n => ({ type: 'nav' as const, data: n, id: n.id, label: n.label, hint: n.hint }))
  ]

  const hasResults = combinedList.length > 0

  // Reset selected index to 0 when query changes
  useEffect(() => {
    setSelected(0)
  }, [query])

  // Scroll active item into view
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [selected])

  // Open/close listeners
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

  // Listen for GlobalNav cmdk button dispatch
  useEffect(() => {
    function onOpen() {
      setOpen((v) => {
        if (!v && !openedOnce.current) {
          openedOnce.current = true
          dispatchAchievement('command-palette', 'Explorer')
        }
        return true
      })
      setQuery('')
      setOutput(null)
    }
    window.addEventListener('quicknav:open', onOpen)
    return () => window.removeEventListener('quicknav:open', onOpen)
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

  function handleNavSelect(item: NavItem) {
    setOpen(false)
    setQuery('')
    setOutput(null)
    router.push(item.href)
  }

  function handleItemSelect(item: typeof combinedList[0]) {
    if (item.type === 'command') {
      handleSelect(item.data)
    } else {
      handleNavSelect(item.data)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, combinedList.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      const activeItem = combinedList[selected]
      if (activeItem) {
        handleItemSelect(activeItem)
      }
    }
  }

  return (
    <>
      {showMatrix && <MatrixRain onComplete={() => setShowMatrix(false)} />}
      {open && (
        <div
          className="fixed inset-0 z-300 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => { setOpen(false); setQuery(''); setOutput(null) }}
        >
          <div
            className="w-full max-w-md bg-black/95 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <span className="text-zinc-500 text-xs font-mono">cmd</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOutput(null) }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or page name..."
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 outline-none font-mono"
              />
              <kbd className="text-[10px] text-zinc-600 border border-zinc-700 px-1 rounded">esc</kbd>
            </div>

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
                  back
                </button>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {!hasResults ? (
                  <p className="px-4 py-3 text-xs text-zinc-600 font-mono">No commands found</p>
                ) : (
                  <ul className="py-1">
                    {combinedList.map((item, idx) => {
                      const isSelected = idx === selected
                      const showCommandsHeader = idx === 0 && item.type === 'command' && q === ''
                      const isFirstNav = item.type === 'nav' && (idx === 0 || combinedList[idx - 1].type === 'command')
                      const showNavHeader = isFirstNav && (q === '' || filteredCommands.length > 0)

                      return (
                        <li key={item.id}>
                          {showCommandsHeader && (
                            <div className="px-4 pt-2 pb-1">
                              <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Commands</span>
                            </div>
                          )}
                          {showNavHeader && (
                            <div className={`px-4 pt-2 pb-1 ${idx > 0 ? 'border-t border-zinc-800/60 mt-1' : ''}`}>
                              <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Go to</span>
                            </div>
                          )}
                          <button
                            ref={isSelected ? activeItemRef : undefined}
                            onClick={() => handleItemSelect(item)}
                            onMouseEnter={() => setSelected(idx)}
                            className={`w-full text-left px-4 py-2.5 transition-colors flex items-center justify-between gap-4 ${
                              isSelected ? 'bg-zinc-800/60' : ''
                            }`}
                          >
                            <span className="text-sm text-zinc-200 font-mono">{item.label}</span>
                            {item.hint && (
                              <span className={`text-[10px] ${isSelected ? 'text-zinc-400' : 'text-zinc-600'} truncate max-w-[150px]`}>
                                {item.hint}
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}

            <div className="px-4 py-2 border-t border-zinc-800/60 flex items-center gap-3">
              <span className="text-[10px] text-zinc-700">enter select</span>
              <span className="text-[10px] text-zinc-700">esc close</span>
              <span className="text-[10px] text-zinc-700 ml-auto">ctrl+k</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

