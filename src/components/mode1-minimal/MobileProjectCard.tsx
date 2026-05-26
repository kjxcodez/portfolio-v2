'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, Smartphone } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import type { Project } from '@/types/portfolio';

interface MobileProjectCardProps {
  project: Project;
  idx: number;
}

export function MobileProjectCard({ project, idx }: MobileProjectCardProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const screenshots = project.screenshots ?? [];

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setCurrent(next);
  }

  function prev() {
    goTo(current === 0 ? screenshots.length - 1 : current - 1, -1);
  }

  function next() {
    goTo(current === screenshots.length - 1 ? 0 : current + 1, 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: idx * 0.06, duration: 0.35 }}
      className="flex flex-col rounded-lg overflow-hidden transition-colors duration-150"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
      }}
    >
      {/* Screenshot carousel */}
      {screenshots.length > 0 ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--bg-elevated)' }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={screenshots[current]}
              alt={`${project.title} screenshot ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              custom={direction}
              initial={{ x: direction * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -40, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </AnimatePresence>

          {screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                style={{ background: 'var(--bg-overlay)', color: 'var(--text-primary)' }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                style={{ background: 'var(--bg-overlay)', color: 'var(--text-primary)' }}
              >
                <ChevronRight size={14} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ background: i === current ? 'var(--accent)' : 'var(--border-strong)' }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center gap-2 py-8"
          style={{
            background: 'var(--bg-elevated)',
            borderBottom: '1px dashed var(--border-default)',
          }}
        >
          <Smartphone size={24} style={{ color: 'var(--text-tertiary)' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
            }}
          >
            Screenshots coming soon
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title + year + platform badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className="text-sm font-medium"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
            >
              {project.title}
            </span>
            <span
              className="ml-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.04em',
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Platform badge */}
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px]"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
            }}
          >
            <Smartphone size={10} />
            Android
          </span>
        </div>

        {/* Description */}
        <p
          className="text-xs leading-relaxed"
          style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.04em',
                color: 'var(--tag-text)',
                background: 'var(--tag-bg)',
                border: '1px solid var(--tag-border)',
                padding: '1px 6px',
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              className="text-[10px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action links */}
        <div className="flex items-center gap-2 pt-1">
          {project.apkUrl && (
            <a
              href={project.apkUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{
                fontFamily: 'var(--font-ui)',
                background: 'var(--accent)',
                color: 'var(--text-inverse)',
                border: '1px solid var(--accent)',
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
              <Download size={12} />
              APK
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-secondary)',
                background: 'transparent',
                border: '1px solid var(--border-default)',
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
              <GithubIcon size={12} />
              GitHub
            </a>
          )}

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-secondary)',
                background: 'transparent',
                border: '1px solid var(--border-default)',
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
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
