'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import siteData from '@/content/site.json';

// Placeholder hero images (dark, moody luxury automotive imagery)
const heroTiles = [
  { src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80', alt: 'Luxury performance vehicle carbon detail' },
  { src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80', alt: 'Bespoke cockpit stitching and alcantara' },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80', alt: 'Custom rear diffuser and exhaust array' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80', alt: 'Aggressive front fascia in studio light' },
  { src: 'https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=500&q=80', alt: 'Deep concave forged monobloc wheel' },
  { src: 'https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=500&q=80', alt: 'Satin obsidian paint protection film' },
  { src: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=500&q=80', alt: 'Smoked matrix laser headlight signature' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', alt: 'Two-tone quilted nappa leather interior' },
  { src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80', alt: 'Deep gloss body reflection under studio rig' },
  { src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&q=80', alt: 'Low-slung grand tourer silhouette' },
];

const processImages = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=80',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=80',
];

const statementImage = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1000&q=80';

const serviceImages: Record<string, string> = {
  bodystyling: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
  interior: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
  wheels: 'https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=900&q=80',
  lighting: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=900&q=80',
  exhaust: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
  protection: 'https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=900&q=80',
};

const ordinaryImages = [
  'https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=700&q=80',
  'https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=700&q=80',
  'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=700&q=80',
];

const buildsTeaser = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80';
const stockTeaser = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1400&q=80';
const ctaImage = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1600&q=80';

export default function HomePage() {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const statementWordsRef = useRef<HTMLParagraphElement>(null);
  const ordinaryRef = useRef<HTMLDivElement>(null);
  const strikeLineRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [activeServiceId, setActiveServiceId] = useState('bodystyling');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        if (!prefersReducedMotion) {
          // 1. Hero collage entrance animation (staggered scale/translate/fade)
          const tiles = tileRefs.current.filter(Boolean);
          gsap.set(tiles, { opacity: 0, scale: 0.88, y: 30 });

          const heroTl = gsap.timeline();
          heroTl.to(tiles, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: {
              each: 0.08,
              from: 'center',
            },
          });

          // Headline lines reveal
          if (headlineRef.current) {
            const lines = headlineRef.current.querySelectorAll('.reveal-line');
            gsap.set(lines, { y: '100%', opacity: 0 });
            heroTl.to(lines, {
              y: '0%',
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              stagger: 0.12,
            }, '-=0.5');
          }

          // 2. Generic scroll reveals
          const revealEls = document.querySelectorAll('[data-reveal]');
          revealEls.forEach(el => {
            gsap.fromTo(el,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 82%',
                  once: true,
                },
              }
            );
          });

          // 3. Pinned 3-Step Sequence (desktop only to prevent mobile scroll lock)
          if (processRef.current && window.innerWidth >= 1024) {
            const stepsCount = siteData.process.length;
            ScrollTrigger.create({
              trigger: processRef.current,
              start: 'top top',
              end: `+=${stepsCount * 100}%`,
              pin: true,
              anticipatePin: 1,
              scrub: 0.5,
              onUpdate: (self) => {
                const nextStep = Math.min(
                  stepsCount - 1,
                  Math.floor(self.progress * stepsCount)
                );
                setActiveStep(nextStep);
              },
            });
          }

          // 4. Word-by-word reveal in Statement Section
          if (statementWordsRef.current) {
            const words = statementWordsRef.current.querySelectorAll('.statement-word');
            gsap.fromTo(words,
              { opacity: 0.15, y: 6 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.035,
                duration: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: statementWordsRef.current,
                  start: 'top 75%',
                  end: 'bottom 45%',
                  scrub: 0.6,
                },
              }
            );
          }

          // 5. Parallax for Ordinary section images
          const parallaxEls = document.querySelectorAll('[data-parallax]');
          parallaxEls.forEach(el => {
            const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.25');
            gsap.to(el, {
              yPercent: speed * -100,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-parallax-container]') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });
          });

          // 6. Ordinary strike-through line scrub
          if (strikeLineRef.current && ordinaryRef.current) {
            gsap.fromTo(strikeLineRef.current,
              { width: '0%' },
              {
                width: '100%',
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: ordinaryRef.current,
                  start: 'top 65%',
                  end: 'top 35%',
                  scrub: 0.5,
                },
              }
            );
          }
        }
      } catch (err) {
        console.warn('GSAP initialization notice:', err);
      }
    };

    initAnimations();

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }).catch(() => {});
    };
  }, []);

  const currentStepData = siteData.process[activeStep] || siteData.process[0];

  return (
    <>
      {/* ============================================
          SECTION 1: HERO
          ============================================ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-apex-black" aria-label="Hero section">
        {/* Collage tiles: 10 portrait tiles */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-5 grid-rows-5 sm:grid-rows-2 gap-1.5 opacity-35" aria-hidden="true">
          {heroTiles.map((tile, i) => (
            <div
              key={i}
              ref={el => { tileRefs.current[i] = el; }}
              className="relative overflow-hidden w-full h-full bg-apex-surface"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover"
                priority={i < 4}
              />
            </div>
          ))}
        </div>

        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/55 to-apex-black/75" aria-hidden="true" />

        {/* Foreground Content */}
        <div className="relative z-10 container-site py-28 flex flex-col justify-center min-h-screen">
          <div className="max-w-4xl">
            <p className="label-uppercase mb-5 text-apex-gold" data-reveal>
              {siteData.hero.eyebrow}
            </p>

            <div ref={headlineRef} className="overflow-hidden mb-6">
              <h1 className="text-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] tracking-tight">
                {['Where Vision', 'Meets', 'Perfection'].map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <span className="reveal-line block">{line}</span>
                  </span>
                ))}
              </h1>
            </div>

            <p className="text-apex-muted text-lg sm:text-xl font-light max-w-xl leading-relaxed mb-10" data-reveal>
              {siteData.hero.subheading}
            </p>

            <div className="flex flex-wrap items-center gap-4" data-reveal>
              <Link href="/builds" className="btn-primary">
                Explore Builds
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="btn-primary border-apex-border text-apex-muted hover:border-apex-gold hover:text-apex-gold"
              >
                Begin Your Build
              </Link>
            </div>
          </div>

          {/* Minimal scroll prompt */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" aria-hidden="true">
            <span className="label-uppercase" style={{ fontSize: '9px' }}>Scroll</span>
            <div className="w-px h-10 bg-apex-gold animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: APPROACH + INFINITE MARQUEE
          ============================================ */}
      <section className="section-pad bg-apex-black" aria-labelledby="approach-heading">
        <div className="container-site mb-16">
          <div className="max-w-2xl">
            <p className="label-uppercase mb-4 text-apex-gold" data-reveal>Our Studio</p>
            <h2
              id="approach-heading"
              className="text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-6"
              data-reveal
            >
              {siteData.approach.heading}
            </h2>
            <p className="text-apex-muted text-lg leading-relaxed" data-reveal>
              {siteData.approach.subheading}
            </p>
          </div>
        </div>

        {/* Full-bleed hero banner */}
        <div className="relative h-[65vh] mb-0 overflow-hidden" data-reveal>
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
            alt="Apex Automotive studio floor with bespoke commission in progress"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-transparent to-apex-black/50" aria-hidden="true" />
        </div>

        {/* Infinite auto-scrolling marquee ticker */}
        <div
          className="marquee-wrapper border-t border-b border-apex-border py-6 overflow-hidden bg-apex-surface/40"
          aria-label="Disciplines & Capabilities ticker"
        >
          <div className="marquee-track flex whitespace-nowrap">
            {[...siteData.approach.marqueeItems, ...siteData.approach.marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="text-apex-white font-sans text-xs sm:text-sm uppercase tracking-[0.25em] px-8 hover:text-apex-gold transition-colors">
                  {item}
                </span>
                <span className="text-apex-gold" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: PINNED THREE-STEP SEQUENCE
          ============================================ */}
      <section
        ref={processRef}
        className="relative min-h-screen bg-apex-black flex items-center overflow-hidden"
        aria-labelledby="process-heading"
      >
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">
          {/* Step Narrative */}
          <div>
            <p className="label-uppercase mb-5 text-apex-gold">The Process</p>

            <div className="mb-4 flex items-baseline gap-4">
              <span className="font-display text-5xl sm:text-6xl text-apex-gold font-light tracking-tight">
                0{activeStep + 1} / 0{siteData.process.length}
              </span>
              <span className="label-uppercase text-apex-muted border-l border-apex-border pl-4">
                {currentStepData.label}
              </span>
            </div>

            <h2
              id="process-heading"
              className="text-display text-[clamp(2.25rem,4.5vw,3.75rem)] mb-6 leading-tight transition-opacity duration-300"
            >
              {currentStepData.title}
            </h2>

            <p className="text-apex-muted text-lg leading-relaxed mb-10 max-w-lg transition-opacity duration-300">
              {currentStepData.description}
            </p>

            <Link href={currentStepData.cta.href} className="btn-primary">
              {currentStepData.cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Crossfading Step Image */}
          <div className="relative h-[55vh] lg:h-[75vh] overflow-hidden bg-apex-surface border border-apex-border">
            {processImages.map((src, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === activeStep ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <Image
                  src={src}
                  alt={`Process step 0${i + 1} — ${siteData.process[i]?.label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-apex-black/70 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>

        {/* Step indicator bars */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3" role="group" aria-label="Process step navigation">
          {siteData.process.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`h-0.5 transition-all duration-400 ${
                i === activeStep ? 'w-10 bg-apex-gold' : 'w-4 bg-apex-border hover:bg-apex-muted'
              }`}
              aria-label={`Go to step 0${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 4: STATEMENT SECTION (WORD-BY-WORD REVEAL)
          ============================================ */}
      <section className="section-pad bg-apex-black" aria-labelledby="statement-heading">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Close-up Macro Photo */}
          <div className="relative h-[55vh] lg:h-[70vh] overflow-hidden bg-apex-surface" data-reveal>
            <Image
              src={statementImage}
              alt="Extreme close-up of hand-stitched leather steering wheel and anodised paddles"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-apex-black/40 via-transparent to-transparent" aria-hidden="true" />
          </div>

          {/* Statement with word-by-word scroll reveal */}
          <div>
            <p className="label-uppercase mb-5 text-apex-gold" data-reveal>Our Manifesto</p>
            <h2
              id="statement-heading"
              className="text-display text-[clamp(2rem,3.8vw,3.25rem)] leading-tight mb-8"
              data-reveal
            >
              {siteData.statement.heading}
            </h2>

            {/* Word-by-word scrub target */}
            <p
              ref={statementWordsRef}
              className="text-apex-muted text-lg sm:text-xl font-light leading-relaxed mb-10"
              aria-label={siteData.statement.body}
            >
              {siteData.statement.body.split(' ').map((word, i) => (
                <span key={i} className="statement-word inline-block mr-[0.28em] text-apex-white">
                  {word}
                </span>
              ))}
            </p>

            <Link href={siteData.statement.cta.href} className="btn-primary" data-reveal>
              {siteData.statement.cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: SERVICES (HOVER SWAP ON DESKTOP, STACKED ON MOBILE)
          ============================================ */}
      <section className="section-pad bg-apex-surface/60" aria-labelledby="services-heading">
        <div className="container-site">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="label-uppercase mb-3 text-apex-gold" data-reveal>Disciplines</p>
              <h2
                id="services-heading"
                className="text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight"
                data-reveal
              >
                Our Services
              </h2>
            </div>
            <Link href="/contact" className="btn-primary shrink-0" data-reveal>
              Enquire on Services
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Service Items List */}
            <div className="divide-y divide-apex-border" role="list">
              {siteData.services.map((service) => (
                <div
                  key={service.id}
                  role="listitem"
                  className={`group py-8 cursor-pointer transition-colors duration-300 ${
                    activeServiceId === service.id ? 'border-b-apex-gold' : ''
                  }`}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  onClick={() => setActiveServiceId(service.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="label-uppercase text-apex-gold pt-1 shrink-0">{service.label}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl sm:text-3xl mb-3 group-hover:text-apex-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-apex-muted text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>

                      {/* Mobile image card conversion */}
                      <div className="lg:hidden mt-5 relative h-48 w-full overflow-hidden bg-apex-surface border border-apex-border">
                        <Image
                          src={serviceImages[service.id] || serviceImages.bodystyling}
                          alt={service.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <svg className="shrink-0 mt-2 text-apex-muted group-hover:text-apex-gold transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Sticky Image Pane */}
            <div className="hidden lg:block sticky top-28 h-[65vh] overflow-hidden bg-apex-surface border border-apex-border" aria-hidden="true">
              {Object.entries(serviceImages).map(([id, src]) => (
                <div
                  key={id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeServiceId === id ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <Image
                    src={src}
                    alt="Service preview"
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-apex-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="label-uppercase text-apex-gold">
                      {siteData.services.find(s => s.id === id)?.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: "ORDINARY / ENDS HERE" PARALLAX
          ============================================ */}
      <section className="relative py-36 sm:py-48 overflow-hidden bg-apex-black" aria-label="Brand Philosophy">
        {/* Three tall parallax vehicle images */}
        <div className="absolute inset-0 flex" aria-hidden="true" data-parallax-container>
          {ordinaryImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-1 h-full overflow-hidden"
              style={{ opacity: 0.22 }}
            >
              <div
                className="absolute inset-0 w-full h-[140%]"
                data-parallax={String(0.18 + i * 0.14)}
                style={{ willChange: 'transform' }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-apex-black via-apex-black/80 to-apex-black" aria-hidden="true" />

        {/* Ghost text "Ordinary" + Strike-through */}
        <div className="relative z-10 text-center px-6">
          <div
            ref={ordinaryRef}
            className="relative inline-block mb-6"
          >
            <p
              className="text-outline font-display font-semibold select-none leading-none tracking-tight"
              style={{ fontSize: 'clamp(4.5rem, 16vw, 15rem)' }}
              aria-hidden="true"
            >
              Ordinary
            </p>
            <div
              ref={strikeLineRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-apex-gold"
              style={{ width: '0%' }}
              aria-hidden="true"
            />
          </div>

          <h2 className="text-display text-[clamp(1.75rem,3.5vw,3rem)] max-w-xl mx-auto leading-tight mb-8" data-reveal>
            Ends here. <br />
            <span className="text-apex-gold">Extraordinary</span> begins.
          </h2>

          <Link href="/contact" className="btn-primary" data-reveal>
            Begin Your Build
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION 7: PREVIOUS BUILDS TEASER
          ============================================ */}
      <section className="bg-apex-black" aria-labelledby="builds-teaser-heading">
        <Link
          href="/builds"
          className="block group relative h-[72vh] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold"
        >
          <Image
            src={buildsTeaser}
            alt="Apex Automotive previous bespoke builds portfolio"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/25 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-12 left-0 right-0 container-site flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="label-uppercase text-apex-gold mb-3">Portfolio</p>
              <h2
                id="builds-teaser-heading"
                className="text-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-apex-white group-hover:text-apex-gold transition-colors"
              >
                Our Previous Builds
              </h2>
            </div>
            <span className="btn-primary shrink-0">
              Explore Builds
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </Link>
      </section>

      {/* ============================================
          SECTION 8: AVAILABLE STOCK TEASER
          ============================================ */}
      <section className="bg-apex-black" aria-labelledby="stock-teaser-heading">
        <Link
          href="/stock"
          className="block group relative h-[72vh] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold border-t border-apex-border"
        >
          <Image
            src={stockTeaser}
            alt="Apex Automotive showroom inventory and available stock"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/25 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-12 left-0 right-0 container-site flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="label-uppercase text-apex-gold mb-3">Available Now</p>
              <h2
                id="stock-teaser-heading"
                className="text-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-apex-white group-hover:text-apex-gold transition-colors"
              >
                Available Stock
              </h2>
            </div>
            <span className="btn-primary shrink-0">
              Browse Stock
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </Link>
      </section>

      {/* ============================================
          SECTION 9: FINAL CLOSING CTA
          ============================================ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" aria-labelledby="final-cta-heading">
        <Image
          src={ctaImage}
          alt="Studio atmosphere with custom performance vehicle ready for delivery"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-apex-black/80" aria-hidden="true" />

        <div className="relative z-10 container-site text-center max-w-3xl mx-auto py-24">
          <p className="label-uppercase mb-5 text-apex-gold" data-reveal>Ready?</p>
          <h2
            id="final-cta-heading"
            className="text-display text-[clamp(2.75rem,6.5vw,6.5rem)] leading-[0.98] mb-8"
            data-reveal
          >
            {siteData.finalCta.heading}
          </h2>
          <p className="text-apex-muted text-lg sm:text-xl mb-10 max-w-lg mx-auto leading-relaxed" data-reveal>
            {siteData.finalCta.subheading}
          </p>
          <div data-reveal>
            <Link href={siteData.finalCta.cta.href} className="btn-primary text-base">
              {siteData.finalCta.cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['AutomotiveBusiness', 'LocalBusiness'],
            name: siteData.studio.name,
            description: 'Luxury automotive customisation studio specialising in bespoke bodystyling, interior re-trims, wheels and protection.',
            url: 'https://apexautomotive.co.uk',
            telephone: siteData.studio.phone,
            email: siteData.studio.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteData.studio.address.street,
              addressLocality: siteData.studio.address.city,
              postalCode: siteData.studio.address.postcode,
              addressCountry: 'GB',
            },
            openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
            priceRange: '££££',
            sameAs: [
              siteData.studio.social.instagram,
              siteData.studio.social.facebook,
              siteData.studio.social.youtube,
            ],
          }),
        }}
      />
    </>
  );
}
