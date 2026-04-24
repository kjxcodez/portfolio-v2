'use client';

import Link from 'next/link';
import Image from 'next/image';
import IMG from '@/assets/logo.png';
import { GithubIcon, XIcon } from '@/components/shared/icons';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { PERSONAL } from '@/lib/data';

interface SiteHeaderProps {
  /** Show the Cmd+K hint in the nav. Default true. */
  showSearch?: boolean;
}

export function SiteHeader({ showSearch = true }: SiteHeaderProps) {
  return (
    <header className="fixed top-3 z-50 w-full md:max-w-[700px] left-1/2 -translate-x-1/2 px-2">
      <nav className="flex items-center justify-between p-2 rounded-xl px-4 shadow-inner shadow-zinc-500/30 border backdrop-blur-xl dark:bg-black/80 bg-white/80">
        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <Image
            className="dark:invert rounded-full"
            src={IMG}
            alt="Logo"
            width={36}
            height={36}
          />
        </Link>

        <div className="flex items-center gap-3">
          {showSearch && (
            <QuickNavTrigger />
          )}
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="scale-95 hover:scale-105 transition-transform"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={PERSONAL.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="scale-95 hover:scale-105 transition-transform"
            aria-label="Twitter / X"
          >
            <XIcon size={16} />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

// Inline trigger so the header can be a server component by default
// QuickNav itself is mounted globally via the root layout
function QuickNavTrigger() {
  function open() {
    window.dispatchEvent(new CustomEvent('quicknav:open'));
  }
  return (
    <button
      onClick={open}
      className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 border border-zinc-700/60 rounded-lg px-2.5 py-1 hover:border-zinc-500 hover:text-zinc-300 transition-colors"
      aria-label="Open navigation"
    >
      <span>Nav</span>
      <kbd className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 font-mono leading-none">
        ⌘K
      </kbd>
    </button>
  );
}
