# BPMfinder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Find the BPM of any song instantly, in your browser. **No uploads, no servers, no backend.**

## How it works

1. Drop or select an audio file (MP3, WAV, FLAC, OGG, etc.)
2. Analysis starts **automatically** — no button to click
3. BPM is detected client-side using [essentia.js](https://essentia.upf.edu/) (WASM)
4. Everything stays on your machine

## Features

- **Instant BPM detection** via RhythmExtractor2013 (essentia.js WASM)
- **Tempo classification** — Grave → Prestissimo with reference modal
- **Confidence indicator** — color-coded (green/amber/red)
- **Dark/light themes** — persisted to localStorage
- **Drag-and-drop** file upload
- **Auto-analyze** on file select (zero clicks)
- **Offline support** via Service Worker

## Design System

Built with the **Rhythmcore Interface** design language (Meng To / Neuform Featured):

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#06B6D4` (cyan) | Drag-over glow, spinner |
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
- **Design:** Rhythmcore Interface, OKLCH colors, Google Fonts (Inter + JetBrains Mono)
- **Zero dependencies** — no build step, no frameworks, no npm
- **Design contract:** `DESIGN.md` at project root

## Dev

Any static file server works:

```bash
# Python
python3 -m http.server 8888
```

Then open http://localhost:8888 in your browser.

## Deploy

```bash
git push origin master
```

The included GitHub Actions workflow handles GitHub Pages deployment.

## Project Structure

```
BPMfinder/
├── index.html          # Single-page app (CSS + JS inline)
├── sw.js               # Service Worker (offline caching)
├── DESIGN.md           # Rhythmcore design contract
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── .planning/          # GSD workflow artifacts
├── .github/workflows/  # GitHub Actions deploy
└── LICENSE             # MIT
```

## License

MIT © [Feco Linhares](https://github.com/fecolinhares)

You're free to use, modify, distribute, and sell this software, as long as the original copyright notice and permission notice are included. See [LICENSE](LICENSE) for details.
