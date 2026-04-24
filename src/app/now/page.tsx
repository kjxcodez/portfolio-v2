import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/shared/SiteHeader'

export const metadata = { title: 'Now — Kapil Kumar Jangid' }

export default function NowPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen">
      <Link href="/modes/minimal" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
        <ArrowLeft size={12} /> Back
      </Link>

      <div className="mb-10">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Updated April 2026</p>
        <h1 className="text-2xl font-bold mb-2">Now</h1>
        <p className="text-sm text-zinc-500">What I'm focused on right now. Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">nownownow.com</a>.</p>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-sm prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-zinc-500 prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-p:text-zinc-300 prose-li:text-zinc-300">

        <h2>Building</h2>
        <ul>
          <li><strong>This portfolio</strong> — five completely different visual modes for the same data. Current mode is Minimal. macOS desktop and RPG world modes are next.</li>
          <li><strong>Percept UI v2</strong> — complete rewrite with Tailwind v4, React 19, and a better CLI DX.</li>
        </ul>

        <h2>Learning</h2>
        <ul>
          <li>Phaser 4 for the RPG mode — first time building a browser game.</li>
          <li>Three.js for the Glassmorphism mode — the particle field is surprisingly fun to tune.</li>
          <li>Reading <em>Crafting Interpreters</em> by Robert Nystrom for the second time. It's better the second time.</li>
        </ul>

        <h2>Using a lot</h2>
        <ul>
          <li>Claude Code for development — the agent model genuinely changes how I work.</li>
          <li>Neovim with lazyvim. Still in the "fumbling around" phase but getting faster.</li>
          <li>Obsidian for notes. I try to write a short daily log.</li>
        </ul>

        <h2>Thinking about</h2>
        <ul>
          <li>What makes a portfolio actually memorable vs. just technically impressive.</li>
          <li>Whether open source maintainership is a sustainable hobby or a slow burn.</li>
          <li>What language I want to build next after Rune.</li>
        </ul>

      </div>
    </main>
    </>
  )
}
