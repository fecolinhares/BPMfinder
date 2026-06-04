# Configuration — BPMfinder

## Overview

BPMfinder is a zero-configuration application. It has no build step, no environment variables, no database, and no server-side configuration. Everything is configured at the code level or via the browser.

## No-Config Design

| Config Area | Approach |
|-------------|----------|
| Build/Deploy | Zero — open `index.html` in any browser |
| Environment | None — no `.env`, no secrets, no API keys |
| Database | None — all state in `localStorage` |
| Server | Static file server (Python, nginx, GitHub Pages) |

## User-Facing Configuration

### Theme (Dark/Light)

- **Storage:** `localStorage.getItem('bpmfinder-theme')`
- **Values:** `'dark'` (default) or `'light'`
- **Toggle:** Sun/moon icon in header
- **Fallback:** Dark mode if no preference saved

### YouTube Piped API Instances

Defined in `index.html` JavaScript as an array of fallback instances:

```javascript
const PIPED_INSTANCES = [
  'https://pipedapi.kavin.rocks',
  'https://pipedapi.tiekoetter.com',
  'https://pipedapi.private.coffee',
  'https://pipedapi.r4fo.com',
];
```

To customize, edit the `PIPED_INSTANCES` array. Each entry is tried in order until one succeeds.

### Capture Duration

```javascript
const CAPTURE_DURATION = 10000; // 10 seconds in milliseconds
```

Modify this value in `index.html` to change mic/tab recording length.

### Service Worker Cache Name

```sw
caches.open('bpmfinder-v1')
```

Update the version string (`v1` → `v2`, etc.) to force a cache refresh on deploy.

## GitHub Pages Deployment

Configured via `.github/workflows/deploy.yml`. Requires no manual setup beyond:
1. Push to the `master` branch
2. Enable GitHub Pages in repo settings (Source: GitHub Actions)

## Verifying Configuration

- **File size limit:** 200MB (hardcoded in `handleFile()`)
- **Supported types:** MP3, WAV, FLAC, OGG, OPUS, AAC, M4A, WebM
- **Capture length:** 10 seconds
- **YouTube timeout:** 15 seconds per Piped instance
