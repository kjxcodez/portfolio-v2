"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SKILLS } from "@/lib/data";
import { MagicCard } from "@/components/shared/MagicCard";

import { HugeiconsIcon } from "@hugeicons/react";
import { SKILL_ICONS } from "@/lib/skills";

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(SKILLS.length, inView);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-start w-full gap-3 my-3 mt-7">
      <h2 className="text-sm font-semibold">
        SKILLS <span className="text-zinc-500 font-normal">({count})</span>
      </h2>

      <div className="flex items-center justify-start gap-3 flex-wrap">
        {SKILLS.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
          >
            <MagicCard className="w-20 h-20 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center h-full w-full gap-1.5 p-2 relative">
                <span className="text-sm font-bold dark:text-pink-200 text-pink-950">
                  {skill.icon.startsWith("ri_") ? (
                    SKILL_ICONS[skill.icon]
                  ) : (
                    <HugeiconsIcon icon={SKILL_ICONS[skill.icon]} />
                  )}
                </span>
                <span className="text-xs font-semibold text-center leading-tight">
                  {skill.name}
                </span>
                <span
                  className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/30 to-pink-500/30 blur-xl pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
