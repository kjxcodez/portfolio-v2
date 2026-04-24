'use client'

import { CONTRIBUTIONS } from '@/lib/data'
import { ContributionCard } from '@/components/shared/ContributionCard'

export function GitHubApp() {
  const merged = CONTRIBUTIONS.filter(c => c.status === 'Merged').length
  const open = CONTRIBUTIONS.filter(c => c.status === 'Open').length

  return (
    <div className="h-full flex flex-col text-white">
      {/* Terminal header bar */}
      <div className="shrink-0 px-4 py-2.5 border-b border-white/10 bg-black/30 font-mono text-xs">
        <span className="text-green-400">kapil@github</span>
        <span className="text-white/40">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white/40">$ </span>
        <span className="text-white/70">gh pr list --author @me</span>
      </div>

      {/* Stats row */}
      <div className="shrink-0 flex gap-4 px-4 py-2.5 border-b border-white/10 text-xs text-white/40">
        <span><span className="text-purple-400 font-medium">{merged}</span> merged</span>
        <span><span className="text-green-400 font-medium">{open}</span> open</span>
        <span><span className="text-white/60 font-medium">{CONTRIBUTIONS.length}</span> total</span>
      </div>

      {/* Contribution list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {CONTRIBUTIONS.map(c => (
          <ContributionCard key={c.id} contribution={c} />
        ))}
      </div>
    </div>
  )
}
