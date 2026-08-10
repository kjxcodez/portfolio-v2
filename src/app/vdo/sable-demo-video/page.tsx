import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Film, CloudUpload } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sable Demo Video",
  description: "Demo video for Sable project.",
  path: "/vdo/sable-demo-video",
});

// Add Google Drive video URL here when available
// Example: "https://drive.google.com/file/d/1234567890/view"
const GOOGLE_DRIVE_VIDEO_URL = "";

function getGoogleDriveEmbedUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^&]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

export default function SableDemoVideoPage() {
  const embedUrl = getGoogleDriveEmbedUrl(GOOGLE_DRIVE_VIDEO_URL);
  const isVideoAvailable = Boolean(embedUrl);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl space-y-6">
        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>

        {/* Page Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
            <Film size={12} className="text-sky-400" />
            <span>Project Demo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Sable Demo Video
          </h1>
        </div>

        {/* Main Card Container */}
        <div className="relative aspect-video w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center">
          {isVideoAvailable ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 rounded-xl"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Sable Demo Video"
            />
          ) : (
            <div className="w-full max-w-sm space-y-6 flex flex-col items-center">
              {/* Icon */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 shadow-inner">
                  <CloudUpload className="w-7 h-7 animate-bounce" />
                </div>
              </div>

              {/* Status Text */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-200 tracking-wide">
                  video is being uploaded..
                </p>
              </div>

              {/* Animated Progress Bar (No timer, simple progress bar) */}
              <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden relative">
                <div className="h-full w-1/2 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400 rounded-full animate-indeterminate-progress" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
