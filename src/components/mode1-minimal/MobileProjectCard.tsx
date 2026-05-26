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
      className="flex flex-col rounded-lg transition-colors duration-150"
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
      <div className="p-4 flex flex-col gap-2">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-medium transition-colors"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
          >
            {project.title}
          </Link>
          <div className="flex items-center gap-2 shrink-0">
            <span
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
        </div>

        {/* Type badge */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 rounded"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.04em',
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              padding: '1px 6px',
            }}
          >
            <Smartphone size={9} />
            Mobile App
          </span>
          {project.status && (
            <span
              className="rounded"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.04em',
                color: 'var(--text-tertiary)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                padding: '1px 6px',
              }}
            >
              {project.status}
            </span>
          )}
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

        {/* Actions */}
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
              className="inline-flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
            >
              <GithubIcon size={14} />
            </a>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="ml-auto text-[11px] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
          >
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
