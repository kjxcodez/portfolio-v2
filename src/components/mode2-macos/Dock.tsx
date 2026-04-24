'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { User, FolderOpen, Star, FileText, Mail } from 'lucide-react'
import { GithubIcon } from '@/components/shared/icons'
import { useWindowStore, WindowId } from '@/lib/window-store'

const APPS: { id: WindowId; label: string; Icon: React.ElementType; color: string }[] = [
  { id: 'about',    label: 'About',    Icon: User,       color: 'from-blue-400 to-blue-600' },
  { id: 'projects', label: 'Projects', Icon: FolderOpen, color: 'from-yellow-400 to-orange-500' },
  { id: 'skills',   label: 'Skills',   Icon: Star,       color: 'from-purple-400 to-purple-600' },
  { id: 'blog',     label: 'Blog',     Icon: FileText,   color: 'from-green-400 to-green-600' },
  { id: 'contact',  label: 'Contact',  Icon: Mail,       color: 'from-red-400 to-red-600' },
  { id: 'github',   label: 'GitHub',   Icon: GithubIcon, color: 'from-zinc-400 to-zinc-600' },
]

const BASE_SIZE = 48
const MAX_SIZE = 72
const MAGNIFY_RADIUS = 100

export function Dock() {
  const { windows, openWindow, focusWindow } = useWindowStore()
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const rect = dockRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouseX(e.clientX - rect.left)
  }

  function getScale(index: number): number {
    if (mouseX === null) return 1
    const iconCenter = index * (BASE_SIZE + 12) + BASE_SIZE / 2
    const dist = Math.abs(mouseX - iconCenter)
    if (dist > MAGNIFY_RADIUS) return 1
    return 1 + ((1 - dist / MAGNIFY_RADIUS) * (MAX_SIZE / BASE_SIZE - 1))
  }

  function handleClick(id: WindowId) {
    const win = windows[id]
    if (!win.isOpen || win.isMinimized) {
      openWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
        className="flex items-end gap-3 px-4 py-2.5 bg-zinc-800/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
      >
        {APPS.map((app, i) => {
          const scale = getScale(i)
          const size = BASE_SIZE * scale
          const win = windows[app.id]
          const isOpen = win.isOpen && !win.isMinimized

          return (
            <div key={app.id} className="relative flex flex-col items-center group" style={{ width: BASE_SIZE }}>
              <motion.button
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={() => handleClick(app.id)}
                style={{ width: BASE_SIZE, height: BASE_SIZE, originY: 1 }}
                className={`rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}
                aria-label={`Open ${app.label}`}
              >
                <app.Icon size={22} className="text-white" strokeWidth={1.5} />
              </motion.button>

              {/* Active indicator */}
              {isOpen && (
                <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white/70" />
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-zinc-900/90 text-white text-[11px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                {app.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
