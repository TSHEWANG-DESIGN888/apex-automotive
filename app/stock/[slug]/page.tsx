import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import stockData from '@/content/stock.json';
import { BuildGallery } from '@/components/BuildGallery';

const heroImages: Record<string, string> = {
  'rs-e-tron-gt-carbon': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80',
  'g63-amg-widebody': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80',
  'defender-v8-carpathian': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80',
  'm5-competition-touring': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80',
  'macan-turbo-ev-agate': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
};

const galleryImages: Record<string, string[]> = {
  'rs-e-tron-gt-carbon': [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
    'https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=1200&q=80',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=80',
    'https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=1200&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
  ],
};

const statusColors: Record<string, string> = {
  Available: 'border-green-500 text-green-400',
  Reserved: 'border-amber-500 text-amber-400',
  Sold: 'border-red-700 text-red-500',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = stockData.find(v => v.slug === slug);
  if (!vehicle) return { title: 'Vehicle Not Found' };
  return {
    title: vehicle.title,
    description: vehicle.description.slice(0, 160),
  };
}

export function generateStaticParams() {
  return stockData.map(v => ({ slug: v.slug }));
}

export default async function StockPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = stockData.find(v => v.slug === slug);
  if (!vehicle) notFound();

  const heroImg = heroImages[slug] || heroImages['rs-e-tron-gt-carbon'];
  const images = galleryImages[slug] || galleryImages.default;

  const enquiryHref = `/contact?vehicle=${encodeURIComponent(vehicle.title)}&subject=${encodeURIComponent(`Stock Enquiry: ${vehicle.title}`)}`;

  return (
    <>
      {/* Back link */}
      <div className="fixed top-24 left-6 z-30">
        <Link
          href="/stock"
          className="label-uppercase text-apex-muted hover:text-apex-white transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Stock
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image
          src={heroImg}
          alt={`${vehicle.title} — ${vehicle.exteriorColor}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/30 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-10 container-site">
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <span className={`label-uppercase border px-3 py-1 ${statusColors[vehicle.status]}`} style={{ fontSize: '10px' }}>
              {vehicle.status}
            </span>
            {vehicle.status !== 'Sold' && (
              <span className="font-display text-3xl text-apex-gold">
                £{vehicle.price.toLocaleString()}
              </span>
            )}
          </div>
          <h1 className="text-display text-[clamp(2.5rem,6vw,6rem)] leading-none">
            {vehicle.title}
          </h1>
          <p className="text-apex-muted mt-2">{vehicle.year} · {vehicle.mileage.toLocaleString()} mi</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-apex-black section-pad">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Description + CTA */}
          <div className="lg:col-span-2">
            <p className="label-uppercase mb-4 text-apex-gold">About This Vehicle</p>
            <p className="text-apex-muted text-lg leading-relaxed mb-8">{vehicle.description}</p>
            {vehicle.options.length > 0 && (
              <>
                <p className="label-uppercase mb-4 text-apex-gold">Notable Options</p>
                <ul className="flex flex-wrap gap-3 mb-10">
                  {vehicle.options.map(opt => (
                    <li key={opt} className="label-uppercase border border-apex-border text-apex-muted px-3 py-1" style={{ fontSize: '10px' }}>
                      {opt}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {vehicle.status !== 'Sold' && (
              <Link href={enquiryHref} className="btn-primary text-base">
                Enquire About This Vehicle
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            )}
          </div>

          {/* Spec table */}
          <div>
            <p className="label-uppercase mb-6 text-apex-gold">Specifications</p>
            <dl className="divide-y divide-apex-border">
              {[
                ['Engine', vehicle.engine],
                ['Power', vehicle.power],
                ['Transmission', vehicle.transmission],
                ['Mileage', `${vehicle.mileage.toLocaleString()} mi`],
                ['Exterior', vehicle.exteriorColor],
                ['Interior', vehicle.interiorColor],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between py-3 gap-4">
                  <dt className="label-uppercase text-apex-muted" style={{ fontSize: '10px' }}>{key}</dt>
                  <dd className="text-apex-white text-sm font-medium text-right">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <BuildGallery images={images} title={vehicle.title} />
    </>
  );
}
