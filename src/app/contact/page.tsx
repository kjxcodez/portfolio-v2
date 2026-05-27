import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  ogTitle: "Contact — Kapil Kumar Jangid",
  description: "Get in touch with Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor.",
  keywords: ["contact", "hire", "Full Stack Developer", "Kapil Kumar Jangid"],
  path: "/contact",
});

export default function ContactPage() {
  return null;
}
