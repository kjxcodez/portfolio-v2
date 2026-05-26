'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useModeStore, PortfolioMode } from '@/store/mode-store'

/**
 * Synchronizes the Zustand mode store with the ?mode=N URL search param.
 * - On mount: if ?mode=N is present, sets the store to that mode.
 * - On store change: updates the URL param (without full navigation).
 */
export function useModeSyncWithURL() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { mode, setMode } = useModeStore()
  const initialSyncDone = useRef(false)

  // On mount: read ?mode from URL and set store
  useEffect(() => {
    if (initialSyncDone.current) return
    initialSyncDone.current = true

    const urlMode = searchParams.get('mode')
    if (urlMode) {
      const parsed = parseInt(urlMode, 10) as PortfolioMode
      if ([1, 2, 3, 4].includes(parsed) && parsed !== mode) {
        setMode(parsed)
      }
    }
  }, [searchParams, mode, setMode])

  // On store change: update URL (only on homepage)
  useEffect(() => {
    if (!initialSyncDone.current) return
    if (pathname !== '/') return

    const currentURLMode = searchParams.get('mode')
    const targetURLMode = mode === 1 ? null : String(mode)

    if (currentURLMode === targetURLMode) return

    const params = new URLSearchParams(searchParams.toString())
    if (mode === 1) {
      params.delete('mode')
    } else {
      params.set('mode', String(mode))
    }
    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.replace(newURL, { scroll: false })
  }, [mode, pathname, searchParams, router])
}
