'use client';

import { useState } from 'react';
import Link from 'next/link';
import stockData from '@/content/stock.json';

const coverImages: Record<string, string> = {
  'rs-e-tron-gt-carbon': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
  'g63-amg-widebody': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  'defender-v8-carpathian': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'm5-competition-touring': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  'macan-turbo-ev-agate': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
};

const statusColors = {
  Available: 'border-green-500 text-green-400',
  Reserved: 'border-amber-500 text-amber-400',
  Sold: 'border-red-700 text-red-500',
};

const allMakes = ['All Makes', ...Array.from(new Set(stockData.map(s => s.make)))];
const allStatuses = ['All', 'Available', 'Reserved', 'Sold'];

export function StockGrid() {
  const [activeMake, setActiveMake] = useState('All Makes');
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = stockData.filter(v => {
    const makeMatch = activeMake === 'All Makes' || v.make === activeMake;
    const statusMatch = activeStatus === 'All' || v.status === activeStatus;
    return makeMatch && statusMatch;
  });

  return (
    <section className="bg-apex-black section-pad">
      <div className="container-site">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-6 items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {allStatuses.map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-2 label-uppercase transition-all duration-300 border ${
                  activeStatus === s
                    ? 'border-apex-gold text-apex-gold'
                    : 'border-apex-border text-apex-muted hover:border-apex-gold/50 hover:text-apex-white'
                }`}
                aria-pressed={activeStatus === s}
              >
                {s}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="stock-make-filter" className="sr-only">Filter by make</label>
            <select
              id="stock-make-filter"
              value={activeMake}
              onChange={e => setActiveMake(e.target.value)}
              className="bg-apex-surface border border-apex-border text-apex-white px-4 py-2 label-uppercase focus:border-apex-gold outline-none"
            >
              {allMakes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-apex-muted text-center py-20">No vehicles match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(vehicle => (
              <article key={vehicle.slug} className="group">
                <Link
                  href={`/stock/${vehicle.slug}`}
                  className="block"
                  aria-label={`View ${vehicle.title} — ${vehicle.status}`}
                >
                  <div className="relative h-[55vw] sm:h-56 overflow-hidden mb-5 bg-apex-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImages[vehicle.slug] || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'}
                      alt={`${vehicle.title} — ${vehicle.exteriorColor}`}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        vehicle.status === 'Sold' ? 'grayscale opacity-50' : ''
                      }`}
                    />
                    {/* Status badge */}
                    <span className={`absolute top-4 right-4 label-uppercase border px-2 py-1 bg-apex-black/80 backdrop-blur-sm ${statusColors[vehicle.status as keyof typeof statusColors]}`} style={{ fontSize: '9px' }}>
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="label-uppercase text-apex-muted mb-1">{vehicle.make} · {vehicle.year}</p>
                      <h2 className="font-display text-xl mb-1 group-hover:text-apex-gold transition-colors">{vehicle.title}</h2>
                      <p className="text-apex-muted text-sm">{vehicle.mileage.toLocaleString()} mi · {vehicle.engine}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {vehicle.status !== 'Sold' ? (
                        <p className="font-display text-xl text-apex-gold">
                          £{vehicle.price.toLocaleString()}
                        </p>
                      ) : (
                        <p className="label-uppercase text-apex-muted">Sold</p>
                      )}
                    </div>
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
