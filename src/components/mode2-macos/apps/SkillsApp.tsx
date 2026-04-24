'use client'

import { SKILLS } from '@/lib/data'

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools',
}

const LEVEL_LABELS: Record<1 | 2 | 3, string> = { 1: 'Learning', 2: 'Proficient', 3: 'Expert' }
const LEVEL_COLORS: Record<1 | 2 | 3, string> = {
  1: 'bg-zinc-500',
  2: 'bg-blue-500',
  3: 'bg-emerald-500',
}

const categories = ['frontend', 'backend', 'database', 'tools'] as const

export function SkillsApp() {
  return (
    <div className="h-full overflow-y-auto p-6 text-white">
      <p className="text-xs text-white/40 mb-5">
        {SKILLS.length} skills across {categories.length} categories
      </p>

      <div className="space-y-6">
        {categories.map(cat => {
          const skills = SKILLS.filter(s => s.category === cat)
          if (!skills.length) return null
          return (
            <div key={cat}>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">
                {CATEGORY_LABELS[cat]}
              </h3>
              <div className="space-y-2.5">
                {skills.map(skill => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-white/70 shrink-0 truncate">{skill.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${LEVEL_COLORS[skill.level]}`}
                        style={{ width: `${(skill.level / 3) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-white/30 w-16 text-right shrink-0">
                      {LEVEL_LABELS[skill.level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
