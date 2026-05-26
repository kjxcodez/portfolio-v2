'use client';

import { motion } from 'motion/react';
import { MapPin, FileText, Mail, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PERSONAL, RESUME_URL } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

export function Hero() {
  return (
    <section className="flex flex-col w-full pt-8 pb-2">
      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono select-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Available for new opportunities
      </motion.div>

      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 flex flex-col-reverse md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Hi, I&apos;m {PERSONAL.name}
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-400 font-mono">
            {PERSONAL.title}
          </p>
          <div className="flex items-center gap-1 text-sm text-zinc-500 font-mono select-none">
            <MapPin size={14} />
            <span>{PERSONAL.location}</span>
          </div>
        </div>

        {/* Abstract design element / logo container */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl relative select-none shrink-0">
          <span className="text-3xl font-extrabold text-white">K</span>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center gap-3 mt-6"
      >
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('resume_click', { source: 'Professional Hero' })}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <FileText size={15} />
          Resume
        </a>

        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <GithubIcon size={15} />
          GitHub
        </a>

        <a
          href={`mailto:${PERSONAL.email}`}
          onClick={() => trackEvent('contact_click', { source: 'Professional Hero' })}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Mail size={15} />
          Contact
        </a>
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-6 text-sm text-zinc-400 leading-relaxed max-w-lg"
      >
        {PERSONAL.bio}
      </motion.p>
    </section>
  );
}
