'use client';

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { RPGScene } from './RPGScene';
import type { InteractiveTarget } from './RPGScene';
import { HintOverlay } from './HintOverlay';
import { DialogueOverlay } from './DialogueOverlay';
import { ProjectOverlay } from './ProjectOverlay';
import type { PostMeta } from '@/lib/mdx';

interface RPGGameProps {
  posts: PostMeta[];
}

export function RPGGame({ posts }: RPGGameProps) {
  const [currentZone, setCurrentZone] = useState('Spawn Portal');
  const [nearbyTarget, setNearbyTarget] = useState<InteractiveTarget | null>(null);
  const [activeOverlayTarget, setActiveOverlayTarget] = useState<InteractiveTarget | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  // Proximity callback triggers (shared references)
  const nearbyRef = useRef<InteractiveTarget | null>(null);
  useEffect(() => {
    nearbyRef.current = nearbyTarget;
  }, [nearbyTarget]);

  // Bind Keyboard E (interact) and ESC (close) events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'e') {
        if (nearbyRef.current) {
          setActiveOverlayTarget(nearbyRef.current);
          if (nearbyRef.current.type === 'project') {
            const pid = nearbyRef.current.data.id;
            import('@/lib/analytics').then(m => {
              m.trackEvent('project_open', { projectId: pid, source: 'RPG World' });
            });
          }
        }
      } else if (key === 'escape') {
        setActiveOverlayTarget(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize Phaser Game instance on client mount
  useEffect(() => {
    let game: Phaser.Game | null = null;
    try {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'rpg-canvas-parent',
        backgroundColor: '#09090b',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        },
        scene: [RPGScene]
      };

      game = new Phaser.Game(config);
      gameRef.current = game;

      // Push state triggers into Phaser registry
      game.registry.set('callbacks', {
        onZoneChange: (zone: string) => setCurrentZone(zone),
        onProximityChange: (target: InteractiveTarget | null) => setNearbyTarget(target)
      });
    } catch (err) {
      import('@/lib/error-monitoring').then(m => {
        m.trackPhaserError('Instantiation', err);
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  // Proximity details overlays selector
  const renderDetailsOverlay = () => {
    if (!activeOverlayTarget) return null;

    if (activeOverlayTarget.type === 'project') {
      return (
        <ProjectOverlay 
          target={activeOverlayTarget} 
          onClose={() => setActiveOverlayTarget(null)} 
        />
      );
    }

    return (
      <DialogueOverlay 
        target={activeOverlayTarget} 
        onClose={() => setActiveOverlayTarget(null)} 
      />
    );
  };

  return (
    <div 
      className="relative w-[800px] h-[600px] bg-zinc-950 border border-emerald-500/20 shadow-2xl rounded-2xl overflow-hidden select-none pointer-events-auto"
      style={{
        boxShadow: '0 0 50px rgba(16, 185, 129, 0.12)'
      }}
    >
      {/* 1. Phaser Game Div Canvas */}
      <div id="rpg-canvas-parent" className="w-full h-full" />

      {/* 2. Proximity Interact Floating Hint Indicator */}
      {nearbyTarget && !activeOverlayTarget && (
        <HintOverlay targetName={nearbyTarget.name} />
      )}

      {/* 3. Top-Left HUD Zone Indicator */}
      <div className="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-800 rounded-xl px-4 py-2 font-mono text-xs select-none shadow-lg z-10">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Location</div>
        <div className="font-bold text-emerald-400">{currentZone}</div>
      </div>

      {/* 4. Bottom HUD Controls Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950/90 border border-zinc-800 rounded-xl px-5 py-2 font-mono text-[10.5px] flex items-center gap-4 text-zinc-400 select-none shadow-lg z-10">
        <div className="flex items-center gap-1.5">
          <span className="px-1 py-0.5 bg-zinc-800 text-zinc-100 rounded border border-zinc-700 leading-none">W,A,S,D</span>
          <span>Move</span>
        </div>
        <span className="text-zinc-800 font-light select-none">|</span>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-100 rounded border border-zinc-700 leading-none">E</span>
          <span>Interact</span>
        </div>
        <span className="text-zinc-800 font-light select-none">|</span>
        <div className="flex items-center gap-1.5">
          <span className="px-1 py-0.5 bg-zinc-800 text-zinc-100 rounded border border-zinc-700 leading-none">ESC</span>
          <span>Close</span>
        </div>
      </div>

      {/* 5. Dynamic dialogue / project detail panels overlays */}
      {renderDetailsOverlay()}
    </div>
  );
}
