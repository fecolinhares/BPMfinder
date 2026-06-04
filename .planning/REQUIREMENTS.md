# Requirements — v3 YouTube Support

## YT-01: Three input modes
- [ ] **YT-01**: User can choose between 3 modes: File Upload, YouTube URL, or Tab Capture
- [ ] **YT-02**: Input tabs/modes are visually clear and mutually exclusive
- [ ] **YT-03**: Existing file upload flow is 100% preserved (drop zone, auto-analyze, all validation)

## YT-02: YouTube URL input
- [ ] **YT-01**: URL input field accepts YouTube links (youtube.com, youtu.be, m.youtube.com)
- [ ] **YT-02**: Video ID extraction from any YouTube URL format
- [ ] **YT-03**: "Analyze" button triggers YouTube flow
- [ ] **YT-04**: Loading state shows video title + thumbnail while processing

## YT-03: Piped API integration
- [ ] **YT-01**: Fetch video metadata from `https://pipedapi.kavin.rocks/streams/{videoId}`
- [ ] **YT-02**: Extract audio stream URL from Piped response
- [ ] **YT-03**: Download audio via Piped proxy endpoint (CORS-friendly)
- [ ] **YT-04**: Handle Piped API errors gracefully (timeout, 4xx, 5xx, empty response)
- [ ] **YT-05**: Graceful fallback: if Piped fails, show "Try Tab Capture instead" message
- [ ] **YT-06**: Configurable Piped instance (user can change if default is down)

## YT-04: Tab audio capture
- [ ] **YT-01**: "Capture from YouTube Tab" button using `navigator.mediaDevices.getDisplayMedia({ audio: true, video: false })`
- [ ] **YT-02**: User-friendly prompt explaining what to select (which browser tab)
- [ ] **YT-03**: Progress indicator showing capture duration (e.g., "Capturing: 3/10 seconds")
- [ ] **YT-04**: Default capture duration of ~10 seconds (enough for accurate BPM)
- [ ] **YT-05**: MediaRecorder captures audio stream as blob
- [ ] **YT-06**: Convert blob to ArrayBuffer → AudioContext.decodeAudioData → essentia.js
- [ ] **YT-07**: Handle errors: permission denied, no audio track, unsupported browser
- [ ] **YT-08**: Detect `getDisplayMedia` support — show graceful message if unavailable

## YT-05: Audio processing pipeline
- [ ] **YT-01**: Both YouTube and Tab Capture flows feed into same essentia.js analysis
- [ ] **YT-02**: Same BPM display, confidence, and tempo classification as file upload
- [ ] **YT-03**: Downmix captured/streamed audio to mono if needed for essentia.js
- [ ] **YT-04**: Handle variable sample rates (YouTube audio may be 48kHz)

## YT-06: UI & UX
- [ ] **YT-01**: Input mode selector styled as tabs or cards (Rhythmcore design consistent)
- [ ] **YT-02**: URL input styled as Rhythmcore card with paste-friendly UX
- [ ] **YT-03**: Capture button styled as primary action with icon
- [ ] **YT-04**: All new UI respects dark/light theme
- [ ] **YT-05**: Mobile responsive: modes stack vertically on small screens
- [ ] **YT-06**: Keyboard accessible: tab navigation, Enter to analyze/capture
- [ ] **YT-07**: Reduced-motion: no new animations without `prefers-reduced-motion` check

## YT-07: Error handling
- [ ] **YT-01**: Invalid YouTube URL → clear error message
- [ ] **YT-02**: Piped API rate limit / down → fallback suggestion
- [ ] **YT-03**: Tab capture permission denied → human-readable explanation
- [ ] **YT-04**: getDisplayMedia unsupported → message with supported browsers
- [ ] **YT-05**: Audio decode failure → meaningful error (not cryptic)

## YT-08: Service Worker & Offline
- [ ] **YT-01**: SW does not cache Piped API responses or audio streams
- [ ] **YT-02**: YouTube/Tab features gracefully show "offline" message when offline
- [ ] **YT-03**: File upload still works offline (existing behavior preserved)

## YT-09: Privacy
- [ ] **YT-01**: All YouTube processing stays client-side (no proxy through our server)
- [ ] **YT-02**: Tab capture never leaves the browser — entire pipeline is local
- [ ] **YT-03**: No YouTube API keys exposed (Piped API is public, no key needed)
- [ ] **YT-04**: No analytics on YouTube queries (same privacy stance as file upload)

---
*Created: 2026-06-04 — v3 YouTube Support Milestone*
