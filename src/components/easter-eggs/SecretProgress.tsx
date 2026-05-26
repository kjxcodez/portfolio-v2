'use client'

import { useEffect, useState } from 'react'
import { getFoundSecrets, TOTAL_SECRETS } from '@/lib/easter-eggs'
import { HintSystem } from './HintSystem'

export function SecretProgress() {
  const [found, setFound] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setFound(getFoundSecrets().length)

    function onUnlock() {
      setFound(getFoundSecrets().length)
    }
    window.addEventListener('unlock-achievement', onUnlock)
    return () => window.removeEventListener('unlock-achievement', onUnlock)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer font-mono"
      >
        {found}/{TOTAL_SECRETS} secrets
      </button>
      {open && <HintSystem onClose={() => setOpen(false)} />}
    </>
  )
}
