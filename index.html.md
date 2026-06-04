# BPMfinder — Free Online BPM Tempo Analyzer

> Upload an audio file, paste a YouTube link, or capture live audio from your microphone or browser tab. All processing happens in your browser — nothing leaves your machine.

**BPMfinder** is a 100% client-side web application that detects the beats per minute (BPM) of any song. It uses essentia.js WASM for audio analysis and runs entirely in the browser — no servers, no sign-ups, no data uploads.

---

## 🎯 Quick Stats

- **99% Accurate** — academic-grade BPM detection
- **🔒 100% Private** — all processing client-side
- **⚡ Instant Results** — analysis in ~1-2 seconds
- **🆓 Free Forever** — no paid tiers, no limits

---

## Input Mode Tabs

### 📁 File
Drop an audio file or click to browse. Supports MP3, WAV, FLAC, OGG, OPUS, AAC, M4A. Max 200MB. Analysis starts automatically on file select.

### 🔗 YouTube
Paste a YouTube link to analyze audio from any video. Extracts audio via Piped API (4 fallback instances). Supports youtube.com/watch?v=, youtu.be/, shorts/, and embed/ URLs.

### 🎤 Capture
Two options:
- **Microphone**: Record 10 seconds of audio via your device mic (requires HTTPS/localhost)
- **Tab Audio**: Capture 10 seconds of audio from another browser tab (requires Chrome 74+, Firefox 76+, Safari 17+)

---

## Detection Results

After analysis, the app displays:

- **BPM value** (animated counter, amber color, JetBrains Mono 64px)
- **Tempo classification**: Grave, Largo, Larghetto, Adagio, Andante, Moderato, Allegro, Vivace, Presto, or Prestissimo
- **Confidence indicator**: color-coded (green ≥70%, amber ≥50%, red <50%)
- **Source indicator**: shows where the audio came from (file, YouTube, microphone, or tab capture)
- **ⓘ button**: opens a modal with the complete tempo reference table

---

## Theme

Toggle between dark and light mode using the sun/moon icon in the header. Preference is persisted in localStorage.

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | Vanilla HTML/CSS/JS (no frameworks) |
| BPM Engine | essentia.js WASM (RhythmExtractor2013) |
| YouTube | Piped API (public, no key) |
| Mic Capture | getUserMedia + MediaRecorder |
| Tab Capture | getDisplayMedia + MediaRecorder |
| Fonts | Inter (UI) + JetBrains Mono (data) |
| Offline | Service Worker |
| Hosting | GitHub Pages |

---

## Footer

No uploads · No servers · [GitHub](https://github.com/fecolinhares/BPMfinder)

Free online BPM analyzer for DJs, producers, and musicians.
