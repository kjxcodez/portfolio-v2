"use client";

import { useModeContext } from "@/components/shared/ModeProvider";
import { SiteHeader } from "@/components/shared/SiteHeader";

interface ModeAwarePageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean; // Allow disabling navigation completely
}

export function ModeAwarePageWrapper({
  children,
  className = "",
  showNavigation = true
}: ModeAwarePageWrapperProps) {
  const { mode } = useModeContext();

  // Mode-specific navigation
  const Navigation = () => {
    if (!showNavigation) return null;

    switch (mode) {
      case 1: // Minimal - Standard header
        return <SiteHeader />;
      case 2: // macOS Desktop - No header (desktop UI handles navigation)
      case 3: // RPG World - No header (game UI handles navigation)
      case 4: // Terminal OS - No header (terminal handles navigation)
        return null;
      default:
        return <SiteHeader />;
    }
  };

  // Mode-specific content wrapper
  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    switch (mode) {
      case 2: // macOS Desktop (placeholder styling)
        return (
          <div className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl ${className}`}>
            {children}
          </div>
        );

      case 3: // RPG World (placeholder styling)
        return (
          <div className={`bg-emerald-900/30 backdrop-blur-lg border border-emerald-500/30 rounded-xl ${className}`}>
            {children}
          </div>
        );

      case 4: // Terminal OS (placeholder styling)
        return (
          <div className={`bg-black/80 border border-green-500/30 rounded-lg font-mono ${className}`}>
            {children}
          </div>
        );

      default: // Minimal
        return <div className={className}>{children}</div>;
    }
  };

  return (
    <>
      <Navigation />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}
