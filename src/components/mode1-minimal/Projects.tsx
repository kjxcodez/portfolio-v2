'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PROJECTS } from '@/lib/data';

export function Projects() {
  const sorted = [...PROJECTS].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <h2 className="font-semibold text-sm">RECENT PROJECTS</h2>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-3">
        {sorted.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.07, duration: 0.4 }}
            className="flex flex-col col-span-1 overflow-hidden rounded-xl border w-full backdrop-blur-xl dark:bg-black/70 hover:dark:bg-zinc-950 hover:bg-slate-50 transition-all hover:scale-[1.02] duration-300"
          >
            <div className="flex flex-col items-start px-4 py-4 gap-2 w-full">
              <div className="flex items-start justify-between w-full gap-2">
                <Link href={`/projects/${project.id}`} className="font-bold text-sm leading-snug hover:underline">
                  {project.title}
                </Link>
                <div className="flex items-center gap-3 shrink-0">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      <SquareArrowOutUpRight size={15} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      <GithubIcon size={17} />
                    </a>
                  )}
                </div>
              </div>

              <p className="opacity-70 text-xs leading-relaxed">
                {project.description.length > 120
                  ? project.description.slice(0, 120) + '…'
                  : project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-full border dark:border-zinc-700 border-zinc-200 dark:text-zinc-400 text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full dark:text-zinc-600 text-zinc-400">
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex w-full items-center justify-end gap-2 text-sm">
        More on{' '}
        <a
          href="https://github.com/kjxcodez?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:underline text-sky-500"
        >
          GitHub <SquareArrowOutUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
