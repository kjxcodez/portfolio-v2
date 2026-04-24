"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PortfolioMode, useModeStore } from "@/store/mode-store";
import { motion, AnimatePresence } from "motion/react";
import { GlobalBackground } from "./GlobalBackground";
import { generateModeCSS } from "@/lib/mode-colors";

interface ModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  isTransitioning: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function useModeContext() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useModeContext must be used within a ModeProvider");
  }
  return context;
}

interface ModeProviderProps {
  children: React.ReactNode;
}

export function ModeProvider({ children }: ModeProviderProps) {
  const { mode, setMode: setStoreMode } = useModeStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Inject mode-specific CSS
  useEffect(() => {
    if (!mounted) return;

    // Create or update the mode colors style element
    let styleElement = document.getElementById('mode-colors');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'mode-colors';
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = generateModeCSS(mode);
  }, [mode, mounted]);

  const setMode = (newMode: PortfolioMode) => {
    if (newMode === mode) return;

    setIsTransitioning(true);

    // Slightly longer delay for smoother visual transition
    setTimeout(() => {
      setStoreMode(newMode);
      // Keep transition state longer for smoother experience
      setTimeout(() => setIsTransitioning(false), 500);
    }, 200);
  };

  // Don't render until hydrated to prevent mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const contextValue: ModeContextType = {
    mode,
    setMode,
    isTransitioning,
  };

  return (
    <ModeContext.Provider value={contextValue}>
      <GlobalBackground mode={mode} />

      {/* Transition loading overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 flex items-center gap-3"
            >
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-white text-sm font-medium">Switching modes...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`mode-${mode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother feel
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ModeContext.Provider>
  );
}