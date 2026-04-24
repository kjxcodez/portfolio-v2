import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PortfolioMode = 1 | 2 | 3 | 4

interface ModeStore {
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
}

export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 1,
      setMode: (mode) => set({ mode }),
    }),
    { name: 'kapil-portfolio-mode' }  // localStorage key
  )
)

// Mode labels
export const MODE_LABELS: Record<PortfolioMode, string> = {
  1: 'Minimal',
  2: 'macOS Desktop',
  3: 'RPG World',
  4: 'Terminal OS',
}

export const MODE_DESCRIPTIONS: Record<PortfolioMode, string> = {
  1: 'Clean, fast, professional',
  2: 'Full desktop OS experience',
  3: 'Top-down game world',
  4: 'Real terminal, fake OS',
}