'use client';

import { GitMerge, GitPullRequest, CircleDot, X } from 'lucide-react';
import type { Contribution } from '@/types/portfolio';

const STATUS_CONFIG = {
  Merged: {
    icon: GitMerge,
    label: 'Merged',
    className: 'text-purple-400 bg-purple-950 border-purple-800',
  },
  Open: {
    icon: GitPullRequest,
    label: 'Open',
    className: 'text-green-400 bg-green-950 border-green-800',
  },
  Closed: {
    icon: X,
    label: 'Closed',
    className: 'text-zinc-400 bg-zinc-800 border-zinc-700',
  },
};

interface ContributionCardProps {
  contribution: Contribution;
  variant?: 'default' | 'glass';
}

export function ContributionCard({ contribution, variant = 'default' }: ContributionCardProps) {
  const { icon: StatusIcon, label, className } = STATUS_CONFIG[contribution.status];

  const base =
    variant === 'glass'
      ? 'flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-colors'
      : 'flex items-start gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors';

  return (
    <a
      href={contribution.url}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
    >
      <div className="mt-0.5 shrink-0">
        {contribution.type === 'Issue' ? (
          <CircleDot size={16} className="text-zinc-500" />
        ) : (
          <GitPullRequest size={16} className="text-zinc-500" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium leading-snug truncate">{contribution.title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{contribution.repo}</p>
        {contribution.description && (
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{contribution.description}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${className}`}
        >
          <StatusIcon size={10} />
          {label}
        </span>
        <span className="text-[11px] text-zinc-600">{contribution.date}</span>
      </div>
    </a>
  );
}
