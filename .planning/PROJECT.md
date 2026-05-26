# BPMfinder

## What This Is

A minimal static web page where users drop an audio file (MP3, WAV, FLAC, OGG) and get the BPM detected entirely client-side via essentia.js WASM. Zero backend, zero API calls.

## Core Value

Users can discover the BPM of any song instantly, privately, and without uploading files to any server.

## Milestones

### v1 — Core Detection + Polish (Complete)

**BPM detection, file handling, UI, deployment.**

- [x] **BPM-01** to **BPM-05**: Detection, confidence, tempo classification, loading, modal
- [x] **FILE-01** to **FILE-05**: File input, drag-drop, types, error handling
- [x] **UI-01** to **UI-07**: Clean layout, theme toggle, responsive, typography, no placeholders
- [x] **DEP-01** to **DEP-04**: Self-contained, single HTML, GitHub Pages, offline SW

### v2 — Rhythmcore Visual Redesign (Current)

**Goal:** Apply the Rhythmcore Interface design system to visually redesign the entire BPMfinder UI.

**Target features:**
- Sync color system with Rhythmcore tokens (primary cyan #06B6D4, accent amber #F97316)
- Add Inter + JetBrains Mono typography
- Card-based layout with surface backgrounds and subtle borders
- Dashboard-inspired compact operational hierarchy
- Staggered entrance animations, hover lift, smooth transitions
- Mobile responsive preserved

### Out of Scope

- YouTube link support — requires backend proxy, violates no-backend constraint
- Backend processing of any kind
- Audio visualization / waveform
- History / localStorage of past detections (v2 candidate)

## Context

- Pure frontend: HTML + CSS + JavaScript (no frameworks)
- BPM detection via [essentia.js](https://github.com/MTG/essentia.js) — WebAssembly port of Essentia (UPF)
- Works offline after first load (Service Worker)
- Deploy target: GitHub Pages
- DESIGN.md at project root = Rhythmcore Interface design contract (source of truth for visual decisions)

## Constraints

- **[No Backend]**: 100% static. No Node.js runtime, no API calls, no database.
- **[File Size]**: Audio decoding in memory — files >200 MB rejected.
- **[Browser API]**: Relies on Web Audio API + AudioContext — requires modern browser.
- **[License]**: MIT — use freely, credit required.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| essentia.js for BPM detection | Most robust client-side BPM lib; academic-grade algorithms | ✅ Good |
| Auto-analyze on file select | Remove unnecessary click; instant feedback | ✅ Good |
| No YouTube support | Requires backend proxy; violates no-backend constraint | ✅ Good |
| Vanilla HTML/CSS/JS | Zero build tooling, deploy anywhere, no framework lock-in | ✅ Good |
| MIT License | Permissive — use freely with credit | ✅ Good |
| Rhythmcore Interface design | Neuform Featured template by Meng To — BPM-native design language | ✅ In Progress |

---
*Last updated: 2026-05-26*
