'use client';

interface HintOverlayProps {
  targetName: string;
}

export function HintOverlay({ targetName }: HintOverlayProps) {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 select-none pointer-events-none">
      <div 
        className="px-4 py-2 bg-zinc-950/90 border border-emerald-500/30 rounded-xl flex items-center gap-2 shadow-lg animate-bounce shrink-0"
        style={{
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
        }}
      >
        <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 rounded text-[11px] font-mono font-bold leading-none select-none">
          E
        </span>
        <span className="text-xs font-mono font-medium text-zinc-200">
          Press E to interact with {targetName}
        </span>
      </div>
    </div>
  );
}
