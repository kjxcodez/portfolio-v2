import { PERSONAL, PROJECTS, SKILLS, EXPERIENCE, CONTRIBUTIONS, RESUME_URL } from '@/lib/data';
import type { CommandContext, TerminalLine } from './types';
import { resolvePath } from './filesystem';
import { useModeStore, PortfolioMode } from '@/store/mode-store';

// Deterministic open targets mapping
const OPEN_TARGETS: Record<string, string> = {
  flowcms: "https://github.com/kjxcodez",
  "rune-lang": "https://rune.kapiljangid.live",
  "ai-auto-commit": "https://marketplace.visualstudio.com/items?itemName=kjxcodez.ai-commitbot",
  "percept-ui": "https://perceptui.codebrise.tech",
  "rune-lang-vscode": "https://marketplace.visualstudio.com/items?itemName=kjxcodez.rune",
  brainly: "https://brainlyv1.vercel.app",
  "url-shortener": "https://shorturlmaker.vercel.app",
  
  github: "https://github.com/kjxcodez",
  twitter: "https://x.com/kjxcodez",
  email: "mailto:kapil@kapiljangid.pro",
  
  resume: "/resume.pdf",
  blog: "/blog"
};

export const COMMANDS: Record<
  string,
  (context: CommandContext) => TerminalLine[] | void
> = {
  help: (): TerminalLine[] => {
    return [
      { text: 'KAPIL OS — Available Commands:', type: 'header' },
      { text: '  help          - Show available commands', type: 'normal' },
      { text: '  ls [path]     - List files and directories', type: 'normal' },
      { text: '  cd <dir>      - Change current directory', type: 'normal' },
      { text: '  cat <file>    - Display contents of a file', type: 'normal' },
      { text: '  pwd           - Print current working directory', type: 'normal' },
      { text: '  clear         - Clear the screen', type: 'normal' },
      { text: '  whoami        - Print developer profile summary', type: 'normal' },
      { text: '  skills        - Show grouped expertise levels', type: 'normal' },
      { text: '  stack         - Renders main tech stack overview directly', type: 'normal' },
      { text: '  projects      - Show summary list of all projects', type: 'normal' },
      { text: '  experience    - Show developer work timeline', type: 'normal' },
      { text: '  resume        - Open PDF resume in new tab', type: 'normal' },
      { text: '  opensource    - View open source contributions', type: 'normal' },
      { text: '  blog          - View latest articles', type: 'normal' },
      { text: '  github        - Open GitHub in a new tab', type: 'normal' },
      { text: '  contact       - View contact methods', type: 'normal' },
      { text: '  theme <mode>  - Switch theme (dark | light | system)', type: 'normal' },
      { text: '  mode [1-4]    - Switch layout mode (e.g., "mode 1" for Minimal)', type: 'normal' },
      { text: '  neofetch      - Show system info card', type: 'normal' },
      { text: '  open <target> - Open project, blog, or contact link directly', type: 'normal' },
    ];
  },

  ls: (context): TerminalLine[] => {
    const { args, currentPath, systemFS } = context;
    const targetPathStr = args[0] || '';
    
    const resolved = resolvePath(currentPath, targetPathStr, systemFS);
    if (!resolved) {
      return [{ text: `ls: cannot access '${targetPathStr}': No such file or directory`, type: 'error' }];
    }

    if (resolved.node.type === 'file') {
      return [{ text: resolved.node.name, type: 'file' }];
    }

    const dirNode = resolved.node;
    const children = Object.values(dirNode.children);
    if (children.length === 0) {
      return [];
    }

    // Sort: directories first, then files
    children.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'dir' ? -1 : 1;
    });

    return children.map(c => ({
      text: c.name + (c.type === 'dir' ? '/' : ''),
      type: c.type === 'dir' ? 'dir' : 'file'
    }));
  },

  cd: (context): TerminalLine[] | void => {
    const { args, currentPath, setCurrentPath, systemFS } = context;
    const target = args[0] || '~';

    const resolved = resolvePath(currentPath, target, systemFS);
    if (!resolved) {
      return [{ text: `cd: no such file or directory: ${target}`, type: 'error' }];
    }

    if (resolved.node.type !== 'dir') {
      return [{ text: `cd: not a directory: ${target}`, type: 'error' }];
    }

    setCurrentPath(resolved.path);
  },

  cat: (context): TerminalLine[] => {
    const { args, currentPath, systemFS } = context;
    if (args.length === 0) {
      return [{ text: 'cat: missing file operand', type: 'error' }];
    }

    const target = args[0];
    const resolved = resolvePath(currentPath, target, systemFS);
    
    if (!resolved || resolved.node.type === 'dir') {
      return [{ text: `cat: ${target}: No such file or directory`, type: 'error' }];
    }

    const file = resolved.node;

    // Special trigger for resume download/view
    if (file.name === 'resume.pdf') {
      if (typeof window !== 'undefined') {
        window.open(RESUME_URL, '_blank');
      }
      return [
        { text: 'Opening resume.pdf in a new tab...', type: 'success' }
      ];
    }

    // Split content by newline to return clean terminal lines
    return file.content.split('\n').map(line => ({
      text: line,
      type: 'normal'
    }));
  },

  pwd: (context): TerminalLine[] => {
    return [{ text: `/${context.currentPath.join('/')}`, type: 'normal' }];
  },

  clear: (context): void => {
    context.clearLines();
  },

  whoami: (): TerminalLine[] => {
    return [
      { text: PERSONAL.name, type: 'header' },
      { text: `Title:    ${PERSONAL.title}`, type: 'highlight' },
      { text: `Location: ${PERSONAL.location}`, type: 'normal' },
      { text: 'Role:     Software Development Engineer (Remote, India)', type: 'normal' },
      { text: 'Status:   Actively building high-performance web products.', type: 'success' }
    ];
  },

  skills: (): TerminalLine[] => {
    const lines: TerminalLine[] = [];
    const categories = ['languages', 'frontend', 'backend', 'databases', 'integrations', 'tools', 'other'] as const;

    categories.forEach(cat => {
      const catSkills = SKILLS.filter(s => s.category === cat);
      if (catSkills.length > 0) {
        const displayCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
        lines.push({ text: ``, type: 'normal' });
        lines.push({ text: `[ ${displayCategory} ]`, type: 'header' });
        
        catSkills.forEach(s => {
          // Render visual block indicators
          const activeBlocks = '█████████'.slice(0, s.level * 3);
          const inactiveBlocks = '░░░░░░░░░'.slice(0, (3 - s.level) * 3);
          lines.push({
            text: `${activeBlocks}${inactiveBlocks} ${s.name}`,
            type: 'normal'
          });
        });
      }
    });

    return lines;
  },

  stack: (): TerminalLine[] => {
    return [
      { text: 'Frontend:', type: 'header' },
      { text: '  React', type: 'highlight' },
      { text: '  Next.js', type: 'highlight' },
      { text: '  Tailwind CSS', type: 'highlight' },
      { text: '  ShadCN', type: 'highlight' },
      { text: '', type: 'normal' },
      { text: 'Backend:', type: 'header' },
      { text: '  Node.js', type: 'highlight' },
      { text: '  Express', type: 'highlight' },
      { text: '  Redis', type: 'highlight' },
      { text: '', type: 'normal' },
      { text: 'Database:', type: 'header' },
      { text: '  PostgreSQL', type: 'highlight' },
      { text: '  MongoDB', type: 'highlight' },
      { text: '  Prisma', type: 'highlight' }
    ];
  },

  projects: (): TerminalLine[] => {
    return PROJECTS.map((p, idx) => ({
      text: `${idx + 1} ${p.title} - ${p.description}`,
      type: 'highlight'
    }));
  },

  experience: (): TerminalLine[] => {
    const lines: TerminalLine[] = [];
    
    EXPERIENCE.forEach(exp => {
      lines.push({ text: exp.company, type: 'header' });
      lines.push({ text: exp.role, type: 'highlight' });
      lines.push({ text: exp.period, type: 'normal' });
      lines.push({ text: '', type: 'normal' });
      
      exp.projects.forEach(proj => {
        lines.push({ text: `• ${proj.name}`, type: 'highlight' });
        proj.achievements.forEach(ach => {
          lines.push({ text: `  - ${ach}`, type: 'normal' });
        });
        lines.push({ text: '', type: 'normal' });
      });
    });

    return lines;
  },

  resume: (): TerminalLine[] => {
    if (typeof window !== 'undefined') {
      window.open(RESUME_URL, '_blank');
    }
    return [{ text: 'Opening resume...', type: 'success' }];
  },

  opensource: (): TerminalLine[] => {
    return CONTRIBUTIONS.map(c => ({
      text: `[${c.date}] [${c.type}] [${c.status}] ${c.repo}\n  ${c.title}`,
      type: c.status === 'Merged' ? 'success' : 'normal'
    }));
  },

  blog: (): TerminalLine[] => {
    // Standard mock matches SEED_POSTS
    const posts = [
      { slug: 'building-rune-lang', title: 'Building Rune Lang: A Programming Language From Scratch', date: '2024-11-15', readTime: '12 min' },
      { slug: 'percept-ui-story', title: 'Lessons From Creating an Open Source React Component Library', date: '2024-12-01', readTime: '8 min' },
      { slug: 'open-source-journey', title: 'My First 10 Merged PRs and What I Learned', date: '2025-01-10', readTime: '6 min' },
    ];

    return posts.map(p => ({
      text: `[${p.date}] ${p.title} (${p.readTime})`,
      type: 'highlight'
    }));
  },

  github: (): TerminalLine[] => {
    if (typeof window !== 'undefined') {
      window.open(PERSONAL.github, '_blank');
    }
    return [{ text: `Opening GitHub (${PERSONAL.github})...`, type: 'success' }];
  },

  contact: (): TerminalLine[] => {
    return [
      { text: 'Contact Methods:', type: 'header' },
      { text: `Email:   ${PERSONAL.email}`, type: 'highlight' },
      { text: `GitHub:  ${PERSONAL.github}`, type: 'normal' },
      { text: `Twitter: ${PERSONAL.twitter}`, type: 'normal' },
      { text: 'Type "open email" or "open twitter" to connect!', type: 'success' }
    ];
  },

  theme: (context): TerminalLine[] => {
    const { args, theme, setTheme } = context;
    if (!setTheme) {
      return [{ text: 'Theme control is not available in this environment.', type: 'error' }];
    }

    if (args.length === 0) {
      return [
        { text: `Current theme: ${theme || 'system'}`, type: 'highlight' },
        { text: 'Usage: theme [dark | light | system]', type: 'normal' }
      ];
    }

    const requested = args[0].toLowerCase();
    if (['dark', 'light', 'system'].includes(requested)) {
      setTheme(requested);
      return [{ text: `Theme successfully changed to: ${requested}`, type: 'success' }];
    }

    return [{ text: `Invalid theme choice: '${args[0]}'. Use: dark, light, or system.`, type: 'error' }];
  },

  mode: (context): TerminalLine[] => {
    const { args, setMode } = context;
    if (args.length === 0) {
      return [{ text: 'Usage: mode [1-4]\n  1: Professional\n  2: Desktop OS\n  3: RPG World\n  4: Terminal OS', type: 'normal' }];
    }

    const num = parseInt(args[0], 10);
    if (num >= 1 && num <= 4) {
      // 1. Direct Zustand set to ensure instant persistence
      useModeStore.getState().setMode(num as PortfolioMode);
      
      // 2. Transition trigger
      setMode(num as 1 | 2 | 3 | 4);
      
      return [{ text: `Switching layout to Mode ${num}...`, type: 'success' }];
    }

    return [{ text: `Invalid mode. Choose a number between 1 and 4.`, type: 'error' }];
  },

  neofetch: (): TerminalLine[] => {
    return [
      { text: 'KAPIL OS', type: 'header' },
      { text: '---------------------------', type: 'normal' },
      { text: PERSONAL.title, type: 'highlight' },
      { text: `Location:    ${PERSONAL.location}`, type: 'normal' },
      { text: `Projects:    ${PROJECTS.length} active projects`, type: 'normal' },
      { text: `Skills:      ${SKILLS.length} dynamic skills`, type: 'normal' },
      { text: `Open Source: ${CONTRIBUTIONS.length} PRs/issues contributed`, type: 'normal' }
    ];
  },

  open: (context): TerminalLine[] => {
    const { args, router } = context;
    if (args.length === 0) {
      return [{ text: 'Usage: open [project_id / blog_slug / contact_method]', type: 'error' }];
    }

    // Clean targets (removing file formats if user typed them)
    const target = args[0]
      .toLowerCase()
      .replace('.md', '')
      .replace('.txt', '')
      .replace('.pdf', '');

    const targetUrl = OPEN_TARGETS[target];

    if (targetUrl) {
      if (typeof window !== 'undefined') {
        if (targetUrl.startsWith('mailto:')) {
          window.location.href = targetUrl;
          return [{ text: `Opening mail client...`, type: 'success' }];
        }
        
        // Handle local blog route navigation directly via Next router if possible, or new tab
        if (targetUrl === '/blog' && router) {
          router.push('/blog');
          return [{ text: 'Navigating to blog index...', type: 'success' }];
        }
        
        window.open(targetUrl, '_blank');
      }
      return [{ text: `Opening target '${target}' (${targetUrl})...`, type: 'success' }];
    }

    // Fallback: check if the argument is a raw URL
    if (target.startsWith('http://') || target.startsWith('https://')) {
      if (typeof window !== 'undefined') {
        window.open(args[0], '_blank');
      }
      return [{ text: `Opening link: ${args[0]}...`, type: 'success' }];
    }

    return [
      { text: `open: unknown target '${args[0]}'`, type: 'error' },
      { text: "Try deterministically: 'open flowcms', 'open github', 'open resume', or 'open blog'.", type: 'normal' }
    ];
  }
};
