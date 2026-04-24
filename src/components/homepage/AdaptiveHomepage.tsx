"use client";

import { useModeContext } from "@/components/shared/ModeProvider";
import { MinimalPortfolio } from "./MinimalPortfolio";
import { MacOSPortfolio } from "./MacOSPortfolio";
import { RPGPortfolio } from "./RPGPortfolio";
import { TerminalPortfolio } from "./TerminalPortfolio";
import type { PostMeta } from "@/lib/mdx";

interface AdaptiveHomepageProps {
  posts: PostMeta[];
}

export function AdaptiveHomepage({ posts }: AdaptiveHomepageProps) {
  const { mode } = useModeContext();

  switch (mode) {
    case 1:
      return <MinimalPortfolio />;
    case 2:
      return <MacOSPortfolio posts={posts} />;
    case 3:
      return <RPGPortfolio />;
    case 4:
      return <TerminalPortfolio />;
    default:
      return <MinimalPortfolio />;
  }
}