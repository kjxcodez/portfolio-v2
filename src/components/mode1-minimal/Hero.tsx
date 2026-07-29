'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { MapPin, FileText, Mail } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PERSONAL, RESUME_URL } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';
import { dispatchAchievement } from '@/lib/easter-eggs';

export function Hero() {
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [showResume, setShowResume] = useState(false)

  function handleAvatarClick() {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 5000)
    if (clickCount.current >= 7) {
      clickCount.current = 0
      dispatchAchievement('avatar-click', 'Persistent Human')
      setShowResume(true)
      setTimeout(() => setShowResume(false), 5000)
    }
  }

  return (
    <section className="flex flex-col w-full pt-8 pb-2">
      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded font-mono text-xs tracking-[0.04em] text-(--success) bg-(--success-subtle) border border-(--success)"
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-(--success)" />
        Available for new opportunities
      </motion.div>

      {/* Hero header — identity left, Now status card right (staggered) */}
      <div className="mt-6 flex flex-col-reverse md:flex-row md:items-start justify-between gap-6">
        {/* Left — identity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="space-y-2"
        >
          <h1 className="text-3xl md:text-4xl tracking-tight leading-tight font-display text-(--text-primary)">
            {PERSONAL.name}
          </h1>
          <p className="text-sm font-mono text-muted-foreground tracking-[0.04em]">
            {PERSONAL.title}
          </p>
          <div className="flex items-center gap-1 text-xs select-none font-mono text-muted-foreground">
            <MapPin size={12} />
            <span>{PERSONAL.location}</span>
          </div>
        </motion.div>

        {/* Right — "Now" status card (easter egg: 7 clicks in 5s) — delayed */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="relative shrink-0 self-start max-md:w-full"
        >
          <div
            onClick={handleAvatarClick}
            className="rounded-lg cursor-pointer select-none bg-(--bg-surface) border border-(--border-default) min-w-45 py-5 px-6"
          >
            <p className="mb-3 font-mono text-xs text-muted-foreground tracking-[0.06em] uppercase">
              Now
            </p>
            <ul className="space-y-1.5">
              {['Building products', 'Writing', 'Open source'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-ui text-(--text-secondary)">
                  <span className="text-muted-foreground">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <AnimatePresence>
            {showResume && (
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded whitespace-nowrap transition-colors font-mono border border-accent"
              >
                Resume.pdf
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="flex flex-wrap items-center gap-3 mt-6"
      >
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('resume_click', { source: 'Professional Hero' })}
          className="inline-flex items-center gap-2 active:scale-[0.98] font-ui text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-accent hover:text-white hover:bg-purple-600"
        >
          <FileText size={15} />
          Resume
        </a>

        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 active:scale-[0.98] font-ui text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-(--border-default) hover:border-(--border-strong) hover:bg-(--bg-elevated)"
        >
          <GithubIcon size={15} />
          GitHub
        </a>

        <a
          href={`mailto:${PERSONAL.email}`}
          onClick={() => trackEvent('contact_click', { source: 'Professional Hero' })}
          className="inline-flex items-center gap-2 active:scale-[0.98] font-ui text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-(--border-default) hover:border-(--border-strong) hover:bg-(--bg-elevated)"
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
        className="mt-6 text-sm leading-relaxed max-w-lg font-ui text-(--text-secondary)"
      >
        {PERSONAL.bio}
      </motion.p>
    </section>
  );
}