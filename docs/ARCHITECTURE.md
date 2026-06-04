# Architecture — BPMfinder

## Overview

BPMfinder is a **100% client-side single-page application** that detects the BPM (beats per minute) of audio. There is no backend, no server-side processing, and no data upload — all computation happens in the user's browser via WebAssembly.

The architecture follows a **pipeline pattern**: input → decode → analyze → display. Each input mode feeds into the same core analysis pipeline.

```
┌──────────────────────────────────────────────────────┐
│                   User Browser                       │
│                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────┐ │
│  │ File     │   │ YouTube  │   │ Capture          │ │
│  │ Upload   │   │ URL      │   │ ┌──────┐ ┌────┐ │ │
│  │(drag/drop│   │(Piped    │   │ │ Mic  │ │Tab │ │ │
│  │ + click) │   │  API)    │   │ │(gUM) │ │(DM)│ │ │
│  └─────┬────┘   └────┬─────┘   │ └──┬───┘ └──┬─┘ │ │
│        │              │         └───┴─────────┴───┘ │
│        └──────┬───────┘               │              │
│               ▼                       ▼              │
│        ┌──────────────────────────────────────┐      │
│        │     AudioContext.decodeAudioData()    │      │
│        │     → Float32Array (mono channel)    │      │
│        └────────────────┬─────────────────────┘      │
│                         ▼                            │
│        ┌──────────────────────────────────────┐      │
│        │     runEssentia(channelData)          │      │
│        │     → essentia.js WASM               │      │
│        │     → RhythmExtractor2013            │      │
│        │     → { bpm, confidence }            │      │
│        └────────────────┬─────────────────────┘      │
│                         ▼                            │
│        ┌──────────────────────────────────────┐      │
│        │     displayResult({ bpm, confidence })│      │
│        │     → animated counter                │      │
│        │     → tempo classification            │      │
│        │     → confidence color-coding         │      │
│        │     → source indicator                │      │
│        └──────────────────────────────────────┘      │
└──────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **No backend** | Zero operational cost, infinite scale, user privacy |
| **essentia.js WASM** | Academic-grade BPM detection; only viable client-side option |
| **Vanilla HTML/CSS/JS** | No build tooling, deploy anywhere, no framework lock-in |
| **Piped API for YouTube** | Public, no API key needed; CORS-enabled proxy endpoint |
| **WebRTC for capture** | Native browser APIs; zero dependencies for mic/tab audio |
| **Shared pipeline** | `runEssentia()` is the single entry point for all 4 modes |
| **Single HTML file** | Everything in one file for simplicity and cache efficiency |

## Component Architecture

### HTML Structure

```
.app (flex column container)
├── .header — Logo + theme toggle
├── <main>
│   ├── .hero — Heading, description
│   ├── .badges — Trust indicators
│   ├── .input-tabs — Tab bar (File, YouTube, Capture)
│   ├── #panelFile — File upload (drop zone + auto-analyze)
│   ├── #panelYoutube — YouTube URL input + Piped API fetch
│   ├── #panelCapture — Mic/Tab capture buttons + recorder
│   ├── #loading — Loading spinner
│   ├── #result — BPM result card
│   └── #error — Error display
└── .footer — Attribution links
```

### CSS Architecture

- **Design tokens** defined in `:root` and `[data-theme]` blocks (OKLCH)
- **Rhythmcore design system** — card-based layout with 8px radius and hover lift
- **No CSS frameworks** — all styles are custom and inline in `index.html`
- **Responsive** — single breakpoint at 480px for mobile

### JavaScript Architecture

```
Initialization:
├── Theme restore (localStorage → data-theme)
├── buildTempoTable() — Populate tempo reference dialog
├── IntersectionObserver — Scroll-triggered reveals
└── Event listeners setup

Input Modes:
├── handleFile(file) → startAnalysis(file) → detectBPM() → runEssentia()
├── youtubeAnalyzeBtn → fetchYoutubeAudio() → decode → runEssentia()
├── micCaptureBtn → getUserMedia → startCaptureSession() → runEssentia()
└── captureStartBtn → getDisplayMedia → startCaptureSession() → runEssentia()

Shared:
├── runEssentia(channelData) → essentia.js WASM → { bpm, confidence }
└── displayResult() → animated counter, tempo, confidence, source
```

## Data Flow

### File Upload
1. User drops/clicks file → `handleFile(file)` validates type and size
2. `startAnalysis(file)` → `detectBPM(file)` → `file.arrayBuffer()` → `decodeAudioData()`
3. `runEssentia(channelData)` → WASM RhythmExtractor2013 → BPM + confidence
4. `displayResult()` renders with animated counter

### YouTube URL
1. User pastes URL → `extractYoutubeId()` extracts video ID
2. `fetchYoutubeAudio(videoId)` → iterates Piped API instances
3. Fetches `/streams/{videoId}` → selects best audio stream → proxies audio URL
4. Decodes via `AudioContext` → `runEssentia()`

### Microphone Capture
1. User clicks Microphone → `getUserMedia({ audio: true })`
2. `startCaptureSession(stream, 'mic')` → MediaRecorder captures 10 seconds
3. Blob → `decodeAudioData()` → stereo-to-mono → `runEssentia()`

### Tab Capture
1. User clicks Tab Audio → `getDisplayMedia({ video: {w:1,h:1}, audio: true })`
2. Drops video track, keeps audio → same `startCaptureSession()` pipeline

## Offline Architecture

- **Service Worker** (`sw.js`) caches essentia.js WASM and static assets on first load
- Piped API/proxy URLs explicitly excluded from cache
- File upload mode works fully offline

## AI Agent Support

- **`/llms.txt`** — LLM-friendly markdown at project root (llmstxt.org standard)
- **`/index.html.md`** — Clean markdown version of the app page
- **WebMCP** — Declarative API annotations on input panels (`webmcp-tool` attributes)
- **`<meta name="webmcp">`** — Page-level tool registration for AI agents
