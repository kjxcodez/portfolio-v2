'use client';

import { GitMerge, GitPullRequest, CircleDot, X } from 'lucide-react';
import type { Contribution } from '@/types/portfolio';

const STATUS_CONFIG = {
  Merged: {
    icon: GitMerge,
    label: 'Merged',
    style: { color: 'var(--accent)', background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)' },
  },
  Open: {
    icon: GitPullRequest,
    label: 'Open',
    style: { color: 'var(--success)', background: 'var(--success-subtle)', border: '1px solid var(--success)' },
  },
  Closed: {
    icon: X,
    label: 'Closed',
    style: { color: 'var(--text-tertiary)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' },
  },
};

interface ContributionCardProps {
  contribution: Contribution;
  variant?: 'default' | 'glass';
}

export function ContributionCard({ contribution, variant = 'default' }: ContributionCardProps) {
  void variant; // variant preserved for API compat
  const { icon: StatusIcon, label, style: statusStyle } = STATUS_CONFIG[contribution.status];

  return (
    <a
      href={contribution.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-lg transition-all duration-150"
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
      <div className="mt-0.5 shrink-0">
        {contribution.type === 'Issue' ? (
          <CircleDot size={15} style={{ color: 'var(--text-tertiary)' }} />
        ) : (
          <GitPullRequest size={15} style={{ color: 'var(--text-tertiary)' }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium leading-snug truncate"
          style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
        >
          {contribution.title}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}
        >
          {contribution.repo}
        </p>
        {contribution.description && (
          <p
            className="text-xs mt-1 line-clamp-1"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
          >
            {contribution.description}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span
          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded"
          style={{ fontFamily: 'var(--font-mono)', ...statusStyle }}
        >
          <StatusIcon size={10} />
          {label}
        </span>
        <span
          className="text-[11px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          {contribution.date}
        </span>
      </div>
    </a>
  );
}
