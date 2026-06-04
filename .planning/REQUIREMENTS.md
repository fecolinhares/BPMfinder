# Requirements — v3 YouTube Support

## YT-01: Three input modes
- [x] **YT-01**: User can choose between 3 modes: File Upload, YouTube URL, or Tab Capture
- [x] **YT-02**: Input tabs/modes are visually clear and mutually exclusive
- [x] **YT-03**: Existing file upload flow is 100% preserved (drop zone, auto-analyze, all validation)

## YT-02: YouTube URL input
- [x] **YT-01**: URL input field accepts YouTube links (youtube.com, youtu.be, m.youtube.com)
- [x] **YT-02**: Video ID extraction from any YouTube URL format
- [x] **YT-03**: "Analyze" button triggers YouTube flow
- [x] **YT-04**: Loading state shows video title + thumbnail while processing

## YT-03: Piped API integration
- [x] **YT-01**: Fetch video metadata from `https://pipedapi.kavin.rocks/streams/{videoId}`
- [x] **YT-02**: Extract audio stream URL from Piped response
- [x] **YT-03**: Download audio via Piped proxy endpoint (CORS-friendly)
- [x] **YT-04**: Handle Piped API errors gracefully (timeout, 4xx, 5xx, empty response)
- [x] **YT-05**: Graceful fallback: if Piped fails, show "Try Tab Capture instead" message
- [x] **YT-06**: Configurable Piped instance (user can change if default is down)

## YT-04: Tab audio capture
- [x] **YT-01**: "Capture from YouTube Tab" button using `navigator.mediaDevices.getDisplayMedia({ audio: true, video: false })`
- [x] **YT-02**: User-friendly prompt explaining what to select (which browser tab)
- [x] **YT-03**: Progress indicator showing capture duration (e.g., "Capturing: 3/10 seconds")
- [x] **YT-04**: Default capture duration of ~10 seconds (enough for accurate BPM)
- [x] **YT-05**: MediaRecorder captures audio stream as blob
- [x] **YT-06**: Convert blob to ArrayBuffer → AudioContext.decodeAudioData → essentia.js
- [x] **YT-07**: Handle errors: permission denied, no audio track, unsupported browser
- [x] **YT-08**: Detect `getDisplayMedia` support — show graceful message if unavailable

## YT-05: Audio processing pipeline
- [x] **YT-01**: Both YouTube and Tab Capture flows feed into same essentia.js analysis
- [x] **YT-02**: Same BPM display, confidence, and tempo classification as file upload
- [x] **YT-03**: Downmix captured/streamed audio to mono if needed for essentia.js
- [x] **YT-04**: Handle variable sample rates (YouTube audio may be 48kHz)

## YT-06: UI & UX
- [x] **YT-01**: Input mode selector styled as tabs or cards (Rhythmcore design consistent)
- [x] **YT-02**: URL input styled as Rhythmcore card with paste-friendly UX
- [x] **YT-03**: Capture button styled as primary action with icon
- [x] **YT-04**: All new UI respects dark/light theme
- [x] **YT-05**: Mobile responsive: modes stack vertically on small screens
- [x] **YT-06**: Keyboard accessible: tab navigation, Enter to analyze/capture
- [x] **YT-07**: Reduced-motion: no new animations without `prefers-reduced-motion` check

## YT-07: Error handling
- [x] **YT-01**: Invalid YouTube URL → clear error message
- [x] **YT-02**: Piped API rate limit / down → fallback suggestion
- [x] **YT-03**: Tab capture permission denied → human-readable explanation
- [x] **YT-04**: getDisplayMedia unsupported → message with supported browsers
- [x] **YT-05**: Audio decode failure → meaningful error (not cryptic)

## YT-08: Service Worker & Offline
- [x] **YT-01**: SW does not cache Piped API responses or audio streams
- [x] **YT-02**: YouTube/Tab features gracefully show "offline" message when offline
- [x] **YT-03**: File upload still works offline (existing behavior preserved)

## YT-09: Privacy
- [x] **YT-01**: All YouTube processing stays client-side (no proxy through our server)
- [x] **YT-02**: Tab capture never leaves the browser — entire pipeline is local
- [x] **YT-03**: No YouTube API keys exposed (Piped API is public, no key needed)
- [x] **YT-04**: No analytics on YouTube queries (same privacy stance as file upload)

---
*Created: 2026-06-04 — v3 YouTube Support Milestone*
