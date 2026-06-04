# Development — BPMfinder

## Project Overview

BPMfinder is a **single HTML file** application with inline CSS and JavaScript. There is no build step, no package manager, and no framework. Development is straightforward — edit the files and refresh the browser.

## Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge)
- A static file server for local testing (Python, Node, etc.)
- Git for version control
- (Optional) A GitHub account for Pages deployment

## Project Structure

```
BPMfinder/
├── index.html            # Main application (HTML + CSS + JS)
├── sw.js                 # Service Worker
├── llms.txt              # LLM-friendly site overview
├── index.html.md         # Markdown version for AI agents
├── DESIGN.md             # Design system contract
├── robots.txt            # Crawler directives
├── sitemap.xml           # SEO sitemap
├── .planning/            # GSD workflow artifacts
│   ├── ROADMAP.md
│   ├── STATE.md
│   └── tasks/
├── .github/workflows/   # GitHub Actions (deploy)
├── docs/                 # Generated documentation
├── LICENSE               # MIT
└── README.md             # Project overview
```

## Development Workflow

```bash
# 1. Clone the repository
git clone https://github.com/fecolinhares/BPMfinder.git
cd BPMfinder

# 2. Start a local dev server
python3 -m http.server 8888

# 3. Open in browser
open http://localhost:8888

# 4. Edit index.html, refresh to see changes
```

## Code Organization (inside index.html)

The single HTML file is organized in this order:

1. **`<head>`**
   - Meta tags (SEO, OG, Twitter, WebMCP)
   - JSON-LD structured data (WebApplication schema)
   - Google Fonts (Inter + JetBrains Mono) with preconnect
   - CDN links (essentia.js WASM, async)
   - **All CSS** (~400 lines) — Design tokens, components, responsive

2. **`<body>`**
   - Header with logo and theme toggle
   - `<main>` with hero, badges, tabs, panels, result, error
   - Footer with GitHub link
   - Tempo reference dialog

3. **`<script>` blocks**
   - Service Worker registration
   - App logic: TEMPO_RANGES, theme, IntersectionObserver
   - File handling: handleFile, detectBPM, runEssentia
   - YouTube: extractYoutubeId, fetchYoutubeAudio, Piped API
   - Capture: startCaptureSession, mic + tab event handlers
   - Mode switching, UI reset functions

## CSS Conventions

- **Design tokens** in `:root` and `[data-theme="dark"]` / `[data-theme="light"]`
- **OKLCH color space** for all colors (consistent luminance)
- **Rhythmcore naming**: `--space-{N}`, `--text-{size}`, `--radius-{component}`
- **Comments** mark sections: `/* --- Component Name --- */`
- **No CSS classes from frameworks** — all custom

## JavaScript Conventions

- **Vanilla JS** — no frameworks, no jQuery, no TypeScript
- **Async/await** for all async operations (essentia loading, capture, API calls)
- **DOM refs** collected at the top of the script section
- **Shared pipeline** — `runEssentia()` is called by all 4 input modes
- **Error handling** — try/catch with user-facing error messages

## Making Changes

### Adding a new audio format
Edit the `validTypes` and `validExt` arrays in `handleFile()`.

### Customizing the Piped API instances
Edit the `PIPED_INSTANCES` array.

### Changing capture duration
Edit the `CAPTURE_DURATION` constant (default: 10000ms).

### Adding a new input mode
1. Add a new tab button in `.input-tabs`
2. Create a new panel `<div>` with matching `id`
3. Register the panel in the `MODES` object
4. Add `webmcp-tool` attributes for AI agent support
5. Wire up the event handler to feed into `runEssentia()`

## Testing

See [TESTING.md](TESTING.md) for the complete testing guide.

## Design System

See [DESIGN.md](../DESIGN.md) for the Rhythmcore design contract.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages deployment.
