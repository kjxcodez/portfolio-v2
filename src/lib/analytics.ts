'use client';

import { track } from '@vercel/analytics';

export type AnalyticsEvent = 'mode_switch' | 'project_open' | 'resume_click' | 'contact_click';

// Non-invasive, portfolio-focused tracking helper
export function trackEvent(name: AnalyticsEvent, properties?: Record<string, any>) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] "${name}":`, properties);
    }
    
    // Dispatch event to Vercel Analytics
    track(name, properties);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics Error]', error);
    }
  }
}

// Track layout mode selections
export function trackModeSwitch(newMode: string) {
  trackEvent('mode_switch', { mode: newMode });
}
