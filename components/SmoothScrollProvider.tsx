'use client';

import { useEffect, useRef } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: any = null;
    let tickerCallback: any = null;

    const initLenis = async () => {
      try {
        const LenisModule = await import('@studio-freight/lenis');
        const Lenis = LenisModule.default;
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Synchronize Lenis scroll position with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        tickerCallback = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      } catch (e) {
        console.warn('Lenis/GSAP sync notice:', e);
      }
    };

    initLenis();

    return () => {
      if (tickerCallback) {
        import('gsap').then(({ gsap }) => {
          gsap.ticker.remove(tickerCallback);
        }).catch(() => {});
      }
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
