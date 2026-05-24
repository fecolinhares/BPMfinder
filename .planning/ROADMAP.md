# ROADMAP: BPMfinder

## Phase 1 — Core Detection + Static Scaffold

**Goal:** Working BPM detection with great UI.

Tasks:
1. Create `index.html` with semantic structure and impeccable-brand design language
2. Integrate essentia.js WASM for BPM detection
3. File input (button) + drop zone with drag-and-drop
4. BPM result display with confidence indicator
5. Dark theme as default (product register: tool UI)
6. Responsive layout with proper spacing
7. Error handling for unsupported formats / decode failures

## Phase 2 — Polish + Deploy

**Goal:** Production-ready static site.

Tasks:
1. Dark/light theme toggle with localStorage persistence
2. Full drag-and-drop UX refinement (FILE-02, FILE-03)
3. Service Worker for essentia.js WASM caching (offline support)
4. GitHub Actions deploy to GitHub Pages / Cloudflare Pages
5. Meta tags, favicon, Open Graph
6. Final design audit against impeccable brand/product references

## Post-v1 (v2 ideas)

- BPM range classification (Largo → Presto)
- Tap tempo button
- Share BPM via URL param
- Waveform visualization
- Queue support
