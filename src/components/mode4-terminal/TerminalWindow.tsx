'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { generateVFS } from './shell/filesystem';
import { parseCommandLine } from './shell/parser';
import { COMMANDS } from './shell/commands';
import type { TerminalLine, CommandContext } from './shell/types';
import { useModeContext } from '@/components/shared/ModeProvider';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { PostMeta } from '@/lib/mdx';
import { PROJECTS, SKILLS, CONTRIBUTIONS } from '@/lib/data';

interface TerminalWindowProps {
  posts?: PostMeta[];
}

export function TerminalWindow({ posts }: TerminalWindowProps) {
  const { setMode } = useModeContext();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [input, setInput] = useState<string>('');
  const [booting, setBooting] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  // LocalStorage Persistence for Current directory Path
  const [currentPath, setCurrentPath] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kapil-portfolio-terminal-path');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return ['home', 'visitor'];
  });

  // LocalStorage Persistence for Command History
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kapil-portfolio-terminal-history');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
      }
    }
    return [];
  });

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputLines, setOutputLines] = useState<TerminalLine[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // VFS Initialization utilizing server posts
  const vfs = useRef(generateVFS(posts));
  const bootTimers = useRef<NodeJS.Timeout[]>([]);

  // Sync VFS Path updates to LocalStorage
  useEffect(() => {
    localStorage.setItem('kapil-portfolio-terminal-path', JSON.stringify(currentPath));
  }, [currentPath]);

  // Sync Command History updates to LocalStorage
  useEffect(() => {
    localStorage.setItem('kapil-portfolio-terminal-history', JSON.stringify(commandHistory));
  }, [commandHistory]);

  // Format prompt based on current path
  const getPromptText = (path: string[]) => {
    const pathStr = '/' + path.join('/');
    if (pathStr === '/home/visitor') {
      return 'kapil@portfolio:~$ ';
    }
    if (pathStr.startsWith('/home/visitor')) {
      return `kapil@portfolio:~${pathStr.substring(13)}$ `;
    }
    return `kapil@portfolio:${pathStr}$ `;
  };

  // Run boot sequence (max 1800ms)
  useEffect(() => {
    const bootSteps: { text: string; type: TerminalLine['type']; delay: number }[] = [
      { text: 'KAPIL OS v1.0', type: 'header', delay: 0 },
      { text: '', type: 'normal', delay: 200 },
      { text: 'Loading profile...', type: 'normal', delay: 400 },
      { text: 'Loading projects...', type: 'normal', delay: 800 },
      { text: 'Loading skills...', type: 'normal', delay: 1200 },
      { text: '', type: 'normal', delay: 1400 },
      { text: 'Ready', type: 'success', delay: 1700 },
      { text: "Try typing: help, whoami, projects, experience, stack", type: 'highlight', delay: 1700 }
    ];

    bootSteps.forEach(step => {
      const timer = setTimeout(() => {
        setOutputLines(prev => [...prev, { text: step.text, type: step.type }]);
        if (step.text.startsWith('Try typing:')) {
          setBooting(false);
        }
      }, step.delay);
      bootTimers.current.push(timer);
    });

    return () => {
      bootTimers.current.forEach(clearTimeout);
    };
  }, []);

  // Skip boot sequence
  const handleSkipBoot = () => {
    bootTimers.current.forEach(clearTimeout);
    setOutputLines([
      { text: 'KAPIL OS v1.0', type: 'header' },
      { text: 'Loading profile... Done.', type: 'normal' },
      { text: 'Loading projects... Done.', type: 'normal' },
      { text: 'Loading skills... Done.', type: 'normal' },
      { text: 'Ready', type: 'success' },
      { text: "Try typing: help, whoami, projects, experience, stack", type: 'highlight' }
    ]);
    setBooting(false);
  };

  // Auto scroll to bottom
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [outputLines]);

  // Handle focus scrolling on mobile to keep keyboard from hiding input prompt
  const handleInputFocus = () => {
    setTimeout(scrollToBottom, 120);
  };

  // Focus input on container click
  const handleContainerClick = () => {
    if (!booting) {
      inputRef.current?.focus();
    }
  };

  // Refocus input if focused is lost
  useEffect(() => {
    if (!booting) {
      inputRef.current?.focus();
    }
  }, [booting]);

  // Handle up/down arrow command history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (booting || isPending) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (booting || isPending) return;

    const trimmedInput = input.trim();
    const promptText = getPromptText(currentPath);

    // 1. Log the entered line as a prompt in history
    setOutputLines(prev => [...prev, { text: `${promptText}${input}`, type: 'prompt' }]);
    setInput('');
    setHistoryIndex(-1); // Reset index on command submit

    if (!trimmedInput) return;

    // 2. Persist in command history
    setCommandHistory(prev => {
      const updated = [trimmedInput, ...prev.filter(x => x !== trimmedInput)].slice(0, 20);
      return updated;
    });

    // 3. Parse command
    const { command, args } = parseCommandLine(trimmedInput);

    // 4. Match and execute command
    startTransition(() => {
      const commandExec = COMMANDS[command];

      if (commandExec) {
        const context: CommandContext = {
          args,
          currentPath,
          setCurrentPath,
          setMode,
          clearLines: () => setOutputLines([]),
          systemFS: vfs.current,
          outputLines,
          theme,
          setTheme,
          router
        };

        try {
          const result = commandExec(context);
          if (result && result.length > 0) {
            setOutputLines(prev => [...prev, ...result]);
          }
        } catch (err) {
          import('@/lib/error-monitoring').then(m => {
            m.captureException(err, { source: 'TerminalCommandExecution', command: trimmedInput });
          });
          setOutputLines(prev => [
            ...prev,
            { text: `bash: error executing command '${command}': ${err instanceof Error ? err.message : String(err)}`, type: 'error' }
          ]);
        }
      } else {
        import('@/lib/error-monitoring').then(m => {
          m.trackTerminalError(trimmedInput, `bash: command not found: ${command}`);
        });
        setOutputLines(prev => [
          ...prev,
          { text: `bash: command not found: ${command}`, type: 'error' },
          { text: "Type 'help' to see available commands.", type: 'normal' }
        ]);
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className="w-full h-full overflow-y-auto px-4 md:px-6 py-4 font-mono text-sm leading-relaxed text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent select-text cursor-text flex flex-col justify-between"
      style={{
        textShadow: '0 0 2px rgba(24, 24, 27, 0.5)'
      }}
    >
      <div>
        {/* Booting Loader Skip Badge */}
        {booting && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleSkipBoot();
            }}
            className="absolute top-12 right-6 px-3 py-1 bg-zinc-900 border border-zinc-700/50 hover:bg-zinc-800 hover:text-white rounded-lg text-xs font-mono text-zinc-400 cursor-pointer transition-colors z-30 flex items-center gap-1.5"
          >
            <span>Skip Boot</span>
            <span className="text-[10px] text-zinc-500 font-sans">↵</span>
          </button>
        )}

        {/* Output history with mobile prompt wrap styling */}
        <div className="space-y-1.5 break-all">
          {outputLines.map((line, idx) => {
            let lineClass = 'text-zinc-300';
            if (line.type === 'prompt') lineClass = 'text-emerald-500 font-semibold';
            else if (line.type === 'header') lineClass = 'text-cyan-400 font-bold text-base';
            else if (line.type === 'highlight') lineClass = 'text-yellow-400';
            else if (line.type === 'success') lineClass = 'text-green-400 font-medium';
            else if (line.type === 'error') lineClass = 'text-red-400 font-medium';
            else if (line.type === 'dir') lineClass = 'text-blue-400 font-semibold';
            else if (line.type === 'file') lineClass = 'text-zinc-100';

            return (
              <div 
                key={idx} 
                className={`whitespace-pre-wrap break-words ${lineClass}`}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full shrink-0">
        {/* Persistent Bottom Status Info Line */}
        {!booting && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-zinc-600 border-t border-zinc-800/80 pt-3 mt-4 shrink-0 select-none">
            <span>Projects: {PROJECTS.length}</span>
            <span>•</span>
            <span>Skills: {SKILLS.length}</span>
            <span>•</span>
            <span>Open Source: {CONTRIBUTIONS.length}</span>
            <span>•</span>
            <span>Mode: Terminal OS</span>
          </div>
        )}

        {/* Command line input with responsive wrapping */}
        {!booting && (
          <form onSubmit={handleSubmit} className="flex items-start md:items-center flex-col sm:flex-row gap-0.5 sm:gap-1.5 mt-2 w-full">
            <span className="text-emerald-500 font-semibold shrink-0 select-none">
              {getPromptText(currentPath)}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              disabled={isPending}
              className="flex-1 w-full bg-transparent border-0 outline-none text-zinc-100 caret-emerald-500 p-0 m-0 font-mono text-sm shadow-none focus:ring-0 focus:border-0"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        )}
      </div>
    </div>
  );
}
