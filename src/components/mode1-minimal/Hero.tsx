'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';

const TITLE_CYCLE = [
  'a human',
  'probably debugging',
  'your next hire',
  'a coffee addict',
  'an open source nerd',
];

interface HeroProps {
  name: string;
  title: string;
  location: string;
  githubUrl: string;
  available: boolean;
  email: string;
}

export function Hero({ name, title, location, githubUrl, available, email }: HeroProps) {
  const [cycleIdx, setCycleIdx] = useState<number | null>(null);
  const [dotTip, setDotTip] = useState(false);

  function handleNameClick() {
    const next = cycleIdx === null ? 0 : cycleIdx + 1;
    if (next >= TITLE_CYCLE.length) {
      setCycleIdx(null);
    } else {
      setCycleIdx(next);
    }
  }

  const displayTitle = cycleIdx !== null ? TITLE_CYCLE[cycleIdx] : null;

  return (
    <section className="flex flex-col w-full pt-4">
      {/* Available / contact row */}
      <div className="flex items-center justify-end w-full my-3">
        <div className="relative">
          <button
            onClick={() => setDotTip((v) => !v)}
            className="text-xs flex items-center gap-2 justify-center border p-1 rounded-xl px-5 dark:bg-black dark:hover:bg-zinc-950 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {available && (
              <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full animate-pulse" />
            )}
            {available ? 'Available for work' : 'Not available'}
          </button>
          <AnimatePresence>
            {dotTip && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-10 z-50 text-xs bg-black border border-zinc-700 text-zinc-300 rounded-lg px-3 py-2 whitespace-nowrap shadow-lg"
              >
                Yes, seriously.{' '}
                <a href={`mailto:${email}`} className="text-sky-400 hover:underline">
                  Email me.
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main hero content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start justify-start relative"
      >
        <button
          onClick={handleNameClick}
          className="font-bold text-2xl text-left hover:opacity-80 transition-opacity cursor-pointer"
          title="Click me"
        >
          Hi, I am {name.split(' ')[0]}
        </button>

        <div className="font-thin dark:text-zinc-300 text-md mt-1 min-h-[1.5rem]">
          <AnimatePresence mode="wait">
            {displayTitle ? (
              <motion.span
                key={displayTitle}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-sky-700 dark:text-sky-400"
              >
                {displayTitle}
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold text-sky-700 dark:text-sky-400">
                  Open Source Contributor
                </span>{' '}
                and a{' '}
                <span className="font-bold text-sky-700 dark:text-sky-400">
                  Full Stack Developer
                </span>
                , {title.split(',').slice(1).join(',').trim() || 'building things for the web.'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-3 font-thin dark:text-zinc-300 text-sm flex items-center gap-1.5">
          <MapPin size={13} className="text-zinc-500" />
          {location}
        </p>

        {/* Glow */}
        <span
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/20 to-pink-500/20 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-3 mt-6"
      >
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm border px-4 py-1.5 rounded-xl dark:hover:bg-zinc-900 hover:bg-slate-100 transition-colors"
        >
          <GithubIcon size={15} />
          GitHub
        </a>
      </motion.div>
    </section>
  );
}
