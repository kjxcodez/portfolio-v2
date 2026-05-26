'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setCurrent(next);
  }

  function prev() {
    goTo(current === 0 ? images.length - 1 : current - 1, -1);
  }

  function next() {
    goTo(current === images.length - 1 ? 0 : current + 1, 1);
  }

  if (images.length === 1) {
    return (
      <div
        className="relative w-full rounded-xl overflow-hidden group cursor-zoom-in"
        style={{ border: '1px solid var(--border-default)' }}
        onClick={() => setLightboxOpen(true)}
      >
        <div className="aspect-video w-full relative">
          <Image
            src={images[0]}
            alt={`${projectTitle} screenshot`}
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <ZoomIn size={20} color="white" />
          </div>
        </div>
        {lightboxOpen && (
          <Lightbox images={images} current={0} onClose={() => setLightboxOpen(false)} />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main carousel */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border-default)' }}
        >
          <div className="aspect-video w-full relative overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                className="absolute inset-0 cursor-zoom-in"
                custom={direction}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={images[current]}
                  alt={`${projectTitle} screenshot ${current + 1} of ${images.length}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-colors z-10"
              style={{ background: 'var(--bg-overlay)', color: 'var(--text-primary)' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-colors z-10"
              style={{ background: 'var(--bg-overlay)', color: 'var(--text-primary)' }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] z-10"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--bg-overlay)',
                color: 'var(--text-secondary)',
              }}
            >
              {current + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="relative shrink-0 w-16 h-10 rounded-lg overflow-hidden transition-all"
              style={{
                border: i === current
                  ? '2px solid var(--accent)'
                  : '2px solid var(--border-default)',
              }}
            >
              <Image
                src={src}
                alt={`${projectTitle} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          current={current}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  current: initialCurrent,
  onClose,
}: {
  images: string[];
  current: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialCurrent);
  const [direction, setDirection] = useState(1);

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setCurrent(next);
  }

  function prev() {
    goTo(current === 0 ? images.length - 1 : current - 1, -1);
  }

  function next() {
    goTo(current === images.length - 1 ? 0 : current + 1, 1);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
        style={{ color: 'white', background: 'rgba(255,255,255,0.1)' }}
        onClick={onClose}
      >
        <X size={18} />
      </button>

      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              className="absolute inset-0"
              custom={direction}
              initial={{ x: direction * 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -80, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Image
                src={images[current]}
                alt={`Screenshot ${current + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              <ChevronRight size={18} />
            </button>
            <div className="text-center mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
