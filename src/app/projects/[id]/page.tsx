import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/shared/icons'
import { PROJECTS } from '@/lib/data'

// Screenshots mapped per project id
const SCREENSHOTS: Record<string, { src: string; alt: string }[]> = {
  'rune-lang': [
    { src: '/rune-dark.png', alt: 'Rune Lang dark theme' },
    { src: '/rune-light.png', alt: 'Rune Lang light theme' },
  ],
  'percept-ui': [
    { src: '/perceptui.png', alt: 'Percept UI component library' },
  ],
  'rune-lang-vscode': [
    { src: '/rune-extension.png', alt: 'Rune VS Code extension' },
  ],
  'ai-auto-commit': [
    { src: '/ai-commit.png', alt: 'AI Auto Commit extension' },
  ],
  'brainly': [
    { src: '/brainly.png', alt: 'Brainly dark mode' },
    { src: '/brainly-light.png', alt: 'Brainly light mode' },
  ],
  'url-shortener': [
    { src: '/url-shortner.png', alt: 'URL Shortener' },
  ],
}

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) return {}
  return { 
    title: `${project.title} — Kapil Kumar Jangid`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Kapil Kumar Jangid`,
      description: project.description,
      url: `https://kapiljangid.pro/projects/${project.id}`,
      type: 'website',
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Kapil Kumar Jangid`,
      description: project.description,
      images: [`/og-image.png`],
    }
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) notFound()

  const screenshots = SCREENSHOTS[project.id] ?? []
  const others = PROJECTS.filter(p => p.id !== project.id).slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
        <ArrowLeft size={12} /> Back to portfolio
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            {project.featured && (
              <span className="text-[11px] px-2 py-0.5 rounded-full border dark:border-zinc-700 dark:text-zinc-500 mr-2">Featured</span>
            )}
            <span className="text-xs text-zinc-600">{project.year}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded-lg dark:hover:bg-zinc-900 hover:bg-slate-100 transition-colors">
                <ExternalLink size={12} /> Live demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded-lg dark:hover:bg-zinc-900 hover:bg-slate-100 transition-colors">
                <GithubIcon size={12} /> Source
              </a>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
        <p className="text-zinc-400 text-sm leading-relaxed">{project.longDescription}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full border dark:border-zinc-700 dark:text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      {/* Screenshots */}
      {screenshots.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold mb-3">Screenshots</h2>
          <div className={`grid gap-3 ${screenshots.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {screenshots.map((shot, i) => (
              <div key={i} className="rounded-xl overflow-hidden border dark:border-zinc-800 aspect-video">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={680}
                  height={383}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other projects */}
      {others.length > 0 && (
        <div className="mt-12 pt-8 border-t dark:border-zinc-800">
          <h2 className="text-sm font-semibold mb-4">Other Projects</h2>
          <div className="flex flex-col gap-2">
            {others.map(p => (
              <Link key={p.id} href={`/projects/${p.id}`}
                className="group flex items-center justify-between p-3 border rounded-xl dark:hover:bg-zinc-950 hover:bg-slate-50 hover:scale-[1.01] transition-all duration-200">
                <div>
                  <p className="text-sm font-medium group-hover:underline">{p.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{p.description}</p>
                </div>
                <ArrowLeft size={12} className="rotate-180 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
