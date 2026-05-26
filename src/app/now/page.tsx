import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Now — Kapil Kumar Jangid' }

export default function NowPage() {
  return (
    <div className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
      >
        <ArrowLeft size={12} />
        Back to portfolio
      </Link>

      <div className="mb-10">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
          Updated May 2026
        </p>

        <h1 className="text-2xl font-bold mb-2">
          Now
        </h1>

        <p className="text-sm text-zinc-500">
          What I'm focused on right now. Inspired by{" "}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
          >
            nownownow.com
          </a>.
        </p>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-sm prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-zinc-500 prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-p:text-zinc-300 prose-li:text-zinc-300">

        <h2>Building</h2>

        <ul>
          <li>
            <strong>This portfolio</strong> — building a single portfolio with multiple experiences including Professional, Kapil OS, Terminal OS, and RPG mode while keeping everything powered by one shared data layer.
          </li>

          <li>
            <strong>FlowCMS</strong> — continuing to improve ideas around content systems, API architecture, authentication flows, and overall product structure.
          </li>

          <li>
            <strong>Writing more</strong> — documenting lessons from projects instead of only shipping code.
          </li>
        </ul>

        <h2>Learning</h2>

        <ul>
          <li>
            Understanding systems beyond frontend development including interpreters, event-driven workflows, and application architecture.
          </li>

          <li>
            Exploring Phaser through the portfolio RPG experience and understanding how interactive experiences are structured.
          </li>

          <li>
            Spending more time understanding why systems behave the way they do instead of only learning implementation details.
          </li>
        </ul>

        <h2>Using a lot</h2>

        <ul>
          <li>
            Next.js, TypeScript, Tailwind CSS, Prisma, and React for most projects.
          </li>

          <li>
            AI coding tools as development assistants for brainstorming, iteration, and reducing repetitive work.
          </li>

          <li>
            VS Code and developer tooling that improves speed and workflow.
          </li>
        </ul>

        <h2>Thinking about</h2>

        <ul>
          <li>
            What makes products memorable beyond technical complexity.
          </li>

          <li>
            How much complexity is actually necessary before a product starts becoming harder to maintain.
          </li>

          <li>
            The difference between building features and building things people genuinely want to use.
          </li>
        </ul>

      </div>
    </div>
  )
}