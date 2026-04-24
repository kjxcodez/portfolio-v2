import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/shared/SiteHeader'

export const metadata = { title: 'Uses — Kapil Kumar Jangid' }

const SETUP: { category: string; items: { name: string; desc: string }[] }[] = [
  {
    category: 'Editor & Terminal',
    items: [
      { name: 'VS Code', desc: 'Primary editor. One Dark Pro theme. Geist Mono font at 14px.' },
      { name: 'Neovim + LazyVim', desc: 'Learning to use it for quick edits. Getting there.' },
      { name: 'Windows Terminal', desc: 'Git Bash as the default shell.' },
      { name: 'Claude Code', desc: 'AI coding assistant. It lives in my terminal.' },
    ],
  },
  {
    category: 'Languages & Frameworks',
    items: [
      { name: 'TypeScript', desc: 'For everything frontend and most backend.' },
      { name: 'Next.js', desc: 'App Router. The default choice for new projects.' },
      { name: 'Python', desc: 'For scripts, tooling, and language experiments like Rune.' },
      { name: 'Tailwind CSS', desc: 'v4 on new projects, v3 on old ones.' },
    ],
  },
  {
    category: 'Tools & Services',
    items: [
      { name: 'Vercel', desc: 'All frontend deployments. Zero-config is the killer feature.' },
      { name: 'GitHub', desc: 'Everything lives here.' },
      { name: 'Supabase', desc: 'Postgres + auth for fullstack projects.' },
      { name: 'Figma', desc: 'Design mockups. Not a power user but it gets the job done.' },
      { name: 'Obsidian', desc: 'Notes, daily log, project planning.' },
    ],
  },
  {
    category: 'Hardware',
    items: [
      { name: 'Windows 11 laptop', desc: 'Main machine. Not a MacBook, and that\'s fine.' },
      { name: 'External monitor', desc: '24". The best $150 productivity upgrade I\'ve made.' },
    ],
  },
]

export default function UsesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen">
      <Link href="/modes/minimal" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
        <ArrowLeft size={12} /> Back
      </Link>

      <div className="mb-10">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Setup</p>
        <h1 className="text-2xl font-bold mb-2">Uses</h1>
        <p className="text-sm text-zinc-500">The tools and gear I use day to day.</p>
      </div>

      <div className="space-y-10">
        {SETUP.map(section => (
          <div key={section.category}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {section.category}
            </h2>
            <div className="flex flex-col gap-2">
              {section.items.map(item => (
                <div key={item.name} className="flex gap-3 p-3 border rounded-xl dark:bg-black/70">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
    </>
  )
}
