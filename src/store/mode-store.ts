import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PortfolioMode = 1 | 2 | 3 | 4 | 5

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
  2: 'Glassmorphism',
  3: 'macOS Desktop',
  4: 'RPG World',
  5: 'Terminal OS',
}

export const MODE_DESCRIPTIONS: Record<PortfolioMode, string> = {
  1: 'Clean, fast, professional',
  2: 'Three.js background, glass cards',
  3: 'Full desktop OS experience',
  4: 'Top-down game world',
  5: 'Real terminal, fake OS',
}