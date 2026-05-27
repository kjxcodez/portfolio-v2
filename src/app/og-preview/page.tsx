"use client";

// app/og-preview/page.tsx
// Visit /og-preview to see all OG images and copy the URLs

import { useState } from "react";

const BASE = "/api/og";

const PREVIEWS = [
  {
    group: "Homepage Modes",
    items: [
      { label: "Professional", url: `${BASE}?type=home&mode=professional` },
      { label: "Terminal OS", url: `${BASE}?type=home&mode=terminal` },
      { label: "macOS Desktop", url: `${BASE}?type=home&mode=macos` },
      { label: "RPG World", url: `${BASE}?type=home&mode=rpg` },
    ],
  },
  {
    group: "Blog Pages",
    items: [
      { label: "Blog List", url: `${BASE}?type=bloglist` },
      {
        label: "Blog Post",
        url: `${BASE}?type=blog&title=Building+Products+Taught+Me+More+Than+Tutorials+Did&tags=Development,Learning,Products,Experience&date=2026-05-26&readTime=4&description=I+learned+a+lot+from+courses,+but+building+real+products+exposed+problems+that+never+show+up+in+controlled+learning+environments.`,
      },
      {
        label: "Blog Post (short title)",
        url: `${BASE}?type=blog&title=The+Problem+With+Side+Projects&tags=Projects,Learning,Productivity&date=2026-05-26&readTime=4`,
      },
    ],
  },
  {
    group: "Project Pages",
    items: [
      {
        label: "Percept UI",
        url: `${BASE}?type=project&title=Percept+UI&category=Developer+Tool&year=2024&status=live&description=A+modern,+accessible,+and+customizable+component+library+for+React.+Includes+high-quality+UI+components+and+a+CLI.`,
      },
      {
        label: "FlowCMS",
        url: `${BASE}?type=project&title=FlowCMS&category=SaaS+Product&year=2025&status=wip&description=A+headless+CMS+with+drag-and-drop+page+builder+and+real-time+preview.`,
      },
    ],
  },
];

export default function OGPreviewPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (url: string) => {
    const full = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(full);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: "48px 48px", fontFamily: "monospace", color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>
            OG Image Preview
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
            Visit <code style={{ color: "#22c55e" }}>/api/og?type=...</code> to get the PNG. Use the copy button to grab the full URL.
          </p>
        </div>

        {PREVIEWS.map((group) => (
          <div key={group.group} style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.35)", marginBottom: 24, textTransform: "uppercase" }}>
              {group.group}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(560px, 1fr))",
                gap: 32,
              }}
            >
              {group.items.map((item) => (
                <div key={item.url} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                      {item.label}
                    </span>
                    <button
                      onClick={() => copy(item.url)}
                      style={{
                        background: copied === item.url ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 6,
                        padding: "4px 12px",
                        color: copied === item.url ? "#22c55e" : "rgba(255,255,255,0.5)",
                        fontSize: 12,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {copied === item.url ? "✓ Copied!" : "Copy URL"}
                    </button>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.label}
                      style={{
                        width: "100%",
                        aspectRatio: "1200/630",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "block",
                        objectFit: "cover",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLImageElement).style.borderColor = "rgba(255,255,255,0.3)")}
                      onMouseLeave={(e) => ((e.target as HTMLImageElement).style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </a>
                  <code style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", wordBreak: "break-all" }}>
                    {item.url}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}