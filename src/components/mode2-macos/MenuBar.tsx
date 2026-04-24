'use client'

import { useEffect, useState } from 'react'
import { useWindowStore } from '@/lib/window-store'
import { Wifi, Battery } from 'lucide-react'

export function MenuBar() {
  const [time, setTime] = useState('')
  const activeWindow = useWindowStore((s) => s.activeWindow)
  const windows = useWindowStore((s) => s.windows)

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
    }
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  const activeTitle = activeWindow ? windows[activeWindow]?.title : 'Finder'

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-7 px-4 bg-zinc-900/80 backdrop-blur-xl border-b border-white/10 text-white/80 text-xs select-none">
      {/* Left — Apple + app name */}
      <div className="flex items-center gap-4">
        <span className="text-white text-sm leading-none">&#xf8ff;</span>
        <span className="font-semibold text-white/90">{activeTitle}</span>
        <span className="text-white/40">File</span>
        <span className="text-white/40">Edit</span>
        <span className="text-white/40">View</span>
        <span className="text-white/40">Window</span>
      </div>

      {/* Right — status icons + time */}
      <div className="flex items-center gap-3">
        <Wifi size={12} className="text-white/70" />
        <Battery size={14} className="text-white/70" />
        <span className="text-white/80 tabular-nums">{time}</span>
      </div>
    </div>
  )
}
