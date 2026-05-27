import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  ogTitle: "Projects — Kapil Kumar Jangid",
  description: "A collection of web apps, developer tools, mobile apps, and open source projects built by Kapil Kumar Jangid.",
  keywords: ["projects", "portfolio", "web apps", "open source", "developer tools", "Kapil Kumar Jangid"],
  path: "/projects",
});

export default function ProjectsPage() {
  return null;
}
