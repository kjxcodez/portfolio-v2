"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import IMG from "@/assets/logo.png";
import { motion, AnimatePresence } from "motion/react";
import { useModeContext } from "@/components/shared/ModeProvider";
import {
  MODE_LABELS,
  MODE_DESCRIPTIONS,
  PortfolioMode,
} from "@/store/mode-store";
import { PERSONAL, RESUME_URL } from "@/lib/data";
import {
  FileText,
  BookOpen,
  Mail,
  Layers,
  Sun,
  Moon,
  X,
  Menu,
  TableOfContentsIcon
} from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";

export function GlobalNav() {
  const { mode, setMode, isTransitioning } = useModeContext();
  const [modeOpen, setModeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const modeRef = useRef<HTMLDivElement>(null);

  // Close mode popover on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    }
    if (modeOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [modeOpen]);

  // Theme toggle
  function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  }

  // Cmd+K for QuickNav
  function openQuickNav() {
    window.dispatchEvent(new CustomEvent("quicknav:open"));
  }

  const modes: PortfolioMode[] = [1, 2, 3, 4];

  const navItems = [
    { label: "Resume", icon: FileText, href: RESUME_URL, external: true },
    {
      label: "GitHub",
      icon: GithubIcon,
      href: PERSONAL.github,
      external: true,
    },
    { label: "Blog", icon: BookOpen, href: "/blog", external: false },
    { label: "Projects", icon: TableOfContentsIcon, href: "/projects", external: false },
    { label: "Contact", icon: Mail, href: `/contact`, external: false },
  ];

  return (
    <>
      {/* Desktop nav — top-right floating pill */}
      <header className="fixed top-4 right-4 z-[60] hidden md:block">
        <nav className="flex items-center gap-1 p-1.5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl shadow-black/20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Image
              className="dark:invert rounded-full"
              src={IMG}
              alt="K"
              width={22}
              height={22}
            />
          </Link>

          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Nav items */}
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              title={item.label}
            >
              <item.icon size={14} />
              <span className="hidden lg:inline">{item.label}</span>
            </a>
          ))}

          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Mode switcher */}
          <div ref={modeRef} className="relative">
            <button
              onClick={() => setModeOpen(!modeOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              title="Switch Mode"
            >
              <Layers size={14} />
              <span className="hidden lg:inline">{MODE_LABELS[mode]}</span>
              <span className="lg:hidden">{mode}</span>
            </button>

            <AnimatePresence>
              {modeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl"
                >
                  {modes.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setModeOpen(false);
                      }}
                      disabled={isTransitioning}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        m === mode
                          ? "bg-white/10 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          m === mode ? "text-white" : "bg-white/5 text-zinc-500"
                        }`}
                        style={
                          m === mode ? { background: "var(--accent)" } : {}
                        }
                      >
                        {m}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{MODE_LABELS[m]}</p>
                        <p className="text-[11px] text-zinc-500">
                          {MODE_DESCRIPTIONS[m]}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            title="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Cmd+K */}
          <button
            onClick={openQuickNav}
            className="hidden lg:flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
            title="Quick navigation"
          >
            <kbd className="font-mono text-[10px] bg-white/5 border border-white/10 rounded px-1 py-0.5">
              ⌘K
            </kbd>
          </button>
        </nav>
      </header>

      {/* Mobile nav — hamburger */}
      <header className="fixed top-3 right-3 z-[60] md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl text-zinc-400 hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-3 left-3 z-[60] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:hidden"
            >
              {/* Logo + close */}
              <div className="flex items-center justify-between mb-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    className="dark:invert rounded-full"
                    src={IMG}
                    alt="K"
                    width={24}
                    height={24}
                  />
                  <span className="text-sm font-medium text-white">Kapil</span>
                </Link>
              </div>

              {/* Nav links */}
              <div className="space-y-1 mb-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mode selector */}
              <div className="border-t border-white/10 pt-3">
                <p className="text-[10px] uppercase tracking-wider text-zinc-600 mb-2 px-3">
                  Mode
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {modes.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setMobileOpen(false);
                      }}
                      disabled={isTransitioning}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
                        m === mode
                          ? "bg-white/10 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold ${
                          m === mode ? "text-white" : "bg-white/5 text-zinc-500"
                        }`}
                        style={
                          m === mode ? { background: "var(--accent)" } : {}
                        }
                      >
                        {m}
                      </span>
                      <span className="text-xs">{MODE_LABELS[m]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all w-full"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
