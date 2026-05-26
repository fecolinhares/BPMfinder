# BPMfinder

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

```bash
# Start dev server (with no-cache headers)
python3 server.py 8888

# Or just use Python's built-in (may cache)
python3 -m http.server 8888
```

Open http://localhost:8888 in your browser.

## Deploy

This is a static site. Push to GitHub and enable Pages, or serve from any static file host.

```bash
git push origin master
```

## License

MIT
