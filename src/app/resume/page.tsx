import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resume",
  ogTitle: "Resume — Kapil Kumar Jangid",
  description: "Full Stack Developer with experience in React, Next.js, TypeScript, and Node.js. Open source contributor based in Rajasthan, India.",
  keywords: ["resume", "CV", "Full Stack Developer", "React", "Next.js", "Kapil Kumar Jangid"],
  path: "/resume",
});

export default function ResumePage() {
  return null;
}
