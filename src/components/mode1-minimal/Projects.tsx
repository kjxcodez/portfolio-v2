'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { MobileProjectCard } from './MobileProjectCard';
import { PROJECTS } from '@/lib/data';
import type { Project } from '@/types/portfolio';

// ─── Web / Tool / Extension / Language compact card ─────────────────
function WebProjectCard({ project, idx }: { project: Project; idx: number }) {
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
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
                className="transition-colors"
              >
                <SquareArrowOutUpRight size={13} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
                className="transition-colors"
              >
                <GithubIcon size={14} />
              </a>
            )}
          </div>
        </div>

        <p
          className="text-xs leading-relaxed"
          style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-1">
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
      </div>
    </motion.div>
  );
}

// ─── Featured projects ───────────────────────────────────────────────
export function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <h2
        className="uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
        }}
      >
        Featured Projects
      </h2>

      <div className="flex flex-col w-full gap-4">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="group relative rounded-lg transition-colors duration-150"
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
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-base font-medium transition-colors"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  >
                    {project.title}
                  </Link>
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
                <div className="flex items-center gap-2 shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                      style={{ color: 'var(--text-tertiary)' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                        (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <SquareArrowOutUpRight size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                      style={{ color: 'var(--text-tertiary)' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                        (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
              >
                {project.longDescription.length > 200
                  ? project.longDescription.slice(0, 200) + '…'
                  : project.longDescription}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.04em',
                      color: 'var(--tag-text)',
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--tag-border)',
                      padding: '2px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Other projects ──────────────────────────────────────────────────
export function OtherProjects() {
  const other = PROJECTS.filter((p) => !p.featured);

  if (other.length === 0) return null;

  return (
    <div className="flex flex-col items-start w-full my-4 gap-4">
      <h2
        className="uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
        }}
      >
        Other Projects
      </h2>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-3">
        {other.map((project, idx) =>
          project.type === 'mobile' ? (
            <MobileProjectCard key={project.id} project={project} idx={idx} />
          ) : (
            <WebProjectCard key={project.id} project={project} idx={idx} />
          )
        )}
      </div>

      <div className="flex w-full items-center justify-end text-sm">
        <a
          href="https://github.com/kjxcodez?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors"
          style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
        >
          More on GitHub <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
