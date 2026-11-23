# Asset Replacement Guide — Apex Automotive

This document lists every placeholder asset across the website, including recommended aspect ratios, resolutions, visual tone, and exact file/JSON keys for the studio owner to swap in their production assets.

---

## Brand Assets

| Asset | Current Location / Key | Recommended Specs | Notes |
|-------|------------------------|-------------------|-------|
| Studio Wordmark / Logo | `components/Header.tsx`, `components/Footer.tsx` | SVG or PNG (transparent), ~300×80px | Currently rendered as high-contrast display text wordmark (`APEX — Automotive`). Can be replaced with an SVG `<Image />` or vector element. |
| OpenGraph Share Image | `public/og-image.jpg` | 1200×630px, JPG/WebP, < 300KB | High-impact dark studio shot with brand mark and tagline. |
| Favicon & App Icons | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` | 32×32, 192×192, 512×512 PNG | High contrast metallic or gold monogram on near-black `#0c0c0c`. |

---

## 1. Homepage (`app/page.tsx`, `content/site.json`)

### Hero Section (Section 1)
- **Collage Tiles (10 Portrait Images)**:
  - References in `app/page.tsx`: `heroTiles` array
  - Dimensions: 800×1200px (2:3 aspect ratio portrait)
  - Subject matter: Macro close-ups of carbon fibre weave, forged wheel concave, diamond-quilted leather, headlight DRL glow, brake caliper finish, titanium exhaust tip, satin body panel reflections.
  - Grade: Moody, low-key lighting, dark backgrounds, high micro-contrast.

### Approach Section (Section 2)
- **Full-bleed Hero Banner**:
  - Reference in `app/page.tsx` Section 2
  - Dimensions: 2560×1440px or 1920×1080px (16:9 widescreen)
  - Subject matter: Wide cinematic studio shot of a completed custom build under overhead lightbank.

### Pinned Process Section (Section 3)
- **Process Step Images (3 Images)**:
  - References in `app/page.tsx`: `processImages` array
  - Dimensions: 1200×1400px (~6:7 aspect ratio portrait/square)
  - `01 / Identity`: Design sketching, client consultation or vehicle digital scan.
  - `02 / Insight`: Clay modelling, carbon layup, engine bay teardown, or wheel CAD fitment.
  - `03 / Cohesion`: Final assembly, ceramic curing room, or handover inspection under soft studio illumination.

### Statement Section (Section 4)
- **Craftsmanship Close-up**:
  - Reference in `app/page.tsx`: `statementImage`
  - Dimensions: 1200×1400px
  - Subject matter: High-magnification close-up of bespoke leather stitching, engraved aluminium threshold, or hand-painted pinstripe.

### Services Section (Section 5)
- **Sticky & Mobile Service Images (6 Images)**:
  - References in `app/page.tsx`: `handleServiceHover` mapping
  - Dimensions: 1200×1400px (3:4 or 4:5 portrait)
  - `bodystyling`: Widebody kit fitment, carbon aero splitter, or paint wrap bay.
  - `interior`: Starlight headliner, custom two-tone seats, or alcantara wheel re-trim.
  - `wheels`: 3-piece modular forged wheels, brushed bronze or satin black finish.
  - `lighting`: Tinted laser headlights, dynamic ambient cabin lighting strips.
  - `exhaust`: Valvetronic titanium exhaust system with heat-shielded blue tips.
  - `protection`: Paint Protection Film (PPF) edge-wrapping or hydrophobic ceramic bead test.

### "Ordinary / Ends Here" Section (Section 6)
- **Parallax Trio (3 Tall Vehicle Images)**:
  - References in `app/page.tsx`: `ordinaryImages` array
  - Dimensions: 900×1600px (9:16 tall portrait)
  - Subject matter: 3 distinct aggressive vehicle silhouettes (e.g. supercar, super-SUV, hyper-wagon) shot from low angle against dark backdrop.

### Teaser Sections (Sections 7, 8, 9)
- **Builds Teaser**: 1920×1080px (wide landscape or 16:9), hero vehicle showing comprehensive body and wheel upgrade.
- **Stock Teaser**: 1920×1080px, showroom perspective showing available inventory.
- **Final Closing CTA**: 2560×1440px atmospheric shot looking down the rear haunches of an exotic build into studio darkness.

---

## 2. Builds Portfolio (`content/builds.json`, `app/builds/`)

Each build item in `content/builds.json` contains:
- `coverImage`: 1200×800px (3:2) or 1200×900px (4:3) — used on the portfolio grid and hover cards.
- `gallery`: Array of 4–8 high-resolution images:
  - 1920×1280px (3:2 landscape)
  - Exterior front 3/4, rear 3/4, side profile, wheel detail, interior driver zone, engine bay/exhaust, bespoke badging.

To add or update a build:
1. Place vehicle photos in `/public/images/builds/<build-slug>/`
2. Open `content/builds.json` and add/edit the object with title, make, model, year, specs, and gallery paths.

---

## 3. Stock Inventory (`content/stock.json`, `app/stock/`)

Each stock listing in `content/stock.json` contains:
- `coverImage`: 1200×800px (3:2) — crisp showroom angle.
- `gallery`: 4–6 high-resolution images covering cockpit, odometer/dash, rear quarters, wheel condition, and documentation/keys.
- `price`, `mileage`, `exteriorColor`, `interiorColor`, `engine`, `transmission`, `options` array.

To add or update a stock vehicle:
1. Place photos in `/public/images/stock/<vehicle-slug>/`
2. Open `content/stock.json` and update status (`Available`, `Reserved`, or `Sold`), price, and specifications.

---

## 4. Contact & Map (`app/contact/page.tsx`, `content/site.json`)

- **Studio Address & Phone**: Update in `content/site.json` under `studio`.
- **Google Maps Embed**:
  - In `app/contact/page.tsx`, replace the `<div role="img">` map placeholder with an iframe:
  ```html
  <iframe
    src="https://www.google.com/maps/embed?pb=..."
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
  ```

---

## 5. Written Copy & Tone Guidelines

- **Typography styling**: Always keep headings brief, confident and editorial. Avoid hyperbole or exclamation marks.
- **Numbers & counters**: Use two-digit format (`01 / 06`, `02 / 03`) with thin slashes and tracking.
- **Key adjectives**: *Singular, bespoke, meticulous, engineered, hand-finished, uncompromised, restrained.*
