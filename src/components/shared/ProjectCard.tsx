'use client';

import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import type { Project } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const base = 'rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors';

  return (
    <div className={base}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-semibold text-base truncate">{project.title}</h3>
            {project.featured && (
              <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300 font-medium">
                Featured
              </span>
            )}
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
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
            className="inline-flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white transition-colors"
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
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <GithubIcon size={14} />
            Source
          </a>
        )}
        <span className="ml-auto text-xs text-zinc-600">{project.year}</span>
      </div>
    </div>
  );
}
