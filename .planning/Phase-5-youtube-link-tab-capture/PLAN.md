# Phase 5 — YouTube Link + Tab Capture

**Milestone:** v3 — YouTube Support
**Goal:** Add YouTube link support and tab audio capture alongside existing file upload. Three input modes coexist: audio file, YouTube URL, tab capture.
**Mode:** Standard (horizontal layers: UI → Integration → Pipeline → Polish)

---

## Architectural Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Input Mode Selector (Tabs)             │
│  [📁 File Upload]  [🔗 YouTube URL]  [🖥️ Tab Capture]  │
└──────────┬──────────────────────┬──────────────────┬────┘
           │                      │                  │
     ┌─────▼──────┐        ┌─────▼──────┐    ┌──────▼──────┐
     │ File Drop   │        │ URL Input  │    │ Capture Btn │
     │ (existing)  │        │ + Parse    │    │ getDisplay  │
     │ auto-analyze│        │ Piped API  │    │ MediaRec    │
     └─────┬──────┘        │ → Download │    │ → Blob      │
           │               └─────┬──────┘    └──────┬──────┘
           │                     │                  │
           └──────────────┬──────┴──────────┬───────┘
                          ▼                 ▼
               ┌────────────────────┐
               │ ArrayBuffer →      │
               │ AudioContext.decode│
               │ → channelData      │
               └────────┬───────────┘
                        ▼
               ┌────────────────────┐
               │ essentia.js        │
               │ RhythmExtractor2013│
               │ → {bpm, confidence}│
               └────────┬───────────┘
                        ▼
               ┌────────────────────┐
               │ displayResult()    │
               │ (existing, shared) │
               └────────────────────┘
```

**Key design decisions:**
- **Tab bar** inserted between `.badges` and `.drop-zone` (line 942–944)
- **All 3 panels** are siblings inside `.app`, toggled by `.hidden` / `.visible` classes
- **Shared pipeline**: YouTube + Tab Capture both produce an `AudioBuffer`, fed into existing `detectBPM()` logic
- **File upload flow is 100% untouched** — no changes to handleFile(), startAnalysis(), or displayResult()
- **YouTrack/Piped instances are configurable** via a constant array with fallback list

---

## Task 1: Input Mode Selector (Tabs UI)

### 1.1 HTML — Tab Bar
Insert after `.badges` closing div (after line 942):

```html
<!-- Input Mode Tabs -->
<div class="input-tabs" id="inputTabs" role="tablist" aria-label="Input mode">
  <button class="input-tab active" role="tab" aria-selected="true" data-mode="file" id="tabFile" aria-controls="panelFile">
    <span class="input-tab-icon">📁</span>
    <span class="input-tab-label">File</span>
  </button>
  <button class="input-tab" role="tab" aria-selected="false" data-mode="youtube" id="tabYoutube" aria-controls="panelYoutube">
    <span class="input-tab-icon">🔗</span>
    <span class="input-tab-label">YouTube URL</span>
  </button>
  <button class="input-tab" role="tab" aria-selected="false" data-mode="capture" id="tabCapture" aria-controls="panelCapture">
    <span class="input-tab-icon">🖥️</span>
    <span class="input-tab-label">Screen Capture</span>
  </button>
</div>
```

### 1.2 HTML — YouTube Panel
Insert as a sibling of `.drop-zone`:

```html
<!-- YouTube URL Panel -->
<div id="panelYoutube" class="input-panel card card-padded visible" role="tabpanel" hidden>
  <div class="youtube-input-row">
    <input type="url" id="youtubeUrlInput" class="youtube-input" 
           placeholder="Paste YouTube link…" 
           aria-label="YouTube video URL">
    <button id="youtubeAnalyzeBtn" class="youtube-analyze-btn">
      <span>Analyze</span>
    </button>
  </div>
  <div class="youtube-hint">
    Supports <code>youtube.com/watch?v=</code>, <code>youtu.be/</code>, <code>m.youtube.com</code>
  </div>
  <!-- YouTube-specific loading -->
  <div id="youtubeLoading" class="youtube-loading hidden">
    <div class="youtube-thumb" id="youtubeThumb">
      <img id="youtubeThumbImg" alt="" crossorigin="anonymous">
    </div>
    <div class="youtube-meta">
      <span class="youtube-title" id="youtubeTitle">—</span>
      <span class="youtube-channel" id="youtubeChannel">—</span>
    </div>
    <div class="spinner"></div>
    <span class="youtube-status" id="youtubeStatus">Fetching audio stream…</span>
  </div>
  <div id="youtubeFallback" class="youtube-fallback hidden">
    <p>⚠️ YouTube API temporarily unavailable.</p>
    <button id="fallbackCaptureBtn" class="btn-accent">Try Tab Capture Instead</button>
  </div>
</div>
```

### 1.3 HTML — Tab Capture Panel
Insert as a sibling:

```html
<!-- Tab Capture Panel -->
<div id="panelCapture" class="input-panel card card-padded visible" role="tabpanel" hidden>
  <div id="captureReady">
    <p class="capture-desc">Select the tab with your audio source (YouTube, Spotify, etc.)</p>
    <button id="captureStartBtn" class="btn-primary capture-btn">
      <span>🖥️ Select Tab & Capture Audio</span>
    </button>
  </div>
  <div id="captureProgress" class="capture-progress hidden">
    <div class="capture-meter">
      <div class="capture-meter-fill" id="captureMeterFill"></div>
    </div>
    <span class="capture-countdown" id="captureCountdown">Capturing… 0/10s</span>
    <div class="spinner"></div>
  </div>
  <div id="captureError" class="capture-error hidden">
    <p class="capture-error-msg" id="captureErrorMsg">—</p>
    <button id="captureRetryBtn" class="btn-accent">Try Again</button>
  </div>
</div>
```

### 1.4 CSS — Tab System
Add to the `<style>` block:

```css
/* Input mode tabs */
.input-tabs {
  display: flex;
  gap: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-control);
  overflow: hidden;
  margin-bottom: var(--space-4);
}
.input-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-2);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-tertiary);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.input-tab:hover { background: var(--bg-surface-hover); color: var(--text-secondary); }
.input-tab.active { 
  background: var(--primary-dim); 
  color: var(--primary); 
  font-weight: 600; 
}
.input-tab-icon { font-size: 1.1rem; }

/* Input panels */
.input-panel { display: none; }
.input-panel.visible { display: block; }

/* YouTube input */
.youtube-input-row { display: flex; gap: var(--space-3); }
.youtube-input {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-control);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}
.youtube-input:focus { outline: 2px solid var(--primary); outline-offset: -1px; }
.youtube-analyze-btn { /* reuse .btn-primary styles */ }
.youtube-hint { margin-top: var(--space-2); font-size: var(--text-xs); color: var(--text-tertiary); }
.youtube-loading { margin-top: var(--space-3); display: flex; align-items: center; gap: var(--space-3); }
.youtube-thumb img { width: 80px; height: 45px; border-radius: 4px; object-fit: cover; }
.youtube-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.youtube-title { font-family: var(--font-sans); font-weight: 500; font-size: var(--text-sm); }
.youtube-channel { font-size: var(--text-xs); color: var(--text-tertiary); }
.youtube-status { font-size: var(--text-xs); color: var(--text-secondary); }
.youtube-fallback { margin-top: var(--space-3); padding: var(--space-3); background: var(--warning-dim); border-radius: var(--radius-card); text-align: center; }
.youtube-fallback .btn-accent { margin-top: var(--space-2); }

/* Tab Capture */
.capture-desc { margin-bottom: var(--space-3); font-size: var(--text-sm); color: var(--text-secondary); text-align: center; }
.capture-btn { display: flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; }
.capture-progress { text-align: center; padding: var(--space-6); }
.capture-meter { width: 100%; height: 6px; background: var(--bg-surface); border-radius: 3px; overflow: hidden; margin-bottom: var(--space-2); }
.capture-meter-fill { height: 100%; background: var(--primary); width: 0%; transition: width 100ms linear; border-radius: 3px; }
.capture-countdown { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-secondary); }
.capture-error { text-align: center; padding: var(--space-4); }
.capture-error-msg { color: var(--error); margin-bottom: var(--space-2); }
```

Also add `--primary-dim` and `--warning-dim` tokens to the root:

```css
--primary-dim: oklch(0.65 0.14 195 / 0.12);
--warning-dim: oklch(0.80 0.12 75 / 0.12);
```

### 1.5 JS — Tab Switching
New function and event listeners added at end of existing script:

```javascript
// --- Input Mode Tabs ---
const MODES = {
  file: { panel: document.getElementById('panelFile') },
  youtube: { panel: document.getElementById('panelYoutube') },
  capture: { panel: document.getElementById('panelCapture') }
};

let currentMode = 'file';

function switchMode(mode) {
  if (mode === currentMode) return;
  
  // Reset current mode's state
  if (currentMode === 'file') resetFileMode();
  if (currentMode === 'youtube') resetYoutubeMode();
  if (currentMode === 'capture') resetCaptureMode();
  
  // Update tabs
  document.querySelectorAll('.input-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
    tab.setAttribute('aria-selected', tab.dataset.mode === mode);
  });
  
  // Update panels
  Object.keys(MODES).forEach(key => {
    MODES[key].panel.classList.toggle('visible', key === mode);
    MODES[key].panel.hidden = key !== mode;
  });
  
  currentMode = mode;
}

document.querySelectorAll('.input-tab').forEach(tab => {
  tab.addEventListener('click', () => switchMode(tab.dataset.mode));
});
```

---

## Task 2: YouTube URL + Piped API Client

### 2.1 YouTube URL Parsing

```javascript
function extractYoutubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
```

### 2.2 Piped Instance Discovery

```javascript
// Configurable instances — first one that works is used
const PIPED_INSTANCES = [
  'https://pipedapi.kavin.rocks',   // official (currently 526)
  'https://pipedapi.tiekoetter.com',
  'https://pipedapi.private.coffee',
  'https://pipedapi.r4fo.com',
  'https://pipedapi.shaun.today',
];
// Future: could fetch from GitHub wiki for auto-discovery
```

### 2.3 Piped API Client

```javascript
async function fetchYoutubeAudio(videoId, signal) {
  // Try each instance until one works
  for (const instance of PIPED_INSTANCES) {
    try {
      const streamRes = await fetchWithTimeout(`${instance}/streams/${videoId}`, { signal });
      if (!streamRes.ok) continue;
      
      const data = await streamRes.json();
      const audioStreams = data.audioStreams || [];
      if (audioStreams.length === 0) continue;
      
      // Pick the best audio stream (highest bitrate)
      const best = audioStreams.reduce((a, b) => (a.bitrate || 0) > (b.bitrate || 0) ? a : b);
      
      // Download audio from Piped Proxy (CORS-friendly URL)
      const audioRes = await fetchWithTimeout(best.url, { signal });
      if (!audioRes.ok) continue;
      
      const arrayBuffer = await audioRes.arrayBuffer();
      return { 
        arrayBuffer,
        title: data.title || 'Unknown',
        thumbnail: data.thumbnailUrl || null,
        uploader: data.uploader || 'Unknown'
      };
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      continue; // try next instance
    }
  }
  throw new Error('All Piped instances failed. Try Tab Capture instead.');
}

function fetchWithTimeout(url, opts = {}) {
  const timeout = opts.timeout || 15000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...opts, signal: opts.signal || controller.signal })
    .finally(() => clearTimeout(id));
}
```

### 2.4 YouTube Analyze Handler

```javascript
youtubeAnalyzeBtn.addEventListener('click', async () => {
  const url = youtubeUrlInput.value.trim();
  if (!url) { showYoutubeError('Please paste a YouTube link.'); return; }
  
  const videoId = extractYoutubeId(url);
  if (!videoId) { showYoutubeError('Invalid YouTube URL. Try a different link.'); return; }
  
  hideYoutubeError();
  youtubeUrlInput.disabled = true;
  youtubeAnalyzeBtn.disabled = true;
  youtubeAnalyzeBtn.querySelector('span').textContent = 'Fetching…';
  youtubeLoading.classList.remove('hidden');
  
  try {
    const { arrayBuffer, title, thumbnail } = await fetchYoutubeAudio(videoId);
    
    // Show metadata
    youtubeTitle.textContent = title;
    if (thumbnail) youtubeThumbImg.src = thumbnail;
    
    youtubeStatus.textContent = 'Downloaded! Analyzing BPM…';
    
    // Feed into shared pipeline
    const audioCtx = audioContext || new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    
    const bpm = await runEssentia(channelData);
    displayResult(bpm);
    
    // Reset YouTube panel (hidden behind result)
    resetYoutubeMode();
    
  } catch (err) {
    youtubeLoading.classList.add('hidden');
    if (err.name === 'AbortError') {
      showYoutubeError('Request timed out. Try Tab Capture instead.');
    } else {
      showYoutubeError(err.message);
    }
    youtubeFallback.classList.remove('hidden');
    youtubeUrlInput.disabled = false;
    youtubeAnalyzeBtn.disabled = false;
    youtubeAnalyzeBtn.querySelector('span').textContent = 'Analyze';
  }
});
```

### 2.5 Shared essentia.js Pipeline

Extract the essentia logic from `detectBPM()` into a reusable function:

```javascript
async function runEssentia(channelData) {
  const EssentiaConstructor = globalThis.Essentia;
  const wasmFactory = globalThis.EssentiaWASM;
  if (!EssentiaConstructor || !wasmFactory) {
    throw new Error('essentia.js failed to load. Check your internet connection.');
  }
  
  const wasmModule = await wasmFactory();
  const essentia = new EssentiaConstructor(wasmModule);
  
  try {
    const audioVector = essentia.arrayToVector(channelData);
    const rhythm = essentia.RhythmExtractor2013(audioVector);
    
    const detectedBPM = Math.round(rhythm.bpm);
    const confidence = rhythm.confidence;
    
    if (!detectedBPM || detectedBPM < 20 || detectedBPM > 300) {
      throw new Error(`Unusual BPM value (${detectedBPM}). The source might be ambient or speech.`);
    }
    
    return { bpm: detectedBPM, confidence };
  } finally {
    essentia.delete();
  }
}
```

Then refactor `detectBPM()` to use it:

```javascript
async function detectBPM(file) {
  const arrayBuffer = await file.arrayBuffer();
  if (!audioContext) audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const channelData = audioBuffer.getChannelData(0);
  return runEssentia(channelData);
}
```

---

## Task 3: Tab Capture (getDisplayMedia + MediaRecorder)

### 3.1 Browser Support Detection

```javascript
function isCaptureSupported() {
  return !!navigator.mediaDevices?.getDisplayMedia;
}
```

On page load: if not supported, disable the Tab Capture tab and show a tooltip.

### 3.2 Capture Handler

```javascript
const CAPTURE_DURATION = 10000; // 10 seconds

captureStartBtn.addEventListener('click', async () => {
  try {
    // 1. Request screen/tab capture with audio
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { width: 1, height: 1 },  // dummy video track (mandatory)
      audio: true
    });
    
    // 2. Check audio track exists
    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) {
      stream.getTracks().forEach(t => t.stop());
      showCaptureError('Audio sharing was not enabled. Please check "Share audio" in the dialog and try again.');
      return;
    }
    
    // 3. Stop the dummy video track
    stream.getVideoTracks().forEach(t => t.stop());
    const audioStream = new MediaStream([audioTrack]);
    
    // 4. Show progress UI
    captureReady.classList.add('hidden');
    captureProgress.classList.remove('hidden');
    
    // 5. Record audio
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus' : 'audio/webm';
    
    const recorder = new MediaRecorder(audioStream, { mimeType });
    const chunks = [];
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    
    const blob = await new Promise((resolve, reject) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
      recorder.onerror = (e) => reject(e.error);
      
      recorder.start(100); // timeslice for progress updates
      
      // Progress animation
      const startTime = Date.now();
      const meter = document.getElementById('captureMeterFill');
      const countdown = document.getElementById('captureCountdown');
      
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / CAPTURE_DURATION) * 100, 100);
        const secs = Math.floor(elapsed / 1000);
        meter.style.width = pct + '%';
        countdown.textContent = `Capturing… ${secs}/${CAPTURE_DURATION/1000}s`;
        
        if (elapsed >= CAPTURE_DURATION) {
          clearInterval(progressInterval);
          recorder.stop();
        }
      }, 200);
    });
    
    // 6. Cleanup
    audioTrack.stop();
    captureProgress.classList.add('hidden');
    
    // 7. Decode and analyze
    const audioCtx = audioContext || new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(await blob.arrayBuffer());
    
    // 8. Convert to mono
    const channelData = audioBuffer.numberOfChannels > 1
      ? stereoToMono(audioBuffer)
      : audioBuffer.getChannelData(0);
    
    const bpm = await runEssentia(channelData);
    displayResult(bpm);
    
    // 9. Reset capture UI
    captureReady.classList.remove('hidden');
    
  } catch (err) {
    captureProgress.classList.add('hidden');
    
    if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
      showCaptureError('Capture cancelled by user.');
    } else if (err.name === 'NotFoundError') {
      showCaptureError('No audio source found. Make sure the tab is playing audio.');
    } else {
      showCaptureError(err.message || 'Failed to capture audio.');
    }
  }
});

function stereoToMono(buffer) {
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);
  const mono = new Float32Array(left.length);
  for (let i = 0; i < left.length; i++) mono[i] = (left[i] + right[i]) / 2;
  return mono;
}
```

---

## Task 4: Shared Pipeline + Result Display

### 4.1 Result Source Indicator
Add a small label showing which mode was used:

```html
<span class="result-source" id="resultSource"></span>
```

```javascript
// In displayResult():
const modeLabels = { file: 'from file', youtube: 'from YouTube', capture: 'from tab capture' };
document.getElementById('resultSource').textContent = modeLabels[currentMode] || '';
```

### 4.2 Mode Reset Functions

```javascript
function resetFileMode() {
  currentFile = null;
  fileInput.value = '';
  dropZone.classList.remove('hidden');
  uploadPanel.classList.remove('visible');
  resetUI();
}

function resetYoutubeMode() {
  youtubeUrlInput.disabled = false;
  youtubeAnalyzeBtn.disabled = false;
  youtubeAnalyzeBtn.querySelector('span').textContent = 'Analyze';
  youtubeLoading.classList.add('hidden');
  youtubeFallback.classList.add('hidden');
  youtubeStatus.textContent = 'Fetching audio stream…';
}

function resetCaptureMode() {
  captureReady.classList.remove('hidden');
  captureProgress.classList.add('hidden');
  captureError.classList.add('hidden');
  captureMeterFill.style.width = '0%';
}
```

### 4.3 Error Helpers

```javascript
function showYoutubeError(msg) { 
  youtubeError.textContent = msg; 
  youtubeError.classList.remove('hidden'); 
}
function hideYoutubeError() { 
  youtubeError.classList.add('hidden'); 
}
function showCaptureError(msg) { 
  captureErrorMsg.textContent = msg; 
  captureError.classList.remove('hidden'); 
}
```

---

## Task 5: Service Worker & Edge Cases

### 5.1 SW Update — lines 23-35

```javascript
// For API/proxy requests, network only — never cache
if (request.url.includes('pipedapi') || request.url.includes('pipedproxy') || request.url.includes('googlevideo')) {
  event.respondWith(fetch(request).catch(() => new Response('Offline', { status: 503 })));
  return;
}
```

### 5.2 Piped API Frequency Cap
- Rate limit: max 1 request per 3 seconds per instance
- Queue sequential requests if user analyzes multiple videos rapidly
- Show "Please wait…" if too fast

### 5.3 Tab Capture Browser Detection

On page load:
```javascript
if (!isCaptureSupported()) {
  tabCaptureBtn.title = 'Not supported in this browser. Try Chrome, Firefox, or Safari.';
  tabCaptureBtn.classList.add('disabled');
}
```

Edge cases:
- User switches tabs during capture → capture continues from the selected tab's audio
- User closes the YouTube tab mid-capture → stream ends → `onerror` fires
- User clicks another tab while recording → switchMode() should abort current capture
- Very short audio (< 2s) → show error: "Not enough audio data. Try a longer capture."

---

## Task 6: Verification & Testing

### UAT Checklist
- [ ] File upload still works exactly as before (regression)
- [ ] Switching between 3 modes hides/shows correct panels
- [ ] Tab bar is responsive on mobile (tabs stack or wrap)
- [ ] YouTube URL parsing handles: `watch?v=`, `youtu.be/`, `shorts/`, `m.youtube.com`, with/without `&` params
- [ ] Invalid YouTube URL shows clear error
- [ ] Empty URL shows validation message
- [ ] Piped API timeout shows fallback suggestion with "Try Tab Capture" button
- [ ] "Try Tab Capture" fallback button switches to tab capture mode
- [ ] Tab Capture button triggers browser permission dialog
- [ ] Canceling the dialog shows user-friendly message
- [ ] Selecting a tab without audio shows guidance message
- [ ] Capture progress bar animates smoothly over 10 seconds
- [ ] After capture, BPM displays correctly with source indicator
- [ ] Mode resets work: analyzing again clears previous result
- [ ] Dark/light theme: all new elements render correctly in both
- [ ] Mobile: tabs and inputs are usable on <480px
- [ ] Service Worker: file upload works offline; YouTube/Tab show "online required"
- [ ] Keyboard: tab navigation through all controls, Enter triggers actions
- [ ] Reduced-motion: no disruptive animations

### Files Modified
1. `index.html` — main HTML, CSS, and JS (single file approach preserved)

### Files NOT Modified
- `sw.js` — only if SW update is needed for Piped exclusion
- `DESIGN.md` — no visual contract changes
- Any `.planning/` files — only milestone/phase planning

---

## Implementation Order

1. **Tab bar + panel HTML** (insert 3 new sections)
2. **Tab switching CSS + JS** (mode switching logic)
3. **YouTube URL parsing + Piped API client** (extract ID, fetch, download)
4. **Tab capture with getDisplayMedia** (capture, record, decode)
5. **Shared essentia.js pipeline** (extract runEssentia, refactor detectBPM)
6. **Error handling + fallback** (all edge cases)
7. **Service Worker update** (Piped exclusion)
8. **Final polish** (dark/light, responsive, keyboard, reduced-motion)

---

## Dependencies

- **Piped API**: No key required. Public instances may go down — handled via fallback list + tab capture mode.
- **getDisplayMedia**: Browser-native. No dependencies.
- **essentia.js**: Already loaded via CDN (unchanged).
- **External requests**: Piped API + proxy calls from browser (CORS ✅).

---

*Plan created: 2026-06-04*
