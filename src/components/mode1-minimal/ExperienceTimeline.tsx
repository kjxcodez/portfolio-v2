'use client';

import { motion } from 'motion/react';
import { Briefcase, Building2, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { EXPERIENCE } from '@/lib/data';

export function ExperienceTimeline() {
  return (
    <div className="flex flex-col items-start w-full my-6 gap-4">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
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
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center pt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Building2 size={18} className="text-indigo-400" />
                </div>
                {exp.projects.length > 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/20 to-transparent mt-2 min-h-[20px]" />
                )}
              </div>

              {/* Company info */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white">{exp.company}</h3>
                <p className="text-sm text-zinc-400 mt-0.5">{exp.role}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
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
            <div className="ml-[3.25rem] flex flex-col gap-4">
              {exp.projects.map((project, projIdx) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: expIdx * 0.1 + projIdx * 0.08, duration: 0.4 }}
                  className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={14} className="text-zinc-500" />
                    <h4 className="text-sm font-medium text-zinc-200">{project.name}</h4>
                  </div>

                  <ul className="space-y-2">
                    {project.achievements.map((achievement, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                        <ChevronRight size={12} className="text-indigo-400/60 shrink-0 mt-0.5" />
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
