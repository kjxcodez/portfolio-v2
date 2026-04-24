import { Hero } from "@/components/mode1-minimal/Hero";
import { Skills } from "@/components/mode1-minimal/Skills";
import { Projects } from "@/components/mode1-minimal/Projects";
import { OpenSource } from "@/components/mode1-minimal/OpenSource";
import { Blog } from "@/components/mode1-minimal/Blog";
import { Contact } from "@/components/mode1-minimal/Contact";
import { CurrentlyBuilding } from "@/components/mode1-minimal/CurrentlyBuilding";
import { ScrollProgress, BackToTop } from "@/components/mode1-minimal/ScrollUI";
import { KonamiCode } from "@/components/mode1-minimal/KonamiCode";
import { ConsoleMessage } from "@/components/mode1-minimal/ConsoleMessage";
import { SecretTrigger } from "@/components/mode1-minimal/SecretTrigger";
import { TabTitleTrick } from "@/components/mode1-minimal/TabTitleTrick";
import { RageClick } from "@/components/mode1-minimal/RageClick";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { PERSONAL } from "@/lib/data";
import Link from "next/link";

export function MinimalPortfolio() {
  return (
    <>
      {/* Easter eggs & UI chrome */}
      <ConsoleMessage />
      <KonamiCode />
      <SecretTrigger />
      <TabTitleTrick />
      <RageClick />
      <ScrollProgress />
      <BackToTop />

      <SiteHeader />

      {/* Page content — 700px max-width */}
      <main className="mx-auto w-full max-w-[700px] flex flex-col items-center justify-start px-4 pt-24 pb-20">
        <Hero
          name={PERSONAL.name}
          title={PERSONAL.title}
          location={PERSONAL.location}
          githubUrl={PERSONAL.github}
          available={PERSONAL.available}
          email={PERSONAL.email}
        />
        <CurrentlyBuilding />
        <Skills />
        <Projects />
        <OpenSource />
        <Blog />
        <Contact />

        <footer className="w-full text-center text-xs text-zinc-600 mt-12 pb-4 flex items-center justify-center gap-4">
          <span>Built with Next.js · {new Date().getFullYear()}</span>
          <span>·</span>
          <Link href="/now" className="hover:text-zinc-400 transition-colors">Now</Link>
          <span>·</span>
          <Link href="/uses" className="hover:text-zinc-400 transition-colors">Uses</Link>
        </footer>
      </main>
    </>
  );
}