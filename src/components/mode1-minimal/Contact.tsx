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

  return (
    <div id="contact" className="flex flex-col items-start w-full my-6 gap-4">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Contact</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 w-full"
      >
        <p className="text-sm text-zinc-400 leading-relaxed">
          Open to interesting projects, collaborations, or just a good conversation about tech.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Mail size={14} className="text-zinc-400" />
                <span className="text-zinc-300">{PERSONAL.email}</span>
              </>
            )}
          </button>

          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 transition-all"
          >
            <GithubIcon size={14} />
            GitHub
          </a>

          <a
            href={SOCIALS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 transition-all"
          >
            <ExternalLink size={14} />
            Twitter / X
          </a>
        </div>
      </motion.div>
    </div>
  );
}
