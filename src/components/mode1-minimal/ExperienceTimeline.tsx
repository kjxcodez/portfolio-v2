'use client';

import { motion } from 'motion/react';
import { Briefcase, Building2, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { EXPERIENCE } from '@/lib/data';

export function ExperienceTimeline() {
  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <h2 className="uppercase [font-family:var(--font-mono)] [font-size:var(--text-xs)] tracking-[0.1em] text-[var(--text-tertiary)]">
        Experience
      </h2>

      <div className="flex flex-col w-full gap-6">
        {EXPERIENCE.map((exp, expIdx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: expIdx * 0.1, duration: 0.5 }}
            className="relative"
          >
            {/* Company header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex flex-col items-center pt-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[var(--bg-elevated)] border border-[var(--border-default)]">
                  <Building2 size={16} className="text-[var(--text-secondary)]" />
                </div>
                {exp.projects.length > 1 && (
                  <motion.div
                    className="w-px flex-1 mt-2 min-h-[20px] bg-[var(--border-subtle)] origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: expIdx * 0.1 + 0.3, duration: 0.5 }}
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-base font-medium [font-family:var(--font-ui)] text-[var(--text-primary)]">
                  {exp.company}
                </h3>
                <p className="text-sm mt-0.5 [font-family:var(--font-ui)] text-[var(--text-secondary)]">
                  {exp.role}
                </p>
                <div className="flex items-center gap-3 mt-1 [font-family:var(--font-mono)] [font-size:var(--text-xs)] text-[var(--text-tertiary)] tracking-[0.04em]">
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
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: expIdx * 0.1 + projIdx * 0.08, duration: 0.4 }}
                  className="rounded-lg p-4 transition-colors duration-150 bg-[var(--bg-surface)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={13} className="text-[var(--text-tertiary)]" />
                    <h4 className="text-sm font-medium [font-family:var(--font-ui)] text-[var(--text-secondary)]">
                      {project.name}
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    {project.achievements.map((achievement, achIdx) => (
                      <li
                        key={achIdx}
                        className="flex items-start gap-2 text-xs leading-relaxed [font-family:var(--font-ui)] text-[var(--text-secondary)]"
                      >
                        <ChevronRight size={11} className="text-[var(--text-tertiary)] shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-t-[var(--border-subtle)]">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="flex flex-col items-center px-3 py-2 rounded-lg min-w-[72px] bg-[var(--bg-elevated)] border border-[var(--border-default)]"
                        >
                          <span className="text-sm font-semibold leading-tight [font-family:var(--font-ui)] text-[var(--accent)]">
                            {metric.value}
                          </span>
                          <span className="text-[10px] mt-0.5 text-center leading-tight [font-family:var(--font-mono)] text-[var(--text-tertiary)]">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
