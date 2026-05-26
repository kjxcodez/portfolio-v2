import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QuickNav } from "@/components/shared/QuickNav";
import { ModeProvider } from "@/components/shared/ModeProvider";
import { GlobalNav } from "@/components/shared/GlobalNav";
import { AIChatButton } from "@/components/shared/AIChatButton";

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
  title: "Kapil Kumar Jangid — Full Stack Developer",
  description:
    "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
  metadataBase: new URL("https://kapiljangid.pro"),
  alternates: {
    canonical: "https://kapiljangid.pro",
  },
  openGraph: {
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    url: "https://kapiljangid.pro",
    siteName: "kapiljangid.pro",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <ModeProvider>
          {/* Global persistent layer */}
          <GlobalNav />
          <QuickNav />
          <AIChatButton />

          {/* Page content */}
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
