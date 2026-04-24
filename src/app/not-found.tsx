'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const LINES = [
  '$ cd /page-you-wanted',
  'bash: cd: /page-you-wanted: No such file or directory',
  '',
  '$ ls /',
  'modes/  blog/  projects/  now/  uses/  secret/',
  '',
  '$ echo "Did you mean: /hire-kapil ?"',
  'Did you mean: /hire-kapil ?',
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono">
      <motion.div
        className="w-full max-w-lg"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        <motion.p
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-zinc-600 text-xs mb-6"
        >
          404
        </motion.p>

        {LINES.map((line, i) => (
          <motion.p
            key={i}
            variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.2 } } }}
            className={`text-sm leading-relaxed ${
              line.startsWith('$') ? 'text-green-400' :
              line.startsWith('bash:') ? 'text-red-400' :
              line === '' ? 'h-3' :
              'text-zinc-300'
            }`}
          >
            {line || '\u200b'}
          </motion.p>
        ))}

        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.8 } } }}
          className="mt-8 flex gap-3"
        >
          <Link
            href="/"
            className="text-xs border border-zinc-700 text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            ← Go home
          </Link>
          <Link
            href="/blog"
            className="text-xs border border-zinc-700 text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            Read the blog
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
