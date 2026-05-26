'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { dispatchAchievement } from '@/lib/easter-eggs'

export function RageClick() {
  const clickCount = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [shaking, setShaking] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    function onClick() {
      clickCount.current += 1
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => { clickCount.current = 0 }, 1000)

      if (clickCount.current >= 5) {
        clickCount.current = 0
        setShaking(true)
        setToast(true)
        dispatchAchievement('rage-click', 'Persistent Human')
        setTimeout(() => setShaking(false), 500)
        setTimeout(() => setToast(false), 2500)
      }
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {shaking && (
        <style>{`
          body { animation: rage-shake 0.4s ease; }
          @keyframes rage-shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-6px) rotate(-1deg)}
            40%{transform:translateX(6px) rotate(1deg)}
            60%{transform:translateX(-4px) rotate(-0.5deg)}
            80%{transform:translateX(4px) rotate(0.5deg)}
          }
        `}</style>
      )}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] bg-black border border-zinc-700 text-white text-xs px-4 py-2 rounded-xl shadow-xl whitespace-nowrap"
          >
            okay okay I get it 😅
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
