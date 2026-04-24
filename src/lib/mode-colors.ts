import { PortfolioMode } from "@/store/mode-store";

export interface ModeColorPalette {
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  // Text colors
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
  };
  // UI element colors
  ui: {
    border: string;
    borderHover: string;
    cardBackground: string;
    cardBackgroundHover: string;
  };
  // Interactive colors
  interactive: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
}

export const MODE_COLOR_PALETTES: Record<PortfolioMode, ModeColorPalette> = {
  // Mode 1: Minimal - Professional Clean
  1: {
    background: {
      primary: 'rgb(255, 255, 255)', // White
      secondary: 'rgb(249, 250, 251)', // Light gray
      tertiary: 'rgb(243, 244, 246)', // Lighter gray
    },
    text: {
      primary: 'rgb(24, 24, 27)', // Near black
      secondary: 'rgb(63, 63, 70)', // Dark gray
      muted: 'rgb(113, 113, 122)', // Medium gray
      accent: 'rgb(14, 165, 233)', // Blue accent
    },
    ui: {
      border: 'rgb(228, 228, 231)', // Light border
      borderHover: 'rgb(212, 212, 216)', // Hover border
      cardBackground: 'rgba(0, 0, 0, 0.02)', // Subtle card
      cardBackgroundHover: 'rgba(0, 0, 0, 0.04)', // Hover card
    },
    interactive: {
      primary: 'rgb(59, 130, 246)', // Blue primary
      primaryHover: 'rgb(37, 99, 235)', // Blue hover
      secondary: 'rgb(156, 163, 175)', // Gray secondary
      secondaryHover: 'rgb(107, 114, 128)', // Gray hover
    },
  },

  // Mode 2: macOS - System Colors
  2: {
    background: {
      primary: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(91, 33, 182) 50%, rgb(55, 65, 81) 100%)',
      secondary: 'rgba(0, 0, 0, 0.2)',
      tertiary: 'rgba(0, 0, 0, 0.1)',
    },
    text: {
      primary: 'rgb(255, 255, 255)', // White
      secondary: 'rgb(229, 231, 235)', // Light gray
      muted: 'rgb(156, 163, 175)', // Medium gray
      accent: 'rgb(59, 130, 246)', // System blue
    },
    ui: {
      border: 'rgba(255, 255, 255, 0.1)', // System border
      borderHover: 'rgba(255, 255, 255, 0.2)', // System border hover
      cardBackground: 'rgba(0, 0, 0, 0.3)', // System card
      cardBackgroundHover: 'rgba(0, 0, 0, 0.4)', // System card hover
    },
    interactive: {
      primary: 'rgb(59, 130, 246)', // System blue
      primaryHover: 'rgb(37, 99, 235)', // System blue hover
      secondary: 'rgba(255, 255, 255, 0.1)', // Subtle interactive
      secondaryHover: 'rgba(255, 255, 255, 0.2)', // Subtle hover
    },
  },

  // Mode 3: RPG - Fantasy Palette
  3: {
    background: {
      primary: 'linear-gradient(135deg, rgb(6, 78, 59) 0%, rgb(34, 197, 94) 20%, rgb(20, 83, 45) 100%)',
      secondary: 'rgba(34, 197, 94, 0.3)',
      tertiary: 'rgba(34, 197, 94, 0.1)',
    },
    text: {
      primary: 'rgb(255, 255, 255)', // White
      secondary: 'rgb(240, 253, 244)', // Light green tint
      muted: 'rgb(187, 247, 208)', // Green tinted gray
      accent: 'rgb(250, 204, 21)', // Fantasy gold
    },
    ui: {
      border: 'rgba(34, 197, 94, 0.3)', // Fantasy border
      borderHover: 'rgba(34, 197, 94, 0.5)', // Fantasy border hover
      cardBackground: 'rgba(6, 78, 59, 0.4)', // Fantasy card
      cardBackgroundHover: 'rgba(6, 78, 59, 0.6)', // Fantasy card hover
    },
    interactive: {
      primary: 'rgb(250, 204, 21)', // Fantasy gold
      primaryHover: 'rgb(245, 158, 11)', // Gold hover
      secondary: 'rgb(34, 197, 94)', // Fantasy green
      secondaryHover: 'rgb(22, 163, 74)', // Green hover
    },
  },

  // Mode 4: Terminal - Matrix Green
  4: {
    background: {
      primary: 'rgb(0, 0, 0)', // Pure black
      secondary: 'rgba(0, 255, 65, 0.05)',
      tertiary: 'rgba(0, 255, 65, 0.02)',
    },
    text: {
      primary: 'rgb(0, 255, 65)', // Matrix green
      secondary: 'rgb(34, 197, 94)', // Lighter green
      muted: 'rgba(0, 255, 65, 0.6)', // Dimmed green
      accent: 'rgb(255, 255, 255)', // White accent
    },
    ui: {
      border: 'rgba(0, 255, 65, 0.3)', // Terminal border
      borderHover: 'rgba(0, 255, 65, 0.5)', // Terminal border hover
      cardBackground: 'rgba(0, 255, 65, 0.1)', // Terminal card
      cardBackgroundHover: 'rgba(0, 255, 65, 0.15)', // Terminal card hover
    },
    interactive: {
      primary: 'rgb(0, 255, 65)', // Matrix green
      primaryHover: 'rgb(34, 197, 94)', // Bright green hover
      secondary: 'rgba(0, 255, 65, 0.2)', // Subtle green
      secondaryHover: 'rgba(0, 255, 65, 0.3)', // Subtle green hover
    },
  },
};

// Helper function to get colors for current mode
export function getModeColors(mode: PortfolioMode): ModeColorPalette {
  return MODE_COLOR_PALETTES[mode] || MODE_COLOR_PALETTES[1];
}

// CSS custom properties generator for each mode
export function generateModeCSS(mode: PortfolioMode): string {
  const colors = getModeColors(mode);

  return `
    :root {
      --mode-bg-primary: ${colors.background.primary};
      --mode-bg-secondary: ${colors.background.secondary};
      --mode-bg-tertiary: ${colors.background.tertiary};

      --mode-text-primary: ${colors.text.primary};
      --mode-text-secondary: ${colors.text.secondary};
      --mode-text-muted: ${colors.text.muted};
      --mode-text-accent: ${colors.text.accent};

      --mode-ui-border: ${colors.ui.border};
      --mode-ui-border-hover: ${colors.ui.borderHover};
      --mode-ui-card-bg: ${colors.ui.cardBackground};
      --mode-ui-card-bg-hover: ${colors.ui.cardBackgroundHover};

      --mode-interactive-primary: ${colors.interactive.primary};
      --mode-interactive-primary-hover: ${colors.interactive.primaryHover};
      --mode-interactive-secondary: ${colors.interactive.secondary};
      --mode-interactive-secondary-hover: ${colors.interactive.secondaryHover};
    }
  `;
}