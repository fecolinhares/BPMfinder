# BPMfinder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-%23F97316?logo=githubpages&logoColor=white)](https://fecolinhares.github.io/BPMfinder/)

**→ [Try BPMfinder Live](https://fecolinhares.github.io/BPMfinder/) ←**

Find the BPM of any song instantly, in your browser. **No uploads, no servers, no backend.**

## How it works

1. Choose an input mode: **File**, **YouTube URL**, **Microphone**, or **Tab Capture**
2. For files: drop or select an audio file — analysis starts **automatically**
3. For YouTube: paste a link and click Analyze — audio is fetched via Piped API
4. For Capture: click Microphone or Tab Audio, grant permission, wait 10 seconds
5. BPM is detected client-side using [essentia.js](https://essentia.upf.edu/) (WASM)
6. Everything stays on your machine

## Features

- **4 input modes** — File upload, YouTube URL, Microphone capture, Tab audio capture
- **Instant BPM detection** via RhythmExtractor2013 (essentia.js WASM)
- **Tempo classification** — Grave → Prestissimo with reference modal
- **Confidence indicator** — color-coded (green/amber/red)
- **Dark/light themes** — persisted to localStorage
- **Drag-and-drop** file upload with auto-analyze
- **AI Agent ready** — `/llms.txt` and WebMCP Declarative API for agent tool registration
- **Offline support** via Service Worker (file upload mode)

## Lighthouse Scores

| Metric | Score |
|--------|-------|
| SEO | 100% |
| Accessibility | 100% |
| Best Practices | 100% |
| Agentic Browsing | 100% |

## Design System

Built with the **Rhythmcore Interface** design language (Meng To / Neuform Featured):

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#06B6D4` (cyan) | Active tab, drag-over glow, spinner |
| Accent | `#F97316` (amber) | BPM display, buttons, logo |
| Surface | `#4A5568` | Dialog header, file info |
| Typography | **Inter** | Body and headings |
| Mono | **JetBrains Mono** | BPM display, labels, metadata |

- **OKLCH color system** for consistent luminance across themes
- **8px radius system** for cards and controls
- **Masked reveal** + staggered entrance animations
- **Ambient pulse** background effect
- **Hover lift** on all interactive elements
- `cubic-bezier(0.16, 1, 0.3, 1)` easing throughout

## Tech

- **Stack:** Vanilla HTML/CSS/JS + essentia.js WASM
- **Detection:** `RhythmExtractor2013` from essentia.js
- **YouTube:** Piped API (public, no key needed)
- **Mic/Tab Capture:** WebRTC APIs (getUserMedia, getDisplayMedia)
- **Design:** Rhythmcore Interface, OKLCH colors, Google Fonts (Inter + JetBrains Mono)
- **AI Agents:** llms.txt (llmstxt.org), WebMCP Declarative API
- **Zero dependencies** — no build step, no frameworks, no npm
- **Design contract:** `DESIGN.md` at project root

## Project Structure

```
BPMfinder/
├── index.html            # Single-page app (CSS + JS inline)
├── index.html.md         # Markdown version for LLM consumption
├── sw.js                 # Service Worker (offline caching)
├── llms.txt              # LLM-friendly site overview (llmstxt.org)
├── DESIGN.md             # Rhythmcore design contract
├── robots.txt            # SEO + AI agent entry points
├── sitemap.xml           # SEO
├── docs/                 # Generated documentation
├── .planning/            # GSD workflow artifacts
├── .github/workflows/    # GitHub Actions deploy
└── LICENSE               # MIT
```

## License

MIT © [Feco Linhares](https://github.com/fecolinhares)

You're free to use, modify, distribute, and sell this software, as long as the original copyright notice and permission notice are included. See [LICENSE](LICENSE) for details.

---

> **GSD-generated sections below** — this README was supplemented by gsd-docs-update to cover Phases 5-9 features (YouTube, Mic, Tab Capture, llms.txt, WebMCP).
