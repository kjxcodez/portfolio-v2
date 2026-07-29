"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Wrench,
  Puzzle,
  Code2,
} from "lucide-react";
import { PROJECTS } from "@/lib/data";
import type { Project, ProjectType } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<ProjectType, string> = {
  web: "Web App",
  mobile: "Mobile App",
  tool: "Developer Tool",
  extension: "VS Code Extension",
  language: "Language",
};

const TYPE_ICON: Record<ProjectType, React.ReactNode> = {
  web: <Globe size={10} />,
  mobile: <Smartphone size={10} />,
  tool: <Wrench size={10} />,
  extension: <Puzzle size={10} />,
  language: <Code2 size={10} />,
};

type TypeFilter = ProjectType | "all";
type StatusFilter = "all" | "live" | "wip";

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded border font-mono text-[0.625rem] tracking-tight px-2.5 py-1 transition-all duration-150 cursor-pointer",
        active
          ? "bg-(--bg-elevated) text-(--text-primary) border-(--border-strong)"
          : "bg-(--tag-bg) text-(--tag-text) border hover:border-(--border-strong) hover:text-(--text-secondary)"
      )}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status?.toLowerCase() === "live";
  const isWip = !!project.status && !isLive;
  const cardImage = project.image || project.screenshots?.[0];

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col rounded-xl border bg-(--bg-surface) hover:border-(--border-strong) hover:bg-(--bg-elevated) transition-all duration-200 overflow-hidden"
    >
      {cardImage && (
        <div className="w-full aspect-video overflow-hidden border-b border-(--border-default) relative bg-zinc-950/20">
          <img
            src={cardImage}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded border bg-(--tag-bg) text-(--tag-text) font-mono text-[0.625rem] tracking-tight px-2 py-0.5">
            {TYPE_ICON[project.type]}
            {TYPE_LABEL[project.type]}
          </span>
          <span className="text-muted-foreground font-mono text-[0.625rem] tracking-tight">
            {project.year}
          </span>
          {isLive && (
            <span className="inline-flex items-center rounded border border-(--success) bg-(--success-subtle) text-(--success) font-mono text-[0.625rem] tracking-tight px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-(--success) inline-block mr-1 animate-pulse" />
              Live
            </span>
          )}
          {isWip && (
            <span className="inline-flex items-center rounded border border-(--warning) bg-(--warning-subtle) text-(--warning) font-mono text-[0.625rem] tracking-tight px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-(--warning) inline-block mr-1" />
              {project.status}
            </span>
          )}
        </div>

        {/* Title & description */}
        <div className="flex-1">
          <h2 className="text-sm font-semibold leading-snug text-(--text-primary) font-ui group-hover:underline mb-1">
            {project.title}
          </h2>
          <p className="text-xs text-muted-foreground font-ui line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded border bg-(--tag-bg) text-(--tag-text) font-mono text-[0.625rem] tracking-tight px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-muted-foreground font-mono text-[0.625rem] py-0.5">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* View link */}
        <div className="flex justify-end mt-auto">
          <span className="inline-flex items-center gap-1 text-xs font-ui text-foreground/50 group-hover:gap-1.5 transition-all duration-150">
            View Project
            <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectsClient() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const availableTypes = useMemo<ProjectType[]>(() => {
    const order: ProjectType[] = ["web", "tool", "extension", "language", "mobile"];
    return order.filter((t) => PROJECTS.some((p) => p.type === t));
  }, []);

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) => {
        const typeMatch = typeFilter === "all" || p.type === typeFilter;
        const statusMatch =
          statusFilter === "all" ||
          (statusFilter === "live" && p.status?.toLowerCase() === "live") ||
          (statusFilter === "wip" && !!p.status && p.status.toLowerCase() !== "live");
        return typeMatch && statusMatch;
      }),
    [typeFilter, statusFilter]
  );

  return (
    <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs transition-colors mb-6 text-muted-foreground hover:text-muted-foreground/80 font-ui"
        >
          <ArrowLeft size={12} /> Back to portfolio
        </Link>
        <p className="uppercase mb-1 text-foreground/60 font-semibold font-mono text-xs tracking-wide">
          Work
        </p>
        <h1 className="text-2xl font-bold text-(--text-primary) font-ui">
          Projects
        </h1>
        <p className="text-sm mt-1 text-muted-foreground font-ui">
          {PROJECTS.length} projects built
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex flex-wrap gap-1.5">
          <FilterPill active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
            All
          </FilterPill>
          {availableTypes.map((type) => (
            <FilterPill
              key={type}
              active={typeFilter === type}
              onClick={() => setTypeFilter(type)}
            >
              {TYPE_LABEL[type]}
            </FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterPill active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>
            All Status
          </FilterPill>
          <FilterPill active={statusFilter === "live"} onClick={() => setStatusFilter("live")}>
            <span className="w-1.5 h-1.5 rounded-full bg-(--success) inline-block mr-1.5" />
            Live
          </FilterPill>
          <FilterPill active={statusFilter === "wip"} onClick={() => setStatusFilter("wip")}>
            <span className="w-1.5 h-1.5 rounded-full bg-(--warning) inline-block mr-1.5" />
            In Development
          </FilterPill>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground font-ui py-8 text-center">
          No projects match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {filtered.length > 0 && filtered.length < PROJECTS.length && (
        <p className="text-xs text-muted-foreground font-mono mt-6">
          Showing {filtered.length} of {PROJECTS.length} projects
        </p>
      )}
    </div>
  );
}
