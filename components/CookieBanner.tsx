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
    <aside
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm border border-apex-border bg-apex-surface/95 backdrop-blur-md p-5 shadow-2xl"
    >
      <p className="text-xs text-apex-muted leading-relaxed mb-4">
        We use essential cookies to provide an optimal browsing experience.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={accept}
          className="btn-primary text-[10px] py-1.5 px-4"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={decline}
          className="label-uppercase text-[10px] text-apex-muted hover:text-apex-white transition-colors py-1.5 px-3"
        >
          Decline
        </button>
      </div>
    </aside>
  );
}
