'use client'

import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'motion/react'

export function BlogReader() {
  const [visible, setVisible] = useState(false)
  const firedRef = useRef(false)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.95 && !firedRef.current) {
      firedRef.current = true
      setVisible(true)
    }
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-20 right-4 z-[200] bg-black border border-zinc-700 text-xs px-4 py-2.5 rounded-xl shadow-xl"
        >
          <p className="text-zinc-400">You made it to the end.</p>
          <p className="text-zinc-600">Respect.</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
