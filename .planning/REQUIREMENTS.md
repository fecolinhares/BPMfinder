# Requirements: BPMfinder

**Defined:** 2026-05-24
**Last updated:** 2026-05-25
**Core Value:** Users can discover the BPM of any song instantly, privately, and without uploading files to any server.

## v1 Requirements

### BPM Detection

- [x] **BPM-01**: User can upload an audio file (MP3, WAV, FLAC, OGG) and see the detected BPM displayed on screen
- [x] **BPM-02**: BPM detection uses essentia.js WASM with onset detection + periodicity estimation for accuracy
- [x] **BPM-03**: Detection shows progress/loading state while processing
- [x] **BPM-04**: Detection result displays BPM as integer, with confidence indicator
- [x] **BPM-05**: Display BPM range classification (Largo, Andante, Moderato, Allegro, Presto, etc.) with contextual helper modal

### File Handling

- [x] **FILE-01**: User can select files via `<input type="file">` button
- [x] **FILE-02**: User can drag-and-drop audio files onto a drop zone
- [x] **FILE-03**: Accepted file types displayed on drop zone (MP3, WAV, FLAC, OGG)
- [x] **FILE-04**: Clear error feedback for unsupported file types
- [x] **FILE-05**: Clear error feedback for files that fail to decode

### UI/UX

- [x] **UI-01**: Clean, minimal layout — single purpose per viewport
- [x] **UI-02**: Dark/light theme toggle with persisted preference
- [x] **UI-03**: Responsive — works on mobile, tablet, desktop
- [x] **UI-04**: Typography follows impeccable brand register principles (distinctive font, deliberate hierarchy)
- [x] **UI-05**: No placeholder content, no fake metrics, no generic AI design patterns
- [x] **UI-06**: Color strategy: restrained with one committed accent color
- [x] **UI-07**: Ample whitespace, deliberate spacing, no decorative glassmorphism or gradient text

### Deployment

- [x] **DEP-01**: All files self-contained in the repo (no CDN-dependency for core functionality)
- [x] **DEP-02**: Single `index.html` entry point (or minimal multi-file structure)
- [x] **DEP-03**: Deployable to GitHub Pages with zero config
- [x] **DEP-04**: Works offline after initial page load (Service Worker for essentia.js WASM caching)

## v2 Requirements (future)

### Enhancements

- **BPM-06**: Tap tempo button for manual BPM detection
- **BPM-07**: Export/share BPM result via URL parameter
- **BPM-08**: Audio waveform visualization
- **BPM-09**: Multiple file upload queue

## Out of Scope

| Feature | Reason |
|---------|--------|
| YouTube link BPM detection | Requires backend proxy to extract audio — violates no-backend constraint |
| Backend processing | Defeats purpose of private, serverless, static deployment |
| User accounts / history | Adds complexity without core value |
| Audio editing | BPM finder is a tool, not a DAW |
| Real-time microphone BPM | Interesting but adds complexity; defer to v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BPM-01 | Phase 1 | ✅ Complete |
| BPM-02 | Phase 1 | ✅ Complete |
| BPM-03 | Phase 1 | ✅ Complete |
| BPM-04 | Phase 1 | ✅ Complete |
| BPM-05 | Phase 3 | ✅ Complete |
| FILE-01 | Phase 1 | ✅ Complete |
| FILE-02 | Phase 2 | ✅ Complete |
| FILE-03 | Phase 2 | ✅ Complete |
| FILE-04 | Phase 1 | ✅ Complete |
| FILE-05 | Phase 1 | ✅ Complete |
| UI-01 | Phase 1 | ✅ Complete |
| UI-02 | Phase 2 | ✅ Complete |
| UI-03 | Phase 1 | ✅ Complete |
| UI-04 | Phase 1 | ✅ Complete |
| UI-05 | Phase 1 | ✅ Complete |
| UI-06 | Phase 1 | ✅ Complete |
| UI-07 | Phase 1 | ✅ Complete |
| DEP-01 | Phase 1 | ✅ Complete |
| DEP-02 | Phase 1 | ✅ Complete |
| DEP-03 | Phase 2 | ✅ Complete |
| DEP-04 | Phase 2 | ✅ Complete |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Completed: 21 ✓
