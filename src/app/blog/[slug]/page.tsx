import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPostSlugs, getPost, getAllPosts } from '@/lib/mdx'
import { ArrowLeft, Clock } from 'lucide-react'
import { ScrollProgress } from '@/components/mode1-minimal/ScrollUI'
import { BlogReader } from '@/components/easter-eggs/BlogReader'
import { blogPostOGUrl } from '@/lib/og'
import { BASE_URL } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const ogImage = blogPostOGUrl({
    title: post.title,
    tags: post.tags,
    date: post.date,
    readTime: post.readingTime,
    description: post.description,
  })
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Kapil Kumar Jangid`,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [`${BASE_URL}/#person`],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Kapil Kumar Jangid`,
      description: post.description,
      images: [ogImage],
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'one-dark-pro', keepBackground: true }],
    ] as any,
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex(p => p.slug === slug)
  const prev = allPosts[idx + 1] ?? null
  const next = allPosts[idx - 1] ?? null

  const wordCount = parseInt(post.readingTime, 10) * 200

  return (
    <>
      <JsonLd schema={{
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/${post.slug}#blogposting`,
        url: `${BASE_URL}/blog/${post.slug}`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        wordCount,
        keywords: post.tags.join(", "),
        author: { "@id": `${BASE_URL}/#person` },
        publisher: { "@id": `${BASE_URL}/#person` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
        ...(post.cover && { image: { "@type": "ImageObject", url: `${BASE_URL}${post.cover}` } }),
      }} />
      <JsonLd schema={{
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/blog/${post.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${BASE_URL}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `${BASE_URL}/blog/${post.slug}`
          }
        ]
      }} />
      <ScrollProgress />
      <BlogReader />
      <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen ">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs transition-colors mb-8 text-muted-foreground hover:text-muted-foreground/80 font-ui"
        >
          <ArrowLeft size={12} /> All posts
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="rounded border bg-(--tag-bg) text-(--tag-text) font-mono text-[0.625rem] tracking-tight px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="text-2xl font-bold leading-snug mb-3 text-(--text-primary) font-ui"
          >
            {post.title}
          </h1>
          <p
            className="text-sm mb-4 text-muted-foreground font-ui"
          >
            {post.description}
          </p>
          <div
            className="flex items-center gap-2 text-xs text-muted-foreground font-mono"
          >
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Cover image */}
        {post.cover && (
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 border">
            <Image
              src={post.cover}
              alt={post.title}
              width={700}
              height={394}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-400 prose-pre:border prose-pre:dark:border-zinc-800 prose-pre:rounded-xl prose-img:rounded-xl prose-blockquote:border-l-sky-500">
          <MDXRemote source={post.content} {...(mdxOptions as any)} />
        </article>

        {/* Prev / Next */}
        <div className="flex justify-between gap-4 mt-16 pt-8 border-t">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-1 max-w-[45%]">
              <span
                className="text-[11px] text-muted-foreground font-mono"
              >
                ← Previous
              </span>
              <span
                className="text-sm font-medium group-hover:underline line-clamp-2 text-(--text-primary) font-ui"
              >
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-1 items-end text-right max-w-[45%]"
            >
              <span
                className="text-[11px] text-muted-foreground font-mono"
              >
                Next →
              </span>
              <span
                className="text-sm font-medium group-hover:underline line-clamp-2 text-(--text-primary) font-ui"
              >
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
