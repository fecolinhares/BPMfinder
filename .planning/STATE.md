# STATE: BPMfinder

**Status:** 🟡 Phase 10 in progress — YouTube Integration: Piped API Rework
**Last updated:** 2026-06-04

## Project Reference

See: `.planning/PROJECT.md`

**Core value:** Users can discover the BPM of any song instantly, privately, and without uploading files to any server.
**Current focus:** All phases complete — app is feature-complete

## Phase Progress

| Phase | Status |
|-------|--------|
| Phase 1 — Core Detection + Static Scaffold | ✅ Complete |
| Phase 2 — Polish + Deploy | ✅ Complete |
| Phase 3 — Helper Modal: Tempo Reference | ✅ Complete |
| Phase 4 — Rhythmcore Visual Redesign | ✅ Complete |
| Phase 5 — YouTube Link + Tab Capture | ✅ Complete |
| Phase 6 — Microphone Capture | ✅ Complete |
| Phase 7 — SEO & Lighthouse Optimization | ✅ Complete |
| Phase 8 — Impeccable Design Audit & Polish | ✅ Complete |
| Phase 9 — AI Agent Optimization: llms.txt + WebMCP | ✅ Complete |
| Phase 10 — YouTube Integration: Piped API Rework | 🔄 In progress |

## Features Delivered (Full)

### 📁 File Upload
- Drop zone + click-to-browse → auto-analyze
- Validates types (MP3, WAV, FLAC, OGG, etc.) and size (<200MB)
- essentia.js WASM → BPM + confidence + tempo classification
- 100% offline (Service Worker)

### 🔗 YouTube URL
- Paste YouTube link → extract video ID
- Piped API (public, no key): fetch audio stream metadata
- Audio download via Piped Proxy (CORS ✅)
- Shows video title, channel, thumbnail during loading
- 4 configurable instances with fallback list
- If all instances fail: "Try Tab Capture Instead" fallback button
- Supports: youtube.com/watch?v=, youtu.be/, shorts/, embed/

### 🎤 Microphone Capture
- getUserMedia({ audio: true }) integration
- MediaRecorder pipeline: capture → blob → decode → analyze
- 10-second capture with progress indicator
- Permission denied/not found error handling
- Source indicator shows "from microphone"

### 🖥️ Tab Capture
- getDisplayMedia({ video: {w:1,h:1}, audio: true }) → drop video track
- MediaRecorder captures 10 seconds of audio
- Real-time progress bar + countdown (0/10s → 10/10s)
- Stereo → mono conversion
- Browser support detection + contextual error feedback

### Shared Pipeline (all 4 modes)
- `runEssentia()` shared function for all input modes
- Same BPM display, animated counter, confidence color-coding
- Source indicator: file / YouTube / tab capture / microphone

### Service Worker
- Piped API/proxy URLs excluded from cache (network only)
- File upload still works offline

## License

MIT © Feco Linhares — use freely, credit required.
