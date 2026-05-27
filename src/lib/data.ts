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
    timeline: 'Early 2025',
    highlights: [
      'Drag-and-drop visual page builder with a portable JSON block schema',
      'Role-based access control with separate author, editor, and admin permissions',
      'API-first content delivery with REST endpoints for headless consumption',
      'Content versioning with draft and publish states',
    ],
    keyFeatures: [
      'Drag-and-drop visual page builder',
      'Real-time content preview',
      'Role-based access control',
      'API-first headless architecture',
      'Content versioning and drafts',
    ],
    architecture: [
      'Next.js App Router - frontend and API routes in a single deployment',
      'Prisma ORM with PostgreSQL for schema-managed content and user storage',
      'shadcn/ui component system for consistent design across builder and dashboard',
      'Role-based middleware applied at the API route level',
    ],
    technicalChallenges: [
      {
        problem: 'Serializing drag-and-drop block state to a portable, database-storable schema',
        solution: 'Designed a JSON block schema using ordered arrays of typed components, enabling predictable serialization, hydration, and block reordering without data loss',
      },
    ],
    learnings: [
      'Portable block schemas require upfront constraint decisions — self-referential or nested blocks add significant complexity',
      'Role-based access is cleaner when permissions are modeled as data rather than hardcoded conditionals',
    ],
    futurePlans: [
      'Webhook support for post-publish events to trigger downstream integrations',
      'Plugin system for registering custom block types',
      'GraphQL endpoint alongside the existing REST API',
    ],
    impact: [
      'Working CMS with live demo at getflowcms.com',
      'Supports drag-and-drop editing, role management, and draft workflows in a single deployable package',
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
    timeline: 'Late 2024',
    highlights: [
      'Complete interpreter built from scratch — lexer, parser, AST, and tree-walk evaluator',
      'Recursive descent parser without any parser generator or combinator library',
      'Operator precedence handled using Pratt parsing inside expression functions',
      'Environment-based scope chain for nested functions and variable resolution',
    ],
    keyFeatures: [
      'Custom lexer and tokenizer built from scratch',
      'Recursive descent parser',
      'AST-based tree-walk interpreter',
      'Variables, control flow, and functions',
      'Companion VS Code extension for syntax highlighting',
    ],
    architecture: [
      'Lexer — tokenizes source text into a flat token stream with type annotations',
      'Parser — recursive descent with Pratt expressions produces a typed AST',
      'Evaluator — tree-walk interpreter traverses the AST and resolves values at runtime',
      'Environment — linked scope chain for variable lookup across function boundaries',
    ],
    technicalDecisions: [
      {
        title: 'Why Python',
        body: 'Python allowed rapid prototyping of the interpreter without C-level memory management. The standard library covers tokenization utilities, and the language\'s dynamic typing made AST node representation straightforward.',
      },
    ],
    technicalChallenges: [
      {
        problem: 'Handling operator precedence without introducing grammar ambiguity',
        solution: 'Encoded precedence levels as integer constants and used Pratt parsing — each expression function consumes tokens up to its own precedence level before returning',
      },
      {
        problem: 'Maintaining correct variable scoping across nested function calls',
        solution: 'Implemented a linked environment chain where each function call creates a new scope object with a pointer to its enclosing scope for lexical lookup',
      },
    ],
    learnings: [
      'Pratt parsers handle operator precedence as a data problem — precedence tables are cleaner than grammar rule layering',
      'A tree-walk interpreter sacrifices execution speed for debuggability and simplicity of implementation',
      'Writing a language from scratch forces precise understanding of scope, evaluation order, and call semantics',
    ],
    futurePlans: [
      'Bytecode compilation pass for improved execution performance',
      'Standard library functions for string and list manipulation',
      'REPL with persistent history',
    ],
    impact: [
      'Fully working interpreter supporting variables, control flow, functions, and closures',
      'Live documentation site at rune.kapiljangid.pro',
      'Companion VS Code extension published to the Marketplace',
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
    timeline: '2024',
    highlights: [
      'VS Code extension that writes AI-generated commit messages directly into the Source Control input box',
      'Gemini API integration for staged diff summarization',
      'simple-git for accurate diff extraction from the active repository',
    ],
    keyFeatures: [
      'One-click commit message generation from staged diffs',
      'Gemini API integration for AI-powered summaries',
      'Writes directly into VS Code Source Control input box',
      'simple-git for accurate diff extraction',
      'Published on the VS Code Marketplace',
    ],
    architecture: [
      'VS Code Extension API — activation on SCM commands, Source Control input injection',
      'simple-git — staged diff extraction from the workspace root',
      'Gemini API — diff summarization and commit message generation',
    ],
    technicalChallenges: [
      {
        problem: 'Writing to the VS Code Source Control input box without clipboard operations',
        solution: 'Used the VS Code SCM API (vscode.scm.inputBox) to set the message value directly, avoiding clipboard dependency',
      },
      {
        problem: 'Keeping diff content within model input token limits',
        solution: 'Truncated diffs above a configurable line threshold and summarized file names in the prompt context',
      },
    ],
    learnings: [
      'VS Code Extension API provides direct access to most IDE surfaces — understanding the activation lifecycle is the main learning curve',
      'Few-shot prompting with format examples improves commit message consistency from the model',
    ],
    futurePlans: [
      'Conventional commit format support',
      'Custom prompt templates configurable per project',
      'Support for additional AI providers',
    ],
    impact: [
      'Published and live on the VS Code Marketplace',
      'Eliminates manual commit message writing for staged changes',
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
    timeline: '2024',
    highlights: [
      'React component library with full TypeScript support, bundled with Vite',
      'Separate CLI tool for scaffolding new projects using Percept components',
      'Both library and CLI published to npm',
      'Nextra-powered documentation site with MDX component examples',
    ],
    keyFeatures: [
      'React component library with full TypeScript support',
      'CLI for scaffolding projects with Percept components',
      'Published on npm',
      'Nextra-powered documentation site',
    ],
    architecture: [
      'Vite build pipeline producing ESM and CJS bundles for the component library',
      'Tailwind CSS utility classes with a namespace prefix to avoid consumer conflicts',
      'CLI built as a standalone Node.js package with interactive prompts',
      'Nextra documentation site with MDX component examples',
    ],
    technicalChallenges: [
      {
        problem: 'Bundling Tailwind CSS without purging consumer project classes',
        solution: 'Applied a package-level Tailwind prefix to namespace all component styles, preventing selector conflicts with consumer Tailwind configurations',
      },
      {
        problem: 'Avoiding duplicate React instances when the library is installed alongside a React project',
        solution: 'Marked React and ReactDOM as peerDependencies in package.json and configured Vite to externalize them from the bundle output',
      },
    ],
    learnings: [
      'React library bundling requires careful peerDependency configuration to avoid duplicate module instances',
      'Tailwind namespacing prevents style collisions but requires consumers to add the prefix to their content scan paths',
      'Documentation quality directly affects whether a component library gets adopted',
    ],
    futurePlans: [
      'Rebuild with Tailwind v4 and React 19 server component support (Percept UI v2)',
      'Storybook integration for interactive component development',
      'Expanded component coverage including data tables and advanced form controls',
    ],
    impact: [
      'Library and CLI published on npm',
      'Documentation site live at perceptui-v1.kapiljangid.pro',
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
    timeline: '2024',
    highlights: [
      'Authored TextMate grammar for Rune Lang syntax tokenization',
      'Published as the official VS Code extension for Rune Lang',
      'Code snippets for common Rune language constructs',
    ],
    keyFeatures: [
      'Syntax highlighting via TextMate grammars',
      'Code snippets for common Rune patterns',
      'Published to the VS Code Marketplace',
    ],
    architecture: [
      'TextMate grammar (tmLanguage JSON) defining token patterns via regex scopes',
      'VS Code snippet definitions for common Rune patterns',
      'Extension manifest wiring grammar and snippets to the Rune file type',
    ],
    learnings: [
      'TextMate grammars use regex-based scope matching — scope names must align with theme color rules for correct highlighting',
      'VS Code extension activation events should be scoped narrowly to avoid slowing editor startup',
    ],
    futurePlans: [
      'Language server implementation for hover documentation and inline error reporting',
      'In-editor run output display via output panels',
    ],
    impact: [
      'Published and functional on the VS Code Marketplace',
      'Provides syntax highlighting and snippets for all Rune Lang files in VS Code',
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
    timeline: '2024',
    highlights: [
      'Full-stack content management app — React frontend with an Express + MongoDB backend',
      'Tag-based content organization with full-text search',
      'Public collection sharing via generated share links',
    ],
    keyFeatures: [
      'Save and organise links, notes, and documents',
      'Tag-based categorisation and full-text search',
      'Share collections with a public link',
      'Full-stack: React + Vite frontend, Express + MongoDB backend',
    ],
    architecture: [
      'React + Vite frontend for fast HMR during development',
      'Express.js REST API with Zod schema validation on all request bodies',
      'MongoDB for flexible document storage supporting mixed content types',
      'shadcn/ui component system for consistent UI across the app',
    ],
    technicalChallenges: [
      {
        problem: 'Validating mixed content payloads (links, notes, documents) through a shared API endpoint',
        solution: 'Used Zod discriminated unions keyed on content type, validating each variant against its own schema while sharing one route handler',
      },
    ],
    learnings: [
      'MongoDB document modeling suits user-owned content with variable structure — schema flexibility is useful when content types differ',
      'Zod discriminated unions cleanly handle polymorphic API payloads without branching validation logic',
    ],
    futurePlans: [
      'Browser extension for one-click link saving from any page',
      'AI-powered content summarization on save',
      'Collaborative shared spaces for team collections',
    ],
    impact: [
      'Working full-stack app with live demo at brainlyv1.vercel.app',
      'Supports tagging, search, and public collection sharing',
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
    timeline: '2024',
    highlights: [
      'Next.js full-stack app with server actions, Postgres, and Prisma',
      'Custom slug support for vanity short URLs',
      'Per-link click tracking stored in Postgres',
    ],
    keyFeatures: [
      'Instant URL shortening with custom slugs',
      'Click tracking per link',
      'Next.js + Postgres + Prisma stack',
    ],
    architecture: [
      'Next.js App Router with server actions handling URL creation and redirect logic',
      'Prisma ORM with PostgreSQL for URL records and click event storage',
      'shadcn/ui for the UI layer',
    ],
    learnings: [
      'URL redirect handling in Next.js requires correct middleware ordering to avoid conflicts with static file serving',
      'Custom slug uniqueness is best enforced at the database constraint level rather than in application code',
    ],
    futurePlans: [
      'Link expiration and password protection options',
      'Analytics dashboard with click trends over time',
    ],
    impact: [
      'Working URL shortener with custom slug and click tracking',
      'Live at shorturlmaker.vercel.app',
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
    timeline: '2025',
    highlights: [
      'Multi-section corporate website for an agricultural technology company',
      'Responsive layout optimized for presentation of large-scale master plans',
      'Covers hydroponic systems, greenhouse technologies, and rural infrastructure',
    ],
    keyFeatures: [
      'Interactive presentation of agricultural master plans',
      'Responsive multi-section corporate website',
      'Showcases hydroponic and greenhouse technologies',
      'Integrated project information and partnerships sections',
      'Contact and lead generation functionality',
      'Optimized user experience across devices'
    ],
    architecture: [
      'Next.js App Router with static generation for fast page loads on content-heavy pages',
      'Tailwind CSS for responsive layout across screen sizes',
    ],
    learnings: [
      'Static generation is preferable for content-heavy pages without dynamic data needs',
      'Corporate information sites benefit from minimal navigation depth and clear section hierarchy',
    ],
    futurePlans: [
      'CMS integration to allow non-technical content updates',
      'Multilingual support for broader reach',
    ],
    impact: [
      'Live at greentechmodelers.com',
      'Presents full project portfolio, technology descriptions, and contact channels',
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
    timeline: 'Early 2025',
    highlights: [
      'Drag-and-drop event scheduling using dnd-kit with pointer and touch support',
      'Mobile swipe navigation using use-gesture with conflict-free gesture handling',
      'Smooth layout animations and transitions via Framer Motion',
    ],
    keyFeatures: [
      'Drag-and-drop event movement across days',
      'Mobile swipe navigation and desktop week navigation',
      'Interactive event creation and scheduling workflow',
      'Responsive day and week calendar views',
      'Smooth animations using Framer Motion',
      'Gesture-based interactions using use-gesture'
    ],
    architecture: [
      'Next.js frontend with client-side state managing calendar events',
      'dnd-kit for accessible drag-and-drop with configurable sensors',
      'use-gesture/react for mobile swipe detection with configurable thresholds',
      'Framer Motion for layout and transition animations tied to calendar state',
    ],
    technicalChallenges: [
      {
        problem: 'Drag-and-drop and swipe gestures share the same pointer events, causing accidental triggers',
        solution: 'Implemented gesture-specific thresholds and directional constraints — horizontal swipes were filtered from dnd-kit sensors while vertical drag was excluded from swipe detection',
      },
      {
        problem: 'Layout animations glitching during drag reorder due to unstable React keys',
        solution: 'Keyed calendar slot components on stable date strings rather than array indices, allowing Framer Motion to correctly track and animate each slot across re-renders',
      },
    ],
    learnings: [
      'Gesture conflict resolution requires explicit directional constraints rather than relying on library defaults',
      'Framer Motion layout animations depend on key stability — index-based keys cause identity confusion during reorders',
      'Calendar date math at week and month boundaries is error-prone and benefits from centralized utility functions',
    ],
    futurePlans: [
      'Recurring event support with RRULE parsing',
      'iCal export for calendar interoperability',
      'Backend persistence with user accounts for saved events',
    ],
    impact: [
      'Working calendar with drag-and-drop and gesture navigation on desktop and mobile',
      'Live at calendly.kapiljangid.pro',
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
    apkUrl: 'https://github.com/kjxcodez/aura-wallpaper-apk/releases/download/v0.1.0/aura-preview.1.apk',
    timeline: '2025',
    highlights: [
      'Prompt-to-wallpaper generation using Pollinations.ai with no user authentication required',
      'Daily Drop feature serving a fresh AI wallpaper each morning via on-device scheduling',
      'Masonry gallery with save-to-camera-roll and favorites collection',
      'Style presets for guided prompt generation — neon, minimal, nature, cyberpunk',
    ],
    keyFeatures: [
      'Prompt-to-wallpaper generation via Pollinations.ai',
      'Daily Drop — fresh AI wallpaper every morning',
      'Style presets: neon, minimal, nature, cyberpunk',
      'Masonry gallery with save to camera roll',
      'Favorites collection',
      'Daily push notifications',
    ],
    architecture: [
      'Expo managed workflow targeting Android with EAS Build for APK distribution',
      'NativeWind for Tailwind utility classes applied to native React Native components',
      'Pollinations.ai REST API for text-to-image generation without authentication',
      'Expo Notifications for daily wallpaper drop alerts',
      'Expo SecureStore for local persistence of favorites and daily state',
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
    technicalChallenges: [
      {
        problem: 'Delivering a fresh daily wallpaper without a backend scheduler',
        solution: 'Persisted the daily wallpaper seed and generation timestamp in Expo SecureStore on-device, regenerating only when the stored date differs from the current day',
      },
      {
        problem: 'Rendering a masonry gallery with variable-height images efficiently on a native list',
        solution: 'Pre-fetched image dimensions at load time and used a two-column height-tracking algorithm to assign each image to the shorter column, producing a balanced layout without a dedicated library',
      },
    ],
    learnings: [
      'Pollinations.ai generation latency varies — the UI must handle indeterminate loading states without blocking navigation',
      'On-device persistence with SecureStore is sufficient for ephemeral state like daily content, avoiding a backend for simple time-based features',
      'NativeWind class compilation differs from web Tailwind in edge cases and requires on-device validation',
    ],
    futurePlans: [
      'Google Play Store submission',
      'User accounts for cross-device favorites sync',
      'Multi-prompt and style-mixing generation modes',
    ],
    impact: [
      'Working Android app with APK available for direct download',
      'Fully free wallpaper generation with no API keys required from the user',
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
