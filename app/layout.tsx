import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { CookieBanner } from '@/components/CookieBanner';
import { BackToTop } from '@/components/BackToTop';
import { CustomCursor } from '@/components/CustomCursor';
import { PageTransition } from '@/components/PageTransition';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  metadataBase: new URL('https://apexautomotive.co.uk'),
  title: {
    default: `${siteData.studio.name} — Luxury Automotive Customisation`,
    template: `%s | ${siteData.studio.name}`,
  },
  description: 'Apex Automotive is a premium automotive customisation studio specialising in bespoke bodystyling, interior re-trims, wheel upgrades and paint protection for discerning clients across the UK.',
  keywords: ['luxury car customisation', 'bespoke automotive', 'bodystyling', 'interior re-trim', 'PPF', 'ceramic coating', 'car tuning UK'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://apexautomotive.co.uk',
    siteName: siteData.studio.name,
    title: `${siteData.studio.name} — Luxury Automotive Customisation`,
    description: 'Premium bespoke automotive customisation. Bodystyling, interiors, wheels and protection for extraordinary vehicles.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apex Automotive — Luxury Automotive Customisation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteData.studio.name} — Luxury Automotive Customisation`,
    description: 'Premium bespoke automotive customisation studio.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-apex-black text-apex-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          <main id="main-content">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <BackToTop />
          <CookieBanner />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
