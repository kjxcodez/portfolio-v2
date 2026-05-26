'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight, ArrowRight, Smartphone, Wrench, Code2, Globe, Puzzle } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { MobileProjectCard } from './MobileProjectCard';
import { PROJECTS } from '@/lib/data';
import type { Project, ProjectType } from '@/types/portfolio';

// ─── Type badge helpers ──────────────────────────────────────────
const TYPE_LABEL: Record<ProjectType, string> = {
  web: 'Web App',
  mobile: 'Mobile App',
  tool: 'Developer Tool',
  extension: 'VS Code Extension',
  language: 'Language',
};

const TYPE_ICON: Record<ProjectType, React.ReactNode> = {
  web: <Globe size={9} />,
  mobile: <Smartphone size={9} />,
  tool: <Wrench size={9} />,
  extension: <Puzzle size={9} />,
  language: <Code2 size={9} />,
};

function TypeBadge({ type }: { type: ProjectType }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded"
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
      {TYPE_ICON[type]}
      {TYPE_LABEL[type]}
    </span>
  );
}

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

        <TypeBadge type={project.type} />

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

      <div className="flex flex-col w-full gap-3">
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
            <div className="p-5">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm font-medium transition-colors truncate"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  >
                    {project.title}
                  </Link>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.04em',
                      flexShrink: 0,
                    }}
                  >
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded flex items-center justify-center transition-colors"
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
                      <SquareArrowOutUpRight size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded flex items-center justify-center transition-colors"
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
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Type badge */}
              <div className="mb-3">
                <TypeBadge type={project.type} />
              </div>

              {/* Short description */}
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
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

              {/* View details link */}
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1 text-xs transition-colors"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
              >
                View details <ArrowRight size={11} />
              </Link>
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
