'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '@/lib/data';

interface NavItem {
  label: string;
  description: string;
  href: string;
  category: string;
  emoji: string;
}

const STATIC_ITEMS: NavItem[] = [
  // Main
  { label: 'Home', description: 'Mode selector', href: '/', category: 'Main', emoji: '🏠' },
  { label: 'Portfolio', description: 'Minimal mode — full portfolio', href: '/modes/minimal', category: 'Main', emoji: '👤' },
  // Content
  { label: 'Blog', description: 'Writing about building things', href: '/blog', category: 'Writing', emoji: '✍️' },
  { label: 'Building Rune Lang', description: 'How I built a programming language', href: '/blog/building-rune-lang', category: 'Writing', emoji: '📝' },
  { label: 'Percept UI Story', description: 'Lessons from an open source component library', href: '/blog/percept-ui-story', category: 'Writing', emoji: '📝' },
  { label: 'Open Source Journey', description: 'My first 10 merged PRs', href: '/blog/open-source-journey', category: 'Writing', emoji: '📝' },
  // Pages
  { label: 'Now', description: "What I'm focused on right now", href: '/now', category: 'Pages', emoji: '🕐' },
  { label: 'Uses', description: 'My tools and setup', href: '/uses', category: 'Pages', emoji: '🛠️' },
];

const PROJECT_ITEMS: NavItem[] = PROJECTS.map(p => ({
  label: p.title,
  description: p.description,
  href: `/projects/${p.id}`,
  category: 'Projects',
  emoji: '🚀',
}));

const ALL_ITEMS = [...STATIC_ITEMS, ...PROJECT_ITEMS];

export function QuickNav() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query.trim()
    ? ALL_ITEMS.filter(
        item =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : ALL_ITEMS;

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelected(0);
  }, []);

  const navigate = useCallback((href: string) => {
    close();
    router.push(href);
  }, [close, router]);

  // Listen for custom event from SiteHeader trigger button
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('quicknav:open', onOpen);
    return () => window.removeEventListener('quicknav:open', onOpen);
  }, []);

  // Cmd+K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // Arrow key + Enter navigation inside palette
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(s => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(s => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selected]) {
        navigate(filtered[selected].href);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, selected, navigate]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Reset selection on query change
  useEffect(() => { setSelected(0); }, [query]);

  // Group by category
  const groups = filtered.reduce<Record<string, NavItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed left-1/2 -translate-x-1/2 top-[15vh] z-[90] w-full max-w-[560px] px-4"
          >
            <div className="bg-zinc-950 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
                <span className="text-zinc-500 text-sm">⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Go to page, project, post..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-zinc-600 hover:text-zinc-400 text-xs">
                    clear
                  </button>
                )}
                <kbd className="text-[10px] text-zinc-600 border border-zinc-700 rounded px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-zinc-600 text-sm text-center py-8">No results for &ldquo;{query}&rdquo;</p>
                ) : (
                  Object.entries(groups).map(([category, items]) => {
                    return (
                      <div key={category}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 px-4 pt-3 pb-1">
                          {category}
                        </p>
                        {items.map(item => {
                          const globalIdx = filtered.indexOf(item);
                          const isSelected = globalIdx === selected;
                          return (
                            <button
                              key={item.href}
                              onClick={() => navigate(item.href)}
                              onMouseEnter={() => setSelected(globalIdx)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                isSelected ? 'bg-zinc-800' : 'hover:bg-zinc-900'
                              }`}
                            >
                              <span className="text-base shrink-0">{item.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{item.label}</p>
                                <p className="text-xs text-zinc-500 truncate">{item.description}</p>
                              </div>
                              {isSelected && (
                                <kbd className="shrink-0 text-[10px] text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5 font-mono">
                                  ↵
                                </kbd>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center gap-4 px-4 py-2 border-t border-zinc-800 text-[10px] text-zinc-600">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> open</span>
                <span><kbd className="font-mono">ESC</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
