import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Uses — Kapil Kumar Jangid',
}

const SETUP: {
  category: string
  items: {
    name: string
    desc: string
  }[]
}[] = [
  {
    category: 'Editor & Development',
    items: [
      {
        name: 'VS Code',
        desc: 'Primary editor for most projects including frontend, backend, and extensions.',
      },
      {
        name: 'Git',
        desc: 'For version control and managing project history.',
      },
      {
        name: 'AI coding tools',
        desc: 'Used for brainstorming, iteration, debugging, and reducing repetitive work.',
      },
    ],
  },

  {
    category: 'Languages & Frameworks',
    items: [
      {
        name: 'TypeScript',
        desc: 'Used across most projects for both frontend and backend development.',
      },
      {
        name: 'Next.js',
        desc: 'Usually my first choice for building modern web applications.',
      },
      {
        name: 'React',
        desc: 'Primary frontend library for interfaces and component systems.',
      },
      {
        name: 'Python',
        desc: 'Mostly for scripting, experiments, and projects like Rune Lang.',
      },
      {
        name: 'Tailwind CSS',
        desc: 'For building interfaces quickly without leaving the component.',
      },
    ],
  },

  {
    category: 'Backend & Infrastructure',
    items: [
      {
        name: 'Node.js',
        desc: 'Used for APIs, backend services, and application logic.',
      },
      {
        name: 'Prisma',
        desc: 'Primary ORM for database interactions.',
      },
      {
        name: 'PostgreSQL',
        desc: 'Database choice for most structured applications.',
      },
      {
        name: 'MongoDB',
        desc: 'Used where flexible document structures make sense.',
      },
      {
        name: 'Redis',
        desc: 'For caching and handling workflow-related problems.',
      },
    ],
  },

  {
    category: 'Tools & Services',
    items: [
      {
        name: 'GitHub',
        desc: 'Where projects, experiments, and code live.',
      },
      {
        name: 'Vercel',
        desc: 'For frontend deployments and fast iteration.',
      },
      {
        name: 'Figma',
        desc: 'Used for rough layouts and interface ideas.',
      },
      {
        name: 'Playwright',
        desc: 'For automation and browser-based workflows.',
      },
    ],
  },

  {
    category: 'Hardware',
    items: [
      {
        name: 'Windows laptop',
        desc: 'Primary development machine.',
      },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
      >
        <ArrowLeft size={12} />
        Back to portfolio
      </Link>

      <div className="mb-10">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
          Setup
        </p>

        <h1 className="text-2xl font-bold mb-2">
          Uses
        </h1>

        <p className="text-sm text-zinc-500">
          Tools and technologies I regularly use while building products and experiments.
        </p>
      </div>

      <div className="space-y-10">
        {SETUP.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {section.category}
            </h2>

            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-3 p-3 border rounded-xl dark:bg-black/70"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}