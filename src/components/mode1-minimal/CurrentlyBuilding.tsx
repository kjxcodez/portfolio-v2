'use client';

import { motion } from 'motion/react';
import { Hammer, ExternalLink } from 'lucide-react';

// Update this manually as you start new things
const CURRENT: { title: string; description: string; url?: string; status: string }[] = [
  {
    title: 'kapil-portfolio',
    description: 'This portfolio — 5 modes, RPG world, macOS desktop, terminal OS. You\'re looking at it.',
    url: 'https://github.com/kjxcodez',
    status: 'In progress',
  },
  {
    title: 'Percept UI v2',
    description: 'Rebuilding the component library with Tailwind v4 and React 19 server components.',
    status: 'Early design',
  },
]

export function CurrentlyBuilding() {
  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <h2 className="font-semibold text-sm flex items-center gap-2">
        <Hammer size={13} className="text-amber-500" />
        CURRENTLY BUILDING
      </h2>

      <div className="flex flex-col w-full gap-2">
        {CURRENT.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="flex items-start justify-between gap-3 p-3 border rounded-xl dark:bg-black/70 hover:dark:bg-zinc-950 hover:bg-slate-50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium">{item.title}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-900/40 text-amber-400 border border-amber-800/50">
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500">{item.description}</p>
            </div>
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="shrink-0 hover:opacity-70 transition-opacity mt-0.5">
                <ExternalLink size={13} className="text-zinc-600" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
