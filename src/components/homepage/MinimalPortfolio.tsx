import { Hero } from "@/components/mode1-minimal/Hero";
import { ExperienceTimeline } from "@/components/mode1-minimal/ExperienceTimeline";
import { FeaturedProjects, OtherProjects } from "@/components/mode1-minimal/Projects";
import { Skills } from "@/components/mode1-minimal/Skills";
import { OpenSource } from "@/components/mode1-minimal/OpenSource";
import { Blog } from "@/components/mode1-minimal/Blog";
import { Contact } from "@/components/mode1-minimal/Contact";
import { CurrentlyBuilding } from "@/components/mode1-minimal/CurrentlyBuilding";
import { ScrollProgress, BackToTop } from "@/components/mode1-minimal/ScrollUI";
import { SecretProgress } from "@/components/easter-eggs/SecretProgress";
import Link from "next/link";

export function MinimalPortfolio() {
  return (
    <>
      {/* UI chrome */}
      <ScrollProgress />
      <BackToTop />

      {/* Page content — spec section order */}
      <main className="mx-auto w-full max-w-[700px] flex flex-col items-center justify-start px-4 pt-16 pb-20">
        <Hero />
        <ExperienceTimeline />
        <FeaturedProjects />
        <OtherProjects />
        <Skills />
        <OpenSource />
        <Blog />
        <Contact />

        <footer className="w-full text-center text-xs text-zinc-600 mt-12 pb-4 flex items-center justify-center gap-4">
          <span>Built with Next.js · {new Date().getFullYear()}</span>
          <span>·</span>
          <Link href="/now" className="hover:text-zinc-400 transition-colors">Now</Link>
          <span>·</span>
          <Link href="/uses" className="hover:text-zinc-400 transition-colors">Uses</Link>
          <span>·</span>
          <SecretProgress />
        </footer>
      </main>
    </>
  );
}