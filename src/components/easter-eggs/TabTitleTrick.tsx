'use client'

import { useEffect } from 'react'

export function TabTitleTrick() {
  useEffect(() => {
    const original = document.title
    let hidden = false

    function onVisibilityChange() {
      if (document.hidden && !hidden) {
        hidden = true
        document.title = '👀 Come back!'
      } else if (!document.hidden && hidden) {
        hidden = false
        setTimeout(() => { document.title = original }, 800)
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return null
}
