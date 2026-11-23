'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Build {
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  services: string[];
  coverImage: string;
  description: string;
  specs: Record<string, string | undefined>;
}

const coverImages: Record<string, string> = {
  'rs6-avant-midnight': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
  'g63-monochrome': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  'defender-overland': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'm3-touring-satin-green': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  'panamera-turbo-shadow': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'cullinan-black-badge-bespoke': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
};

const allServices = ['All', 'Bodystyling', 'Interior', 'Wheels', 'Lighting', 'Exhaust', 'Protection'];
const allMakes = ['All Makes'];

export function BuildsGrid({ builds }: { builds: Build[] }) {
  const makes = ['All Makes', ...Array.from(new Set(builds.map(b => b.make)))];
  const [activeMake, setActiveMake] = useState('All Makes');
  const [activeService, setActiveService] = useState('All');

  const filtered = builds.filter(b => {
    const makeMatch = activeMake === 'All Makes' || b.make === activeMake;
    const serviceMatch = activeService === 'All' || b.services.includes(activeService);
    return makeMatch && serviceMatch;
  });

  useEffect(() => {
    const initReveal = async () => {
      try {
        const { gsap } = await import('gsap');
        const cards = document.querySelectorAll('[data-build-card]');
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.05,
          }
        );
      } catch (e) {
        const cards = document.querySelectorAll('[data-build-card]');
        cards.forEach(c => {
          (c as HTMLElement).style.opacity = '1';
          (c as HTMLElement).style.transform = 'none';
        });
      }
    };
    initReveal();
  }, [filtered]);

  return (
    <section className="bg-apex-black section-pad">
      <div className="container-site">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-6 items-start justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by service">
            {allServices.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveService(s)}
                className={`px-4 py-2 label-uppercase transition-all duration-300 border ${
                  activeService === s
                    ? 'border-apex-gold text-apex-gold'
                    : 'border-apex-border text-apex-muted hover:border-apex-gold/50 hover:text-apex-white'
                }`}
                aria-pressed={activeService === s}
              >
                {s}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="make-filter" className="sr-only">Filter by make</label>
            <select
              id="make-filter"
              value={activeMake}
              onChange={e => setActiveMake(e.target.value)}
              className="bg-apex-surface border border-apex-border text-apex-white px-4 py-2 label-uppercase focus:border-apex-gold outline-none"
            >
              {makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-apex-muted text-center py-20">No builds match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filtered.map(build => (
              <article key={build.slug} data-build-card>
                <Link
                  href={`/builds/${build.slug}`}
                  className="group block"
                  aria-label={`View ${build.title} build`}
                >
                  <div className="relative h-[65vw] md:h-[45vh] overflow-hidden mb-5 bg-apex-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImages[build.slug] || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'}
                      alt={`${build.title} — ${build.year} ${build.make} ${build.model}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Caption overlay on hover */}
                    <div className="absolute inset-0 bg-apex-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="label-uppercase text-apex-gold mb-1">{build.year}</p>
                        <p className="text-apex-white text-sm leading-relaxed line-clamp-2">{build.description.slice(0, 100)}…</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label-uppercase text-apex-muted mb-1">{build.make}</p>
                      <h2 className="font-display text-2xl group-hover:text-apex-gold transition-colors">{build.title}</h2>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {build.services.map(s => (
                          <span key={s} className="label-uppercase text-apex-muted border border-apex-border px-2 py-0.5" style={{ fontSize: '9px' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <svg className="shrink-0 mt-1 text-apex-muted group-hover:text-apex-gold transition-all group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
