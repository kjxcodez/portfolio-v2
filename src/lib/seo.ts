import type { Metadata } from "next";
import { homeOGUrl } from "@/lib/og";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kapiljangid.pro";

export function getCanonicalUrl(path: string): string {
  if (!path || path === "/") return BASE_URL;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${clean}`;
}

interface PageMetadataParams {
  title: string;
  ogTitle?: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImageUrl?: string;
  type?: "website" | "article" | "profile";
}

export function buildPageMetadata({
  title,
  ogTitle,
  description,
  keywords,
  path,
  ogImageUrl,
  type = "website",
}: PageMetadataParams): Metadata {
  const canonical = getCanonicalUrl(path);
  const resolvedOgTitle = ogTitle ?? `${title} | Kapil Kumar Jangid`;
  const image = ogImageUrl ?? homeOGUrl("professional");

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical },
    openGraph: {
      title: resolvedOgTitle,
      description,
      url: canonical,
      type,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description,
      images: [image],
    },
  };
}
