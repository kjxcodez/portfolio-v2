import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { PERSONAL } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  ogTitle: "Contact | Kapil Kumar Jangid",
  description:
    "Get in touch with Kapil Kumar Jangid — open to full-time roles, freelance projects, and open source collaborations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-175 px-4 pt-24 pb-20 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs transition-colors mb-10 text-muted-foreground hover:text-muted-foreground/80 font-ui"
      >
        <ArrowLeft size={12} /> Back to portfolio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* ── Left: Info panel ───────────────────────────────────── */}
        <div>
          <p className="uppercase mb-2 text-muted-foreground font-mono text-xs tracking-wide">
            Contact
          </p>
          <h1 className="text-2xl font-bold leading-tight text-(--text-primary) font-ui mb-3">
            Let&apos;s work together
          </h1>
          <p className="text-sm text-muted-foreground font-ui leading-relaxed mb-5">
            I&apos;m currently open to full-time engineering roles and select freelance
            &amp; contract projects. I typically respond within 24–48 hours.
          </p>

          {PERSONAL.available && (
            <div className="inline-flex items-center gap-1.5 rounded border border-(--success) bg-(--success-subtle) text-(--success) font-mono text-[0.625rem] tracking-tight px-2.5 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-(--success) inline-block animate-pulse" />
              Available for opportunities
            </div>
          )}

          <div className="h-px bg-(--border-subtle) mb-6" />

          {/* Quick links */}
          <div className="flex flex-col gap-3.5 mb-6">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="group inline-flex items-center gap-3 text-muted-foreground hover:text-(--text-primary) transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-(--bg-surface) group-hover:border-(--border-strong) transition-colors">
                <Mail size={13} />
              </span>
              <span className="flex flex-col">
                <span className="text-[0.625rem] font-mono uppercase tracking-wide text-(--text-tertiary)">
                  Email
                </span>
                <span className="text-xs font-ui">{PERSONAL.email}</span>
              </span>
            </a>

            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-muted-foreground hover:text-(--text-primary) transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-(--bg-surface) group-hover:border-(--border-strong) transition-colors">
                <GithubIcon size={13} />
              </span>
              <span className="flex flex-col">
                <span className="text-[0.625rem] font-mono uppercase tracking-wide text-(--text-tertiary)">
                  GitHub
                </span>
                <span className="text-xs font-ui">github.com/kjxcodez</span>
              </span>
            </a>

            <a
              href={PERSONAL.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-muted-foreground hover:text-(--text-primary) transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-(--bg-surface) group-hover:border-(--border-strong) transition-colors">
                <ExternalLink size={13} />
              </span>
              <span className="flex flex-col">
                <span className="text-[0.625rem] font-mono uppercase tracking-wide text-(--text-tertiary)">
                  Twitter / X
                </span>
                <span className="text-xs font-ui">x.com/kjxcodez</span>
              </span>
            </a>
          </div>

          <div className="h-px bg-(--border-subtle) mb-6" />

          {/* Prefer a call */}
          <div>
            <p className="text-[0.625rem] font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
              Prefer a call?
            </p>
            <p className="text-sm text-muted-foreground font-ui mb-3">
              Book a 30-minute intro call
            </p>
            <a
              href="https://cal.com/kapiljangid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors border hover:border-(--border-strong) text-muted-foreground hover:text-(--text-primary) hover:bg-(--bg-elevated) font-ui"
            >
              <ExternalLink size={11} />
              Book a call on Cal.com →
            </a>
          </div>
        </div>

        {/* ── Right: Form ────────────────────────────────────────── */}
        <div>
          <p className="uppercase mb-4 text-muted-foreground font-mono text-xs tracking-wide">
            Send a message
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
