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
      {/* Availability badge — DESIGN.md: mono, success color, no scale pulse */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.04em',
          color: 'var(--success)',
          background: 'var(--success-subtle)',
          border: '1px solid var(--success)',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--success)',
            animation: 'pulse-opacity 2s ease-in-out infinite',
          }}
        />
        Available for new opportunities
      </motion.div>

      {/* Hero header — identity left, Now status card right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 flex flex-col-reverse md:flex-row md:items-start justify-between gap-6"
      >
        {/* Left — identity */}
        <div className="space-y-2">
          <h1
            className="text-3xl md:text-4xl tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {PERSONAL.name}
          </h1>
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}
          >
            {PERSONAL.title}
          </p>
          <div
            className="flex items-center gap-1 text-xs select-none"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
          >
            <MapPin size={12} />
            <span>{PERSONAL.location}</span>
          </div>
        </div>

        {/* Right — "Now" status card (easter egg: 7 clicks in 5s) */}
        <div className="relative shrink-0 self-start">
          <div
            onClick={handleAvatarClick}
            className="rounded-lg cursor-pointer select-none"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              padding: 'var(--space-5) var(--space-6)',
              minWidth: '180px',
            }}
          >
            <p
              className="mb-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Now
            </p>
            <ul className="space-y-1.5">
              {['Building products', 'Writing', 'Open source'].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--text-tertiary)' }}>·</span>
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
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded whitespace-nowrap transition-colors"
                style={{
                  color: 'var(--accent)',
                  border: '1px solid var(--accent-border)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Resume.pdf
              </motion.a>
            )}
          </AnimatePresence>
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
          className="inline-flex items-center gap-2 transition-all active:scale-[0.98]"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '6px',
            background: 'var(--accent)',
            color: 'var(--text-inverse)',
            border: '1px solid var(--accent)',
            transition: 'background 120ms ease, border-color 120ms ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
          }}
        >
          <FileText size={15} />
          Resume
        </a>

        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-all active:scale-[0.98]"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '6px',
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-default)',
            transition: 'border-color 120ms ease, color 120ms ease, background 120ms ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          <GithubIcon size={15} />
          GitHub
        </a>

        <a
          href={`mailto:${PERSONAL.email}`}
          onClick={() => trackEvent('contact_click', { source: 'Professional Hero' })}
          className="inline-flex items-center gap-2 transition-all active:scale-[0.98]"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '6px',
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-default)',
            transition: 'border-color 120ms ease, color 120ms ease, background 120ms ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
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
        className="mt-6 text-sm leading-relaxed max-w-lg"
        style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
      >
        {PERSONAL.bio}
      </motion.p>
    </section>
  );
}
