"use client";

import { useMemo } from "react";
import { PortfolioMode } from "@/store/mode-store";
import { motion, AnimatePresence } from "motion/react";

interface GlobalBackgroundProps {
  mode: PortfolioMode;
}

export function GlobalBackground({ mode }: GlobalBackgroundProps) {
  // Memoize background components to prevent unnecessary re-renders
  const backgroundContent = useMemo(() => {
    switch (mode) {
      case 1: // Minimal Mode
        return (
          <motion.div
            key="minimal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-500" />
            {/* Subtle animated grain for texture */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-gradient-to-br from-transparent via-gray-500 to-transparent" />
          </motion.div>
        );

      case 2: // macOS Desktop Mode
        return (
          <motion.div
            key="macos-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* macOS-style wallpaper gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900" />
            {/* Subtle light rays effect */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-400 rounded-full blur-3xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.5, 0.3, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>
        );

      case 3: // RPG World Mode
        return (
          <motion.div
            key="rpg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Fantasy forest gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-green-800 to-teal-900" />
            {/* Animated fog layers */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-400 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/3 left-0 w-full h-20 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-green-300 rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        );

      case 4: // Terminal OS Mode
        return (
          <motion.div
            key="terminal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Matrix-style black background */}
            <div className="absolute inset-0 bg-black" />
            {/* Scanline effects */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500 to-transparent" style={{ backgroundSize: '100% 2px', backgroundRepeat: 'repeat-y' }} />
            </motion.div>
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white dark:bg-black transition-colors duration-500"
          />
        );
    }
  }, [mode]);

  return (
    <div className="fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        {backgroundContent}
      </AnimatePresence>
    </div>
  );
}