import type { Metadata } from "next";
import { AdaptiveHomepage } from "@/components/homepage/AdaptiveHomepage";
import { getAllPosts } from "@/lib/mdx";
import { homeOGUrl } from "@/lib/og";

export const metadata: Metadata = {
  openGraph: {
    images: [{ url: homeOGUrl("professional"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [homeOGUrl("professional")],
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  return <AdaptiveHomepage posts={posts} />;
}