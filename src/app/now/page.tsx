import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import nowDataRaw from '@/data/now.json'
import type { NowData } from '@/types/content'

const nowData = nowDataRaw as NowData

export const metadata = { title: 'Now — Kapil Kumar Jangid' }

function formatUpdatedAt(iso: string) {
  const parts = iso.split('-')
  if (parts.length >= 2) {
    const year = parts[0]
    const monthIndex = parseInt(parts[1], 10) - 1
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${monthNames[monthIndex]} ${year}`
  }
  return ''
}

export default function NowPage() {
  return (
    <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
      >
        <ArrowLeft size={12} />
        Back to portfolio
      </Link>

      <div className="mb-10">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
          Updated {formatUpdatedAt(nowData.updatedAt)}
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
        {nowData.sections.map((section) => (
          <div key={section.id}>
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item, idx) => (
                <li key={idx}>
                  {item.label ? (
                    <>
                      <strong>{item.label}</strong> — {item.description}
                    </>
                  ) : (
                    item.description
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}