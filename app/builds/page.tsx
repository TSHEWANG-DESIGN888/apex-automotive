import type { Metadata } from 'next';
import { BuildsGrid } from '@/components/BuildsGrid';
import buildsData from '@/content/builds.json';

export const metadata: Metadata = {
  title: 'Our Builds',
  description: 'Explore our portfolio of bespoke automotive builds — from full resprays to complete interior transformations and performance upgrades.',
  openGraph: {
    title: 'Our Builds | Apex Automotive',
    description: 'A portfolio of extraordinary automotive transformations.',
  },
};

export default function BuildsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-40 pb-16 bg-apex-black border-b border-apex-border">
        <div className="container-site">
          <p className="label-uppercase mb-4 text-apex-gold">Portfolio</p>
          <h1 className="text-display text-[clamp(3rem,7vw,7rem)] leading-none mb-6">
            Our Builds
          </h1>
          <p className="text-apex-muted text-lg max-w-xl leading-relaxed">
            Every vehicle in our portfolio represents a singular vision brought to life through meticulous craft and uncompromising attention to detail.
          </p>
        </div>
      </section>

      {/* Builds Grid with client-side filtering */}
      <BuildsGrid builds={buildsData} />
    </>
  );
}
