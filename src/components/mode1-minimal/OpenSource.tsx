'use client';

import { motion } from 'motion/react';
import { GitPullRequest, MessageSquare, GitMerge } from 'lucide-react';
import { CONTRIBUTIONS } from '@/lib/data';

const STATUS_STYLE = {
  Merged: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Open:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Closed: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
};

const STATUS_ICON = {
  Merged: GitMerge,
  Open: GitPullRequest,
  Closed: GitPullRequest,
};

export function OpenSource() {
  const mergedCount = CONTRIBUTIONS.filter(c => c.status === 'Merged').length;

  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
          Open Source{' '}
          <span className="text-zinc-600 font-normal">({CONTRIBUTIONS.length})</span>
        </h2>
        <span className="text-xs text-zinc-600">
          {mergedCount} merged
        </span>
      </div>

      <div className="flex flex-col w-full gap-2">
        {CONTRIBUTIONS.map((c, idx) => {
          const StatusIcon = STATUS_ICON[c.status];
          return (
            <motion.a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              className="group flex items-start gap-3 p-3 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200"
            >
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate transition-colors">
                      {c.title}
                    </p>
                    <p className="text-xs text-zinc-600 mt-0.5">{c.repo}</p>
                  </div>
                  <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${STATUS_STYLE[c.status]}`}>
                    <StatusIcon size={10} />
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-zinc-600 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={10} />
                    {c.type}
                  </span>
                  <span>{c.date}</span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
