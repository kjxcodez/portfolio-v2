import type { Metadata } from "next";
import { AdaptiveHomepage } from "@/components/homepage/AdaptiveHomepage";
import { getAllPosts } from "@/lib/mdx";
import { homeOGUrl } from "@/lib/og";
import { BASE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "Kapil Kumar Jangid — Full Stack Developer",
  },
  description:
    "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    url: BASE_URL,
    type: "profile",
    images: [{ url: homeOGUrl("professional"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    images: [homeOGUrl("professional")],
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <JsonLd schema={{
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/#profilepage`,
        url: BASE_URL,
        name: "Kapil Kumar Jangid — Full Stack Developer",
        mainEntity: { "@id": `${BASE_URL}/#person` },
      }} />
      <AdaptiveHomepage posts={posts} />
    </>
  );
}
