'use client';

import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'motion/react';
import { useWindowStore, WindowId } from '@/lib/window-store';

interface WindowProps {
  id: WindowId;
  children: React.ReactNode;
}

export function Window({ id, children }: WindowProps) {
  const win = useWindowStore((s) => s.windows[id]);
  const { closeWindow, minimizeWindow, focusWindow, updateWindowBounds } = useWindowStore();

  if (!win.isOpen) return null;

  // Visual constraints
  const minWidth = id === 'terminal' ? 700 : 500;
  const minHeight = id === 'terminal' ? 450 : 350;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <Rnd
          size={{ width: win.width, height: win.height }}
          position={{ x: win.x, y: win.y }}
          minWidth={minWidth}
          minHeight={minHeight}
          bounds="#desktop-area"
          style={{ zIndex: win.zIndex, position: 'absolute' }}
          dragHandleClassName="window-titlebar"
          onDragStop={(e, d) => {
            updateWindowBounds(id, { x: d.x, y: d.y, width: win.width, height: win.height });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const w = parseInt(ref.style.width, 10);
            const h = parseInt(ref.style.height, 10);
            updateWindowBounds(id, { x: position.x, y: position.y, width: w, height: h });
          }}
          onMouseDown={() => focusWindow(id)}
        >
          <motion.div
            key={`window-${id}`}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.90, y: 10 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900/90 backdrop-blur-3xl"
          >
            {/* Title bar */}
            <div className="window-titlebar flex items-center gap-2 px-3.5 py-2.5 border-b border-white/5 select-none cursor-grab active:cursor-grabbing shrink-0 bg-zinc-950/40">
              {/* Traffic control lights */}
              <TrafficLights
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
              />
              
              {/* Title */}
              <div className="flex-1 flex items-center justify-center gap-1.5 text-xs text-white/50 font-mono pointer-events-none">
                <span>{win.icon}</span>
                <span>{win.title}</span>
              </div>
              
              {/* Balance spacer */}
              <div className="w-14" />
            </div>

            {/* Application container viewport */}
            <div className="flex-1 min-h-0 bg-zinc-900/30 overflow-hidden">
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}

function TrafficLights({
  onClose,
  onMinimize,
}: {
  onClose: () => void;
  onMinimize: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="flex items-center gap-1.5 group/lights">
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center cursor-pointer border border-red-600/30"
        aria-label="Close window"
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-red-950 text-[8px] leading-none select-none font-bold">×</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
        className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors flex items-center justify-center cursor-pointer border border-yellow-600/30"
        aria-label="Minimize window"
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-yellow-950 text-[8px] leading-none select-none font-bold">−</span>
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="w-3 h-3 rounded-full bg-zinc-700/80 transition-colors flex items-center justify-center cursor-not-allowed border border-zinc-800/30"
        disabled
        aria-label="Fullscreen disabled"
      >
        <span className="opacity-0 text-zinc-950 text-[8px] leading-none select-none font-bold">+</span>
      </button>
    </div>
  );
}
