# BPMfinder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Find the BPM of any song instantly, in your browser. **No uploads, no servers, no backend.**

## How it works

1. Drop or select an audio file (MP3, WAV, FLAC, OGG, etc.)
2. Analysis starts **automatically** — no button to click
3. BPM is detected client-side using [essentia.js](https://essentia.upf.edu/) (WASM)
4. Everything stays on your machine

## Tech

- **Stack:** Vanilla HTML/CSS/JS + essentia.js WASM
- **Detection:** `RhythmExtractor2013` from essentia.js
- **Design:** OKLCH color system, dark/light themes, system font stack
- **Zero dependencies** — no build step, no frameworks, no npm

## Dev

Any static file server works:

```bash
# Python
python3 -m http.server 8888
```

Then open http://localhost:8888 in your browser.

## Deploy

Push to GitHub and enable Pages.

```bash
git push origin master
```

The included GitHub Actions workflow handles the rest.

## License

MIT © [Feco Linhares](https://github.com/fecolinhares)

You're free to use, modify, distribute, and sell this software, as long as the original copyright notice and permission notice are included. See [LICENSE](LICENSE) for details.
