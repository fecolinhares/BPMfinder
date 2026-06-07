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

### v3 — YouTube Support (Complete)

**Goal:** Add YouTube link support via Piped API (primary) and tab audio capture (fallback). Three input modes: audio file upload, YouTube URL, or tab capture.

**Delivered:**
- **Input tabs**: File Upload | YouTube URL | Tab Capture (4 modes with Mic in Phase 6)
- **YouTube URL**: Extract video ID → Piped API for metadata → proxy download audio → essentia.js ✓
- **Tab Capture**: `getDisplayMedia({ audio: true })` → MediaRecorder → AudioContext → essentia.js ✓
- **Microphone Capture**: `getUserMedia({ audio: true })` → MediaRecorder → 10s capture → essentia.js ✓
- **Fallback**: If Piped API fails, suggest tab capture as alternative ✓
- **Preserved all existing file upload functionality** ✓

### v4 — AI Agent Optimization (Current)

**Goal:** Make BPMfinder easily discoverable and usable by AI agents via llms.txt and WebMCP.

**Delivered:**
- `/llms.txt` — LLM-friendly markdown with site overview, input modes, usage guidance ✓
- `/index.html.md` — clean markdown version of the page for LLM consumption ✓
- WebMCP Declarative API — `<form>` elements annotated with `webmcp-tool` attributes ✓
- Linked from `robots.txt` and `sitemap.xml` ✓

### v5 — YouTube Link Input with Piped API (Planned)

**Goal:** Allow users to paste a YouTube URL instead of (or in addition to) uploading an audio file — using the existing Piped API pipeline, 100% local and static.

### Out of Scope

- Backend processing of any kind
- Audio visualization / waveform
- History / localStorage of past detections
- Downloading YouTube audio (analysis only, no save-to-disk)

## Requirements

### Core Detection
- **REQ-01**: BPM detection from audio files (MP3, WAV, FLAC, OGG) via essentia.js WASM
- **REQ-02**: Confidence scoring and tempo classification (Grave → Prestissimo)
- **REQ-03**: Auto-analyze on file select/drop — no intermediary click

### Input Modes
- **REQ-04**: YouTube URL input — Piped API with videoStreams fallback
- **REQ-05**: Microphone capture via getUserMedia — 10s MediaRecorder pipeline
- **REQ-06**: Tab audio capture via getDisplayMedia — 10s MediaRecorder pipeline

### UX & Privacy
- **REQ-07**: 100% client-side — no server uploads, no API keys needed
- **REQ-08**: Dark/light theme with localStorage persistence
- **REQ-09**: Offline support via Service Worker (file upload mode)
- **REQ-10**: Responsive mobile layout, keyboard accessible, reduced-motion support

### AI & Discoverability
- **REQ-11**: llms.txt for AI agent discovery
- **REQ-12**: WebMCP Declarative API annotations on input elements

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
*Last updated: 2026-06-04*
