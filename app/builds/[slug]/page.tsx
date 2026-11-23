import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import buildsData from '@/content/builds.json';
import { BuildGallery } from '@/components/BuildGallery';

const galleryImages: Record<string, string[]> = {
  'rs6-avant-midnight': [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
    'https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=1200&q=80',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200&q=80',
  ],
  'g63-monochrome': [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  ],
  'default': [
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=80',
    'https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=1200&q=80',
  ],
};

const heroImages: Record<string, string> = {
  'rs6-avant-midnight': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80',
  'g63-monochrome': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80',
  'defender-overland': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80',
  'm3-touring-satin-green': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80',
  'panamera-turbo-shadow': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
  'cullinan-black-badge-bespoke': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1600&q=80',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const build = buildsData.find(b => b.slug === slug);
  if (!build) return { title: 'Build Not Found' };

  return {
    title: build.title,
    description: build.description.slice(0, 160),
    openGraph: {
      title: `${build.title} | Apex Automotive`,
      description: build.description.slice(0, 160),
    },
  };
}

export function generateStaticParams() {
  return buildsData.map(b => ({ slug: b.slug }));
}

export default async function BuildPage({ params }: Props) {
  const { slug } = await params;
  const build = buildsData.find(b => b.slug === slug);
  if (!build) notFound();

  const buildIndex = buildsData.findIndex(b => b.slug === slug);
  const prevBuild = buildIndex > 0 ? buildsData[buildIndex - 1] : null;
  const nextBuild = buildIndex < buildsData.length - 1 ? buildsData[buildIndex + 1] : null;

  const images = galleryImages[slug] || galleryImages.default;
  const heroImg = heroImages[slug] || heroImages['rs6-avant-midnight'];
  const commissionHref = `/contact?vehicle=${encodeURIComponent(build.title)}&subject=${encodeURIComponent(`Build Commission: ${build.title}`)}`;

  return (
    <>
      {/* Back link */}
      <div className="fixed top-24 left-6 z-30">
        <Link
          href="/builds"
          className="label-uppercase text-apex-muted hover:text-apex-white transition-colors flex items-center gap-2"
          aria-label="Back to builds"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Builds
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden" aria-label={`${build.title} hero`}>
        <Image
          src={heroImg}
          alt={`${build.title} — ${build.year} ${build.make} ${build.model}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/30 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-10 container-site">
          <div className="flex flex-wrap gap-2 mb-4">
            {build.services.map(s => (
              <span key={s} className="label-uppercase border border-apex-gold text-apex-gold px-3 py-1" style={{ fontSize: '10px' }}>
                {s}
              </span>
            ))}
          </div>
          <h1 className="text-display text-[clamp(2.5rem,6vw,6rem)] leading-none">
            {build.title}
          </h1>
          <p className="text-apex-muted mt-2">{build.year} · {build.make} {build.model}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-apex-black section-pad">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="label-uppercase mb-4 text-apex-gold">The Build</p>
            <p className="text-apex-muted text-lg leading-relaxed">
              {build.description}
            </p>
            <div className="mt-10">
              <Link href={commissionHref} className="btn-primary">
                Commission Your Own Build
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Specs */}
          <div>
            <p className="label-uppercase mb-6 text-apex-gold">Specifications</p>
            <dl className="divide-y divide-apex-border">
              {Object.entries(build.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 gap-4">
                  <dt className="label-uppercase text-apex-muted" style={{ fontSize: '10px' }}>{key}</dt>
                  <dd className="text-apex-white text-sm font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <BuildGallery images={images} title={build.title} />

      {/* Prev / Next navigation */}
      <nav aria-label="Build navigation" className="bg-apex-surface border-t border-apex-border">
        <div className="container-site">
          <div className="grid grid-cols-2 divide-x divide-apex-border">
            {prevBuild ? (
              <Link href={`/builds/${prevBuild.slug}`} className="group flex flex-col gap-1 py-8 pr-8 hover:text-apex-gold transition-colors">
                <span className="label-uppercase text-apex-muted group-hover:text-apex-gold transition-colors" style={{ fontSize: '10px' }}>
                  ← Previous Build
                </span>
                <span className="font-display text-xl">{prevBuild.title}</span>
              </Link>
            ) : <div />}
            {nextBuild ? (
              <Link href={`/builds/${nextBuild.slug}`} className="group flex flex-col gap-1 py-8 pl-8 text-right hover:text-apex-gold transition-colors">
                <span className="label-uppercase text-apex-muted group-hover:text-apex-gold transition-colors" style={{ fontSize: '10px' }}>
                  Next Build →
                </span>
                <span className="font-display text-xl">{nextBuild.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </nav>
    </>
  );
}
