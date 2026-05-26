'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Download, Smartphone } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import type { Project } from '@/types/portfolio';

interface MobileProjectCardProps {
  project: Project;
  idx: number;
}

export function MobileProjectCard({ project, idx }: MobileProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: idx * 0.06, duration: 0.35 }}
      className="flex flex-col rounded-lg transition-colors duration-150 bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent-border)]"
    >
      <div className="p-4 flex flex-col gap-2">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-medium transition-colors [font-family:var(--font-ui)] text-[var(--text-primary)] hover:text-[var(--accent)]"
          >
            {project.title}
          </Link>
          <span className="[font-family:var(--font-mono)] [font-size:var(--text-xs)] text-[var(--text-tertiary)] tracking-[0.04em] shrink-0">
            {project.year}
          </span>
        </div>

        {/* Type + status badges */}
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded [font-family:var(--font-mono)] text-[10px] tracking-[0.04em] bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)] px-1.5 py-0.5">
            <Smartphone size={9} />
            Mobile App
          </span>
          {project.status && (
            <span className="rounded [font-family:var(--font-mono)] text-[10px] tracking-[0.04em] text-[var(--text-tertiary)] bg-[var(--bg-elevated)] border border-[var(--border-default)] px-1.5 py-0.5">
              {project.status}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed [font-family:var(--font-ui)] text-[var(--text-secondary)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded [font-family:var(--font-mono)] text-[10px] tracking-[0.04em] text-[var(--tag-text)] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] [font-family:var(--font-mono)] text-[var(--text-tertiary)]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {project.apkUrl && (
            <a
              href={project.apkUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors [font-family:var(--font-ui)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] border border-[var(--accent)] hover:border-[var(--accent-hover)]"
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
              className="transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            >
              <GithubIcon size={14} />
            </a>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="ml-auto text-[11px] transition-colors [font-family:var(--font-mono)] text-[var(--text-tertiary)] hover:text-[var(--accent)]"
          >
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
