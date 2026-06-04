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

## Milestone v3 — YouTube Support (Current)

## Phase 5 — YouTube Link + Tab Capture

**Goal:** Add YouTube link support and tab audio capture alongside existing file upload. Three input modes: audio file, YouTube URL, tab capture.

**Requirements:** See `.planning/REQUIREMENTS.md` (v3 YouTube Support)

### YouTube URL (Piped API)
- [ ] Input tab selector: File | YouTube URL | Screen Capture
- [ ] URL input field with YouTube link parsing
- [ ] Piped API integration: fetch metadata + audio stream URL
- [ ] Audio download via Piped proxy (CORS-friendly)
- [ ] Error handling + fallback to tab capture

### Tab Audio Capture
- [ ] getDisplayMedia({ audio: true }) integration
- [ ] MediaRecorder pipeline: capture → blob → decode → analyze
- [ ] 10-second capture with progress indicator
- [ ] Browser support detection + graceful fallback

### Shared pipeline
- [ ] Both flows feed into existing essentia.js analysis
- [ ] BPM display, confidence, tempo classification preserved
- [ ] Same visual result card for all 3 modes

### Service Worker & Offline
- [ ] SW updated to NOT cache Piped/YouTube responses
- [ ] Features gracefully degrade when offline (file upload still works)
