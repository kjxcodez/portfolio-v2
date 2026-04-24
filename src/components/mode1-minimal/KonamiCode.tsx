'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

export function KonamiCode() {
  const [seq, setSeq] = useState<string[]>([]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) {
          setTriggered(true);
          setTimeout(() => setTriggered(false), 3000);
        }
        return next;
      });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-center space-y-4 px-8"
          >
            <p className="text-6xl">🎮</p>
            <p className="text-3xl font-bold text-white tracking-widest uppercase">
              UNLOCKED: HIRE MODE
            </p>
            <p className="text-zinc-400 text-sm">
              You found the secret. Now email Kapil.
            </p>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sky-400 text-xs font-mono"
            >
              kapil@kapiljangid.pro
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
