export interface NowItem {
  label?: string
  description: string
}

export interface NowSection {
  id: string
  title: string
  items: NowItem[]
}

export interface NowData {
  updatedAt: string // ISO date, e.g. "2026-05-01"
  sections: NowSection[]
}

export interface UsesItem {
  name: string
  desc: string
  url?: string
}

export interface UsesCategory {
  category: string
  items: UsesItem[]
}

export interface UsesData {
  intro: string
  categories: UsesCategory[]
}
