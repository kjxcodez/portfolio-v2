import { AdaptiveHomepage } from "@/components/homepage/AdaptiveHomepage";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const posts = getAllPosts();
  return <AdaptiveHomepage posts={posts} />;
}