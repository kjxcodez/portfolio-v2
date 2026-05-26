import { Hero } from "@/components/mode1-minimal/Hero";
import { ExperienceTimeline } from "@/components/mode1-minimal/ExperienceTimeline";
import { FeaturedProjects, OtherProjects } from "@/components/mode1-minimal/Projects";
import { Skills } from "@/components/mode1-minimal/Skills";
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
        <Blog />
        <Contact />

        <footer
          className="w-full text-center mt-12 pb-4 flex items-center justify-center gap-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}
        >
          <span>Built with Next.js · {new Date().getFullYear()}</span>
          <span>·</span>
          <Link
            href="/now"
            style={{ color: 'var(--text-tertiary)', transition: 'color 120ms ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
          >
            Now
          </Link>
          <span>·</span>
          <Link
            href="/uses"
            style={{ color: 'var(--text-tertiary)', transition: 'color 120ms ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; }}
          >
            Uses
          </Link>
          <span>·</span>
          <SecretProgress />
        </footer>
      </main>
    </>
  );
}