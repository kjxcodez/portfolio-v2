import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import usesDataRaw from '@/data/uses.json'
import type { UsesData } from '@/types/content'

const usesData = usesDataRaw as UsesData

export const metadata = {
  title: 'Uses — Kapil Kumar Jangid',
}

export default function UsesPage() {
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
          Setup
        </p>

        <h1 className="text-2xl font-bold mb-2">
          Uses
        </h1>

        <p className="text-sm text-zinc-500">
          {usesData.intro}
        </p>
      </div>

      <div className="space-y-10">
        {usesData.categories.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {section.category}
            </h2>

            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-3 p-3 border rounded-xl dark:bg-black/70"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-400 transition-colors"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </p>

                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}