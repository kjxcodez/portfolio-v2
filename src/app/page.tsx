'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'motion/react'
import { MODE_DESCRIPTIONS, PortfolioMode, useModeStore } from '@/store/mode-store'

const MODE_ROUTES: Record<PortfolioMode, string> = {
  1: '/modes/minimal',
  2: '/modes/glass',
  3: '/modes/macos',
  4: '/modes/rpg',
  5: '/modes/terminal',
}

export default function ModeSelector() {
  const router = useRouter()
  const { mode, setMode } = useModeStore()
  const [hovered, setHovered] = useState<PortfolioMode | null>(null)
  const active = hovered ?? mode

  function enter(m: PortfolioMode) {
    setMode(m)
    router.push(MODE_ROUTES[m])
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-white/40 mb-2 text-center tracking-widest uppercase">
          kapiljangid.pro
        </p>
        <h1 className="text-3xl font-medium text-center mb-2">
          Choose your experience
        </h1>
        <p className="text-white/50 text-center mb-12 text-sm">
          {MODE_DESCRIPTIONS[active]}
        </p>

        {/* 1–5 level buttons */}
        <div className="flex gap-3 mb-6">
          {([1, 2, 3, 4, 5] as PortfolioMode[]).map((m) => (
            <motion.button
              key={m}
              className={`w-14 h-14 rounded-xl border text-lg font-medium transition-colors
                ${mode === m
                  ? 'border-white/60 bg-white/10 text-white'
                  : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white/70'
                }`}
              onHoverStart={() => setHovered(m)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => enter(m)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {m}
            </motion.button>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center">
          1 = calm &nbsp;·&nbsp; 5 = unhinged
        </p>
      </motion.div>
    </main>
  )
}