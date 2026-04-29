# Sanctum Marmoris — Imaginería Sacra (Brutalismo Sacro)

## Original Problem Statement
Diseñar la arquitectura conceptual, visual y técnica de una página web de negocios (venta de imágenes religiosas) que utilice WebGL y narrativas 3D para potenciar la identidad de marca y la conversión. Concepto: Brutalismo Sacro · Stack: React Three Fiber + Drei + GSAP + custom shaders/post-FX.

## User Choices
- Visual direction: **Brutalismo Sacro** (mármol/piedra, tipografía monumental, iluminación catedralicia)
- Functionality: Catálogo navegable + formulario de pedido/contacto
- Stack 3D confirmed: R3F + Drei + GSAP ScrollTrigger + custom shaders (Grain/Bloom/RGB Shift)
- Curated religious imagery (Christ, Virgin Mary, Byzantine, sculpture)
- **Frontend-only** (no backend/admin)

## Architecture
- React 19 + craco + Tailwind + shadcn/ui (zero-config)
- React Three Fiber + Drei + @react-three/postprocessing
- GSAP-style scroll-bound camera rig (manual scroll progress hook)
- Lenis for smooth scrolling
- Sonner for toasts
- Static catalog data in `/src/data/catalog.js`

## Implemented (Iteration 1 — 2026-02-26)
- Cinematic 3D cathedral scene (key spotlight, side rim, point fills, fog, light shafts)
- Floating sacred artifacts: golden cross, monumental obelisks, bronze orbs, gold arch
- Camera rig dollying through scene tied to scroll progress + parallax mouse drift
- Post-FX: Bloom (luminance threshold 0.4), Chromatic Aberration, Grain noise, Vignette
- Custom dot+ring cursor with hover state
- Sections: Hero, infinite Marquee, Catalog (asymmetric Bento grid), Manifest (3 principles + 4 stats), Contact form, Monumental Footer
- DetailDialog modal with full obra info (material, año, dimensiones)
- Contact form persists to localStorage and shows sonner toast

## Known Decisions
- Visual-edits Babel plugin disabled (`DISABLE_VISUAL_EDITS=true` in `.env`) — its `x-line-number` props collide with R3F primitives
- No backend, no MongoDB usage, no auth

## Backlog (P1/P2)
- P1: GSAP ScrollTrigger pinned narrative section per-obra
- P1: Real GLB/GLTF religious models (Draco-compressed) replacing primitive shapes
- P2: Admin panel (add/edit catalog) + MongoDB persistence
- P2: Stripe/PayPal checkout for direct purchase
- P2: Multi-language EN/ES toggle
- P2: i18n + SEO meta tags + OG images

## Test Credentials
N/A (no auth in this iteration)
