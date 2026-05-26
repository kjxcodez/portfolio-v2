import { create } from 'zustand'

export type WindowId = 'about' | 'projects' | 'terminal'

export interface WindowState {
  id: WindowId
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  title: string
  icon: string
  x: number
  y: number
  width: number
  height: number
  lastPosition?: { x: number; y: number }
  lastSize?: { width: number; height: number }
}

interface WindowStore {
  windows: Record<WindowId, WindowState>
  topZ: number
  activeWindow: WindowId | null
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  updateWindowBounds: (id: WindowId, bounds: { x: number; y: number; width: number; height: number }) => void
}

const DEFAULTS: Record<WindowId, { title: string; icon: string; defaultX: number; defaultY: number; defaultWidth: number; defaultHeight: number }> = {
  about:    { title: 'About Me', icon: '👤', defaultX: 80,  defaultY: 80,  defaultWidth: 540, defaultHeight: 380 },
  projects: { title: 'Projects', icon: '📁', defaultX: 140, defaultY: 110, defaultWidth: 680, defaultHeight: 460 },
  terminal: { title: 'Terminal', icon: '💻', defaultX: 200, defaultY: 140, defaultWidth: 740, defaultHeight: 480 },
}

// Read saved layout from localStorage if available
const getSavedLayout = (): Record<WindowId, { x: number; y: number; width: number; height: number }> | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kapil-os-layout');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }
  return null;
}

const savedLayout = getSavedLayout();

const initialWindows: Record<WindowId, WindowState> = Object.fromEntries(
  (Object.keys(DEFAULTS) as WindowId[]).map((id, i) => {
    const saved = savedLayout?.[id];
    const x = saved?.x ?? DEFAULTS[id].defaultX;
    const y = saved?.y ?? DEFAULTS[id].defaultY;
    const width = saved?.width ?? DEFAULTS[id].defaultWidth;
    const height = saved?.height ?? DEFAULTS[id].defaultHeight;

    return [
      id,
      {
        id,
        title: DEFAULTS[id].title,
        icon: DEFAULTS[id].icon,
        isOpen: false,
        isMinimized: false,
        zIndex: i + 1,
        x,
        y,
        width,
        height,
        lastPosition: { x, y },
        lastSize: { width, height }
      },
    ];
  })
) as Record<WindowId, WindowState>

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: initialWindows,
  topZ: Object.keys(DEFAULTS).length,
  activeWindow: null,

  openWindow: (id) => {
    const { topZ, windows } = get()
    const nextZ = topZ + 1
    const win = windows[id]
    
    const updatedX = win.lastPosition?.x ?? win.x
    const updatedY = win.lastPosition?.y ?? win.y
    const updatedWidth = win.lastSize?.width ?? win.width
    const updatedHeight = win.lastSize?.height ?? win.height

    set((s) => ({
      topZ: nextZ,
      activeWindow: id,
      windows: {
        ...s.windows,
        [id]: { 
          ...s.windows[id], 
          isOpen: true, 
          isMinimized: false, 
          zIndex: nextZ,
          x: updatedX,
          y: updatedY,
          width: updatedWidth,
          height: updatedHeight
        },
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
    const win = get().windows[id];
    set((s) => ({
      activeWindow: s.activeWindow === id ? null : s.activeWindow,
      windows: {
        ...s.windows,
        [id]: { 
          ...s.windows[id], 
          isMinimized: true,
          lastPosition: { x: win.x, y: win.y },
          lastSize: { width: win.width, height: win.height }
        },
      },
    }))
  },

  focusWindow: (id) => {
    const { topZ, windows } = get()
    const nextZ = topZ + 1
    const win = windows[id]

    const updatedX = win.lastPosition?.x ?? win.x
    const updatedY = win.lastPosition?.y ?? win.y
    const updatedWidth = win.lastSize?.width ?? win.width
    const updatedHeight = win.lastSize?.height ?? win.height

    set((s) => ({
      topZ: nextZ,
      activeWindow: id,
      windows: {
        ...s.windows,
        [id]: { 
          ...s.windows[id], 
          zIndex: nextZ, 
          isMinimized: false,
          x: updatedX,
          y: updatedY,
          width: updatedWidth,
          height: updatedHeight
        },
      },
    }))
  },

  updateWindowBounds: (id, bounds) => {
    set((s) => {
      const updatedWindows = {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
          lastPosition: { x: bounds.x, y: bounds.y },
          lastSize: { width: bounds.width, height: bounds.height }
        }
      };

      // Save updated layout to localStorage
      if (typeof window !== 'undefined') {
        const layout = {
          about: { x: updatedWindows.about.x, y: updatedWindows.about.y, width: updatedWindows.about.width, height: updatedWindows.about.height },
          projects: { x: updatedWindows.projects.x, y: updatedWindows.projects.y, width: updatedWindows.projects.width, height: updatedWindows.projects.height },
          terminal: { x: updatedWindows.terminal.x, y: updatedWindows.terminal.y, width: updatedWindows.terminal.width, height: updatedWindows.terminal.height },
        };
        localStorage.setItem('kapil-os-layout', JSON.stringify(layout));
      }

      return { windows: updatedWindows };
    });
  }
}))
