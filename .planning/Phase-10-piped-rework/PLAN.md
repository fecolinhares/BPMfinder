# Phase 10 — YouTube Integration: Piped API Rework

**Phase:** 10
**Goal:** Fix the broken YouTube URL feature. 4 Piped instances are dead, `audioStreams` is empty, YouTube bot blocking.
**Strategy:** Multi-layer fallback: Piped API → videoStreams → oEmbed metadata → Tab Capture guide.

## Implementation Plan

### Task 1: Update PIPED_INSTANCES
- Replace 4 dead instances with `api.piped.private.coffee` (CORS ✅, working)
- Add 2 fallbacks with CORS: `pipedapi.adminforge.de` (redirects), search for more
- **File:** `index.html` ~line 1664

### Task 2: Fix `fetchYoutubeAudio()` — audio stream extraction
- When `audioStreams` is empty, fall back to `videoStreams`
- Find non-videoOnly streams (itag 18 = 360p MP4 w/ audio)
- Prefer lowest resolution for smaller downloads
- Downmix to mono before essentia.js
- **File:** `index.html` ~line 1928

### Task 3: Handle YouTube `LOGIN_REQUIRED` blocking
- Parse Piped API error response (500 with `SignInConfirmNotBotException`)
- Show human-readable error message
- Trigger prominent Tab Capture guide
- **File:** `index.html` ~line 1928

### Task 4: YouTube oEmbed metadata fallback
- When Piped fails entirely, use `https://www.youtube.com/oembed?url=...&format=json`
- oEmbed is CORS-friendly, no API key, returns title + thumbnail + author
- Show video info even when audio extraction fails
- **File:** `index.html` ~line 1928

### Task 5: UX improvements
- Step-by-step loading: "Fetching metadata… → Finding audio stream… → Downloading… → Analyzing BPM…"
- Larger, more visual Tab Capture fallback panel (not just a hidden link)
- "Try another YouTube link" button when extraction fails
- Mobile-responsive fallback UI
- **File:** `index.html` ~multiple locations

### Task 6: SW update
- Exclude new Piped instances from SW cache (network-only)

### Verification
- V-01: Working YouTube URL (Rick Astley) → BPM detected
- V-02: Blocked video → Tab Capture guide with thumbnail visible
- V-03: Invalid URL → clear error
- V-04: All 4 modes (File, YouTube, Capture/Mic, Capture/Tab) still work
- V-05: Lighthouse preserved

## Files Changed
- `index.html` — main changes
- `sw.js` — SW cache exclusion
