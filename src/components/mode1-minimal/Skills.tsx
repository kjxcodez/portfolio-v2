"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SKILLS } from "@/lib/data";
import { SKILL_ICONS, SKILL_CATEGORY_LABELS } from "@/lib/skills";

import { HugeiconsIcon } from "@hugeicons/react";

// Group skills by category
function groupSkills() {
  const groups: Record<string, typeof SKILLS> = {};
  const order = ['languages', 'frontend', 'backend', 'databases', 'integrations', 'tools', 'other'];

  for (const skill of SKILLS) {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }
    groups[skill.category].push(skill);
  }

  // Return in defined order
  return order
    .filter((cat) => groups[cat]?.length)
    .map((cat) => ({
      category: cat,
      label: SKILL_CATEGORY_LABELS[cat] || cat,
      skills: groups[cat],
    }));
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const grouped = groupSkills();

  return (
    <div ref={ref} className="flex flex-col items-start w-full gap-5 my-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
          Skills{' '}
          <span className="text-zinc-600 font-normal">({SKILLS.length})</span>
        </h2>
      </div>

      <div className="flex flex-col w-full gap-6">
        {grouped.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: groupIdx * 0.08, duration: 0.4 }}
          >
            <h3 className="text-xs font-medium text-zinc-500 mb-2.5 uppercase tracking-wider">
              {group.label}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {group.skills.map((skill, idx) => {
                const icon = SKILL_ICONS[skill.icon];
                const isReactElement = skill.icon.startsWith('ri_');

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: groupIdx * 0.08 + idx * 0.03, duration: 0.25 }}
                    className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all cursor-default"
                    title={`${skill.name} — Level ${skill.level}/3`}
                  >
                    <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      {isReactElement ? icon : icon ? <HugeiconsIcon icon={icon} size={18} /> : null}
                    </span>
                    <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
