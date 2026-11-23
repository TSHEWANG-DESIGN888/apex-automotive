'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const SERVICES = ['Bodystyling', 'Interior', 'Wheels', 'Lighting', 'Exhaust', 'Protection'];

interface FormState {
  name: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  services: string[];
  message: string;
  honeypot: string;
  subject: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    services: [],
    message: '',
    honeypot: '',
    subject: searchParams.get('subject') || '',
  });

  useEffect(() => {
    const vehicle = searchParams.get('vehicle');
    const subject = searchParams.get('subject');
    if (vehicle || subject) {
      setForm(prev => ({
        ...prev,
        vehicleMake: vehicle ? vehicle.split(' ')[0] || '' : prev.vehicleMake,
        subject: subject || prev.subject,
        message: vehicle ? `I would like to enquire about the ${vehicle} listed on your website.` : prev.message,
      }));
    }
  }, [searchParams]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Your name is required.';
    if (!form.email.trim()) newErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email.';
    if (form.phone && !/^[0-9+\s()-]{7,20}$/.test(form.phone)) newErrors.phone = 'Please enter a valid phone number.';
    if (!form.message.trim()) newErrors.message = 'Please include a message.';
    else if (form.message.trim().length < 15) newErrors.message = 'Message must be at least 15 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = useCallback((service: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (form.honeypot) {
      setStatus('success');
      return;
    }

    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-transparent border-b py-3 text-apex-white placeholder-apex-muted text-sm outline-none transition-colors focus:border-apex-gold ${
      errors[field] ? 'border-red-500' : 'border-apex-border'
    }`;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" role="alert" aria-live="polite">
        <div className="w-16 h-16 border border-apex-gold rounded-full flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p className="label-uppercase mb-3 text-apex-gold">Message Sent</p>
        <h2 className="text-display text-3xl mb-4">Thank you, we&apos;ll be in touch</h2>
        <p className="text-apex-muted max-w-sm">
          Your enquiry has been received. A member of our bespoke team will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
      {/* Honeypot field */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
        <label htmlFor="hp-website">Website</label>
        <input
          id="hp-website"
          name="website"
          type="text"
          value={form.honeypot}
          onChange={e => setForm(prev => ({ ...prev, honeypot: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="label-uppercase text-apex-muted block mb-2" style={{ fontSize: '10px' }}>
            Full Name <span aria-label="required" className="text-apex-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            className={inputClass('name')}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Your name"
          />
          {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label-uppercase text-apex-muted block mb-2" style={{ fontSize: '10px' }}>
            Email Address <span aria-label="required" className="text-apex-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            className={inputClass('email')}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="your@email.com"
          />
          {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="label-uppercase text-apex-muted block mb-2" style={{ fontSize: '10px' }}>Phone</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className={inputClass('phone')}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            placeholder="+44 (0)1234 567890"
          />
          {errors.phone && <p id="phone-error" className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>}
        </div>

        {/* Vehicle Make */}
        <div>
          <label htmlFor="vehicleMake" className="label-uppercase text-apex-muted block mb-2" style={{ fontSize: '10px' }}>Vehicle Make</label>
          <input
            id="vehicleMake"
            type="text"
            value={form.vehicleMake}
            onChange={e => setForm(prev => ({ ...prev, vehicleMake: e.target.value }))}
            className="w-full bg-transparent border-b border-apex-border py-3 text-apex-white placeholder-apex-muted text-sm outline-none transition-colors focus:border-apex-gold"
            placeholder="e.g. Audi, BMW, Porsche"
          />
        </div>

        {/* Vehicle Model */}
        <div className="sm:col-span-2">
          <label htmlFor="vehicleModel" className="label-uppercase text-apex-muted block mb-2" style={{ fontSize: '10px' }}>Vehicle Model</label>
          <input
            id="vehicleModel"
            type="text"
            value={form.vehicleModel}
            onChange={e => setForm(prev => ({ ...prev, vehicleModel: e.target.value }))}
            className="w-full bg-transparent border-b border-apex-border py-3 text-apex-white placeholder-apex-muted text-sm outline-none transition-colors focus:border-apex-gold"
            placeholder="e.g. RS6 Avant, G63 AMG, 911 Turbo S"
          />
        </div>

        {/* Services */}
        <div className="sm:col-span-2">
          <p className="label-uppercase text-apex-muted mb-3" style={{ fontSize: '10px' }}>Services of Interest</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select services of interest">
            {SERVICES.map(service => {
              const isSelected = form.services.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  className={`label-uppercase px-4 py-2 border transition-all duration-300 ${
                    isSelected
                      ? 'border-apex-gold text-apex-gold bg-apex-gold/10'
                      : 'border-apex-border text-apex-muted hover:border-apex-gold/50'
                  }`}
                  aria-pressed={isSelected}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="label-uppercase text-apex-muted block mb-2" style={{ fontSize: '10px' }}>
            Message <span aria-label="required" className="text-apex-gold">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            className={`${inputClass('message')} resize-none`}
            aria-required="true"
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder="Tell us about your vehicle and what you have in mind..."
          />
          {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>}
        </div>
      </div>

      {/* Privacy */}
      <p className="text-xs text-apex-muted mt-6 mb-8">
        By submitting this form you agree to our{' '}
        <a href="/legal#privacy" className="text-apex-gold hover:underline">Privacy Policy</a>.
        Your data is used solely to respond to your enquiry.
      </p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10"/>
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Enquiry
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-4" role="alert">
          {errorMessage || 'Something went wrong. Please try again or email us directly.'}
        </p>
      )}
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-apex-surface" />}>
      <ContactFormInner />
    </Suspense>
  );
}
