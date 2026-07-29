"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  SquareArrowOutUpRight,
  ArrowRight,
  Smartphone,
  Wrench,
  Code2,
  Globe,
  Puzzle,
} from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { MobileProjectCard } from "./MobileProjectCard";
import { PROJECTS } from "@/lib/data";
import type { Project, ProjectType } from "@/types/portfolio";

// ─── Type badge ──────────────────────────────────────────────────
const TYPE_LABEL: Record<ProjectType, string> = {
  web: "Web App",
  mobile: "Mobile App",
  tool: "Developer Tool",
  extension: "VS Code Extension",
  language: "Language",
};

const TYPE_ICON: Record<ProjectType, React.ReactNode> = {
  web: <Globe size={9} />,
  mobile: <Smartphone size={9} />,
  tool: <Wrench size={9} />,
  extension: <Puzzle size={9} />,
  language: <Code2 size={9} />,
};

function TypeBadge({ type }: { type: ProjectType }) {
  return (
    <span className="inline-flex items-center gap-1 rounded font-mono text-[10px] tracking-[0.04em] text-muted-foreground bg-(--bg-elevated)] border border px-1.5 py-0.5">
      {TYPE_ICON[type]}
      {TYPE_LABEL[type]}
    </span>
  );
}

// ─── Web / Tool / Extension / Language compact card ─────────────────
function WebProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardImage = project.image || project.screenshots?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.06, duration: 0.35 }}
      className="flex flex-col rounded-lg transition-colors duration-150 bg-(--bg-surface) border border hover:border-(--accent-border) overflow-hidden"
    >
      {cardImage && (
        <div className="w-full aspect-video overflow-hidden border-b border-[var(--border-default)] relative bg-zinc-950/20">
          <img
            src={cardImage}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
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
                className="absolute left-0 -bottom-1 h-[1px] w-full origin-left bg-[var(--accent)]"
              />
            </Link>
          </motion.div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono [font-size:var(--text-xs)] text-muted-foreground tracking-[0.04em]">
              {project.year}
            </span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-[var(--text-secondary)]"
              >
                <SquareArrowOutUpRight size={13} />
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
          </div>
        </div>

        <TypeBadge type={project.type} />

        <p className="text-xs leading-relaxed font-ui text-[var(--text-secondary)]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-1">
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
      </div>
    </motion.div>
  );
}

// ─── Featured projects ───────────────────────────────────────────────
export function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <h2 className="uppercase font-mono [font-size:var(--text-xs)] tracking-[0.1em] text-foreground/60 font-semibold">
        Featured Projects
      </h2>

      <div className="flex flex-col w-full gap-3">
        {featured.map((project, idx) => {
          const cardImage = project.image || project.screenshots?.[0];
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="group relative rounded-lg transition-colors duration-150 bg-(--bg-surface) border border hover:border-(--accent-border) overflow-hidden"
            >
              {cardImage && (
                <div className="w-full aspect-video overflow-hidden border-b border-[var(--border-default)] relative bg-zinc-950/20">
                  <img
                    src={cardImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
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
                          className="absolute left-0 -bottom-1 h-[1px] w-full origin-left bg-[var(--accent)]"
                        />
                      </Link>
                    </motion.div>
                    <span className="font-mono [font-size:var(--text-xs)] text-muted-foreground tracking-[0.04em] shrink-0">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded flex items-center justify-center transition-colors text-muted-foreground hover:text-(--text-primary) hover:bg-(--bg-elevated)]"
                    >
                      <SquareArrowOutUpRight size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded flex items-center justify-center transition-colors text-muted-foreground hover:text-(--text-primary) hover:bg-(--bg-elevated)]"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Type badge */}
              <div className="mb-3">
                <TypeBadge type={project.type} />
              </div>

              {/* Short description */}
              <p className="text-sm leading-relaxed mb-3 font-ui text-[var(--text-secondary)]">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded font-mono [font-size:var(--text-xs)] tracking-[0.04em] text-[var(--tag-text)] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View details */}
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1 text-xs transition-colors font-mono text-muted-foreground hover:text-(--accent)"
              >
                View details <ArrowRight size={11} />
              </Link>
            </div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
}

// ─── Other projects ──────────────────────────────────────────────────
export function OtherProjects() {
  const other = PROJECTS.filter((p) => !p.featured);
  if (other.length === 0) return null;

  return (
    <div className="flex flex-col items-start w-full my-4 gap-4">
      <h2 className="uppercase font-mono [font-size:var(--text-xs)] tracking-[0.1em] text-foreground/60 font-semibold">
        Other Projects
      </h2>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-3">
        {other.map((project, idx) =>
          project.type === "mobile" ? (
            <MobileProjectCard key={project.id} project={project} idx={idx} />
          ) : (
            <WebProjectCard key={project.id} project={project} idx={idx} />
          ),
        )}
      </div>

      <div className="flex w-full items-center justify-end text-sm">
        <a
          href="https://github.com/kjxcodez?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors font-ui text-muted-foreground hover:text-[var(--text-secondary)]"
        >
          More on GitHub <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
