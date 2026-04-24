export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  url?: string
  github?: string
  image?: string
  featured: boolean
  year: number
}

export interface Skill {
  name: string
  icon: any          // icon component name or SVG path
  category: 'frontend' | 'backend' | 'database' | 'tools'
  level: 1 | 2 | 3      // 1=learning, 2=proficient, 3=expert
}

export interface Contribution {
  id: number
  repo: string
  repoUrl: string
  title: string
  url: string
  type: 'PR' | 'Issue'
  status: 'Merged' | 'Open' | 'Closed'
  date: string
  description?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
}