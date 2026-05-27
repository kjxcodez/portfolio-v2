// lib/og.ts
// Helpers to generate OG image URLs for Next.js metadata

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kapiljangid.pro";

type HomeMode = "professional" | "terminal" | "macos" | "rpg";

export function homeOGUrl(mode: HomeMode = "professional") {
  return `${BASE_URL}/api/og?type=home&mode=${mode}`;
}

export function blogListOGUrl() {
  return `${BASE_URL}/api/og?type=bloglist`;
}

export function blogPostOGUrl(params: {
  title: string;
  tags?: string[];
  date?: string;
  readTime?: string | number;
  description?: string;
}) {
  const url = new URL(`${BASE_URL}/api/og`);
  url.searchParams.set("type", "blog");
  url.searchParams.set("title", params.title);
  if (params.tags?.length) url.searchParams.set("tags", params.tags.join(","));
  if (params.date) url.searchParams.set("date", params.date);
  if (params.readTime) url.searchParams.set("readTime", String(params.readTime));
  if (params.description) url.searchParams.set("description", params.description);
  return url.toString();
}

export function projectOGUrl(params: {
  title: string;
  category?: string;
  year?: string | number;
  status?: "live" | "wip";
  description?: string;
}) {
  const url = new URL(`${BASE_URL}/api/og`);
  url.searchParams.set("type", "project");
  url.searchParams.set("title", params.title);
  if (params.category) url.searchParams.set("category", params.category);
  if (params.year) url.searchParams.set("year", String(params.year));
  if (params.status) url.searchParams.set("status", params.status);
  if (params.description) url.searchParams.set("description", params.description);
  return url.toString();
}

// ─── Usage in page.tsx / layout.tsx ──────────────────────────────────────────
//
// Homepage (switch based on current mode stored in cookie/localStorage/URL):
//
//   export const metadata: Metadata = {
//     openGraph: {
//       images: [{ url: homeOGUrl("terminal"), width: 1200, height: 630 }],
//     },
//   };
//
// Blog list:
//
//   export const metadata: Metadata = {
//     openGraph: {
//       images: [{ url: blogListOGUrl(), width: 1200, height: 630 }],
//     },
//   };
//
// Blog post (in app/blog/[slug]/page.tsx):
//
//   export async function generateMetadata({ params }): Promise<Metadata> {
//     const post = await getPost(params.slug);
//     return {
//       openGraph: {
//         images: [{
//           url: blogPostOGUrl({
//             title: post.title,
//             tags: post.tags,
//             date: post.date,
//             readTime: post.readTime,
//             description: post.description,
//           }),
//           width: 1200,
//           height: 630,
//         }],
//       },
//     };
//   }
//
// Project detail (in app/projects/[slug]/page.tsx):
//
//   export async function generateMetadata({ params }): Promise<Metadata> {
//     const project = await getProject(params.slug);
//     return {
//       openGraph: {
//         images: [{
//           url: projectOGUrl({
//             title: project.title,
//             category: project.category,
//             year: project.year,
//             status: project.status,
//             description: project.description,
//           }),
//           width: 1200,
//           height: 630,
//         }],
//       },
//     };
//   }