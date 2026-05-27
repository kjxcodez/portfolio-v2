import type { Metadata } from "next";
import { homeOGUrl } from "@/lib/og";
import { BASE_URL } from "@/lib/seo";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects built by Kapil Kumar Jangid — developer tools, web apps, mobile apps, and open source libraries.",
  alternates: { canonical: `${BASE_URL}/projects` },
  openGraph: {
    title: "Projects | Kapil Kumar Jangid",
    description:
      "A collection of projects built by Kapil Kumar Jangid — developer tools, web apps, mobile apps, and open source libraries.",
    url: `${BASE_URL}/projects`,
    type: "website",
    images: [{ url: homeOGUrl("professional"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Kapil Kumar Jangid",
    description:
      "A collection of projects built by Kapil Kumar Jangid — developer tools, web apps, mobile apps, and open source libraries.",
    images: [homeOGUrl("professional")],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
