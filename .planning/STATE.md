# STATE: BPMfinder

**Status:** 🟢 Phase 4 complete
**Last updated:** 2026-05-26

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-26)

**Core value:** Users can discover the BPM of any song instantly, privately, and without uploading files to any server.
**Current focus:** Milestone v2 — Rhythmcore Visual Redesign complete

## Phase Progress

| Phase | Status |
|-------|--------|
| Phase 1 — Core Detection + Static Scaffold | ✅ Complete |
| Phase 2 — Polish + Deploy | ✅ Complete |
| Phase 3 — Helper Modal: Tempo Reference | ✅ Complete |
| Phase 4 — Rhythmcore Visual Redesign | ✅ Complete |

## Milestone v2 — Delivered

**DESIGN.md** at project root — Rhythmcore Interface design contract applied.

Key changes delivered:
- **Typography**: Inter (display/body) + JetBrains Mono (labels/BPM/meta)
- **Primary**: Cyan `#06B6D4` (oklch 0.65 0.14 195) — for drag-over glow, spinner, accents
- **Accent**: Amber `#F97316` (oklch 0.70 0.14 75) — unchanged, already matched
- **Card system**: `.card` class with surface bg, subtle border, shadow, hover lift
- **Drop zone**: Surface card with primary-cyan glow on drag-over
- **Result**: Compact metric card with staggered entrance animation
- **Motion**: card-enter (scale+fade), stagger-fade-in children, hover lift (translateY-2px)
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` throughout
- **Dark mode**: Card hierarchy preserved, new surface tokens
- **Light mode**: Rhythmcore original light palette
- **Reduced-motion**: All keyframe animations overridden
- **Responsive**: BPM at 3rem mobile, tighter padding, full-width cards

All existing functionality preserved:
- BPM detection (essentia.js WASM, RhythmExtractor2013)
- Tempo classification + reference modal
- Auto-analyze on file select
- Dark/light theme toggle with localStorage
- Service Worker, SEO tags, GitHub Pages deploy

## Features Delivered (v1 + v2)

### BPM Detection
- essentia.js WASM (RhythmExtractor2013) — full client-side, no uploads
- Loading state with primary-cyan spinner + filename indicator
- Confidence display: percentual 0–100% with semantic color coding
  - ≥ 70% → green (`--success`)
  - 50–70% → amber (`--accent`)
  - < 50% → red (`--error`)

### File Handling
- Click-to-browse + drag-and-drop zone (Rhythmcore surface card)
- Accepted formats: MP3, WAV, FLAC, OGG, OPUS, AAC, WEBM
- Validation: unsupported types and files >200 MB rejected with clear error
- Auto-analyze on file select (no button click needed)

### Tempo Reference Modal
- Helper icon ⓘ opens native `<dialog>` with 10-classification table
- Ease-out-expo 300ms entrance, OKLCH backdrop, focus trap
- Data generated from TEMPO_RANGES array (DRY)
- Hidden until detection (`bpm-tempo.empty`)

### UI/UX (Rhythmcore)
- Rhythmcore design system applied (DESIGN.md)
- Inter + JetBrains Mono typography from Google Fonts
- Card-based layout with hover lift and staggered animations
- Dark/light theme with localStorage persistence
- Responsive: mobile, tablet, desktop
- OKLCH color system, 8px radius system, 4pt spacing scale
- Reduced-motion support

### Deployment
- GitHub Pages (via GitHub Actions workflow)
- Service Worker for offline WASM caching
- Open Graph meta tags + favicon
- SEO: robots.txt, sitemap.xml, canonical URL, JSON-LD schema

## License

MIT © Feco Linhares — use freely, credit required.
