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

### v2 — Rhythmcore Visual Redesign (Complete)

**Goal:** Apply the Rhythmcore Interface design system to visually redesign the entire BPMfinder UI.

- ✅ All 25 requirements delivered and verified in browser.

### v3 — YouTube Support (Current)

**Goal:** Add YouTube link support via Piped API (primary) and tab audio capture (fallback). Three input modes: audio file upload, YouTube URL, or tab capture.

**Target features:**
- **Input tabs**: Three modes — File Upload | YouTube URL | Screen Capture
- **YouTube URL**: Extract video ID → Piped API for metadata → proxy download audio → essentia.js
- **Tab Capture**: `getDisplayMedia({ audio: true })` → MediaRecorder → AudioContext → essentia.js
- **Fallback**: If Piped API fails, suggest tab capture as alternative
- **Preserve all existing file upload functionality**

### Out of Scope

- Backend processing of any kind
- Audio visualization / waveform
- History / localStorage of past detections
- Downloading YouTube audio (analysis only, no save-to-disk)

## Context

- Pure frontend: HTML + CSS + JavaScript (no frameworks)
- BPM detection via [essentia.js](https://github.com/MTG/essentia.js) — WebAssembly port of Essentia (UPF)
- YouTube metadata via [Piped API](https://github.com/TeamPiped/Piped) (public, no API key needed)
- Tab audio capture via `navigator.mediaDevices.getDisplayMedia()`
- Works offline after first load (Service Worker) — YouTube/Piped features require internet
- Deploy target: GitHub Pages
- DESIGN.md at project root = Rhythmcore Interface design contract (source of truth for visual decisions)

## Constraints

- **[No Backend]**: 100% static. No server-side code. Piped API is a public third-party service, not our backend.
- **[File Size]**: Audio decoding in memory — files >200 MB rejected.
- **[Browser API]**: Relies on Web Audio API + AudioContext — requires modern browser. Tab capture requires `getDisplayMedia` support (Chrome 74+, Firefox 76+, Safari 17+).
- **[Piped API]**: Depends on public Piped instance availability. Falls back to tab capture if unavailable.
- **[License]**: MIT — use freely, credit required.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| essentia.js for BPM detection | Most robust client-side BPM lib; academic-grade algorithms | ✅ Good |
| Auto-analyze on file select | Remove unnecessary click; instant feedback | ✅ Good |
| No YouTube support | Previously required backend proxy; Piped API + tab capture solve this | ✅ Replaced by Piped + Tab Capture |
| Vanilla HTML/CSS/JS | Zero build tooling, deploy anywhere, no framework lock-in | ✅ Good |
| MIT License | Permissive — use freely with credit | ✅ Good |
| Rhythmcore Interface design | Neuform Featured template by Meng To — BPM-native design language | ✅ Complete |
| Piped API for YouTube metadata | Public API, no key needed, CORS-enabled on proxy endpoint | ✅ New for v3 |
| getDisplayMedia for tab capture | Browser-native screen/audio capture, zero dependencies | ✅ New for v3 |

---
*Last updated: 2026-05-26*
