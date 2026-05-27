export type ProjectType = 'web' | 'mobile' | 'tool' | 'extension' | 'language'

export interface TechnicalDecision {
  title: string
  body: string
}

export interface TechnicalChallenge {
  problem: string
  solution: string
}

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
  type: ProjectType
  status?: string
  screenshots?: string[]
  apkUrl?: string
  keyFeatures?: string[]
  technicalDecisions?: TechnicalDecision[]

  timeline?: string
  highlights?: string[]
  technicalChallenges?: TechnicalChallenge[]
  architecture?: string[]
  learnings?: string[]
  futurePlans?: string[]
  impact?: string[]
}

export interface Skill {
  name: string
  icon: string
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'integrations' | 'tools' | 'other'
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

export interface Experience {
  id: string
  company: string
  companyUrl?: string
  role: string
  type: string
  period: string
  projects: ExperienceProject[]
}

export interface ExperienceProject {
  name: string
  achievements: string[]
  metrics?: { value: string; label: string }[]
}

export interface CurrentProject {
  title: string
  description: string
  url?: string
  status: string
}

export interface Socials {
  github: string
  twitter: string
  linkedin?: string
  email: string
}