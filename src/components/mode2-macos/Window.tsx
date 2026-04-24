'use client'

import { useRef } from 'react'
import { Rnd } from 'react-rnd'
import { motion, AnimatePresence } from 'motion/react'
import { useWindowStore, WindowId } from '@/lib/window-store'

interface WindowProps {
  id: WindowId
  children: React.ReactNode
}

export function Window({ id, children }: WindowProps) {
  const win = useWindowStore((s) => s.windows[id])
  const { closeWindow, minimizeWindow, focusWindow } = useWindowStore()

  if (!win.isOpen) return null

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <Rnd
          default={{
            x: win.defaultX,
            y: win.defaultY,
            width: win.defaultWidth,
            height: win.defaultHeight,
          }}
          minWidth={320}
          minHeight={240}
          bounds="parent"
          style={{ zIndex: win.zIndex, position: 'absolute' }}
          dragHandleClassName="window-titlebar"
          onMouseDown={() => focusWindow(id)}
        >
          <motion.div
            key={`window-${id}`}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 10 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
            style={{ backdropFilter: 'blur(32px)', background: 'rgba(30, 30, 36, 0.92)' }}
          >
            {/* Title bar */}
            <div className="window-titlebar flex items-center gap-2 px-3 py-2.5 border-b border-white/10 select-none cursor-grab active:cursor-grabbing shrink-0">
              {/* Traffic lights */}
              <TrafficLights
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
              />
              {/* Title */}
              <div className="flex-1 flex items-center justify-center gap-1.5 text-xs text-white/60 font-medium pointer-events-none">
                <span>{win.icon}</span>
                <span>{win.title}</span>
              </div>
              {/* Balance spacer */}
              <div className="w-14" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  )
}

function TrafficLights({
  onClose,
  onMinimize,
}: {
  onClose: () => void
  onMinimize: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="flex items-center gap-1.5 group/lights">
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
        aria-label="Close window"
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-red-900 text-[8px] leading-none">×</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onMinimize() }}
        className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors flex items-center justify-center"
        aria-label="Minimize window"
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-yellow-900 text-[8px] leading-none">−</span>
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
        aria-label="Fullscreen (not available)"
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-green-900 text-[8px] leading-none">+</span>
      </button>
    </div>
  )
}
