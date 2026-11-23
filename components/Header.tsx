'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import siteData from '@/content/site.json';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/builds', label: 'Builds' },
  { href: '/stock', label: 'Stock' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? 'bg-apex-black/95 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label={`${siteData.studio.name} — Return to homepage`}
            >
              <span className="font-display text-xl font-semibold tracking-[0.15em] text-apex-white group-hover:text-apex-gold transition-colors duration-300">
                APEX
              </span>
              <span className="ml-2 w-6 h-px bg-apex-gold mx-2" aria-hidden="true" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-apex-muted group-hover:text-apex-gold transition-colors duration-300">
                Automotive
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {/* Phone */}
              <a
                href={`tel:${siteData.studio.phone.replace(/\s/g, '')}`}
                className="hidden md:block label-uppercase text-apex-muted hover:text-apex-gold transition-colors duration-300"
                aria-label="Call us"
              >
                {siteData.studio.phone}
              </a>

              {/* Social icons */}
              <div className="hidden md:flex items-center gap-3">
                <a
                  href={siteData.studio.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apex-muted hover:text-apex-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>

              {/* Navigate button */}
              <button
                type="button"
                onClick={toggleMenu}
                className="flex items-center gap-3 label-uppercase text-apex-white hover:text-apex-gold transition-colors duration-300 group"
                aria-expanded={isOpen}
                aria-controls="nav-overlay"
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              >
                <span className="hidden sm:block">
                  {isOpen ? 'Close' : 'Navigate'}
                </span>
                <div className="flex flex-col gap-1.5 w-6" aria-hidden="true">
                  <span
                    className={`block h-px w-full bg-current transition-all duration-400 origin-center ${
                      isOpen ? 'rotate-45 translate-y-[0.4rem]' : ''
                    }`}
                  />
                  <span
                    className={`block h-px bg-current transition-all duration-400 ${
                      isOpen ? 'opacity-0 w-0' : 'w-3/4'
                    }`}
                  />
                  <span
                    className={`block h-px w-full bg-current transition-all duration-400 origin-center ${
                      isOpen ? '-rotate-45 -translate-y-[0.4rem]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen nav overlay */}
      <div
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 flex flex-col transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#0c0c0c' }}
      >
        <div className="container-site flex flex-col h-full pt-32 pb-16">
          <nav aria-label="Primary navigation">
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  style={{
                    transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isOpen ? 1 : 0,
                    transition: isOpen
                      ? `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`
                      : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0ms',
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block font-display text-7xl sm:text-8xl md:text-9xl font-light leading-none tracking-tight hover:text-apex-gold transition-colors duration-300 ${
                      pathname === link.href ? 'text-apex-gold' : 'text-apex-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-8"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: isOpen ? 'opacity 0.6s ease 400ms' : 'opacity 0.6s ease 0ms',
            }}
          >
            <div>
              <p className="label-uppercase mb-2">Get in touch</p>
              <a
                href={`tel:${siteData.studio.phone.replace(/\s/g, '')}`}
                className="font-display text-2xl text-apex-muted hover:text-apex-white transition-colors"
              >
                {siteData.studio.phone}
              </a>
              <br />
              <a
                href={`mailto:${siteData.studio.email}`}
                className="font-display text-lg text-apex-muted hover:text-apex-white transition-colors"
              >
                {siteData.studio.email}
              </a>
            </div>
            <div className="flex gap-6">
              {Object.entries(siteData.studio.social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-uppercase text-apex-muted hover:text-apex-gold transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
