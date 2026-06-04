# STATE: BPMfinder

**Status:** 🟡 Phase 5 — YouTube Support in planning
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
| Phase 5 — YouTube Link + Tab Capture | 🔲 Planned |

## Milestone v3 — YouTube Support (Current)

**Goal:** Add YouTube link support via Piped API (primary) and tab audio capture (fallback). Three input modes: audio file upload, YouTube URL, or tab capture.

### Key Requirements

- **Input tabs**: Three modes — File Upload (existing) | YouTube URL | Screen Capture
- **YouTube URL**: Extract video ID → Piped API for metadata → proxy download audio → essentia.js analysis
- **Tab Capture**: `getDisplayMedia({ audio: true })` → MediaRecorder (10s) → AudioContext decode → essentia.js
- **Fallback**: If Piped API fails, suggest tab capture as alternative
- **All existing file upload flow preserved**

### YouTube URL (Piped API) Flow
1. User pastes YouTube link → video ID extracted
2. `fetch(https://pipedapi.kavin.rocks/streams/{videoId})` → audio stream URLs
3. Download via Piped proxy endpoint (CORS-enabled)
4. `AudioContext.decodeAudioData()` → `essentia.js RhythmExtractor2013`
5. Same BPM display + confidence + tempo classification

### Tab Capture (getDisplayMedia) Flow
1. User clicks "Capture from YouTube Tab"
2. `navigator.mediaDevices.getDisplayMedia({ audio: true, video: false })`
3. MediaRecorder captures ~10s of audio
4. Audio blob → ArrayBuffer → `AudioContext.decodeAudioData()`
5. `essentia.js RhythmExtractor2013` → same result display

## Próximos Passos

1. ✅ Milestone v3 criada (PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md)
2. ⏳ `/gsd-plan-phase 5` — detalhar plano de implementação
3. ⏳ Executar fase 5
4. ⏳ Verificar + deploy
