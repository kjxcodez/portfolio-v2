"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Download, Smartphone } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import type { Project } from "@/types/portfolio";

interface MobileProjectCardProps {
  project: Project;
  idx: number;
}

export function MobileProjectCard({ project, idx }: MobileProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.06, duration: 0.35 }}
      className="flex flex-col rounded-lg transition-colors duration-150 bg-(--bg-surface) border hover:border-(--accent-border)"
    >
      <div className="p-4 flex flex-col gap-2">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <motion.div
            initial="rest"
            whileHover="hover"
            className="relative w-fit"
          >
            <Link
              href={`/projects/${project.id}`}
              className="relative text-sm font-medium font-ui text-(--text-primary) hover:font-bold transition-all duration-400"
            >
              {project.title}
              <motion.span
                variants={{
                  rest: {
                    scaleX: 0,
                    opacity: 0,
                  },
                  hover: {
                    scaleX: 1,
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 -bottom-1 h-[1px] w-full origin-left bg-blue-500"
              />
            </Link>
          </motion.div>
          <span className="font-mono [font-size:var(--text-xs)] text-muted-foreground tracking-[0.04em] shrink-0">
            {project.year}
          </span>
        </div>

        {/* Type + status badges */}
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded font-mono text-[10px] tracking-[0.04em] bg-(--accent-subtle) text-muted-foreground border px-1.5 py-0.5">
            <Smartphone size={9} />
            Mobile App
          </span>
          {project.status && (
            <span className="rounded font-mono text-[10px] tracking-[0.04em] text-muted-foreground bg-(--bg-elevated)] border px-1.5 py-0.5">
              {project.status}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed font-ui text-[var(--text-secondary)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded font-mono text-[10px] tracking-[0.04em] text-[var(--tag-text)] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] font-mono text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {project.apkUrl && (
            <a
              href={project.apkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors font-ui bg-foreground hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] border border-[var(--accent)] hover:border-[var(--accent-hover)]"
            >
              <Download size={12} />
              APK
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-muted-foreground hover:text-[var(--text-secondary)]"
            >
              <GithubIcon size={14} />
            </a>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="ml-auto text-[11px] transition-colors font-mono text-muted-foreground hover:text-(--accent)"
          >
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
