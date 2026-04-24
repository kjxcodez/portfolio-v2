'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check } from 'lucide-react';
import { GithubIcon, XIcon } from '@/components/shared/icons';
import { PERSONAL } from '@/lib/data';

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-start w-full my-4 gap-3">
      <h2 className="font-semibold text-sm">CONTACT</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 w-full"
      >
        <p className="text-sm dark:text-zinc-300 text-zinc-600">
          Open to interesting projects, collabs, or just a good chat about tech.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Copy email button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-sm border px-4 py-1.5 rounded-xl dark:hover:bg-zinc-900 hover:bg-slate-100 transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Mail size={14} />
                {PERSONAL.email}
              </>
            )}
          </button>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm border px-4 py-1.5 rounded-xl dark:hover:bg-zinc-900 hover:bg-slate-100 transition-colors"
          >
            <GithubIcon size={14} />
            GitHub
          </a>

          <a
            href={PERSONAL.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm border px-4 py-1.5 rounded-xl dark:hover:bg-zinc-900 hover:bg-slate-100 transition-colors"
          >
            <XIcon size={14} />
            Twitter / X
          </a>
        </div>
      </motion.div>
    </div>
  );
}
