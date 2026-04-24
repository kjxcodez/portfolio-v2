'use client'

import { useState } from 'react'
import { Mail, Copy, Check } from 'lucide-react'
import { GithubIcon, XIcon } from '@/components/shared/icons'
import { PERSONAL } from '@/lib/data'

export function ContactApp() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    await navigator.clipboard.writeText(PERSONAL.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-white gap-6">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Mail size={24} className="text-white" />
        </div>
        <h2 className="text-lg font-bold">{PERSONAL.name}</h2>
        <p className="text-sm text-white/50 mt-1">{PERSONAL.title}</p>
      </div>

      {/* Email */}
      <div className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Email</p>
        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="flex-1 text-sm text-white/80 font-mono">{PERSONAL.email}</span>
          <button
            onClick={copyEmail}
            className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
            aria-label="Copy email"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Socials */}
      <div className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Social</p>
        <div className="flex flex-col gap-2">
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/70 hover:text-white">
            <GithubIcon size={16} />
            <span>github.com/kjxcodez</span>
          </a>
          <a href={PERSONAL.twitter} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/70 hover:text-white">
            <XIcon size={16} />
            <span>x.com/kjxcodez</span>
          </a>
        </div>
      </div>
    </div>
  )
}
