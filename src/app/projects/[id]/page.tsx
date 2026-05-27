import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Download,
  Puzzle,
  Smartphone,
  Wrench,
  Code2,
  Globe,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { ProjectGallery } from "@/components/shared/ProjectGallery";
import { PROJECTS } from "@/lib/data";
import type { Project, ProjectType } from "@/types/portfolio";

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

function getRelatedProjects(
  current: Project,
  projects: Project[]
): Project[] {
  const candidates = projects.filter((p) => p.id !== current.id);

  const scored = candidates.map((p) => {
    let score = 0;

    if (p.type === current.type) score += 3;

    for (const tag of p.tags) {
      if (current.tags.includes(tag)) score += 2;
    }

    if (Math.abs(p.year - current.year) <= 1) score += 1;

    return { project: p, score, sharedTags: p.tags.filter((t) => current.tags.includes(t)).length };
  });

  const relevant = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.sharedTags - a.sharedTags)
    .map((s) => s.project)
    .slice(0, 3);

  if (relevant.length < 3) {
    const relevantIds = new Set(relevant.map((p) => p.id));
    const fallbacks = candidates
      .filter((p) => !relevantIds.has(p.id))
      .sort((a, b) => b.year - a.year);
    return [...relevant, ...fallbacks].slice(0, 3);
  }

  return relevant;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Kapil Kumar Jangid`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Kapil Kumar Jangid`,
      description: project.description,
      url: `https://kapiljangid.pro/projects/${project.id}`,
      type: "website",
      images: [
        { url: `/og-image.png`, width: 1200, height: 630, alt: project.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Kapil Kumar Jangid`,
      description: project.description,
      images: [`/og-image.png`],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const related = getRelatedProjects(project, PROJECTS);
  const screenshots = project.screenshots ?? [];

  const primaryActionLabel =
    project.type === "extension"
      ? "Marketplace"
      : project.type === "language"
        ? "Docs"
        : "Live Demo";

  return (
    <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen ">
      {/* Back */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-xs transition-colors mb-10 text-muted-foreground hover:text-muted-foreground/80 font-ui"
      >
        <ArrowLeft size={12} /> Back to portfolio
      </Link>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        {/* Meta row: type badge, year, status */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded border bg-(--bg-elevated)] text-muted-foreground font-mono text-[0.625rem] tracking-tight px-2 py-1">
            {TYPE_ICON[project.type]}
            {TYPE_LABEL[project.type]}
          </span>

          <span className="text-muted-foreground font-mono text-[0.625rem] tracking-tight">
            {project.year}
          </span>

          {project.status && (
            <span className="rounded border border-(--success) bg-[ (--success-subtle)] text-(--success) font-mono text-[0.625rem] tracking-tight px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-(--success) inline-block mr-1 animate-pulse" />
              {project.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 leading-tight text-(--text-primary) font-ui">
          {project.title}
        </h1>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors bg-foreground hover:text-white hover:bg-(--accent-hover) border border-accent hover:border-(--accent-hover) text-(--text-inverse) font-ui"
            >
              <ExternalLink size={12} />
              {primaryActionLabel}
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors border hover:border-(--border-strong) text-muted-foreground hover:text-(--text-primary) hover:bg-(--bg-elevated)] font-ui"
            >
              <GithubIcon size={12} />
              Source
            </a>
          )}

          {project.apkUrl && (
            <a
              href={project.apkUrl}
              download
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors border hover:border-(--border-strong) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)] font-ui"
            >
              <Download size={12} />
              APK
            </a>
          )}
        </div>
      </div>

      {/* ── Overview ───────────────────────────────────────────────── */}
      <Section label="Overview">
        <p className="text-sm leading-relaxed text-muted-foreground font-ui">
          {project.longDescription}
        </p>
      </Section>

      {/* ── Highlights ─────────────────────────────────────────────── */}
      {project.highlights && project.highlights.length > 0 && (
        <Section label="Highlights">
          <ul className="flex flex-col gap-2">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2">
                <ChevronRight
                  size={12}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
                <span className="text-sm text-(--text-secondary) font-ui">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Impact ─────────────────────────────────────────────────── */}
      {project.impact && project.impact.length > 0 && (
        <Section label="Impact">
          <ul className="flex flex-col gap-2">
            {project.impact.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground font-mono text-xs mt-0.5 shrink-0 select-none">
                  —
                </span>
                <span className="text-sm text-(--text-secondary) font-ui">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Timeline ───────────────────────────────────────────────── */}
      {project.timeline && (
        <Section label="Timeline">
          <span className="inline-flex items-center gap-1.5 rounded border bg-(--bg-surface) text-(--text-secondary) font-mono text-xs tracking-tight px-3 py-1.5">
            <Clock size={11} className="text-muted-foreground" />
            {project.timeline}
          </span>
        </Section>
      )}

      {/* ── Key Features ───────────────────────────────────────────── */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <Section label="Key Features">
          <ul className="flex flex-col gap-2">
            {project.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  size={13}
                  className="mt-0.5 shrink-0 text-(--success)"
                />
                <span className="text-sm text-(--text-secondary) font-ui">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Architecture ───────────────────────────────────────────── */}
      {project.architecture && project.architecture.length > 0 && (
        <Section label="Architecture">
          <div className="flex flex-col gap-2">
            {project.architecture.map((layer, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg p-3 border bg-(--bg-surface)"
              >
                <span
                  className="text-muted-foreground shrink-0 tabular-nums"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-(--text-secondary) font-ui">
                  {layer}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Technical Challenges ───────────────────────────────────── */}
      {project.technicalChallenges && project.technicalChallenges.length > 0 && (
        <Section label="Technical Challenges">
          <div className="flex flex-col gap-4">
            {project.technicalChallenges.map((challenge, i) => (
              <div key={i} className="rounded-lg p-4 border bg-(--bg-surface)">
                <div className="mb-3">
                  <p
                    className="text-muted-foreground mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Problem
                  </p>
                  <p className="text-sm text-(--text-primary) font-ui">
                    {challenge.problem}
                  </p>
                </div>
                <div>
                  <p
                    className="text-muted-foreground mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Solution
                  </p>
                  <p className="text-sm leading-relaxed text-(--text-secondary) font-ui">
                    {challenge.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Technical Decisions ────────────────────────────────────── */}
      {project.technicalDecisions && project.technicalDecisions.length > 0 && (
        <Section label="Technical Decisions">
          <div className="flex flex-col gap-4">
            {project.technicalDecisions.map((decision, i) => (
              <div key={i} className="rounded-lg p-4 border bg-(--bg-surface)">
                <p
                  className="text-xs font-medium mb-2 text-(--text-primary)"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {decision.title}
                </p>
                <p className="text-sm leading-relaxed text-(--text-secondary) font-ui">
                  {decision.body}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Technology Stack ───────────────────────────────────────── */}
      <Section label="Technology Stack">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border shadow-sm bg-(--tag-bg) text-(--tag-text) font-mono text-[0.625rem] tracking-tight px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Gallery ────────────────────────────────────────────────── */}
      {screenshots.length > 0 && (
        <Section label="Gallery">
          <ProjectGallery images={screenshots} projectTitle={project.title} />
        </Section>
      )}

      {/* ── Learnings ──────────────────────────────────────────────── */}
      {project.learnings && project.learnings.length > 0 && (
        <Section label="Learnings">
          <ul className="flex flex-col gap-2">
            {project.learnings.map((learning, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground font-mono text-xs mt-0.5 shrink-0 select-none">
                  —
                </span>
                <span className="text-sm text-(--text-secondary) font-ui">
                  {learning}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Future Plans ───────────────────────────────────────────── */}
      {project.futurePlans && project.futurePlans.length > 0 && (
        <Section label="Future Plans">
          <div className="flex flex-col gap-2">
            {project.futurePlans.map((plan, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-muted-foreground shrink-0 tabular-nums mt-0.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-(--text-secondary) font-ui">
                  {plan}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Related Projects ───────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <p
            className="uppercase mb-4 text-muted-foreground"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
            }}
          >
            Related Projects
          </p>
          <div className="flex flex-col gap-2">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group flex items-center justify-between p-3 rounded-xl transition-colors border hover:bg-(--bg-surface) hover:border-(--border-strong)"
              >
                <div>
                  <p className="text-sm font-medium text-(--text-primary) font-ui">
                    {p.title}
                  </p>
                  <p className="text-xs mt-0.5 text-muted-foreground font-ui">
                    {p.description}
                  </p>
                </div>
                <ArrowRight
                  size={13}
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 text-muted-foreground"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p
        className="uppercase mb-3 text-muted-foreground"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
