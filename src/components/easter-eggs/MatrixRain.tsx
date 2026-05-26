'use client'

import { useEffect, useRef, useState } from 'react'
import { dispatchAchievement } from '@/lib/easter-eggs'

interface MatrixRainProps {
  onComplete: () => void
}

export default function MatrixRain({ onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    dispatchAchievement('matrix', 'Terminal User')

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d')!
    const cols = Math.floor(canvas.width / 14)
    const drops = Array<number>(cols).fill(1)

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = '14px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = String.fromCharCode(0x30a0 + Math.random() * 96)
        ctx.fillText(char, i * 14, drops[i] * 14)
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }, 50)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDone(true)
      setTimeout(onComplete, 1200)
    }, 6000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[999] bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {done && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-green-400 font-mono text-sm animate-pulse">Reality restored</p>
        </div>
      )}
    </div>
  )
}
