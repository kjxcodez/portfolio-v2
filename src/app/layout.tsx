import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QuickNav } from "@/components/shared/QuickNav";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kapil Kumar Jangid — Full Stack Developer",
  description:
    "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
  metadataBase: new URL("https://kapiljangid.pro"),
  openGraph: {
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Portfolio of Kapil Kumar Jangid — Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    url: "https://kapiljangid.pro",
    siteName: "kapiljangid.pro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapil Kumar Jangid — Full Stack Developer",
    description:
      "Full Stack Developer & Open Source Contributor based in Rajasthan, India.",
    creator: "@kjxcodez",
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
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <QuickNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
