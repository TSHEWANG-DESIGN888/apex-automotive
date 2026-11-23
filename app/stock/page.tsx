import type { Metadata } from 'next';
import { StockGrid } from '@/components/StockGrid';

export const metadata: Metadata = {
  title: 'Available Stock',
  description: 'Browse our curated selection of prepared and enhanced vehicles available for immediate purchase.',
  openGraph: {
    title: 'Available Stock | Apex Automotive',
    description: 'Curated, studio-prepared luxury vehicles available now.',
  },
};

export default function StockPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-40 pb-16 bg-apex-black border-b border-apex-border">
        <div className="container-site">
          <p className="label-uppercase mb-4 text-apex-gold">Available Now</p>
          <h1 className="text-display text-[clamp(3rem,7vw,7rem)] leading-none mb-6">
            Available Stock
          </h1>
          <p className="text-apex-muted text-lg max-w-xl leading-relaxed">
            Each vehicle in our stock has been personally sourced and studio-prepared to our standards — arriving collection-ready.
          </p>
        </div>
      </section>

      <StockGrid />
    </>
  );
}
