'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { PERSONAL } from '@/lib/data';

const LINES = [
  '> Initiating hidden protocol...',
  '> Verifying curious human...',
  '> Access granted.',
  '',
  '> Subject: Kapil Kumar Jangid',
  '> Role: Full Stack Developer',
  '> Status: Available ✓',
  '',
  '> Quick facts:',
  '>   • Built Rune Lang to understand programming deeper',
  '>   • Enjoys building products more than tutorials',
  '>   • Frequently turns small ideas into larger systems',
  '>   • Currently experimenting with multiple portfolio experiences',
  '',
  '> Current priorities:',
  '>   • Building things',
  '>   • Writing more',
  '>   • Learning continuously',
  '',
  '> Hidden message:',
  '>   Curiosity usually leads somewhere interesting.',
  '',
  '> Suggested command:',
  '>   contact kapil',
];

export default function SecretPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono py-24">
      <motion.div
        className="w-full max-w-lg space-y-1"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                x: -10,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.2,
                },
              },
            }}
            className={`text-sm ${
              line.startsWith('>')
                ? 'text-green-400'
                : 'text-transparent'
            }`}
          >
            {line || '‎'}
          </motion.p>
        ))}

        <motion.div
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.5,
              },
            },
          }}
          className="pt-8 flex flex-col gap-3"
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-flex items-center gap-2 text-sm border border-green-700 text-green-400 px-4 py-2 rounded-lg hover:bg-green-950 transition-colors w-fit"
          >
            {PERSONAL.email}
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