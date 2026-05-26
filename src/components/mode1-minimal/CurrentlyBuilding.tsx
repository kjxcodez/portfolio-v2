'use client';

import { motion } from 'motion/react';
import { Hammer, ExternalLink } from 'lucide-react';
import { CURRENTLY_BUILDING } from '@/lib/data';

export function CurrentlyBuilding() {
  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400 flex items-center gap-2">
        <Hammer size={13} className="text-amber-500" />
        Currently Building
      </h2>

      <div className="flex flex-col w-full gap-2">
        {CURRENTLY_BUILDING.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="flex items-start justify-between gap-3 p-3 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-900/40 text-amber-400 border border-amber-800/50">
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500">{item.description}</p>
            </div>
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors mt-0.5">
                <ExternalLink size={13} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
