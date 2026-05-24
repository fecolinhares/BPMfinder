# BPMfinder 🎵

> Instant BPM detection in your browser. No uploads. No servers. No backend.

Upload an audio file (MP3, WAV, FLAC, OGG) and get the BPM instantly — powered by [essentia.js](https://github.com/MTG/essentia.js) WebAssembly. All processing happens **entirely on your machine**.

## Features

- 🎯 **Accurate BPM detection** — uses academic-grade onset detection + periodicity estimation
- 🔒 **100% private** — no files are uploaded anywhere
- ⚡ **Instant** — processes locally via WebAssembly
- 🌙 **Dark/light theme** — persisted preference
- 📱 **Responsive** — works on mobile and desktop
- 🚫 **No backend** — deploy as static site anywhere

## Architecture

```
index.html  ←  single-file app
├── HTML/Semantic structure
├── CSS (design tokens, dark/light theme, responsive)
└── JS (essentia.js WASM integration, file handling, UI state)
```

**Tech stack:** Vanilla HTML/CSS/JS + essentia.js WASM (CDN-loaded)

## BPM Detection

Uses `RhythmExtractor2013` from the Essentia audio analysis library (Music Technology Group, Universitat Pompeu Fabra):

1. Audio decoded via Web Audio API (`AudioContext.decodeAudioData`)
2. First channel passed to essentia's beat tracking algorithm
3. Result: BPM (integer) + confidence score

## Deployment

### GitHub Pages

Push to a repo named `BPMfinder` (or your-username.github.io/BPMfinder/). GitHub Actions or just enable Pages from the repo settings.

### Cloudflare Pages

Connect your repo → Cloudflare auto-detects static site → deploy.

## Requirements

- Modern browser with Web Audio API support (Chrome, Firefox, Safari, Edge)
- essentia.js is **AGPL-3.0 licensed**

## License

Code: MIT.
essentia.js: AGPL-3.0 — see [essentia.js license](https://github.com/MTG/essentia.js).
