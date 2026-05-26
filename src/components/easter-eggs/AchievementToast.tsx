'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { markSecretFound, getFoundSecrets, type SecretId } from '@/lib/easter-eggs'

interface ToastItem {
  id: number
  title: string
  isBonus?: boolean
}

export function AchievementToast() {
  const [queue, setQueue] = useState<ToastItem[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    function onUnlock(e: Event) {
      const { id, title } = (e as CustomEvent<{ id: SecretId; title: string }>).detail
      const isNew = markSecretFound(id)
      if (!isNew) return

      const toastId = ++counterRef.current
      setQueue((q) => [...q, { id: toastId, title }])
      setTimeout(() => setQueue((q) => q.filter((t) => t.id !== toastId)), 2800)

      // Check for 5-secret milestone
      const found = getFoundSecrets()
      if (found.length === 5) {
        const bonusId = ++counterRef.current
        setTimeout(() => {
          setQueue((q) => [...q, { id: bonusId, title: 'You probably belong here.', isBonus: true }])
          setTimeout(() => setQueue((q) => q.filter((t) => t.id !== bonusId)), 2800)
        }, 3200)
      }
    }

    window.addEventListener('unlock-achievement', onUnlock)
    return () => window.removeEventListener('unlock-achievement', onUnlock)
  }, [])

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {queue.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-black border border-zinc-700 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl whitespace-nowrap"
          >
            {toast.isBonus ? (
              <>
                <p className="text-zinc-400 text-[10px] uppercase tracking-widest mb-0.5">Secret unlocked</p>
                <p className="font-medium">{toast.title}</p>
              </>
            ) : (
              <>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-0.5">Achievement unlocked</p>
                <p className="font-medium">{toast.title}</p>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
