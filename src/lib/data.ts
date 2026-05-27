import type { Project, Skill, Contribution, Experience, CurrentProject, Socials } from '@/types/portfolio'

// ─── Personal ────────────────────────────────────────────────────
export const PERSONAL = {
  name: 'Kapil Kumar Jangid',
  title: 'Full Stack Developer & Open Source Contributor',
  location: 'Rajasthan, India',
  email: 'hello@kapiljangid.pro',
  github: 'https://github.com/kjxcodez',
  twitter: 'https://x.com/kjxcodez',
  bio: 'I build things for the web. Specializing in UI design and creating engaging user experiences. I love open source and building developer tools.',
  available: true,
} as const

// ─── Socials ─────────────────────────────────────────────────────
export const SOCIALS: Socials = {
  github: 'https://github.com/kjxcodez',
  twitter: 'https://x.com/kjxcodez',
  email: 'hello@kapiljangid.pro',
}

// ─── Resume ──────────────────────────────────────────────────────
export const RESUME_URL = '/resume.pdf'

// ─── Experience ──────────────────────────────────────────────────
export const EXPERIENCE: Experience[] = [
  {
    id: 'rapidquest',
    company: 'RapidQuest Solutions',
    role: 'Software Development Engineer',
    type: 'Remote, India',
    period: 'Feb 2025 – May 2026',
    projects: [
      {
        name: 'WhatsApp Marketing Shopify App',
        achievements: [
          'Owned end-to-end merchant onboarding via Meta Cloud API including WABA connection, template builder UI, automated template submission, and per-merchant webhook routing.',
          'Built 5+ automation workflows including abandoned checkout recovery, cart reminders, order confirmation, COD confirmation, and shipping updates.',
          'Implemented bulk campaign and broadcast messaging for segmented user lists.',
          'Added internal team email alert systems for Meta template approval workflows.',
          'Platform reached 1,000+ Shopify installs and 100+ paying merchants.',
        ],
        metrics: [
          { value: '1000+', label: 'Shopify installs' },
          { value: '100+', label: 'Paying merchants' },
          { value: '5+', label: 'Automation systems' },
        ],
      },
      {
        name: 'Email Marketing Shopify App',
        achievements: [
          'Owned the complete drag-and-drop email template builder.',
          'Built reusable content blocks and layout templates.',
          'Automated template previews using Playwright + headless Chromium.',
          'Removed manual screenshot workflows entirely.',
        ],
      },
    ],
  },
]

// ─── Projects ────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'flowcms',
    title: 'FlowCMS',
    description: 'A headless CMS with drag-and-drop page builder and real-time preview',
    longDescription:
      'A modern headless CMS built for speed and flexibility. Features a drag-and-drop visual page builder, real-time content preview, role-based access, and an API-first architecture. Built with Next.js, PostgreSQL, and Prisma.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'shadcn/ui'],
    url: 'https://getflowcms.com',
    github: "https://github.com/kjxcodez/flowcms",
    type: 'web',
    featured: true,
    year: 2025,
    status: 'Live',
    screenshots: ['/flowcms.png', '/flowcms-demo.png', '/flowcms-dashboard.png', '/flowcms-api-keys.png'],
    keyFeatures: [
      'Drag-and-drop visual page builder',
      'Real-time content preview',
      'Role-based access control',
      'API-first headless architecture',
      'Content versioning and drafts',
    ],
  },
  {
    id: 'rune-lang',
    title: 'Rune Lang',
    description: 'A minimal interpreted programming language built from scratch',
    longDescription:
      'Rune Lang is a custom-built, interpreted programming language designed for learning and experimentation. It features a natural, readable syntax built entirely from scratch in Python — including its own lexer, parser, AST system, and tree-walk interpreter. A companion VS Code extension adds syntax highlighting and developer ergonomics.',
    tags: ['Python', 'Lexer', 'Parser', 'AST', 'Interpreter', 'Language Design'],
    url: 'https://rune.kapiljangid.pro',
    github: "https://github.com/kjxcodez/rune-lang",
    type: 'language',
    featured: true,
    year: 2024,
    status: 'Live',
    screenshots: ['/rune-dark.png', '/rune-light.png', '/rune-docs.png'],
    keyFeatures: [
      'Custom lexer and tokenizer built from scratch',
      'Recursive descent parser',
      'AST-based tree-walk interpreter',
      'Variables, control flow, and functions',
      'Companion VS Code extension for syntax highlighting',
    ],
    technicalDecisions: [
      {
        title: 'Why Python',
        body: 'Python allowed rapid prototyping of the interpreter without C-level memory management. The standard library covers tokenization utilities, and the language\'s dynamic typing made AST node representation straightforward.',
      },
    ],
  },
  {
    id: 'ai-auto-commit',
    title: 'AI Auto Commit',
    description: 'AI-powered Git commit message generator for VS Code',
    longDescription:
      'A VS Code extension that auto-generates meaningful commit messages using the Gemini API. Scans staged diffs with simple-git, feeds them to the model, and writes the message directly into the Source Control input box.',
    tags: ['VS Code Extension API', 'TypeScript', 'VSCE', 'Gemini API', 'simple-git'],
    url: 'https://marketplace.visualstudio.com/items?itemName=kjxcodez.ai-commitbot',
    github: 'https://github.com/kjxcodez/ai-commitbot',
    type: 'extension',
    featured: true,
    year: 2024,
    status: 'Live',
    screenshots: ['/ai-commit.png'],
    keyFeatures: [
      'One-click commit message generation from staged diffs',
      'Gemini API integration for AI-powered summaries',
      'Writes directly into VS Code Source Control input box',
      'simple-git for accurate diff extraction',
      'Published on the VS Code Marketplace',
    ],
  },
  {
    id: 'percept-ui',
    title: 'Percept UI',
    description: 'A comprehensive React component library',
    longDescription:
      'A modern, accessible, and customizable component library for React. Includes high-quality UI components, templates, and a CLI for scaffolding projects. Published on npm.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Nextra', 'Next.js', 'npm', 'Vite'],
    url: 'https://perceptui-v1.kapiljangid.pro',
    github: 'https://github.com/perceptui/ui',
    type: 'tool',
    featured: false,
    year: 2024,
    status: 'Live',
    screenshots: ['/perceptui.png', '/perceptui-cli.png', '/perceptui-doc-1.png', '/perceptui-avatar-example.png'],
    keyFeatures: [
      'React component library with full TypeScript support',
      'CLI for scaffolding projects with Percept components',
      'Published on npm',
      'Nextra-powered documentation site',
    ],
  },
  {
    id: 'rune-lang-vscode',
    title: 'Rune Lang VS Code Extension',
    description: 'Official VS Code support for Rune Lang',
    longDescription:
      'Provides first-class VS Code support for Rune Lang — syntax highlighting via TextMate grammars, code snippets, and in-editor execution. Published to the VS Code Marketplace.',
    tags: ['VS Code Extension API', 'TypeScript', 'VSCE', 'TextMate Grammars', 'Marketplace'],
    url: 'https://marketplace.visualstudio.com/items?itemName=kjxcodez.rune',
    github: "https://github.com/kjxcodez/rune-lang-support-extension",
    type: 'extension',
    featured: false,
    year: 2024,
    status: 'Live',
    screenshots: ['/rune-extension.png'],
    keyFeatures: [
      'Syntax highlighting via TextMate grammars',
      'Code snippets for common Rune patterns',
      'Published to the VS Code Marketplace',
    ],
  },
  {
    id: 'brainly',
    title: 'Brainly',
    description: 'A second brain for your links and docs',
    longDescription:
      'Store, organise, and surface important content with ease. Full-stack app with React + Vite frontend and an Express/MongoDB API. Supports tagging, search, and sharing.',
    tags: ['Vite', 'React', 'Tailwind CSS', 'shadcn/ui', 'MongoDB', 'Express', 'Zod'],
    url: 'https://brainlyv1.vercel.app',
    github: 'https://github.com/kjxcodez/brainly',
    type: 'web',
    featured: false,
    year: 2024,
    status: 'Live',
    screenshots: ['/brainly.png', '/brainly-light.png'],
    keyFeatures: [
      'Save and organise links, notes, and documents',
      'Tag-based categorisation and full-text search',
      'Share collections with a public link',
      'Full-stack: React + Vite frontend, Express + MongoDB backend',
    ],
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    description: 'Clean, no-frills URL shortener',
    longDescription:
      'Shorten long URLs and share them instantly. Built with Next.js and Postgres via Prisma. Supports custom slugs and click tracking.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Postgres', 'Prisma'],
    url: 'https://shorturlmaker.vercel.app',
    github: 'https://github.com/kjxcodez/url-shortner',
    type: 'web',
    featured: false,
    year: 2024,
    status: 'Live',
    screenshots: ['/url-shortner.png'],
    keyFeatures: [
      'Instant URL shortening with custom slugs',
      'Click tracking per link',
      'Next.js + Postgres + Prisma stack',
    ],
  },
  {
    id: 'greentechmodelers',
    title: 'Greentech Modelers',
    description: 'Modern agricultural infrastructure and sustainable development platform',
    longDescription:
      'A corporate platform built for GreenTech Modelers showcasing sustainable agricultural infrastructure solutions, hydroponic farming systems, greenhouse technologies, and integrated rural development initiatives. The platform presents large-scale master plans combining modern agriculture, logistics, education, and environmental sustainability into a unified digital experience.',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Responsive Design',
      'UI/UX',
      'Corporate Website'
    ],
    url: 'http://greentechmodelers.com',
    github: '',
    type: 'web',
    featured: false,
    year: 2025,
    status: 'Live',
    screenshots: ['/greentechmodelers.png'],
    keyFeatures: [
      'Interactive presentation of agricultural master plans',
      'Responsive multi-section corporate website',
      'Showcases hydroponic and greenhouse technologies',
      'Integrated project information and partnerships sections',
      'Contact and lead generation functionality',
      'Optimized user experience across devices'
    ],
  },
  {
    id: 'calendar-kanban',
    title: 'Calendar Kanban Board',
    description: 'Interactive calendar scheduling system with drag-and-drop and gesture support',
    longDescription:
      'Built an interactive calendar management platform focused on fluid scheduling workflows across desktop and mobile devices. Users can create events, drag and move them across days, navigate using swipe gestures, and access detailed event views with smooth animations. The project emphasizes responsive UX, gesture handling, and highly interactive frontend behavior.',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      '@dnd-kit',
      '@use-gesture/react'
    ],
    url: 'https://calendly.kapiljangid.pro',
    github: 'https://github.com/CuriousCoder00/kanban-calendar',
    type: 'web',
    featured: false,
    year: 2025,
    status: 'Live',
    keyFeatures: [
      'Drag-and-drop event movement across days',
      'Mobile swipe navigation and desktop week navigation',
      'Interactive event creation and scheduling workflow',
      'Responsive day and week calendar views',
      'Smooth animations using Framer Motion',
      'Gesture-based interactions using use-gesture'
    ],
    technicalChallenges: [
      {
        problem: 'Drag and swipe interactions conflicted with each other',
        solution: 'Implemented gesture thresholds and drag boundaries'
      }
    ],
  },
  {
    id: 'aura-wallpaper-app',
    title: 'Aura - AI Wallpaper Studio',
    description: 'AI-powered wallpaper generator and gallery app built with React Native',
    longDescription:
      'Aura is a React Native app that lets you generate stunning wallpapers from natural language prompts using the Pollinations.ai free API. Features a Daily Drop with a fresh AI wallpaper every morning, style presets (neon, minimal, nature, cyberpunk), a masonry gallery, save to camera roll, favorites collection, and daily notifications.',
    tags: ['React Native', 'TypeScript', 'Expo', 'NativeWind', 'Android', 'AI'],
    type: 'mobile',
    featured: false,
    year: 2025,
    status: 'In Development',
    screenshots: [
      '/aura-1.jpeg',
      '/aura-2.jpeg',
      '/aura-3.jpeg',
      '/aura-4.jpeg',
      '/aura-5.jpeg',
    ],
    github: "https://github.com/kjxcodez/aura-wallpaper-apk",
    apkUrl: '/apk/aura-preview.apk',
    keyFeatures: [
      'Prompt-to-wallpaper generation via Pollinations.ai',
      'Daily Drop — fresh AI wallpaper every morning',
      'Style presets: neon, minimal, nature, cyberpunk',
      'Masonry gallery with save to camera roll',
      'Favorites collection',
      'Daily push notifications',
    ],
    technicalDecisions: [
      {
        title: 'Why Pollinations.ai',
        body: 'Pollinations.ai provides a free, no-auth image generation API with stable model access. This removed the need for API key management for end users and kept the app fully free to run.',
      },
      {
        title: 'Why Expo',
        body: 'Expo provides a managed React Native workflow with OTA updates, EAS Build for APK distribution, and a rich ecosystem of native modules — all without requiring Xcode or Android Studio for the initial build.',
      },
      {
        title: 'Why React Native',
        body: 'A single TypeScript codebase that targets Android natively. NativeWind brings familiar Tailwind utility classes to native components, keeping styling consistent with web projects.',
      },
    ],
  },
]

// ─── Skills ──────────────────────────────────────────────────────
export const SKILLS: Skill[] = [
  // Languages
  { name: 'JavaScript', icon: 'javascript', category: 'languages', level: 3 },
  { name: 'TypeScript', icon: 'typescript', category: 'languages', level: 3 },
  { name: 'Python', icon: 'python', category: 'languages', level: 2 },
  // Frontend
  { name: 'React', icon: 'react', category: 'frontend', level: 3 },
  { name: 'Next.js', icon: 'ri_nextjs', category: 'frontend', level: 3 },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend', level: 3 },
  { name: 'ShadCN', icon: 'ri_shadcn', category: 'frontend', level: 3 },
  { name: 'MUI', icon: 'ri_mui', category: 'frontend', level: 2 },
  { name: 'Chakra UI', icon: 'ri_chakra', category: 'frontend', level: 2 },
  // Backend
  { name: 'Node.js', icon: 'ri_nodejs', category: 'backend', level: 3 },
  { name: 'Express', icon: 'ri_express', category: 'backend', level: 3 },
  { name: 'REST APIs', icon: 'ri_api', category: 'backend', level: 3 },
  { name: 'Webhooks', icon: 'ri_webhook', category: 'backend', level: 3 },
  { name: 'Redis', icon: 'ri_redis', category: 'backend', level: 2 },
  { name: 'Better Auth', icon: 'ri_auth', category: 'backend', level: 2 },
  // Databases
  { name: 'PostgreSQL', icon: 'ri_postgresql', category: 'databases', level: 3 },
  { name: 'MongoDB', icon: 'ri_mongodb', category: 'databases', level: 2 },
  { name: 'Prisma', icon: 'ri_prisma', category: 'databases', level: 3 },
  { name: 'Supabase', icon: 'ri_supabase', category: 'databases', level: 2 },
  // Integrations
  { name: 'Meta Cloud API', icon: 'ri_meta', category: 'integrations', level: 3 },
  { name: 'WhatsApp Business', icon: 'ri_whatsapp', category: 'integrations', level: 3 },
  { name: 'Shopify API', icon: 'ri_shopify', category: 'integrations', level: 3 },
  { name: 'Razorpay', icon: 'ri_razorpay', category: 'integrations', level: 2 },
  { name: 'Gemini', icon: 'ri_gemini', category: 'integrations', level: 2 },
  { name: 'Resend', icon: 'ri_resend', category: 'integrations', level: 2 },
  // Tools
  { name: 'Git', icon: 'git', category: 'tools', level: 3 },
  { name: 'Playwright', icon: 'ri_playwright', category: 'tools', level: 2 },
  { name: 'VS Code Extensions', icon: 'vscode', category: 'tools', level: 3 },
  { name: 'Sentry', icon: 'ri_sentry', category: 'tools', level: 2 },
  { name: 'Cloudflare', icon: 'ri_cloudflare', category: 'tools', level: 2 },
  // Other
  { name: 'CLI Tooling', icon: 'ri_cli', category: 'other', level: 3 },
  { name: 'SaaS Billing', icon: 'ri_billing', category: 'other', level: 2 },
  { name: 'Idempotent Webhooks', icon: 'ri_idempotent', category: 'other', level: 2 },
]

// ─── Currently Building ─────────────────────────────────────────
export const CURRENTLY_BUILDING: CurrentProject[] = [
  {
    title: 'kapil-portfolio',
    description: 'This portfolio — 4 modes, RPG world, macOS desktop, terminal OS. You\'re looking at it.',
    url: 'https://github.com/kjxcodez',
    status: 'In progress',
  },
  {
    title: 'Percept UI v2',
    description: 'Rebuilding the component library with Tailwind v4 and React 19 server components.',
    status: 'Early design',
  },
]

// ─── Open Source Contributions ───────────────────────────────────
// Seeded from GitHub API — live data fetched via lib/github.ts at runtime (ISR)
export const CONTRIBUTIONS: Contribution[] = [
  {
    id: 2720115333,
    repo: 'mehul-m-prajapati/github_tracker',
    repoUrl: 'https://github.com/mehul-m-prajapati/github_tracker',
    title: 'Feat/UI — full UI revamp',
    url: 'https://github.com/mehul-m-prajapati/github_tracker/pull/59',
    type: 'PR',
    status: 'Open',
    date: '2024-12-05',
    description: 'Complete UI overhaul for a GitHub activity tracker dashboard.',
  },
  {
    id: 2727922916,
    repo: 'diffusionstudio/examples',
    repoUrl: 'https://github.com/diffusionstudio/examples',
    title: 'BUG: small UI issue with select component',
    url: 'https://github.com/diffusionstudio/examples/issues/2',
    type: 'Issue',
    status: 'Open',
    date: '2024-12-09',
    description: 'Reported a UI inconsistency in the select component.',
  },
  {
    id: 2679838656,
    repo: 'perceptui/ui',
    repoUrl: 'https://github.com/perceptui/ui',
    title: 'feat(cli): add initial CLI setup with project creation commands',
    url: 'https://github.com/perceptui/ui/pull/10',
    type: 'PR',
    status: 'Merged',
    date: '2024-11-21',
    description: 'Bootstrapped the Percept UI CLI tool for project scaffolding.',
  },
  {
    id: 2724637280,
    repo: 'perceptui/ui',
    repoUrl: 'https://github.com/perceptui/ui',
    title: 'Improved the CLI — better DX and error handling',
    url: 'https://github.com/perceptui/ui/pull/15',
    type: 'PR',
    status: 'Merged',
    date: '2024-12-07',
    description: 'Enhanced CLI UX with better prompts and descriptive error messages.',
  },
  {
    id: 2724558107,
    repo: 'perceptui/ui',
    repoUrl: 'https://github.com/perceptui/ui',
    title: 'feat(templates): add improvement issue template',
    url: 'https://github.com/perceptui/ui/pull/13',
    type: 'PR',
    status: 'Merged',
    date: '2024-12-07',
    description: 'Added structured improvement issue template to streamline feedback.',
  },
  {
    id: 2720928780,
    repo: 'perceptui/vite-react-ts-tailwind-template',
    repoUrl: 'https://github.com/perceptui/vite-react-ts-tailwind-template',
    title: 'Initialize Vite + React + TypeScript + Tailwind template',
    url: 'https://github.com/perceptui/vite-react-ts-tailwind-template/pull/1',
    type: 'PR',
    status: 'Merged',
    date: '2024-12-05',
    description: 'Bootstrapped the official Percept UI starter template.',
  },
  {
    id: 2997333460,
    repo: 'kjxcodez/astra-chatbot',
    repoUrl: 'https://github.com/kjxcodez/astra-chatbot',
    title: 'Adds chatbot implementation with logging and history',
    url: 'https://github.com/kjxcodez/astra-chatbot/pull/1',
    type: 'PR',
    status: 'Merged',
    date: '2025-04-15',
    description: 'Full chatbot implementation with conversation history and request logging.',
  },
  {
    id: 2739985995,
    repo: 'kjxcodez/LinkVerse',
    repoUrl: 'https://github.com/kjxcodez/LinkVerse',
    title: 'Initialize Next.js project with TypeScript, Tailwind CSS, and ESLint',
    url: 'https://github.com/kjxcodez/LinkVerse/pull/1',
    type: 'PR',
    status: 'Merged',
    date: '2024-12-14',
    description: 'Set up project scaffolding with full TypeScript and Tailwind configuration.',
  },
]

// ─── Metadata ────────────────────────────────────────────────────
export const LAST_UPDATED = '2026-05-26'
