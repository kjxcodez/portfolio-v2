// app/api/og/route.tsx
// Usage: /api/og?type=home&mode=terminal
//        /api/og?type=blog&title=My+Post&tags=React,Next.js&date=2026-05-26&readTime=4
//        /api/og?type=project&title=Percept+UI&category=Developer+Tool&year=2024&status=live
//        /api/og?type=bloglist

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { JSX } from "react";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseQuery(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return {
    type: searchParams.get("type") ?? "home", // home | blog | project | bloglist
    mode: searchParams.get("mode") ?? "professional", // professional | terminal | macos | rpg
    title: searchParams.get("title") ?? "",
    tags: searchParams.get("tags")?.split(",").filter(Boolean) ?? [],
    date: searchParams.get("date") ?? "",
    readTime: searchParams.get("readTime") ?? "",
    category: searchParams.get("category") ?? "",
    year: searchParams.get("year") ?? "",
    status: searchParams.get("status") ?? "live",
    description: searchParams.get("description") ?? "",
  };
}

// ─── Templates ──────────────────────────────────────────────────────────────

function HomeTemplate({ mode }: { mode: string }) {
  if (mode === "terminal") return <TerminalHomeOG />;
  if (mode === "macos") return <MacOSHomeOG />;
  if (mode === "rpg") return <RPGHomeOG />;
  return <ProfessionalHomeOG />;
}

// PROFESSIONAL HOME
function ProfessionalHomeOG() {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 72px",
        fontFamily: "serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          display: "flex",
        }}
      />
      {/* Green accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 72,
          right: 72,
          height: "2px",
          background: "linear-gradient(90deg, #22c55e, transparent)",
          display: "flex",
        }}
      />

      {/* Nav bar hint */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          K
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Resume", "GitHub", "Blog", "Contact"].map((item) => (
            <span
              key={item}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}
            >
              {item}
            </span>
          ))}
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid #22c55e",
            borderRadius: 20,
            padding: "6px 14px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
          <span style={{ color: "#22c55e", fontSize: 13 }}>
            Available for opportunities
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          Kapil Kumar
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          Jangid
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "monospace",
            letterSpacing: "0.5px",
            display: "flex",
            marginTop: 8,
          }}
        >
          Full Stack Developer & Open Source Contributor
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["Building products", "Writing", "Open source"].map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                padding: "6px 14px",
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                display: "flex",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 14,
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          kapiljangid.pro
        </div>
      </div>
    </div>
  );
}

// TERMINAL HOME
function TerminalHomeOG() {
  const lines = [
    { text: "KAPIL OS v1.0", color: "#22d3ee", bold: true },
    { text: "Loading profile.", color: "#d4d4d4" },
    { text: "Loading projects.", color: "#d4d4d4" },
    { text: "Loading skills.", color: "#d4d4d4" },
    { text: "Ready", color: "#22c55e" },
    { text: "", color: "" },
    {
      text: "Try typing: help, whoami, projects, experience, stack",
      color: "#f59e0b",
    },
  ];

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "#0a0f0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        position: "relative",
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
          display: "flex",
        }}
      />
      {/* Terminal window */}
      <div
        style={{
          width: 820,
          background: "#0d1117",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(34,197,94,0.3)",
          boxShadow: "0 0 80px rgba(34,197,94,0.15)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "#161b22",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
            <div
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
                display: "flex",
              }}
            />
          ))}
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              marginLeft: 8,
            }}
          >
            visitor@kapil-os: ~ (bash)
          </span>
        </div>
        {/* Content */}
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 8 }}>
          {lines.map((line, i) =>
            line.text ? (
              <div
                key={i}
                style={{
                  color: line.color,
                  fontSize: line.bold ? 22 : 16,
                  fontWeight: line.bold ? 700 : 400,
                  display: "flex",
                }}
              >
                {line.text}
              </div>
            ) : (
              <div key={i} style={{ height: 8, display: "flex" }} />
            )
          )}
          {/* Prompt */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color: "#22c55e", fontSize: 16 }}>
              kapil@portfolio:~$
            </span>
            <div
              style={{
                width: 10,
                height: 18,
                background: "#22c55e",
                display: "flex",
              }}
            />
          </div>
        </div>
        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "10px 32px",
            display: "flex",
            gap: 32,
          }}
        >
          {["Projects: 10", "Skills: 33", "Open Source: 8", "Mode: Terminal OS"].map((s) => (
            <span key={s} style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// MACOS HOME
function MacOSHomeOG() {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e1b4b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Window */}
      <div
        style={{
          width: 700,
          background: "rgba(15,15,30,0.85)",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "rgba(30,30,50,0.9)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
            <div
              key={c}
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: c,
                display: "flex",
              }}
            />
          ))}
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginLeft: 8 }}>
            About Me
          </span>
        </div>
        {/* Body */}
        <div style={{ padding: "28px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Profile card */}
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#1e1e2e",
                border: "2px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              K
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, display: "flex" }}>
                Kapil Kumar Jangid
              </div>
              <div style={{ color: "#818cf8", fontSize: 14, display: "flex" }}>
                Full Stack Developer & Open Source Contributor
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 2,
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                  Rajasthan, India
                </span>
                <div
                  style={{
                    padding: "2px 10px",
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    borderRadius: 12,
                    color: "#22c55e",
                    fontSize: 11,
                    display: "flex",
                  }}
                >
                  AVAILABLE
                </div>
              </div>
            </div>
          </div>
          {/* Currently building */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: 1, display: "flex" }}>
              CURRENTLY BUILDING
            </div>
            {["FlowCMS — Headless CMS with drag-and-drop builder", "Rune Lang — Minimal interpreted language"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "flex" }} />
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dock */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          display: "flex",
          gap: 16,
          background: "rgba(255,255,255,0.08)",
          padding: "12px 20px",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        {[
          { icon: "👤", label: "About" },
          { icon: "📁", label: "Projects" },
          { icon: ">_", label: "Terminal" },
          { icon: "📄", label: "Resume" },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// RPG HOME
function RPGHomeOG() {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "#0a1a0a",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        fontFamily: "monospace",
      }}
    >
      {/* Green world BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, #0d2e0d 0%, #071007 100%)",
          display: "flex",
        }}
      />
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* Game viewport */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -52%)",
          width: 560,
          height: 400,
          background: "#0d1117",
          border: "2px solid rgba(34,197,94,0.3)",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Player */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "2px solid rgba(99,102,241,0.4)",
            background: "rgba(99,102,241,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "#6366f1",
              borderRadius: 2,
              display: "flex",
            }}
          />
        </div>
        {/* Yellow interactables */}
        {[
          { bottom: 80, left: 120 },
          { bottom: 80, left: 230 },
          { bottom: 80, right: 120 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 32,
              height: 32,
              background: "#f59e0b",
              borderRadius: 2,
              display: "flex",
              ...pos,
            }}
          />
        ))}
        {/* Green dots */}
        {[140, 180, 220, 260].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              right: 40,
              top,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
        ))}
      </div>

      {/* Location badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 6,
          padding: "8px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 2 }}>
          LOCATION
        </span>
        <span style={{ color: "#22c55e", fontSize: 15, fontWeight: 700 }}>
          Kapil's Portfolio World
        </span>
      </div>

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: "10px 24px",
          display: "flex",
          gap: 24,
        }}
      >
        {[["W,A,S,D", "Move"], ["E", "Interact"], ["ESC", "Close"]].map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 4,
                padding: "3px 8px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
              }}
            >
              {key}
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BLOG LIST ───────────────────────────────────────────────────────────────

function BlogListTemplate() {
  const posts = [
    { title: "Building Products Taught Me More Than Tutorials Did", tags: ["Development", "Learning"], readTime: "4 min" },
    { title: "My Biggest Development Mistake: Building Too Much Before Validation", tags: ["Product", "Startups"], readTime: "3 min" },
    { title: "The Problem With Side Projects: Finishing Is Harder Than Starting", tags: ["Projects", "Productivity"], readTime: "4 min" },
  ];

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        padding: "52px 72px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 40 }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, letterSpacing: 2, fontFamily: "monospace", display: "flex" }}>
          WRITING
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ color: "#fff", fontSize: 52, fontWeight: 800, letterSpacing: "-1px", display: "flex" }}>
            Blog
          </span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 18, display: "flex" }}>
            5 posts about building things
          </span>
        </div>
      </div>
      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {posts.map((post, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "18px 24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "#fff", fontSize: 17, fontWeight: 600, display: "flex" }}>
                {post.title}
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 4,
                      padding: "2px 10px",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      display: "flex",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "monospace", display: "flex" }}>
              {post.readTime} read
            </span>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "monospace", display: "flex" }}>
          kapiljangid.pro/blog
        </span>
      </div>
    </div>
  );
}

// ─── BLOG POST ────────────────────────────────────────────────────────────────

function BlogPostTemplate({
  title,
  tags,
  date,
  readTime,
  description,
}: {
  title: string;
  tags: string[];
  date: string;
  readTime: string;
  description: string;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "75%",
          background: "linear-gradient(to top, #0a0a0a 60%, transparent)",
          display: "flex",
        }}
      />
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #22c55e, #3b82f6, transparent)",
          display: "flex",
        }}
      />
      {/* Nav */}
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 56,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          K
        </div>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>kapiljangid.pro</span>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          padding: "0 72px 60px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex", gap: 8 }}>
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 5,
                padding: "4px 12px",
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                display: "flex",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 42 : 52,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>
        {/* Description */}
        {description && (
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 700, display: "flex" }}>
            {description}
          </div>
        )}
        {/* Meta */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, fontFamily: "monospace", display: "flex" }}>
            {date}
          </span>
          {readTime && (
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, fontFamily: "monospace", display: "flex" }}>
              ◷ {readTime} min read
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT DETAIL ──────────────────────────────────────────────────────────

function ProjectTemplate({
  title,
  category,
  year,
  status,
  description,
}: {
  title: string;
  category: string;
  year: string;
  status: string;
  description: string;
}) {
  const isLive = status === "live";

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        padding: "60px 72px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative bg glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          display: "flex",
        }}
      />

      {/* Nav hint */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            K
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, display: "flex" }}>←</span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, display: "flex" }}>Back to portfolio</span>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        {category && (
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 6,
              padding: "5px 12px",
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            🔧 {category}
          </div>
        )}
        {year && (
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 6,
              padding: "5px 12px",
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            {year}
          </div>
        )}
        <div
          style={{
            border: `1px solid ${isLive ? "rgba(34,197,94,0.5)" : "rgba(255,165,0,0.5)"}`,
            borderRadius: 6,
            padding: "5px 12px",
            color: isLive ? "#22c55e" : "#f59e0b",
            fontSize: 13,
            fontFamily: "monospace",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: isLive ? "#22c55e" : "#f59e0b",
              display: "flex",
            }}
          />
          {isLive ? "Live" : "In Progress"}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: title.length > 20 ? 64 : 80,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-2px",
          lineHeight: 1,
          marginBottom: 20,
          display: "flex",
        }}
      >
        {title}
      </div>

      {/* Description */}
      {description && (
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 20,
            maxWidth: 780,
            lineHeight: 1.5,
            display: "flex",
            marginBottom: 32,
          }}
        >
          {description}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 14 }}>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: 8,
            padding: "10px 22px",
            color: "#fff",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          ↗ Live Demo
        </div>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "10px 22px",
            color: "rgba(255,255,255,0.6)",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          ◎ Source
        </div>
      </div>

      {/* Domain */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 72,
          color: "rgba(255,255,255,0.2)",
          fontSize: 13,
          fontFamily: "monospace",
          display: "flex",
        }}
      >
        kapiljangid.pro
      </div>
    </div>
  );
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const params = parseQuery(req);

  let element: JSX.Element;

  switch (params.type) {
    case "bloglist":
      element = <BlogListTemplate />;
      break;
    case "blog":
      element = (
        <BlogPostTemplate
          title={params.title || "Blog Post Title"}
          tags={params.tags}
          date={params.date}
          readTime={params.readTime}
          description={params.description}
        />
      );
      break;
    case "project":
      element = (
        <ProjectTemplate
          title={params.title || "Project Title"}
          category={params.category}
          year={params.year}
          status={params.status}
          description={params.description}
        />
      );
      break;
    case "home":
    default:
      element = <HomeTemplate mode={params.mode} />;
      break;
  }

  return new ImageResponse(element, {
    width: WIDTH,
    height: HEIGHT,
  });
}