'use client';

import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { CONTRIBUTIONS } from '@/lib/data';

const STATUS_STYLE = {
  Merged: 'bg-purple-900/60 text-purple-300 border-purple-700',
  Open:   'bg-green-900/60  text-green-300  border-green-700',
  Closed: 'bg-zinc-800      text-zinc-400   border-zinc-600',
};

export function OpenSource() {
  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <h2 className="font-semibold text-sm">
        OPEN SOURCE{' '}
        <span className="text-zinc-500 font-normal">({CONTRIBUTIONS.length})</span>
      </h2>

      <div className="flex flex-col w-full gap-2">
        {CONTRIBUTIONS.map((c, idx) => (
          <motion.a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.35 }}
            className="flex items-start gap-3 p-3 border rounded-xl dark:bg-black/70 dark:shadow-slate-800 shadow-slate-200 shadow-sm hover:dark:bg-zinc-950 hover:bg-slate-50 hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate hover:underline">{c.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{c.repo}</p>
                </div>
                <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLE[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <MessageSquare size={11} />
                  {c.type}
                </span>
                <span>{c.date}</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
