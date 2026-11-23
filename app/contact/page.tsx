import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Begin your bespoke automotive build with Apex Automotive. Contact our studio to discuss your vision.',
  openGraph: {
    title: 'Contact Us | Apex Automotive',
    description: 'Get in touch to begin your bespoke build.',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-40 pb-16 bg-apex-black border-b border-apex-border">
        <div className="container-site">
          <p className="label-uppercase mb-4 text-apex-gold">Get in touch</p>
          <h1 className="text-display text-[clamp(3rem,7vw,7rem)] leading-none mb-6">
            Contact Us
          </h1>
          <p className="text-apex-muted text-lg max-w-xl leading-relaxed">
            Every extraordinary build begins with a conversation. Tell us about your vehicle and your vision.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-apex-black section-pad">
        <div className="container-site grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <p className="label-uppercase mb-4 text-apex-gold">Studio</p>
              <address className="not-italic text-apex-muted leading-relaxed mb-6">
                {siteData.studio.address.street}<br />
                {siteData.studio.address.city}<br />
                {siteData.studio.address.postcode}<br />
                {siteData.studio.address.country}
              </address>
              <div className="space-y-2">
                <a href={`tel:${siteData.studio.phone}`} className="flex items-center gap-3 text-apex-muted hover:text-apex-gold transition-colors group">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {siteData.studio.phone}
                </a>
                <a href={`mailto:${siteData.studio.email}`} className="flex items-center gap-3 text-apex-muted hover:text-apex-gold transition-colors group">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {siteData.studio.email}
                </a>
              </div>
            </div>

            <div className="mb-10">
              <p className="label-uppercase mb-4 text-apex-gold">Hours</p>
              <div className="text-apex-muted space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>09:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>09:00 – 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="relative h-48 bg-apex-surface border border-apex-border flex items-center justify-center"
              role="img"
              aria-label="Studio location map — replace with embedded map"
            >
              <div className="text-center">
                <svg className="mx-auto mb-2 text-apex-muted" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="label-uppercase text-apex-muted" style={{ fontSize: '10px' }}>
                  Map Placeholder<br />
                  Replace with Google Maps embed
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <p className="label-uppercase mb-8 text-apex-gold">Send an Enquiry</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
