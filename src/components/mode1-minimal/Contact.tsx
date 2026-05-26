'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PERSONAL, SOCIALS } from '@/lib/data';

const btnClass =
  'inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all [font-family:var(--font-ui)] [font-size:var(--text-sm)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]';

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div id="contact" className="flex flex-col items-start w-full my-6 gap-4">
      <h2 className="uppercase [font-family:var(--font-mono)] [font-size:var(--text-xs)] tracking-[0.1em] text-[var(--text-tertiary)]">
        Contact
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 w-full"
      >
        <p className="text-sm leading-relaxed [font-family:var(--font-ui)] text-[var(--text-secondary)]">
          Open to interesting projects, collaborations, or just a good conversation about tech.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className={copied
              ? 'inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all'
              : btnClass}
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-400 text-sm [font-family:var(--font-ui)]">Copied!</span>
              </>
            ) : (
              <>
                <Mail size={14} className="text-[var(--text-tertiary)]" />
                <span>{PERSONAL.email}</span>
              </>
            )}
          </button>

          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className={btnClass}>
            <GithubIcon size={14} />
            GitHub
          </a>

          <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className={btnClass}>
            <ExternalLink size={14} />
            Twitter / X
          </a>
        </div>
      </motion.div>
    </div>
  );
}
