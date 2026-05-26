'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PROJECTS } from '@/lib/data';

export function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
        Featured Projects
      </h2>

      <div className="flex flex-col w-full gap-4">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300"
          >
            {/* Gradient accent top bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-lg font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    {project.title}
                  </Link>
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <SquareArrowOutUpRight size={15} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {project.longDescription.length > 200
                  ? project.longDescription.slice(0, 200) + '…'
                  : project.longDescription}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-zinc-700/50 text-zinc-500 bg-zinc-800/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function OtherProjects() {
  const other = PROJECTS.filter((p) => !p.featured);

  if (other.length === 0) return null;

  return (
    <div className="flex flex-col items-start w-full my-4 gap-4">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
        Other Projects
      </h2>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-3">
        {other.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.35 }}
            className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200"
          >
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-medium text-sm text-zinc-200 hover:text-white transition-colors"
                >
                  {project.title}
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors">
                      <SquareArrowOutUpRight size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors">
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-1">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded-full border border-zinc-800 text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-[10px] text-zinc-700">+{project.tags.length - 4}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex w-full items-center justify-end text-sm">
        <a
          href="https://github.com/kjxcodez?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          More on GitHub <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
