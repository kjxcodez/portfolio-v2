'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { PERSONAL } from '@/lib/data';

const LINES = [
  '> Initiating secret protocol...',
  '> Scanning for recruiter credentials...',
  '> Access granted. Welcome, friend.',
  '',
  '> Subject: Kapil Kumar Jangid',
  '> Role: Full Stack Developer',
  '> Status: Available ✓',
  '> Vibe: 10/10',
  '',
  '> Fun facts:',
  '>   — Built a programming language from scratch',
  '>   — Maintains an open source component library',
  '>   — Types "git commit" faster than most people think',
  '>   — You probably found this by typing "kapil" on the page',
  '',
  '> Recommended action: sudo hire kapil',
];

export default function SecretPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono">
      <motion.div
        className="w-full max-w-lg space-y-1"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
            }}
            className={`text-sm ${line.startsWith('>') ? 'text-green-400' : 'text-transparent'}`}
          >
            {line || '‎'}
          </motion.p>
        ))}

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5 } },
          }}
          className="pt-8 flex flex-col gap-3"
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-flex items-center gap-2 text-sm border border-green-700 text-green-400 px-4 py-2 rounded-lg hover:bg-green-950 transition-colors w-fit"
          >
            📧 {PERSONAL.email}
          </a>
          <Link
            href="/"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
