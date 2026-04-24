'use client'

import { useEffect } from 'react'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { Window } from './Window'
import { AboutApp } from './apps/AboutApp'
import { ProjectsApp } from './apps/ProjectsApp'
import { SkillsApp } from './apps/SkillsApp'
import { BlogApp } from './apps/BlogApp'
import { ContactApp } from './apps/ContactApp'
import { GitHubApp } from './apps/GitHubApp'
import { useWindowStore } from '@/lib/window-store'
import type { PostMeta } from '@/lib/mdx'

interface DesktopProps {
  posts: PostMeta[]
}

export function Desktop({ posts }: DesktopProps) {
  const openWindow = useWindowStore((s) => s.openWindow)

  // Open About by default on first mount
  useEffect(() => {
    openWindow('about')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ paddingTop: 28 }}>
      <MenuBar />

      {/* Window layer — position:relative for react-rnd bounds */}
      <div className="relative w-full h-full" id="desktop-area">
        <Window id="about">
          <AboutApp />
        </Window>
        <Window id="projects">
          <ProjectsApp />
        </Window>
        <Window id="skills">
          <SkillsApp />
        </Window>
        <Window id="blog">
          <BlogApp posts={posts} />
        </Window>
        <Window id="contact">
          <ContactApp />
        </Window>
        <Window id="github">
          <GitHubApp />
        </Window>
      </div>

      <Dock />
    </div>
  )
}
