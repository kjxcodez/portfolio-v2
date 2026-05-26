"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILLS } from "@/lib/data";
import { SKILL_ICONS, SKILL_CATEGORY_LABELS } from "@/lib/skills";

import { HugeiconsIcon } from "@hugeicons/react";

const SKILL_MESSAGES: Record<string, string> = {
  React: "You really like React, huh? Me too.",
  TypeScript: "Type safety enthusiast detected.",
  JavaScript: "The language that runs the web.",
  "Node.js": "JavaScript everywhere.",
  Python: "Simple is better than complex.",
  "Next.js": "The React framework for production.",
  TailwindCSS: "Utility-first for the win.",
  PostgreSQL: "The world's most advanced open source database.",
  MongoDB: "Document databases FTW.",
  Git: "Time travel for code.",
  Docker: "It works on my container.",
  AWS: "The cloud giant.",
  GraphQL: "Ask for what you need, nothing more.",
  Redis: "Speed is the name of the game.",
};

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
  const [skillMsg, setSkillMsg] = useState<string | null>(null);
  const hoverCounts = useRef<Record<string, { count: number; timer: ReturnType<typeof setTimeout> | null }>>({});

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

  function handleSkillHover(skillName: string) {
    const message = SKILL_MESSAGES[skillName];
    if (!message) return;

    if (!hoverCounts.current[skillName]) {
      hoverCounts.current[skillName] = { count: 0, timer: null };
    }

    const entry = hoverCounts.current[skillName];
    entry.count += 1;

    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = setTimeout(() => {
      entry.count = 0;
    }, 2000);

    if (entry.count >= 3) {
      entry.count = 0;
      setSkillMsg(message);
      setTimeout(() => setSkillMsg(null), 2800);
    }
  }

  const grouped = groupSkills();

  return (
    <div ref={ref} className="flex flex-col items-start w-full gap-5 my-6">
      <div className="flex items-center justify-between w-full">
        <h2
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            color: 'var(--text-tertiary)',
          }}
        >
          Skills{' '}
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>({SKILLS.length})</span>
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
            <h3
              className="mb-2.5 uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                color: 'var(--text-tertiary)',
                fontWeight: 400,
              }}
            >
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
                    className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-default"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-default)',
                    }}
                    title={`${skill.name} — Level ${skill.level}/3`}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                      handleSkillHover(skill.name);
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {isReactElement ? icon : icon ? <HugeiconsIcon icon={icon} size={16} /> : null}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {skillMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg z-50"
            style={{
              background: 'var(--bg-overlay)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <p
              className="text-sm"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
            >
              {skillMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
