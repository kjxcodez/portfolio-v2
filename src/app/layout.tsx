import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { homeOGUrl } from "@/lib/og";
import { BASE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { QuickNav } from "@/components/shared/QuickNav";
import { getAllPosts } from "@/lib/mdx";
import { ModeProvider } from "@/components/shared/ModeProvider";
import { GlobalNav } from "@/components/shared/GlobalNav";
import { AIChatButton } from "@/components/shared/AIChatButton";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kapil Kumar Jangid — Full Stack Developer",
    template: "%s | Kapil Kumar Jangid",
  },
  description:
    "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
  keywords: [
    "Kapil Kumar Jangid",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Open Source",
    "Rajasthan",
    "India",
    "Software Engineer",
    "Web Developer",
  ],
  authors: [{ name: "Kapil Kumar Jangid", url: BASE_URL }],
  creator: "Kapil Kumar Jangid",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    url: BASE_URL,
    siteName: "kapiljangid.pro",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: homeOGUrl("professional"),
        width: 1200,
        height: 630,
        alt: "Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    creator: "@kjxcodez",
    images: [homeOGUrl("professional")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased dark",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        instrumentSerif.variable,
        dmSans.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col max-w-dvw overflow-x-hidden">
        <JsonLd schema={{
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "Kapil Kumar Jangid",
          url: BASE_URL,
          sameAs: [
            "https://github.com/kjxcodez",
            "https://twitter.com/kjxcodez",
          ],
          jobTitle: "Full Stack Developer",
          knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Open Source"],
          address: { "@type": "PostalAddress", addressRegion: "Rajasthan", addressCountry: "IN" },
        }} />
        <JsonLd schema={{
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          url: BASE_URL,
          name: "Kapil Kumar Jangid",
          description: "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor",
          author: { "@id": `${BASE_URL}/#person` },
        }} />
        <ModeProvider>
          {/* Global persistent layer */}
          <GlobalNav />
          <QuickNav posts={posts} />
          <AIChatButton />

          {/* Page content */}
          {children}
        </ModeProvider>
        <Analytics />
      </body>
    </html>
  );
}
