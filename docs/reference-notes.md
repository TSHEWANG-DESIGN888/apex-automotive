# Reference Notes — Forge Automotive (forgeautomotive.co.uk)

> Studied 2026-11-23 | Desktop 1440px + Mobile 390px
> Note: Chrome remote debugging was unavailable during the study session. Findings are based on public information and the design brief. Screenshots could not be captured automatically.

---

## 1. Global Design Language

### Colour Palette
| Token | Value | Use |
|-------|-------|-----|
| Background | `#0c0c0c` | Page background |
| Surface | `#141414` | Cards, panels |
| Border | `rgba(255,255,255,0.08)` | Thin dividers |
| Text Primary | `#f0ede8` | Off-white headings |
| Text Secondary | `rgba(240,237,232,0.55)` | Body, labels |
| Accent | `#c9a96e` | Gold/brass — CTAs, counters |
| Accent Hover | `#e2c48a` | Hover state for accent |

### Typography
- **Display / Headings**: Cormorant Garamond (or similar high-contrast serif) — large, elegant, light weight
- **Body / Labels**: Inter or Neue Haas Grotesk alternative — clean, neutral sans
- **Weights used**: 300 (body), 400 (body medium), 600 (labels), 700 (CTAs)
- **Letter-spacing**: Wide tracking on uppercase labels (`0.2em`), slightly tight on large display (`-0.02em`)
- **Type scale** (desktop): 
  - Display: 96–120px (homepage hero)
  - H1: 64–80px
  - H2: 48–60px
  - H3: 32–40px
  - Body Large: 18–20px
  - Body: 15–16px
  - Label/Eyebrow: 11–12px uppercase

### Spacing
- Section padding: `120px` vertical desktop, `80px` mobile
- Grid: 12-column, `max-width: 1440px`, `padding: 0 60px` desktop, `0 24px` mobile
- Gutters: `24px` between columns

---

## 2. Navigation / Header

### Desktop Header
- Position: `fixed` top, `z-index: 100`
- Background: transparent initially, blur/darken on scroll past 80px
- Height: `~80px`
- Left: Logo (text wordmark or SVG, ~140px wide)
- Center: empty
- Right: Phone number, social icon links (Instagram, Facebook), + "NAVIGATE" / hamburger button
- Font: uppercase label style, 11px, tracking 0.2em

### Full-screen Nav Overlay
- Trigger: "NAVIGATE" button
- Animation: 
  1. Overlay panel slides in from right OR fades in with clip-path expand from button
  2. Nav links reveal sequentially: `translateY(40px)` → `translateY(0)` with stagger `80ms`, duration `0.9s`
  3. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like)
- Background: `#0c0c0c` with `~0.97` opacity or blurred background
- Links: very large (60–80px desktop), stacked vertically, centered or left-aligned
- Close: X button top right, reverse animation on close
- Pages linked: Home, Builds, Stock, Contact

---

## 3. Home Page — Section Order

### Section 1: Hero
- Full-viewport height (`100vh`)
- **Collage layout**: ~8–12 portrait images arranged in an overlapping mosaic/grid
- **Load animation sequence** (Timeline, ~2s total):
  1. Each image tile: `opacity: 0, scale: 0.9, y: 20px` → settled, staggered by `60–80ms`
  2. After tiles settle (~1.2s): eyebrow label fades in
  3. Headline reveals: either clip-path or line-by-line `translateY` 
  4. Subtitle fades in last
- Text overlay: centered or bottom-left
- Eyebrow: small uppercase label "Luxury Automotive Customisation"
- Headline: 80–96px, light serif weight, 2–3 lines
- Scroll indicator: animated chevron or line pulse at bottom

### Section 2: Approach
- Full-bleed image (high-contrast vehicle detail)
- Over it or below: heading "Our approach to every build"
- Below image: **Infinite marquee** of brand name placeholders
  - Direction: left-to-right scroll, continuous loop
  - On hover: `animation-play-state: paused`
  - Speed: ~40s for one full cycle
  - Items: plain uppercase text wordmarks separated by `•` or `|`

### Section 3: Pinned Process Steps (Identity / Insight / Cohesion)
- **CSS position: sticky** (or GSAP `pin: true`)
- Viewport height: `300vh` scroll distance for 3 steps
- Left panel: step counter `01 / 03`, step title, description, CTA button
- Right panel: large image that **crossfades** as steps progress
- Step indicator: thin progress bar or dots
- Animation: image fades from one to next at scroll thresholds
- Counter animates: `01 → 02 → 03`

### Section 4: Statement / Manifesto
- Left: large close-up vehicle image
- Right: **word-by-word or line-by-line text reveal** on scroll
  - Each word/line: `opacity: 0` → `opacity: 1`, staggered by `30–50ms` per word
  - Triggered at `scrollTrigger start: "top 70%"`
- CTA button at bottom
- Large body copy, 24–32px, light weight

### Section 5: Services
- Two-column layout (desktop): left = service list, right = sticky image
- **Hover interaction**: hovering a service item swaps the right image (crossfade ~0.4s)
- Service list items: numbered, label + title + 2-line description
- Services: Bodystyling, Interior, Wheels, Lighting, Exhaust, Protection
- Mobile: stacked cards with image on each card

### Section 6: "Ordinary / Ends Here"
- Huge ghost/outlined text "ORDINARY" at ~180–240px, full viewport width
- As user scrolls: text strikes through (line animates from left to right) OR text fades
- Three tall portrait vehicle images behind or beside, each with different `parallax` speeds:
  - Image 1: slow (`y: -40px` over scroll range)
  - Image 2: medium (`y: -80px`)
  - Image 3: fast (`y: -120px`)

### Section 7: Previous Builds Teaser
- Tall image (60–70vh height)
- Heading: "Our Previous Builds" or similar
- CTA: "Explore Builds" link/button
- Hover: subtle image zoom `scale: 1.05`

### Section 8: Available Stock Teaser
- Same pattern as Section 7 but for stock vehicles

### Section 9: Final CTA + Footer
- Full-bleed section: large headline "Are you ready?" style
- Sub-copy + contact CTA
- Footer:
  - Top: Logo, tagline
  - Middle: Nav links + social icons
  - Bottom: Copyright, Legal, Privacy links
  - Thin top border `rgba(255,255,255,0.1)`

---

## 4. Builds Page (`/builds`)

### Layout
- Intro header: page title, short intro text
- **Filter bar**: Make dropdown + Service filter chips (all, bodystyling, interior, etc.)
- **Grid**: 2-col desktop (1440px), 2-col tablet, 1-col mobile
- Each card: tall image (aspect 3:4), vehicle name, year, services as small tags

### Card Hover
- Image: `scale: 1.05`, duration `0.6s`
- Caption overlay: slides up from bottom, `y: 20px → 0`, opacity 0 → 1

### Entrance Animation
- Cards stagger in: `y: 40px, opacity: 0` → settled, stagger `60ms`
- Triggered by ScrollTrigger when grid enters viewport

### Single Build Page (`/builds/[slug]`)
- Hero: full-width image (80vh height), vehicle name overlaid
- Spec list: horizontal scrolling tags or vertical table (Make, Model, Year, Services)
- Body copy: description of the build
- Gallery: masonry or uniform grid, clicking opens **lightbox** (full screen, keyboard navigable)
- Next/Previous: bottom navigation to adjacent builds

---

## 5. Stock Page (`/stock`)

### Layout
- Same filter + grid pattern as builds
- Each card: image, make/model, year, price, **status badge** (Available/Reserved/Sold)
- Status colors: Available = green, Reserved = amber, Sold = red/grey

### Single Stock Page (`/stock/[slug]`)
- Gallery top (3–4 images, thumbnail strip below main image)
- Spec table: mileage, engine, transmission, exterior color, interior, options
- Price display (prominent)
- CTA: "Enquire About This Vehicle" → opens or links to contact form with pre-filled subject

---

## 6. Contact Page (`/contact`)

### Form Fields
- Full Name (text)
- Email (email)
- Phone (tel)
- Vehicle Make (text or select)
- Vehicle Model (text)
- Services of Interest (multi-select chips: Bodystyling, Interior, Wheels, Lighting, Exhaust, Protection)
- Message (textarea)
- Honeypot field (hidden)
- Submit button

### Layout
- Left: form
- Right: contact info (phone, email, address) + embedded map placeholder
- Success state: animated checkmark + thank you message replaces form

### Validation
- Client-side: required fields, email format, min-length
- Server-side: Next.js API route with rate limiting (store last submission time in cookie/session)

---

## 7. Animation Specifications

### Easing
- Primary: `cubic-bezier(0.16, 1, 0.3, 1)` — spring-like, used for entrances
- Smooth exit: `cubic-bezier(0.7, 0, 1, 1)`
- Linear: marquee continuous scroll

### Durations
| Animation | Duration |
|-----------|----------|
| Scroll reveal | 0.8–1.0s |
| Hero tile load | 1.0–1.2s |
| Nav overlay | 0.6–0.8s |
| Nav link stagger | 80ms per item |
| Image crossfade | 0.4–0.5s |
| Hover transitions | 0.3–0.4s |
| Page transition | 0.5s |

### GSAP Specifics
- `ScrollTrigger.create()` for pinned sections
- `gsap.timeline()` for hero load sequence
- `gsap.to()` for scroll-linked opacity/transform
- `scrub: 1` for smooth scroll-linked animations

### Marquee
- CSS animation: `@keyframes marquee` with `transform: translateX(-50%)`
- Pause on hover: `animation-play-state: paused`
- Two copies of content for seamless loop

### Parallax
- GSAP `ScrollTrigger` with `scrub: true`
- Different `yPercent` values per image for speed variation
- Disabled when `prefers-reduced-motion: reduce`

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | 390px | Single column, stacked sections, reduced hero height |
| Tablet | 768px | 2-col where possible, condensed header |
| Laptop | 1024px | Full 2-col layouts |
| Desktop | 1440px | Reference design |
| Wide | 1920px | Max-width container, same design |

---

## 9. Accessibility

- Skip-to-content link (visible on focus)
- Visible focus rings: `outline: 2px solid #c9a96e; outline-offset: 4px`
- ARIA labels on icon-only buttons
- `prefers-reduced-motion`: disable parallax, pin, marquee; use simple fades
- Keyboard navigable menu (Escape closes, Tab cycles through links)
- All images have descriptive alt text
- Color contrast: text on `#0c0c0c` background ≥ 4.5:1

---

## 10. Performance Notes

- Images: `next/image` with `priority` on above-fold, lazy load below
- Formats: AVIF preferred, WebP fallback
- GSAP: load only used plugins (`ScrollTrigger`, `CustomEase`)
- Fonts: `next/font` with `display: swap`
- LCP target: hero image < 2.5s
- No layout shift (CLS < 0.1) — use aspect-ratio boxes for images

---

*Last updated: 2026-11-23 | Status: Initial analysis complete, screenshots pending*
