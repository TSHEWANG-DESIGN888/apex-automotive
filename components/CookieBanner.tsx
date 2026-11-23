'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('apex-cookies-accepted');
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('apex-cookies-accepted', 'true');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('apex-cookies-accepted', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-apex-border bg-apex-surface/95 backdrop-blur-sm"
    >
      <div className="container-site py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-sm text-apex-muted leading-relaxed max-w-2xl">
          We use cookies to enhance your experience, analyse traffic and personalise content. 
          By clicking "Accept", you consent to our use of cookies.{' '}
          <a href="/legal#cookies" className="text-apex-gold hover:underline">
            Learn more
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="label-uppercase text-apex-muted hover:text-apex-white transition-colors px-4 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn-primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
