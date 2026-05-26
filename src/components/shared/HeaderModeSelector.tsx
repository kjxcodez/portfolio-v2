"use client";

import { useModeContext } from "@/components/shared/ModeProvider";
import { MODE_LABELS, PortfolioMode } from "@/store/mode-store";
import { motion } from "motion/react";

export function HeaderModeSelector() {
  const { mode, setMode, isTransitioning } = useModeContext();
  const modes: PortfolioMode[] = [1, 2, 3, 4];

  // Mode-specific styling
  const getContainerClasses = () => {
    return "flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-1";
  };

  const getButtonClasses = (m: PortfolioMode) => {
    const isActive = mode === m;

    return `
      relative px-2 py-1 rounded-md text-xs font-medium transition-all duration-200
      ${isActive
        ? 'text-white shadow-sm'
        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
      }
      ${isTransitioning ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    `;
  };

  return (
    <div className={getContainerClasses()}>
      {modes.map((m) => (
        <motion.button
          key={m}
          onClick={() => setMode(m)}
          disabled={isTransitioning}
          className={getButtonClasses(m)}
          whileHover={!isTransitioning ? { scale: 1.05 } : {}}
          whileTap={!isTransitioning ? { scale: 0.95 } : {}}
        >
          {/* Active background */}
          {mode === m && (
            <motion.div
              layoutId="active-mode"
              className="absolute inset-0 rounded-md"
              style={{ background: 'var(--accent)' }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {/* Mode number */}
          <span className="relative z-10">{m}</span>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            {MODE_LABELS[m]}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/90" />
          </div>
        </motion.button>
      ))}
    </div>
  );
}