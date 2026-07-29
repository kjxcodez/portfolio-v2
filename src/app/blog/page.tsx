import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { Clock, ArrowLeft } from "lucide-react";
import { blogListOGUrl } from "@/lib/og";
import { buildPageMetadata, BASE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  ogTitle: "Blog — Kapil Kumar Jangid",
  description: "Writing about building things — web, tools, and open source.",
  keywords: ["blog", "web development", "open source", "Next.js", "TypeScript", "Kapil Kumar Jangid"],
  path: "/blog",
  ogImageUrl: blogListOGUrl(),
});

export default function BlogPage() {
  const posts = getAllPosts();

  const itemListElements = posts.map((post, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE_URL}/blog/${post.slug}`,
    name: post.title,
  }));

  return (
    <>
      <JsonLd schema={{
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/blog#collectionpage`,
        url: `${BASE_URL}/blog`,
        name: "Blog — Kapil Kumar Jangid",
        description: "Writing about building things — web, tools, and open source.",
        author: { "@id": `${BASE_URL}/#person` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: itemListElements,
        },
      }} />
      <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs transition-colors mb-6 text-muted-foreground hover:text-muted-foreground/80 font-ui"
          >
            <ArrowLeft size={12} /> Back to portfolio
          </Link>
          <p className="uppercase mb-1 text-foreground/60 font-semibold font-mono text-xs tracking-wide">
            Writing
          </p>
          <h1 className="text-2xl font-bold text-(--text-primary) font-ui">
            Blog
          </h1>
          <p className="text-sm mt-1 text-muted-foreground font-ui">
            {posts.length} posts about building things
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-4 p-4 rounded-xl transition-all duration-200 border bg-(--bg-surface) hover:border-(--border-strong) hover:bg-(--bg-elevated)]"
            >
              {post.cover && (
                <div className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    width={96}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2
                  className="text-sm font-semibold group-hover:underline leading-snug text-(--text-primary)"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {post.title}
                </h2>
                <p
                  className="text-xs mt-1 line-clamp-2 text-muted-foreground font-ui"
                >
                  {post.description}
                </p>
                <div
                  className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground font-mono"
                >
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={10} />
                    {post.readingTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border bg-(--tag-bg) text-(--tag-text) font-mono text-[0.625rem] tracking-tight px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
