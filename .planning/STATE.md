# STATE: BPMfinder

**Status:** 🟢 Phase 5 complete — YouTube Support
**Last updated:** 2026-06-04

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-04)

**Core value:** Users can discover the BPM of any song instantly, privately, and without uploading files to any server.
**Current focus:** Milestone v3 — YouTube Support

## Phase Progress

| Phase | Status |
|-------|--------|
| Phase 1 — Core Detection + Static Scaffold | ✅ Complete |
| Phase 2 — Polish + Deploy | ✅ Complete |
| Phase 3 — Helper Modal: Tempo Reference | ✅ Complete |
| Phase 4 — Rhythmcore Visual Redesign | ✅ Complete |
| Phase 5 — YouTube Link + Tab Capture | ✅ Complete |

## Milestone v3 — YouTube Support (Complete)

**Commit:** `81af6b4`

### Three Input Modes

**📁 File Upload (existing)**
- Drop zone + click-to-browse → auto-analyze
- Validates types (MP3, WAV, FLAC, OGG, etc.) and size (<200MB)
- essentia.js WASM → BPM + confidence + tempo classification
- 100% offline (Service Worker)

**🔗 YouTube URL**
- Paste YouTube link → extract video ID
- Piped API (public, no key): fetch audio stream metadata
- Audio download via Piped Proxy (CORS ✅)
- Shows video title, channel, thumbnail during loading
- 4 configurable instances with fallback list
- If all instances fail: "Try Tab Capture Instead" fallback button
- Supports: youtube.com/watch?v=, youtu.be/, shorts/, embed/

**🖥️ Tab Capture**
- getDisplayMedia({ video: {w:1,h:1}, audio: true }) → drop video track
- MediaRecorder captures 10 seconds of audio
- Real-time progress bar + countdown (0/10s → 10/10s)
- Stereo → mono conversion
- Browser support detection (disables tab if unsupported)
- Handles: permission denied, no audio track, capture too short

### Shared Pipeline
- `runEssentia()` function extracted from `detectBPM()`
- All 3 modes feed into the same essentia.js RhythmExtractor2013
- Same BPM display, animated counter, confidence color-coding
- Source indicator: "from file" / "from YouTube" / "from tab capture"

### Service Worker
- Piped API/proxy URLs excluded from cache (network only)
- File upload still works offline

### UI
- Tab bar with 3 modes (File | YouTube | Capture)
- Rhythmcore design tokens reused throughout
- Mobile: tabs show icons only, inputs stack vertically
- Dark/light theme: all new elements render correctly in both
- Keyboard: Tab navigation, Enter to analyze/capture

## Features Delivered (v1 + v2 + v3)

### YouTube URL (Piped API)
- URL parsing from multiple YouTube formats
- Public API (no key required)
- Configurable instance list with fallback
- Proxy download with CORS support
- Video metadata display (title, channel, thumbnail)
- Graceful error + fallback to tab capture

### Tab Capture (getDisplayMedia)
- Browser-native screen/tab audio capture
- 10-second recording with visual progress
- Automatic mono downmix
- Support detection + graceful unsupported message

## License

MIT © Feco Linhares — use freely, credit required.
