# BPMfinder

## What This Is

A minimal static web page where users upload an audio file (MP3, WAV, etc.) or paste a YouTube link and get the BPM (beats per minute) detected entirely client-side. Zero backend, zero API calls — everything runs in the browser via Web Audio API.

## Core Value

Users can discover the BPM of any song instantly, privately, and without uploading files to any server.

## Requirements

### Validated

(Will validate post-ship)

### Active

- [ ] **BPM-01**: User can upload audio file (MP3, WAV, FLAC, OGG) and see detected BPM
- [ ] **BPM-02**: BPM detection uses essentia.js WASM for real beat tracking
- [ ] **BPM-03**: Clean, elegant UI following impeccable design principles
- [ ] **BPM-04**: Drag-and-drop zone for audio files
- [ ] **BPM-05**: Responsive layout (mobile + desktop)
- [ ] **BPM-06**: Dark/light mode toggle
- [ ] **BPM-07**: Deployable as static site (GitHub Pages / Cloudflare Pages)

### Out of Scope

- YouTube link support — requires backend proxy (youtube-dl / yt-dlp), not free static hosting
- Backend processing of any kind — defeats purpose
- Audio visualization / waveform — visual complexity without adding core value
- History/localStorage of past BPM detections — scope for v2

## Context

- Pure frontend: HTML + CSS + JavaScript (no frameworks)
- BPM detection via [essentia.js](https://github.com/MTG/essentia.js) — WebAssembly port of the Essentia library (Music Technology Group, UPF)
- Must work offline after first load (Service Worker optional)
- Deploy target: GitHub Pages (`username.github.io/BPMfinder/`) or Cloudflare Pages

## Constraints

- **[No Backend]**: 100% static. No Node.js runtime, no API calls, no database.
- **[File Size]**: Audio decoding happens in memory — large files (>100MB) may cause issues.
- **[Browser API]**: Relies on Web Audio API `decodeAudioData()` + AudioContext — requires modern browser.
- **[License]**: essentia.js is AGPL-3.0 — must comply.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| essentia.js for BPM detection | Most robust client-side BPM lib; academic-grade algorithms | ✓ Good |
| No YouTube support | Requires backend proxy; violates no-backend constraint | ✓ Good |
| Vanilla HTML/CSS/JS | Zero build tooling, deploy anywhere, no framework lock-in | — Pending |
| No framework (React/Vue/Svelte) | Single-page tool doesn't warrant framework overhead | — Pending |

---
*Last updated: 2026-05-24 after initial creation*
