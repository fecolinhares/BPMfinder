# ROADMAP: BPMfinder

## Phase 1 — Core Detection + Static Scaffold ✅

**Goal:** Working BPM detection with great UI.

**Delivered:**
- `index.html` with semantic structure and impeccable design language
- essentia.js WASM integration (RhythmExtractor2013)
- File input button + drag-and-drop zone
- BPM result display with confidence indicator
- Dark theme default (product register)
- Responsive layout
- Error handling for unsupported formats / decode failures

## Phase 2 — Polish + Deploy ✅

**Goal:** Production-ready static site.

**Delivered:**
- Dark/light theme with localStorage persistence
- Service Worker (offline WASM caching)
- GitHub Actions deploy workflow
- BPM range classification (Grave → Prestissimo)
- Meta tags, Open Graph, favicon
- Design audit against impeccable product register

## Debug Session — 6 Bugs Corrigidos ✅

**Bugs:**
1. CDN paths errados → arquivos inexistentes (404)
2. Upload panel inline style `display: none; display: flex`
3. CSS class mismatch (result-confidence → bpm-confidence)
4. EssentiaWASM MODULARIZE API (factory async)
5. resetUI() sobrescrevia handleFile()
6. uploadPanel.style.display inline vencia CSS class

## Phase 3 — Helper Modal: Tempo Reference ✅

**Goal:** Add a contextual helper icon next to the tempo classification that opens a modal with the complete tempo reference table.

**Delivered:**
- [x] Helper icon button (ⓘ) alongside the tempo label
- [x] Native `<dialog>` modal with full tempo range table
- [x] Each row shows: emoji, term, BPM range, description
- [x] Impeccable design: OKLCH colors, 4pt spacing, ease-out-expo motion
- [x] Accessible: focus trap (native dialog), Escape to close, keyboard nav, focus-visible rings
- [x] Click-outside-to-close, reduced-motion fallback
- [x] Data generated dynamically from TEMPO_RANGES array (DRY)
- [x] Table hidden initially (`bpm-tempo.empty`), shows only after detection

### Bugfix: Dialog centralização no mobile
Reset universal `margin: 0` anulava `margin: auto` nativo do `<dialog>`. UA `inset: 0` criava layout over-constrained. Fix: `.tempo-dialog:modal { top: 50%; left: 50%; transform: translate(-50%, -50%); }`.

## Enhancement: Modal header spacing ✅
- **Problem:** `--space-5` não existia nos tokens → padding inválido (0)
- **Fix:** `padding: var(--space-8) var(--space-6)` → 32px vertical, 24px horizontal
- **Commit:** `6aab88c`

## Enhancement: Modal header title centralizado ✅
- Título centralizado horizontalmente, botão de fechar com `position: absolute; right: var(--space-6)`

## Enhancement: Auto-Analyze on File Select ✅
- **Antes:** selecionar arquivo → botão "Analyze BPM" → clicar → analisar
- **Depois:** selecionar arquivo → análise começa automaticamente
- Botão "Analyze BPM" vira retry (aparece só em caso de erro)
- **Commit:** `5f532a2`

## Enhancement: Footer simplificado ✅
- Removida menção explícita ao essentia.js do footer
- "No uploads · No servers · Open source" com link para essentia.upf.edu

## License ✅
- **MIT** — copyright Feco Linhares, use com créditos
- **Commit:** `6eb38d6`

## SEO + Perf ✅
- robots.txt, sitemap.xml, canonical URL, JSON-LD schema
- preconnect + dns-prefetch CDN, async CDN scripts
- **Commit:** `353ae60`

---

## Phase 4 — Rhythmcore Visual Redesign ✅

**Goal:** Apply the Rhythmcore Interface design system (DESIGN.md) to transform the BPMfinder visual language — typography, palette, card layout, and motion.

**Delivered:**
- [x] Google Fonts: Inter (sans) + JetBrains Mono (mono) loaded
- [x] Color tokens: primary cyan #06B6D4 (oklch 0.65 0.14 195), accent amber #F97316, surface hierarchy
- [x] Typography: Inter for display/body, JetBrains Mono for labels/BPM
- [x] Display-lg type scale: 64px, weight 500, line-height 1.04
- [x] Card system: `.card` class with surface bg, subtle border, shadow-depth
- [x] Drop zone redesigned as surface card with primary-cyan glow on drag-over
- [x] Upload panel styled as card-padded surface
- [x] Result card: compact metric card with card-enter animation
- [x] Staggered entrance animation on result children (stagger-fade-in keyframes)
- [x] Hover lift (translateY(-2px)) on cards, buttons, and theme toggle
- [x] Smooth cubic-bezier(0.16, 1, 0.3, 1) transitions throughout
- [x] Drag-over: primary cyan glow + scale(1.02) + solid border
- [x] BPM display: JetBrains Mono, 64px, amber accent, tabular-nums
- [x] Confidence: JetBrains Mono, semantic colors (green/amber/red)
- [x] Labels: JetBrains Mono, uppercase, letter-spaced
- [x] Spinner: primary cyan top border
- [x] Error: surface card with error-colored border
- [x] Buttons: 8px radius, accent bg, hover lift
- [x] All cards use 8px radius (--radius-card)
- [x] Dialog: updated with Rhythmcore radii, borders, and table fonts
- [x] Dark mode: surface-based card hierarchy preserved
- [x] Light mode: Rhythmcore original tokens (bg white, surface mid, text dark)
- [x] Reduced-motion: overrides card-enter, stagger-fade-in, dialog-enter
- [x] Responsive mobile: BPM at 3rem, tighter padding, full-width cards
- [x] All existing JS intact: BPM detection, tempo modal, theme toggle, service worker

---

## Phase 5 — YouTube Link + Tab Capture ✅

**Goal:** Add YouTube link support and tab audio capture alongside existing file upload. Three input modes: audio file, YouTube URL, tab capture.

**Requirements:** See `.planning/REQUIREMENTS.md` (v3 YouTube Support)

### YouTube URL (Piped API)
- [x] Input tab selector: File | YouTube URL | Screen Capture
- [x] URL input field with YouTube link parsing
- [x] Piped API integration: fetch metadata + audio stream URL
- [x] Audio download via Piped proxy (CORS-friendly)
- [x] Error handling + fallback to tab capture

### Tab Audio Capture
- [x] getDisplayMedia({ audio: true }) integration
- [x] MediaRecorder pipeline: capture → blob → decode → analyze
- [x] 10-second capture with progress indicator
- [x] Browser support detection + graceful fallback

### Shared pipeline
- [x] Both flows feed into existing essentia.js analysis
- [x] BPM display, confidence, tempo classification preserved
- [x] Same visual result card for all 3 modes

### Service Worker & Offline
- [x] SW updated to NOT cache Piped/YouTube responses
- [x] Features gracefully degrade when offline (file upload still works)

---

## Phase 6 — Microphone Capture ✅

**Goal:** Add microphone audio capture as a second option in the Capture tab. User can choose between Tab Capture (existing) and Mic Capture (new).

**Requirements:** See `.planning/tasks/phase-06/REQUIREMENTS.md`

### Microphone Capture
- [x] `getUserMedia({ audio: true })` integration alongside existing tab capture
- [x] UI: two buttons in capture panel — "Capture from Microphone" + "Capture from Tab"
- [x] Shared startCaptureSession() pipeline (MediaRecorder → blob → decode → essentia)
- [x] Permission handling: denied → clear error message
- [x] Source indicator shows "from microphone"

### Edge cases
- [x] No mic connected → specific error
- [x] Mic permission blocked → guidance to enable in browser settings
- [x] Tab capture refactored to use same shared pipeline

---

## Phase 7 — SEO & Lighthouse Optimization ✅

**Goal:** Update all SEO metadata and structured data to reflect the full feature set (YouTube, Tab Capture, Mic Capture), optimize Lighthouse scores, and ensure the app ranks well for BPM-related searches.

| **Area** | **Current** | **Target** |
|----------|------------|------------|
| Meta description | Only mentions file upload | Covers all 4 input modes |
| JSON-LD featureList | 7 features, no YouTube/Capture/Mic | All 4 input modes listed |
| OG image | Generic SVG, no feature preview | Updated to reflect current features |
| sitemap.xml | Single URL, old lastmod | Updated lastmod + priority |
| Lighthouse Perf | Unknown | ≥ 90 all categories |
| Lighthouse SEO | Unknown | ≥ 95 |

**Delivered:** SEO 100%, A11y 96%, BP 100%, Performance 84%

---

## Phase 8 — Impeccable Design Audit & Polish ✅

**Goal:** Run the full Impeccable design skill suite (audit, critique, polish) on the current UI — especially the newer panels (YouTube, Tab Capture, Mic Capture) and the tab bar. After fixes, re-run Lighthouse and SEO checks to ensure nothing regressed.

| **Area** | **Status** |
|----------|-----------|
| `impeccable audit` — technical quality (a11y, perf, responsive) | ✅ Complete |
| Visual analysis via mimo-v2-omni | ✅ Complete |
| Hero text updated to mention all 4 input modes | ✅ Fixed |
| Theme toggle emoji → SVG icons | ✅ Fixed |
| Footer link renamed + aria-label | ✅ Fixed |
| Lighthouse re-check post-design | ✅ SEO 100%, A11y 96%, BP 100% |

---

## Phase 9 — AI Agent Optimization: llms.txt + WebMCP ✅

**Goal:** Make BPMfinder easily discoverable and usable by AI agents via llms.txt (LLM-friendly site overview) and WebMCP (Chrome's Declarative API for agent tool registration). Ensure agents can understand and interact with the 4 input modes programmatically.

| **Feature** | **Status** |
|-------------|-----------|
| `/llms.txt` — LLM-friendly markdown with site overview, input modes, usage guidance | ✅ |
| WebMCP Declarative API — annotate `<form>` elements with `webmcp-tool` attributes | ✅ |
| Link `/llms.txt` from `robots.txt` and `sitemap.xml` | ✅ |
| `index.html.md` — clean markdown version of the page for LLM consumption | ✅ |
| Lighthouse re-check (SEO, A11y, WebMCP/Agentic scores) | ✅ Scores preserved |
| Impeccable design review post-changes | ✅ No visual regressions |

---

## Phase 10 — YouTube Integration: Piped API Rework 🔄

**Goal:** Fix the broken YouTube URL feature. Currently all 4 Piped instances are dead or CORS-blocked, and the API response format changed (`audioStreams` is always empty). The user sees "All Piped API instances are currently unavailable."

### Diagnosis (2026-06-04)

| Check | Result | Detail |
|-------|--------|--------|
| CORS check | ✅ `api.piped.private.coffee` has `Access-Control-Allow-Origin: *` | Only working instance |
| API response | ✅ Returns 200 with metadata (title, thumbnail, uploader) | Works for some videos (cached ones) |
| audioStreams | ❌ Always empty `[]` | Piped/NewPipe extractor no longer returns audio-only streams |
| videoStreams | ✅ Contains streams (itag 18 = 360p MP4 w/ audio) | Can be used as fallback audio source |
| YouTube bot blocking | ⚠️ Most popular videos return `LOGIN_REQUIRED` | YouTube is blocking anonymous access on Piped's IP |
| | | |
| Old instances (4) | ❌ All broken | kavin.rocks (526), tiekoetter.com (timeout), private.coffee (timeout), r4fo.com (timeout) |
| Proxy CORS | ✅ `proxy.piped.private.coffee` has CORS | MP4 download via proxy works when extractor succeeds |

### Requirements

#### YT-10: Update Piped instances
- [ ] **YT-01**: Replace 4 dead instances with `https://api.piped.private.coffee` (primary, CORS ✅)
- [ ] **YT-02**: Add 2-3 fallback instances from current public Piped list
- [ ] **YT-03**: Each instance tested for CORS + API response before inclusion

#### YT-11: Fix audio stream extraction
- [ ] **YT-01**: When `audioStreams` is empty, fall back to `videoStreams`
- [ ] **YT-02**: Select non-videoOnly stream with audio (itag 18 = 360p MP4)
- [ ] **YT-03**: If multiple non-videoOnly streams, prefer lowest resolution (smallest download)
- [ ] **YT-04**: If no suitable stream found, show guidance error (not cryptic "unavailable")
- [ ] **YT-05**: `AudioContext.decodeAudioData` handles MP4 containers (tested ✅)

#### YT-12: Handle YouTube bot blocking
- [ ] **YT-01**: Detect `LOGIN_REQUIRED` / `SignInConfirmNotBotException` in API error
- [ ] **YT-02**: Show human-readable message: "YouTube is blocking this video from being extracted. Use Tab Capture instead."
- [ ] **YT-03**: Detailed step-by-step Tab Capture guide: (1) Open video in new tab, (2) Click "Capture from Tab", (3) Select the YouTube tab

#### YT-13: YouTube oEmbed metadata fallback
- [ ] **YT-01**: When Piped API fails, use YouTube oEmbed (`https://www.youtube.com/oembed?url=...&format=json`)
- [ ] **YT-02**: oEmbed supports CORS and requires no API key
- [ ] **YT-03**: Show video title + thumbnail even when audio extraction fails
- [ ] **YT-04**: Always show the Tab Capture guide as primary fallback

#### YT-14: UX improvements
- [ ] **YT-01**: Better loading states — show which step is happening (metadata → stream → download → decode → analyze)
- [ ] **YT-02**: Tab Capture fallback button more prominent (not hidden in `.youtube-fallback`)
- [ ] **YT-03**: Show video thumbnail + title even while loading
- [ ] **YT-04**: "Try another link" button when extraction fails
- [ ] **YT-05**: Mobile-responsive fallback UI

#### YT-15: Service Worker & Privacy
- [ ] **YT-01**: SW excludes new working Piped instance from cache (same pattern)
- [ ] **YT-02**: No analytics/leakage from Piped API calls
- [ ] **YT-03**: Tab Capture fallback preserves 100% privacy

### Verification
- [ ] **V-01**: YouTube URL with Rick Astley → BPM detected (best case)
- [ ] **V-02**: YouTube URL with blocked video → Tab Capture guide shown
- [ ] **V-03**: Invalid YouTube URL → clear error
- [ ] **V-04**: All 4 existing input modes still work after changes
- [ ] **V-05**: Lighthouse scores preserved (no regressions)
- [ ] **V-06**: Mobile responsive: new fallback UI stacks correctly
