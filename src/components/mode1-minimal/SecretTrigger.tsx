'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TARGET = 'kapil';

export function SecretTrigger() {
  const [buffer, setBuffer] = useState('');
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore when typing in inputs
      if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      const next = (buffer + e.key).slice(-TARGET.length);
      setBuffer(next);
      if (next === TARGET) {
        router.push('/secret');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [buffer, router]);

  return null;
}
