import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal — Privacy, Terms & Cookies',
  description: 'Privacy Policy, Terms of Service and Cookie Policy for Apex Automotive.',
};

const sections = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: `
**Last updated: November 2026**

Apex Automotive ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose and safeguard information when you visit our website or submit enquiries.

**Information We Collect**

We collect information you voluntarily provide, including your name, email address, phone number and vehicle details when you submit an enquiry form. We may also collect technical data such as your IP address, browser type and pages visited via cookies and analytics tools.

**How We Use Your Information**

We use your data to respond to enquiries, provide our services, improve our website and comply with legal obligations. We do not sell or rent your personal information to third parties.

**Data Retention**

We retain your personal data for as long as necessary to fulfil the purposes described, typically no longer than 24 months after your last interaction with us, unless a longer retention period is required by law.

**Your Rights**

Under the UK GDPR and Data Protection Act 2018, you have the right to access, correct, delete or restrict your personal data. To exercise these rights, contact us at hello@apexautomotive.co.uk.

**Contact**

Data Controller: Apex Automotive, Unit 7 Prestige Park, Cheshire, CW1 4XX. Email: hello@apexautomotive.co.uk.
    `,
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    content: `
**Last updated: November 2026**

By using this website, you agree to these terms. If you disagree, please do not use our site.

**Use of Our Website**

You may use our website for lawful purposes only. You must not misuse our site by knowingly introducing viruses, trojans, worms or other malicious material.

**Intellectual Property**

All content on this website, including text, images, graphics and code, is owned by or licensed to Apex Automotive and protected by applicable intellectual property laws. You may not reproduce, distribute or create derivative works without our express written permission.

**Disclaimer of Warranties**

Our website is provided "as is" without any representations or warranties. We make no warranty that our website will be error-free or uninterrupted.

**Limitation of Liability**

To the fullest extent permitted by law, Apex Automotive shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of our website or services.

**Governing Law**

These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
    `,
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    content: `
**Last updated: November 2026**

This Cookie Policy explains how Apex Automotive uses cookies and similar tracking technologies.

**What are Cookies?**

Cookies are small data files placed on your device when you visit a website. They serve various functions, including remembering your preferences and helping us analyse site traffic.

**Types of Cookies We Use**

*Essential Cookies:* These are necessary for the website to function. They enable core functionality such as security and accessibility. You cannot opt out of essential cookies.

*Analytics Cookies:* We use analytics tools to understand how visitors interact with our site. The data collected is anonymised and used to improve our website experience.

*Preference Cookies:* These remember your preferences (such as cookie consent status) to improve your experience on subsequent visits.

**Managing Cookies**

You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality. You can withdraw your consent at any time by clearing your browser cookies.

**Changes to This Policy**

We may update this Cookie Policy periodically. We encourage you to review this page regularly.
    `,
  },
];

function renderMarkdown(text: string) {
  const lines = text.trim().split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <h3 key={i} className="font-sans font-semibold text-apex-white mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
    }
    if (line.startsWith('*') && line.includes('*')) {
      return <p key={i} className="text-apex-muted text-sm leading-relaxed mb-2 italic">{line.replace(/\*/g, '')}</p>;
    }
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} className="text-apex-muted text-sm leading-relaxed mb-2">{line}</p>;
  });
}

export default function LegalPage() {
  return (
    <>
      <section className="pt-40 pb-16 bg-apex-black border-b border-apex-border">
        <div className="container-site">
          <p className="label-uppercase mb-4 text-apex-gold">Legal</p>
          <h1 className="text-display text-[clamp(2.5rem,6vw,6rem)] leading-none">
            Legal Information
          </h1>
        </div>
      </section>

      <section className="bg-apex-black section-pad">
        <div className="container-site grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Table of contents */}
          <nav className="hidden lg:block" aria-label="Legal sections">
            <p className="label-uppercase mb-4 text-apex-gold">Contents</p>
            <ul className="space-y-3">
              {sections.map(s => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="label-uppercase text-apex-muted hover:text-apex-gold transition-colors"
                    style={{ fontSize: '11px' }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="lg:col-span-3 space-y-16">
            {sections.map(section => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-display text-3xl mb-6 pb-4 border-b border-apex-border">
                  {section.title}
                </h2>
                <div>
                  {renderMarkdown(section.content)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
