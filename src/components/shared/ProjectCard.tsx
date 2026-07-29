'use client';

import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import type { Project } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardImage = project.image || project.screenshots?.[0];

  return (
    <div
      className="flex flex-col gap-4 rounded-lg p-6 transition-all duration-150"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {cardImage && (
        <div className="w-full aspect-video rounded-md overflow-hidden border border-white/5 relative bg-zinc-950/20 shrink-0">
          <img
            src={cardImage}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="font-medium text-base truncate"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            {project.featured && (
              <span
                className="shrink-0 rounded"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.04em',
                  color: 'var(--accent)',
                  background: 'var(--accent-subtle)',
                  border: '1px solid var(--accent-border)',
                  padding: '1px 6px',
                }}
              >
                Featured
              </span>
            )}
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
          >
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 5).map((tag) => (
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
        {project.tags.length > 5 && (
          <span
            className="rounded"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              padding: '2px 6px',
            }}
          >
            +{project.tags.length - 5}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            <GithubIcon size={14} />
            Source
          </a>
        )}
        <span
          className="ml-auto"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}
        >
          {project.year}
        </span>
      </div>
    </div>
  );
}
