import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-apex-black text-center px-6">
      <p className="label-uppercase text-apex-gold mb-4">404</p>
      <h1 className="text-display text-[clamp(3rem,8vw,8rem)] leading-none mb-6">
        Page Not Found
      </h1>
      <p className="text-apex-muted text-lg max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary">
        Return Home
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}
