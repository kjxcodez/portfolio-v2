"use client";

import { createContext, useContext, useEffect, useState, Suspense } from "react";
import { PortfolioMode, useModeStore } from "@/store/mode-store";
import { motion, AnimatePresence } from "motion/react";
import { generateModeCSS } from "@/lib/mode-colors";
import { useModeSyncWithURL } from "@/lib/use-mode-sync";

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

function ModeProviderInner({ children }: ModeProviderProps) {
  const { mode, setMode: setStoreMode } = useModeStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMode, setActiveMode] = useState<PortfolioMode>(1);

  // Sync mode with URL
  useModeSyncWithURL();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync activeMode with Zustand mode store after mount
  useEffect(() => {
    if (mounted) {
      setActiveMode(mode);
    }
  }, [mode, mounted]);

  // Inject mode-specific CSS
  useEffect(() => {
    let styleElement = document.getElementById('mode-colors');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'mode-colors';
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = generateModeCSS(activeMode);
  }, [activeMode]);

  const setMode = (newMode: PortfolioMode) => {
    if (newMode === activeMode) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setStoreMode(newMode);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 100);
  };

  const contextValue: ModeContextType = {
    mode: activeMode,
    setMode,
    isTransitioning,
  };

  return (
    <ModeContext.Provider value={contextValue}>
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

      {children}
    </ModeContext.Provider>
  );
}

export function ModeProvider({ children }: ModeProviderProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ModeProviderInner>{children}</ModeProviderInner>
    </Suspense>
  );
}