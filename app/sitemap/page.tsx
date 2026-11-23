import type { Metadata } from 'next';
import Link from 'next/link';
import buildsData from '@/content/builds.json';
import stockData from '@/content/stock.json';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Complete sitemap of all pages on the Apex Automotive website.',
};

const staticPages = [
  { href: '/', label: 'Home', description: 'Homepage with studio overview and featured work' },
  { href: '/builds', label: 'Our Builds', description: 'Portfolio of past bespoke automotive builds' },
  { href: '/stock', label: 'Available Stock', description: 'Studio-prepared vehicles for immediate purchase' },
  { href: '/contact', label: 'Contact', description: 'Enquire about a build or vehicle' },
  { href: '/legal', label: 'Legal', description: 'Privacy Policy, Terms of Service and Cookie Policy' },
  { href: '/sitemap', label: 'Sitemap', description: 'Overview of all studio destinations' },
];

export default function SitemapPage() {
  return (
    <>
      <section className="pt-40 pb-16 bg-apex-black border-b border-apex-border">
        <div className="container-site">
          <p className="label-uppercase mb-4 text-apex-gold">Navigation</p>
          <h1 className="text-display text-[clamp(2.5rem,6vw,6rem)] leading-none">Sitemap</h1>
        </div>
      </section>

      <section className="bg-apex-black section-pad">
        <div className="container-site grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Main pages */}
          <div>
            <p className="label-uppercase mb-6 text-apex-gold">Main Pages</p>
            <ul className="space-y-4">
              {staticPages.map(page => (
                <li key={page.href} className="border-b border-apex-border pb-4">
                  <Link
                    href={page.href}
                    className="font-display text-lg hover:text-apex-gold transition-colors block mb-1"
                  >
                    {page.label}
                  </Link>
                  <p className="text-apex-muted text-xs">{page.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Builds */}
          <div>
            <p className="label-uppercase mb-6 text-apex-gold">Build Pages</p>
            <ul className="space-y-4">
              <li className="border-b border-apex-border pb-4">
                <Link href="/builds" className="font-display text-lg hover:text-apex-gold transition-colors block mb-1">
                  All Builds
                </Link>
              </li>
              {buildsData.map(build => (
                <li key={build.slug} className="border-b border-apex-border pb-4">
                  <Link
                    href={`/builds/${build.slug}`}
                    className="font-display text-base hover:text-apex-gold transition-colors block mb-1"
                  >
                    {build.title}
                  </Link>
                  <p className="text-apex-muted text-xs">{build.year} · {build.make} {build.model}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Stock */}
          <div>
            <p className="label-uppercase mb-6 text-apex-gold">Stock Pages</p>
            <ul className="space-y-4">
              <li className="border-b border-apex-border pb-4">
                <Link href="/stock" className="font-display text-lg hover:text-apex-gold transition-colors block mb-1">
                  All Stock
                </Link>
              </li>
              {stockData.map(vehicle => (
                <li key={vehicle.slug} className="border-b border-apex-border pb-4">
                  <Link
                    href={`/stock/${vehicle.slug}`}
                    className="font-display text-base hover:text-apex-gold transition-colors block mb-1"
                  >
                    {vehicle.title}
                  </Link>
                  <p className="text-apex-muted text-xs">{vehicle.status} · {vehicle.year}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
