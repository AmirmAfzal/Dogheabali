# Dogheabali Landing Page — Build Plan

Source of truth: [Figma file](https://www.figma.com/design/TozUBLqPD8ZwtYaLAyIDLg/Dogheabali---Landingpage--Community-?node-id=1024-127), frame `home` (1024:127), 1512×7072.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack-by-default), React 19
- **Tailwind CSS v4** (`@theme` tokens in `globals.css`, no `tailwind.config.js`)
- **shadcn/ui** for primitives (Button, Card, Badge, Toggle Group, Carousel/Embla) adapted to the design's look
- RTL Persian page: `<html lang="fa" dir="rtl">`, layout mirrors Figma's RTL frame directly (no flipping needed — design is already RTL)
- Local variable font **Bonyade Koodak** via `next/font/local`, single `woff2` file (weights 100–900 on one axis) — best practice: one file, no extra HTTP requests, self-hosted, zero layout shift

## Project structure (single root, no nested app folder)

```
/src
  /app            → routes (layout.tsx, page.tsx, globals.css)
  /components
    /sections      → Header, Hero, Features, Video, Shop, Stats, Info, Reviews, Footer
    /ui            → shadcn primitives
  /fonts           → BonyadeKoodak-VF.woff2 (active font used by next/font/local)
  /lib             → utils (cn, etc.)
/public/images     → exported Figma assets, sanitized filenames (see mapping below)
/assets/fonts-source → full original Bonyade Koodak Pro package (otf/ttf/all weights/help pdf) — archived, not shipped to the browser
```

## Section → Figma node map

| Section | Node ID | Notes |
|---|---|---|
| Header/nav | `1024:867` (inside hero) | logo, menu links, login button, cart icon |
| Hero | `1038:1223` | headline, 3 product bottles, yellow blob bg, decorative blurs |
| Features carousel | `1038:1224` | 3 slides (auto/manual), side nav bar indicator |
| Video | `1038:1225` | poster image + play button overlay |
| Shop | `1249:222` | gas/no-gas toggle, 3 product cards |
| Stats | `1038:1227` | 3 stat callouts (31 / 100% / 91%) |
| Info/About | `1038:1228` | copy + 2 CTAs + image w/ badge |
| Reviews | `1038:1229` | Iran map graphic + stacked review photo cards |
| Footer | `1038:1230` | contact info, logo, social icons, copyright bar |

## Image asset mapping (original Figma export name → `public/images/...`)

Renamed to kebab-case, ASCII-only (originals had spaces/parentheses/Cyrillic/emoji — unsafe for URLs/imports):

- `DOGH BA STAND 6.png` → `dogh-ba-stand-6.png` (hero/feature bottle product shot)
- `Group-910 3/6/9.png`, `Group-840 3/4.png`, `Group-911 3/4.png` → same pattern, kebab-cased (product bottle/can renders, hero + shop states)
- `glass bottle.png` → `glass-bottle.png`
- `yellow background.png` → `yellow-background.png` (hero blob)
- `Subtract(.png/ (1)/ (2))` → `subtract.png` / `subtract-1.png` / `subtract-2.png` (product stand shadow masks)
- `Слой_1*.png` → `iran-map-south.png` (default/used) + `iran-map-north.png`, `iran-map-2.png`, `iran-map-3.png` (unused region variants, kept for later)
- `Rectangle 1683*.png` → `review-photo-1/2/3.png` (stacked review photo cards)
- `242 4.png` → `unused-milk-splash.png` (a decorative milk-splash graphic — not referenced in the `home` frame; the reviews map pin instead shows the active testimonial's own photo, `REVIEW_PHOTOS[active]`)
- `dogh.png` → `footer-dogh-decor.png`
- `Mask group.png` → `footer-mask-group.png`
- `gif.png` → `info-badge-icon.png` ("100% با اطمینان" badge)
- `image (2).png` → `video-poster.png`
- `🍶 1.png` → `jug-icon.png`
- `Brasil.png`, `United States.png`, `404.png` → `unused-*.png` (not referenced in the `home` frame; kept, not wired up)
- `Слой_1 (2)/(3).png` (`iran-map-2/3.png`) and `gif.png` (`info-badge-icon.png`) are also unreferenced — extra exports not used by the `home` frame's visible content

## Font

- `BonyadeKoodak-VF.woff2` loaded via `next/font/local`, `variable: '--font-bonyade'`, wired into Tailwind `--font-sans`.
- Only the base VF (not `FaNum`/`NoEn`) — the design's copy already mixes literal Persian-Indic digits (phone number) and literal Latin digits (stats "31/100%/91%") as typed characters, so a forced-numeral variant would fight the source content.

## Build order

1. ~~Scaffold Next.js + Tailwind v4 + shadcn~~
2. ~~Move assets into project (images → `public/images`, font → `src/fonts`)~~
3. ~~Global setup: RTL layout, font wiring, Tailwind color/radius tokens from Figma variables~~
4. ~~Section components, in visual order: Header → Hero → Features → Video → Shop → Stats → Info → Reviews → Footer~~
5. ~~Wire real interactivity: features slide switcher, gas/no-gas toggle, shop card hover, reviews mini-carousel, mobile nav~~
6. ~~Responsive pass (mobile/tablet breakpoints — Figma is desktop-only at 1512px, so mobile layout is inferred)~~
7. ~~`next dev` visual QA against Figma screenshots, section by section (Playwright screenshots)~~
8. ~~Lint / type-check / production build check~~

## Notes from the build

- **RTL mirroring**: any row relying on plain `flex` under `dir="rtl"` renders DOM-first-child on the visual *right*. Sections with a fixed left-right arrangement from Figma (hero products, shop cards, stats, info, reviews, footer bands) use `flex-row-reverse`, which makes DOM order == visual left-to-right — the simplest mental model, used consistently. Get this wrong and content silently mirrors instead of erroring, so it's the first thing to check visually against the source.
- Purely decorative `absolute` shapes (glow blobs, background circles) all carry `pointer-events-none` — one (the features-section brand circle) was overlapping and silently swallowing clicks on the slide-nav buttons before this was added.
- lucide-react (this version) ships no brand/social icons (Twitter/Facebook/Instagram/GitHub) — hand-written inline SVGs live in `src/components/icons/social-icons.tsx`.
- This shadcn setup uses Base UI (`@base-ui/react`), not Radix — `Button` takes `render={<Link .../>}` + `nativeButton={false}` instead of `asChild`.
- Removed unused generated shadcn primitives (carousel, toggle-group, toggle, badge, card, separator) and the `embla-carousel-react` dependency — only `Button` ended up used; everything else is hand-built to match the design exactly.
