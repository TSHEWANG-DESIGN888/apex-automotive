import Link from 'next/link';
import siteData from '@/content/site.json';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/builds', label: 'Builds' },
  { href: '/stock', label: 'Stock' },
  { href: '/contact', label: 'Contact' },
  { href: '/legal', label: 'Legal' },
  { href: '/sitemap', label: 'Sitemap' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-apex-border mt-0" role="contentinfo">
      <div className="container-site py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-4 group">
              <span className="font-display text-2xl font-semibold tracking-[0.15em] text-apex-white group-hover:text-apex-gold transition-colors">
                APEX
              </span>
              <span className="ml-2 inline-block w-6 h-px bg-apex-gold mx-1" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-apex-muted group-hover:text-apex-gold transition-colors">
                Automotive
              </span>
            </Link>
            <p className="text-apex-muted text-sm leading-relaxed">
              {siteData.studio.tagline}.<br />
              Premium automotive customisation, crafted for the discerning few.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="label-uppercase text-apex-muted hover:text-apex-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="text-sm">
            <p className="label-uppercase mb-3">Studio</p>
            <address className="not-italic text-apex-muted leading-relaxed">
              {siteData.studio.address.street}<br />
              {siteData.studio.address.city}, {siteData.studio.address.postcode}<br />
              {siteData.studio.address.country}
            </address>
            <div className="mt-4 space-y-1">
              <a href={`tel:${siteData.studio.phone}`} className="block text-apex-muted hover:text-apex-gold transition-colors">
                {siteData.studio.phone}
              </a>
              <a href={`mailto:${siteData.studio.email}`} className="block text-apex-muted hover:text-apex-gold transition-colors">
                {siteData.studio.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-apex-border pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-apex-muted">
            © {year} {siteData.studio.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(siteData.studio.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="label-uppercase text-apex-muted hover:text-apex-gold transition-colors"
                aria-label={`Follow us on ${name}`}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
