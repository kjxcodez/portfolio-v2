import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { trackModeSwitch } from '@/lib/analytics'

export type PortfolioMode = 1 | 2 | 3 | 4

interface ModeStore {
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
}

export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 1,
      setMode: (mode) => {
        set({ mode });
        try {
          trackModeSwitch(MODE_LABELS[mode]);
        } catch (e) {}
      },
    }),
    { name: 'kapil-portfolio-mode' }
  )
)

export const MODE_LABELS: Record<PortfolioMode, string> = {
  1: 'Professional',
  2: 'Desktop OS',
  3: 'RPG World',
  4: 'Terminal OS',
}

export const MODE_DESCRIPTIONS: Record<PortfolioMode, string> = {
  1: 'Fast and recruiter friendly',
  2: 'Interactive OS experience',
  3: 'Explore projects as a world',
  4: 'CLI-powered portfolio',
}