import { create } from 'zustand'

export type WindowId = 'about' | 'projects' | 'skills' | 'blog' | 'contact' | 'github'

export interface WindowState {
  id: WindowId
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  title: string
  icon: string
  defaultX: number
  defaultY: number
  defaultWidth: number
  defaultHeight: number
}

interface WindowStore {
  windows: Record<WindowId, WindowState>
  topZ: number
  activeWindow: WindowId | null
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
}

const DEFAULTS: Record<WindowId, Omit<WindowState, 'isOpen' | 'isMinimized' | 'zIndex'>> = {
  about:    { id: 'about',    title: 'About',    icon: '👤', defaultX: 60,  defaultY: 60,  defaultWidth: 560, defaultHeight: 400 },
  projects: { id: 'projects', title: 'Projects', icon: '📁', defaultX: 120, defaultY: 90,  defaultWidth: 680, defaultHeight: 480 },
  skills:   { id: 'skills',   title: 'Skills',   icon: '⭐', defaultX: 180, defaultY: 80,  defaultWidth: 520, defaultHeight: 440 },
  blog:     { id: 'blog',     title: 'Blog',     icon: '📝', defaultX: 140, defaultY: 70,  defaultWidth: 660, defaultHeight: 500 },
  contact:  { id: 'contact',  title: 'Contact',  icon: '✉️', defaultX: 200, defaultY: 100, defaultWidth: 460, defaultHeight: 360 },
  github:   { id: 'github',   title: 'GitHub',   icon: '🐙', defaultX: 80,  defaultY: 50,  defaultWidth: 580, defaultHeight: 460 },
}

const initialWindows: Record<WindowId, WindowState> = Object.fromEntries(
  (Object.keys(DEFAULTS) as WindowId[]).map((id, i) => [
    id,
    { ...DEFAULTS[id], isOpen: false, isMinimized: false, zIndex: i + 1 },
  ])
) as Record<WindowId, WindowState>

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: initialWindows,
  topZ: Object.keys(DEFAULTS).length,
  activeWindow: null,

  openWindow: (id) => {
    const { topZ } = get()
    const next = topZ + 1
    set((s) => ({
      topZ: next,
      activeWindow: id,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isOpen: true, isMinimized: false, zIndex: next },
      },
    }))
  },

  closeWindow: (id) => {
    set((s) => ({
      activeWindow: s.activeWindow === id ? null : s.activeWindow,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isOpen: false, isMinimized: false },
      },
    }))
  },

  minimizeWindow: (id) => {
    set((s) => ({
      activeWindow: s.activeWindow === id ? null : s.activeWindow,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isMinimized: true },
      },
    }))
  },

  focusWindow: (id) => {
    const { topZ } = get()
    const next = topZ + 1
    set((s) => ({
      topZ: next,
      activeWindow: id,
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], zIndex: next, isMinimized: false },
      },
    }))
  },
}))
