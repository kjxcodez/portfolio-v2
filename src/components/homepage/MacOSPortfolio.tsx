import { Desktop } from '@/components/mode2-macos/Desktop'
import type { PostMeta } from '@/lib/mdx'

interface MacOSPortfolioProps {
  posts: PostMeta[]
}

export function MacOSPortfolio({ posts }: MacOSPortfolioProps) {
  return <Desktop posts={posts} />
}
