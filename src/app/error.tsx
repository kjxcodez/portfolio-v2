'use client';

import { useEffect } from 'react';
import { captureException } from '@/lib/error-monitoring';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Capture runtime crashes automatically
    captureException(error, { 
      source: 'GlobalErrorBoundary', 
      digest: error.digest 
    });
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative py-12 select-none">
      {/* Premium mesh background layout */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-red-500/5 blur-[80px] pointer-events-none" />

      <div 
        className="w-full max-w-md bg-zinc-950 border border-red-500/25 rounded-2xl p-6 shadow-2xl relative text-center flex flex-col gap-6"
        style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.1)' }}
      >
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center shadow-lg relative">
          <span className="text-2xl animate-pulse select-none">⚠️</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold font-mono text-white tracking-tight">
            An unexpected error occurred
          </h1>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm mx-auto font-sans">
            Kapil OS encountered an unhandled exception. The crash has been securely reported for quick diagnostics.
          </p>
          {error.message && (
            <pre className="mt-3 p-3 bg-red-950/20 border border-red-500/10 text-red-450 text-[10px] rounded-lg font-mono text-left overflow-x-auto max-h-32">
              {error.name}: {error.message}
            </pre>
          )}
        </div>

        <div className="flex flex-col gap-2.5 pt-2 font-mono">
          <button
            onClick={reset}
            className="w-full py-2.5 px-4 rounded-xl bg-red-500 text-zinc-950 text-xs font-bold hover:bg-red-400 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-red-500/10"
          >
            Restart Session
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold hover:text-white hover:bg-zinc-850 active:scale-[0.98] transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
