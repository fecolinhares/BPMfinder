# Testing — BPMfinder

## Testing Philosophy

BPMfinder is a static client-side application with no build step, no tests runner, and no CI test pipeline. Testing is done **manually** in the browser, covering functional, visual, responsive, and accessibility aspects.

## Manual Test Checklist

### File Upload

- [ ] **Drag-and-drop**: Drag an MP3 file onto the drop zone → auto-analysis starts
- [ ] **Click to browse**: Click the drop zone → file picker opens → select audio file
- [ ] **Auto-analyze**: BPM result appears automatically after file selection
- [ ] **Multiple formats**: Test MP3, WAV, FLAC, OGG, OPUS, AAC files
- [ ] **Unsupported format**: Try a `.txt` file → error message displayed
- [ ] **File too large**: Try a file > 200MB → error message displayed
- [ ] **Clear file**: Click the ✕ button → resets to drop zone
- [ ] **Error recovery**: Trigger an error → retry button appears → click to retry

### YouTube URL

- [ ] **Full URL**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → analyzes correctly
- [ ] **Short URL**: `https://youtu.be/dQw4w9WgXcQ` → works
- [ ] **Shorts URL**: `https://www.youtube.com/shorts/abc123` → works
- [ ] **Invalid URL**: Paste random text → "Invalid YouTube URL" error
- [ ] **Empty URL**: Click Analyze with empty field → "Please paste a YouTube link"
- [ ] **Loading state**: Shows thumbnail, title, channel, spinner during fetch
- [ ] **Fallback**: If Piped API fails → shows "Try Tab Capture Instead" button
- [ ] **Enter key**: Press Enter in URL field → triggers analysis

### Microphone Capture

- [ ] **Permission prompt**: Click Microphone → browser asks for mic permission
- [ ] **Recording**: Shows progress bar and countdown (0/10s → 10/10s)
- [ ] **Result**: BPM displays after 10 seconds
- [ ] **Permission denied**: Block mic → shows "Microphone access denied" error
- [ ] **No mic**: Test on device without mic → "No microphone found" error
- [ ] **Retry**: After error, click "Try Again" → resets to ready state

### Tab Capture

- [ ] **Permission prompt**: Click Tab Audio → browser shows tab picker
- [ ] **Recording**: Shows progress bar and countdown
- [ ] **Result**: BPM displays after 10 seconds from tab with audio
- [ ] **Cancel**: Close tab picker → "Tab capture cancelled" error
- [ ] **Try Again**: After error → resets to ready state

### BPM Result Display

- [ ] **Animated counter**: Number counts up smoothly from 0 to detected BPM
- [ ] **Tempo classification**: Shows correct label (Allegro, Moderato, etc.)
- [ ] **Confidence indicator**: Green (≥70%), amber (≥50%), red (<50%)
- [ ] **Source indicator**: Shows "from file", "from YouTube", "from microphone", "from tab capture"
- [ ] **ⓘ button**: Opens tempo reference dialog
- [ ] **Analyze another**: Click button → resets to current mode's initial state

### Theme

- [ ] **Toggle**: Click sun/moon icon → toggles between dark and light
- [ ] **Persistence**: Refresh page → theme persists
- [ ] **All panels**: Both themes render correctly for File, YouTube, Capture panels
- [ ] **Result card**: Result displays correctly in both themes

### Responsive

- [ ] **Desktop (480px+)**: Full layout with horizontal tab bar and side-by-side capture options
- [ ] **Mobile (<480px)**: Tighter padding, tabs adapt (smaller icons), capture options stack vertically
- [ ] **Touch targets**: All buttons and interactive elements ≥ 44x44px on mobile

### Accessibility

- [ ] **Keyboard navigation**: Tab through all interactive elements
- [ ] **Focus indicators**: Visible focus rings on all interactive elements
- [ ] **Screen reader**: All inputs have labels, ARIA roles correct
- [ ] **Reduced motion**: Enable `prefers-reduced-motion` → animations disabled

### Service Worker

- [ ] **First load**: SW registers, caches essentia.js and static assets
- [ ] **Offline**: Go offline → file upload still works
- [ ] **YouTube offline**: Piped API → shows network error (expected)

## Lighthouse Audits

Run Lighthouse periodically to verify scores:

```bash
# Requires Chrome/Chromium
npx lighthouse http://localhost:8888 --output=html --output-path=./lighthouse-report.html
```

**Current scores:** SEO 100%, Accessibility 100%, Best Practices 100%, Agentic Browsing 100%

## Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| File upload BPM | ✅ | ✅ | ✅ | ✅ |
| YouTube audio | ✅ | ✅ | ✅ | ✅ |
| Mic capture | ✅ | ✅ | ✅ | ✅ |
| Tab capture | ✅ 74+ | ✅ 76+ | ✅ 17+ | ✅ 17+ |
| Offline (SW) | ✅ | ⚠️ Private mode | ✅ | ✅ |
