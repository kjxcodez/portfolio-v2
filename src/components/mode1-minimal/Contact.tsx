'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { PERSONAL, SOCIALS } from '@/lib/data';

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const btnStyle = {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    background: 'transparent',
    border: '1px solid var(--border-default)',
    transition: 'border-color 120ms ease, color 120ms ease, background 120ms ease',
  };

  function onBtnEnter(e: React.MouseEvent<HTMLElement>) {
    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
    (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
  }
  function onBtnLeave(e: React.MouseEvent<HTMLElement>) {
    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
    (e.currentTarget as HTMLElement).style.background = 'transparent';
  }

  return (
    <div id="contact" className="flex flex-col items-start w-full my-6 gap-4">
      <h2
        className="uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
        }}
      >
        Contact
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 w-full"
      >
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}
        >
          Open to interesting projects, collaborations, or just a good conversation about tech.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={copied ? undefined : btnStyle}
            onMouseEnter={copied ? undefined : onBtnEnter}
            onMouseLeave={copied ? undefined : onBtnLeave}
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-400 text-sm" style={{ fontFamily: 'var(--font-ui)' }}>Copied!</span>
              </>
            ) : (
              <>
                <Mail size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span>{PERSONAL.email}</span>
              </>
            )}
          </button>

          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={btnStyle}
            onMouseEnter={onBtnEnter}
            onMouseLeave={onBtnLeave}
          >
            <GithubIcon size={14} />
            GitHub
          </a>

          <a
            href={SOCIALS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={btnStyle}
            onMouseEnter={onBtnEnter}
            onMouseLeave={onBtnLeave}
          >
            <ExternalLink size={14} />
            Twitter / X
          </a>
        </div>
      </motion.div>
    </div>
  );
}
