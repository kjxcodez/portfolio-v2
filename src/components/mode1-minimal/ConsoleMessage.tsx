'use client';

import { useEffect, useRef } from 'react';

const ART = `
%c
  ██╗  ██╗     ██╗
  ██║ ██╔╝     ██║
  █████╔╝      ██║
  ██╔═██╗ ██   ██║
  ██║  ██╗╚█████╔╝
  ╚═╝  ╚═╝ ╚════╝

  Kapil Kumar Jangid
  Full Stack Developer & Open Source Contributor
  ──────────────────────────────────────────
  👀 You opened DevTools. I like you already.
  📧 kapil@kapiljangid.pro
  🐙 github.com/kjxcodez

  P.S. Type "kapil" on the page for another surprise.
`;

export function ConsoleMessage() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    console.log(
      ART,
      'color: #38bdf8; font-family: monospace; font-size: 11px; line-height: 1.4;',
    );
  }, []);

  return null;
}
