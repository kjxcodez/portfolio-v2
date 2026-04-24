"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModeContext } from "@/components/shared/ModeProvider";
import { MODE_LABELS, MODE_DESCRIPTIONS, PortfolioMode } from "@/store/mode-store";

export function FloatingModeSelector() {
  const { mode, setMode, isTransitioning } = useModeContext();
  const [isOpen, setIsOpen] = useState(false);

  const modes: PortfolioMode[] = [1, 2, 3, 4];

  const handleModeChange = (newMode: PortfolioMode) => {
    setMode(newMode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-2"
          >
            {modes
              .filter((m) => m !== mode)
              .map((m, index) => (
                <motion.button
                  key={m}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ opacity: 0, x: 50 }}
                  onClick={() => handleModeChange(m)}
                  className="mode-button group"
                  disabled={isTransitioning}
                >
                  <div className="flex items-center gap-3">
                    <div className="mode-number">{m}</div>
                    <div className="mode-info">
                      <div className="mode-label">{MODE_LABELS[m]}</div>
                      <div className="mode-description">{MODE_DESCRIPTIONS[m]}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="main-mode-button group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isTransitioning}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <>
                <div className="current-mode-number">{mode}</div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {!isOpen && (
          <div className="tooltip">
            <div className="font-medium">{MODE_LABELS[mode]}</div>
            <div className="text-xs opacity-75">Click to switch modes</div>
          </div>
        )}
      </motion.button>

      {/* Styles */}
      <style jsx>{`
        .mode-button {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          transition: all 0.3s ease;
          min-width: 200px;
          text-align: left;
        }

        .mode-button:hover {
          background: rgba(0, 0, 0, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(-4px);
        }

        .mode-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mode-number {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .mode-info {
          flex: 1;
        }

        .mode-label {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .mode-description {
          font-size: 12px;
          opacity: 0.7;
          line-height: 1.2;
        }

        .main-mode-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .main-mode-button:hover {
          background: rgba(0, 0, 0, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .main-mode-button:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .current-mode-number {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 12px;
        }

        .tooltip {
          position: absolute;
          bottom: 100%;
          right: 0;
          margin-bottom: 8px;
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transform: translateY(4px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          right: 16px;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
}