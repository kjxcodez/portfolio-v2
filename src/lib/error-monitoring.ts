'use client';

import { trackEvent } from './analytics';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || '';

interface CaptureErrorParams {
  message: string;
  stack?: string;
  context?: Record<string, any>;
}

// Fire-and-forget lightweight Sentry ingest capture client
export function captureError({ message, stack, context }: CaptureErrorParams) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Error Captured]`, { message, stack, context });
    }

    // Dynamic warning telemetry backup dispatch (safe for Vercel analytics logs)
    try {
      trackEvent('contact_click', { 
        type: 'ErrorTelemetryFallback', 
        errorMessage: message.substring(0, 80) 
      });
    } catch (e) {}

    if (SENTRY_DSN) {
      const match = SENTRY_DSN.match(/https:\/\/([^@]+)@([^/]+)\/(\d+)/);
      if (match) {
        const [, publicKey, host, projectId] = match;
        const sentryUrl = `https://${host}/api/${projectId}/store/?sentry_version=7&sentry_key=${publicKey}`;
        
        // Asynchronous fire-and-forget request
        fetch(sentryUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_id: Math.random().toString(36).substring(2, 17) + Math.random().toString(36).substring(2, 17),
            timestamp: new Date().toISOString().split('.')[0],
            platform: 'javascript',
            exception: {
              values: [
                {
                  type: 'Error',
                  value: message,
                  stacktrace: stack ? {
                    frames: stack.split('\n').map(line => ({ filename: line.trim() }))
                  } : undefined
                }
              ]
            },
            extra: context
          }),
          keepalive: true
        }).catch(() => {
          // Fire-and-forget: fail silently
        });
      }
    }
  } catch (err) {
    // Fail silently in production
  }
}

// Compatibility captureException layer (retains support across standard error boundaries)
export function captureException(error: Error | unknown, context?: Record<string, any>) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  captureError({ message, stack, context });
}

export function trackTerminalError(command: string, error: string) {
  captureError({
    message: `Terminal Command Error: ${error}`,
    context: { command }
  });
}

export function trackPhaserError(action: string, error: any) {
  captureError({
    message: `Phaser Failure: ${error?.message || String(error)}`,
    context: { action }
  });
}

export function trackDynamicImportFailure(moduleName: string, error: any) {
  captureError({
    message: `Dynamic Import Failed: ${moduleName}`,
    context: { error: String(error) }
  });
}
