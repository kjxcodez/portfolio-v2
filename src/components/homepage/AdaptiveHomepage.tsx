"use client";

import { useModeContext } from "@/components/shared/ModeProvider";
import { GlobalBackground } from "@/components/shared/GlobalBackground";
import { EasterEggProvider } from "@/components/easter-eggs/EasterEggProvider";
import { MinimalPortfolio } from "./MinimalPortfolio";
import { MacOSPortfolio } from "./MacOSPortfolio";
import { RPGPortfolio } from "./RPGPortfolio";
import { TerminalPortfolio } from "./TerminalPortfolio";
import { motion, AnimatePresence } from "motion/react";
import type { PostMeta } from "@/lib/mdx";

interface AdaptiveHomepageProps {
  posts: PostMeta[];
}

export function AdaptiveHomepage({ posts }: AdaptiveHomepageProps) {
  const { mode } = useModeContext();

  const renderer = (() => {
    switch (mode) {
      case 1:
        return <div className="mode-renderer professional-mode"><MinimalPortfolio /></div>;
      case 2:
        return <div className="mode-renderer desktop-mode"><MacOSPortfolio posts={posts} /></div>;
      case 3:
        return <div className="mode-renderer rpg-mode"><RPGPortfolio posts={posts} /></div>;
      case 4:
        return <div className="mode-renderer terminal-mode"><TerminalPortfolio posts={posts} /></div>;
      default:
        return <div className="mode-renderer professional-mode"><MinimalPortfolio /></div>;
    }
  })();

  return (
    <>
      <EasterEggProvider />
      <GlobalBackground mode={mode} />
      <AnimatePresence mode="wait">
        <motion.div
          key={`mode-${mode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10"
        >
          {renderer}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
