import type { Metadata } from "next";
import { homeOGUrl } from "@/lib/og";
import { BASE_URL } from "@/lib/seo";
import { ProjectsClient } from "./ProjectsClient";
import { JsonLd } from "@/components/JsonLd";
import { PROJECTS } from "@/lib/data";

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
  const itemListElements = PROJECTS.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE_URL}/projects/${project.id}`,
    name: project.title,
  }));

  return (
    <>
      <JsonLd schema={{
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/projects#collectionpage`,
        url: `${BASE_URL}/projects`,
        name: "Projects | Kapil Kumar Jangid",
        description: "A collection of projects built by Kapil Kumar Jangid — developer tools, web apps, mobile apps, and open source libraries.",
        author: { "@id": `${BASE_URL}/#person` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: itemListElements,
        },
      }} />
      <ProjectsClient />
    </>
  );
}
