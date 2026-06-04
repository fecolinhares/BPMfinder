# Getting Started — BPMfinder

## Quick Start

BPMfinder is a fully client-side web app. No installation, no sign-up, no API keys.

**→ [Try it live](https://fecolinhares.github.io/BPMfinder/)**

### 1. Upload an Audio File

1. Open BPMfinder in your browser
2. The **File** tab is selected by default
3. Drag an audio file onto the drop zone, or click to browse
4. Analysis starts **automatically** — wait ~1-2 seconds
5. Your BPM result appears with an animated counter

### 2. Analyze a YouTube Video

1. Click the **YouTube** tab
2. Paste a YouTube link (supports `youtube.com/watch?v=`, `youtu.be/`, shorts, embed)
3. Click **Analyze**
4. The app fetches audio via Piped API, decodes it, and detects BPM

### 3. Capture from Microphone

1. Click the **Capture** tab
2. Click **Microphone**
3. Grant microphone permission when prompted
4. Wait 10 seconds while recording
5. BPM result appears automatically

### 4. Capture from Browser Tab

1. Click the **Capture** tab
2. Click **Tab Audio**
3. Select a browser tab that's playing audio
4. Wait 10 seconds while recording
5. BPM result appears automatically

## Local Development

```bash
# Serve the app locally (no build step needed)
python3 -m http.server 8888

# Or use any static file server
npx serve .
```

Open `http://localhost:8888` in your browser.

## What to Expect

- **BPM value** — Large amber number, animated from 0 to detected BPM
- **Tempo classification** — Shows genre-appropriate label (e.g., "Allegro", "Moderato")
- **Confidence indicator** — Color coded: green (≥70%), amber (≥50%), red (<50%)
- **Source indicator** — Shows which input mode produced the result
- **ⓘ button** — Click to open the full tempo reference table

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Web Audio API | ✅ | ✅ | ✅ | ✅ |
| File Upload | ✅ | ✅ | ✅ | ✅ |
| YouTube (Piped) | ✅ | ✅ | ✅ | ✅ |
| Mic Capture | ✅ | ✅ | ✅ | ✅ |
| Tab Capture | 74+ | 76+ | 17+ | 17+ |

**Note:** Microphone and Tab Capture require a **secure context** (HTTPS or localhost).
