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
**Causa raiz:** Reset universal `*, *::before, *::after { margin: 0 }` anulava o `margin: auto` nativo do `<dialog>`. Além disso, o UA `inset: 0` criava layout over-constrained que impedia auto-margins de centralizar.

**Fix:** Override do `inset: 0` via `.tempo-dialog:modal { top: 50%; left: 50%; transform: translate(-50%, -50%); }`. Animation keyframes atualizadas pra incluir o base transform `translate(-50%, -50%)` pra não conflitar com a entrance animation.

Verificado: dialog centrado horizontal e verticalmente (dx: -7, dy: 0 no desktop; funcional em qualquer viewport).

## Status Atual

**Phase 3 em desenvolvimento.** App funcional com confidence percentual colorido.
Acessar: http://192.168.0.103:8899
