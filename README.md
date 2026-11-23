# Apex Automotive — Luxury Automotive Customisation Studio

A dark, cinematic web experience modelled on the structure, layout, and interaction design of luxury automotive studios. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, and **Framer Motion**.

---

## Key Features

1. **Cinematic Hero Load Sequence**: Overlapping mosaic of portrait vehicle imagery that gracefully staggers in, settling behind an animated display headline and eyebrow counter.
2. **Infinite Brand & Service Marquee**: Silky 60fps CSS transform ticker strip that pauses on hover and respects `prefers-reduced-motion`.
3. **Pinned 3-Step Process**: Pinned multi-screen scroll experience (Identity / Insight / Cohesion) with dynamic counter (`01 / 03`), content wipe, and crossfading imagery.
4. **Statement Section**: Word-by-word scroll-linked typography reveal paired with macro craftsmanship photography.
5. **Interactive Services Showcase**: 6 core disciplines (Bodystyling, Interior, Wheels, Lighting, Exhaust, Protection). On desktop, hover dynamically swaps the large sticky image; on mobile, effortlessly converts into stacked visual cards.
6. **"Ordinary / Ends Here" Parallax**: Ghost typography with scroll-triggered strike-through animation layered over 3 independent multi-speed parallax vehicle images.
7. **Filterable Builds Portfolio (`/builds`)**: Filter by manufacturer and service discipline, with hover zoom cards, caption reveals, and dedicated detail pages (`/builds/[slug]`) complete with specs and a full-screen lightbox gallery.
8. **Curated Stock Showroom (`/stock`)**: Inventory grid with status badges (`Available`, `Reserved`, `Sold`), price, key vehicle metrics, and direct enquiry linking that pre-fills the contact form.
9. **Multi-Field Enquiry System (`/contact`)**: Form with service chips, vehicle make/model fields, client-side + server-side validation, anti-spam honeypot, rate limiting, and success state.
10. **Full Screen Overlay Navigation**: Staggered link reveal, focus trapping, Escape key support, and responsive mobile adaptation.
11. **Comprehensive Accessibility & SEO**: Semantic HTML, skip-to-content links, visible gold focus rings, JSON-LD Schema (`AutomotiveBusiness` / `LocalBusiness`), OpenGraph and Twitter cards, dynamic XML sitemap, and robots.txt.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design tokens
- **Animations**: GSAP (GreenSock) + ScrollTrigger plugin
- **Smooth Scroll**: Lenis
- **Route Transitions**: Framer Motion
- **Fonts**: Cormorant Garamond (Google Fonts Display Serif) + Inter (Clean Sans)

---

## Quick Start

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
# Clone or navigate to the repository
cd apex-automotive

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live site.

### Production Build
```bash
npm run build
npm start
```

---

## Content Editing Guide (No Code Required)

All content is managed through clean, typed JSON files located in `/content/`:

### 1. Studio Information & Homepage Copy (`content/site.json`)
- Edit studio name, telephone, email, physical address, and social links in the `"studio"` block.
- Edit hero headlines, approach text, process steps, statement copy, and final CTA.

### 2. Adding / Editing Builds (`content/builds.json`)
Add a new object to the array:
```json
{
  "slug": "custom-gt3-carbon",
  "title": "911 GT3 Touring Carbon Edition",
  "make": "Porsche",
  "model": "911 GT3",
  "year": 2024,
  "services": ["Bodystyling", "Exhaust", "Protection"],
  "coverImage": "/images/builds/gt3-cover.jpg",
  "gallery": [
    "/images/builds/gt3-01.jpg",
    "/images/builds/gt3-02.jpg"
  ],
  "description": "Full carbon exterior program including custom vented front fenders...",
  "specs": {
    "Engine": "4.0L Naturally Aspirated Boxer-6",
    "Power": "502 bhp",
    "Exhaust": "Titanium Center Exit",
    "Film": "Full Stealth Satin PPF"
  },
  "featured": true
}
```

### 3. Adding / Editing Stock Vehicles (`content/stock.json`)
```json
{
  "slug": "urban-defender-110",
  "title": "Defender 110 V8 Urban Black",
  "make": "Land Rover",
  "model": "Defender 110",
  "year": 2024,
  "mileage": 1500,
  "price": 179950,
  "status": "Available",
  "exteriorColor": "Santorini Black",
  "interiorColor": "Ebony Windsor Leather",
  "transmission": "8-speed Automatic",
  "engine": "5.0L Supercharged V8",
  "power": "518 bhp",
  "coverImage": "/images/stock/def-cover.jpg",
  "gallery": ["/images/stock/def-01.jpg"],
  "options": ["Urban Widebody", "22\" Forged Wheels", "Valved Exhaust"],
  "description": "Studio-enhanced Defender 110 with our complete exterior styling pack..."
}
```

---

## Design System Tokens

- **Background**: `#0c0c0c` (near-black, non-reflective)
- **Surface**: `#141414` (cards, modal panels)
- **Dividers & Borders**: `rgba(255, 255, 255, 0.08)`
- **Headings & Body**: `#f0ede8` (warm off-white)
- **Secondary / Muted Text**: `rgba(240, 237, 232, 0.55)`
- **Accent Gold**: `#c9a96e` (warm brass/champagne)
- **Accent Hover**: `#e2c48a`
- **Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## Replacing Assets

See `/docs/placeholder-assets.md` for a complete breakdown of every image, recommended dimensions, and photography guidance.
