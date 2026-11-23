'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface BuildGalleryProps {
  images: string[];
  title: string;
}

export function BuildGallery({ images, title }: BuildGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }, [closeLightbox, prevImage, nextImage]);

  return (
    <>
      <section className="bg-apex-black py-16" aria-label={`${title} gallery`}>
        <div className="container-site">
          <p className="label-uppercase mb-8 text-apex-gold">Gallery</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openLightbox(i)}
                className="group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold aspect-video"
                aria-label={`View ${title} image ${i + 1} of ${images.length}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} — image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-apex-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightboxIndex + 1} of ${images.length}`}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-apex-white hover:text-apex-gold transition-colors z-10"
            aria-label="Close gallery"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-apex-white hover:text-apex-gold transition-colors z-10 p-3"
            aria-label="Previous image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[80vh] w-full mx-4" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={`${title} — image ${lightboxIndex + 1}`}
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <p className="text-center label-uppercase text-apex-muted mt-4">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-apex-white hover:text-apex-gold transition-colors z-10 p-3"
            aria-label="Next image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
