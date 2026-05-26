'use client';

import { motion } from 'motion/react';
import { Briefcase, Building2, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { EXPERIENCE } from '@/lib/data';

export function ExperienceTimeline() {
  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <h2
        className="uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
        }}
      >
        Experience
      </h2>

      <div className="flex flex-col w-full gap-6">
        {EXPERIENCE.map((exp, expIdx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: expIdx * 0.1, duration: 0.5 }}
            className="relative"
          >
            {/* Company header */}
            <div className="flex items-start gap-4 mb-4">
              {/* Icon + connector line */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <Building2 size={16} style={{ color: 'var(--text-secondary)' }} />
                </div>
                {exp.projects.length > 1 && (
                  <div
                    className="w-px flex-1 mt-2 min-h-[20px]"
                    style={{ background: 'var(--border-subtle)' }}
                  />
                )}
              </div>

              {/* Company info */}
              <div className="flex-1">
                <h3
                  className="text-base font-medium"
                  style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
                >
                  {exp.company}
                </h3>
                <p
                  className="text-sm mt-0.5"
                  style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
                >
                  {exp.role}
                </p>
                <div
                  className="flex items-center gap-3 mt-1"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {exp.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Projects within this experience */}
            <div className="ml-[3.25rem] flex flex-col gap-3">
              {exp.projects.map((project, projIdx) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: expIdx * 0.1 + projIdx * 0.08, duration: 0.4 }}
                  className="rounded-lg p-4 transition-all duration-150"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={13} style={{ color: 'var(--text-tertiary)' }} />
                    <h4
                      className="text-sm font-medium"
                      style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
                    >
                      {project.name}
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    {project.achievements.map((achievement, achIdx) => (
                      <li
                        key={achIdx}
                        className="flex items-start gap-2 text-xs leading-relaxed"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
                      >
                        <ChevronRight size={11} style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 2 }} />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
