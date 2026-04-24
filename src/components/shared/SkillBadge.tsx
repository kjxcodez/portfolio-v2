'use client';

import type { Skill } from '@/types/portfolio';

// Simple icon mapping using text/emoji as fallback until proper icon lib integration
const ICON_MAP: Record<string, string> = {
  html5: 'HTML',
  css3: 'CSS',
  javascript: 'JS',
  typescript: 'TS',
  react: 'React',
  nextjs: 'Next',
  tailwind: 'TW',
  nodejs: 'Node',
  python: 'Py',
  express: 'Exp',
  mongodb: 'Mongo',
  postgres: 'PG',
  prisma: 'Prisma',
  supabase: 'SB',
  git: 'Git',
  vscode: 'VSC',
};

const LEVEL_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Learning',
  2: 'Proficient',
  3: 'Expert',
};

const LEVEL_COLOR: Record<1 | 2 | 3, string> = {
  1: 'bg-zinc-600',
  2: 'bg-blue-500',
  3: 'bg-emerald-500',
};

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const base = 'flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors';

  return (
    <div className={base}>
      <span className="text-xs font-mono font-bold text-zinc-300 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700">
        {ICON_MAP[skill.icon] ?? skill.name.slice(0, 2)}
      </span>
      <span className="text-xs text-zinc-400 text-center leading-tight">{skill.name}</span>
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium ${LEVEL_COLOR[skill.level]}`}
      >
        {LEVEL_LABEL[skill.level]}
      </span>
    </div>
  );
}
