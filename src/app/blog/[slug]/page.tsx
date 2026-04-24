import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPostSlugs, getPost, getAllPosts } from '@/lib/mdx'
import { ArrowLeft, Clock } from 'lucide-react'
import { ScrollProgress } from '@/components/mode1-minimal/ScrollUI'
import { SiteHeader } from '@/components/shared/SiteHeader'

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Kapil Kumar Jangid`, description: post.description }
}

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: 'one-dark-pro',
        keepBackground: true,
      }],
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

  return (
    <>
      <SiteHeader />
      <ScrollProgress />
      <main className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-20 min-h-screen">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
          <ArrowLeft size={12} /> All posts
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full border dark:border-zinc-700 dark:text-zinc-500">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold leading-snug mb-3">{post.title}</h1>
          <p className="text-zinc-500 text-sm mb-4">{post.description}</p>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
          </div>
        </div>

        {/* Cover image */}
        {post.cover && (
          <div className="w-full aspect-video rounded-xl overflow-hidden border dark:border-zinc-800 mb-10">
            <Image src={post.cover} alt={post.title} width={700} height={394} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-400 prose-pre:border prose-pre:dark:border-zinc-800 prose-pre:rounded-xl prose-img:rounded-xl prose-blockquote:border-l-sky-500">
          <MDXRemote source={post.content} {...(mdxOptions as any)} />
        </article>

        {/* Prev / Next */}
        <div className="flex justify-between gap-4 mt-16 pt-8 border-t dark:border-zinc-800">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-1 max-w-[45%]">
              <span className="text-[11px] text-zinc-600">← Previous</span>
              <span className="text-sm font-medium group-hover:underline line-clamp-2">{prev.title}</span>
            </Link>
          ) : <div />}
          {next && (
            <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-1 items-end text-right max-w-[45%]">
              <span className="text-[11px] text-zinc-600">Next →</span>
              <span className="text-sm font-medium group-hover:underline line-clamp-2">{next.title}</span>
            </Link>
          )}
        </div>
      </main>
    </>
  )
}
