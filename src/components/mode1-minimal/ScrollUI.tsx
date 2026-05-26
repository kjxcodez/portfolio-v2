'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-sky-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 w-9 h-9 flex items-center justify-center rounded-xl shadow-md text-xs font-bold hover:scale-110 transition-transform bg-(--bg-surface) border border text-muted-foreground hover:text-(--text-primary)"
      aria-label="Back to top"
    >
      ↑
    </motion.button>
  );
}
