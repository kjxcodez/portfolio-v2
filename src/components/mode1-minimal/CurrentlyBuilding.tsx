'use client';

import { motion } from 'motion/react';
import { Hammer, ExternalLink } from 'lucide-react';
import { CURRENTLY_BUILDING } from '@/lib/data';

export function CurrentlyBuilding() {
  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <h2 className="uppercase flex items-center gap-2 font-mono [font-size:var(--text-xs)] tracking-[0.1em] text-muted-foreground">
        <Hammer size={13} className="text-amber-500" />
        Currently Building
      </h2>

      <div className="flex flex-col w-full gap-2">
        {CURRENTLY_BUILDING.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="flex items-start justify-between gap-3 p-3 rounded-xl transition-colors duration-150 bg-(--bg-surface) border border hover:bg-(--bg-elevated)] hover:border-[var(--border-strong)]"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium font-ui text-(--text-primary)">
                  {item.title}
                </p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-900/40 text-amber-400 border border-amber-800/50">
                  {item.status}
                </span>
              </div>
              <p className="text-xs font-ui text-[var(--text-secondary)]">
                {item.description}
              </p>
            </div>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 transition-colors mt-0.5 text-muted-foreground hover:text-[var(--text-secondary)]"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
