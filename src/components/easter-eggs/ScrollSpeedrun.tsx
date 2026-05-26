'use client'

import { useEffect, useRef } from 'react'
import { dispatchAchievement } from '@/lib/easter-eggs'

export function ScrollSpeedrun() {
  const atBottomRef = useRef(false)
  const atBottomTimeRef = useRef(0)
  const firedRef = useRef(false)

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return

      const pct = scrolled / total

      if (pct > 0.8) {
        atBottomRef.current = true
        atBottomTimeRef.current = Date.now()
      }

      if (
        pct < 0.1 &&
        atBottomRef.current &&
        !firedRef.current &&
        Date.now() - atBottomTimeRef.current < 2000
      ) {
        firedRef.current = true
        atBottomRef.current = false
        dispatchAchievement('speedrunner', 'Speedrunner')
        // allow re-trigger after 10s
        setTimeout(() => { firedRef.current = false }, 10000)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
