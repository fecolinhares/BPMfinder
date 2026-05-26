# BPMfinder

## What This Is

A minimal static web page where users drop an audio file (MP3, WAV, FLAC, OGG) and get the BPM detected entirely client-side via essentia.js WASM. Zero backend, zero API calls.

## Core Value

Users can discover the BPM of any song instantly, privately, and without uploading files to any server.

## Requirements

### Delivered

- [x] **BPM-01**: Upload audio file, see detected BPM
- [x] **BPM-02**: essentia.js WASM for real beat tracking
- [x] **BPM-03**: Loading state during detection
- [x] **BPM-04**: BPM integer + confidence indicator
- [x] **BPM-05**: Tempo classification (Grave → Prestissimo) + helper modal
- [x] **FILE-01**: File input button
- [x] **FILE-02**: Drag-and-drop zone
- [x] **FILE-03**: Accepted types displayed
- [x] **FILE-04**: Error on unsupported types
- [x] **FILE-05**: Error on decode failure
- [x] **UI-01**: Clean, minimal layout
- [x] **UI-02**: Dark/light theme toggle
- [x] **UI-03**: Responsive layout
- [x] **UI-04**: Impeccable typography
- [x] **UI-05**: No placeholder content
- [x] **UI-06**: Restrained color strategy
- [x] **UI-07**: Ample whitespace
- [x] **DEP-01**: Self-contained repo
- [x] **DEP-02**: Single index.html entry
- [x] **DEP-03**: GitHub Pages deployable
- [x] **DEP-04**: Offline via Service Worker

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

---
*Last updated: 2026-05-25*
