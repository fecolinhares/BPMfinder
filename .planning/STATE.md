# STATE: BPMfinder

**Status:** 🟢 Complete — all phases delivered
**Last updated:** 2026-05-25

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-25)

**Core value:** Users can discover the BPM of any song instantly, privately, and without uploading files to any server.
**Current focus:** Feature-complete, awaiting next instructions

## Phase Progress

| Phase | Status |
|-------|--------|
| Phase 1 — Core Detection + Static Scaffold | ✅ Complete |
| Phase 2 — Polish + Deploy | ✅ Complete |
| Phase 3 — Helper Modal: Tempo Reference | ✅ Complete |

## Features Delivered

### BPM Detection
- essentia.js WASM (RhythmExtractor2013) — full client-side, no uploads
- Loading state with spinner + filename indicator
- Confidence display: percentual 0–100% with semantic color coding
  - ≥ 70% → green (`--success`)
  - 50–70% → amber (`--accent`)
  - < 50% → red (`--error`)

### File Handling
- Click-to-browse + drag-and-drop zone
- Accepted formats: MP3, WAV, FLAC, OGG, OPUS, AAC, WEBM
- Validation: unsupported types and files >200 MB rejected with clear error
- Auto-analyze on file select (no button click needed)

### Tempo Reference Modal
- Helper icon ⓘ opens native `<dialog>` with 10-classification table
- Ease-out-expo 300ms entrance, OKLCH backdrop, focus trap
- Data generated from TEMPO_RANGES array (DRY)
- Hidden until detection (`bpm-tempo.empty`)

### UI/UX
- Dark/light theme with localStorage persistence
- Responsive: mobile, tablet, desktop
- OKLCH color system, 4pt spacing scale, system font stack
- Reduced-motion support

### Deployment
- GitHub Pages (via GitHub Actions workflow)
- Service Worker for offline WASM caching
- Open Graph meta tags + favicon

### Modal Header
- Centered title with absolute-positioned close button
- `--space-8` (32px) top/bottom padding — fixed token bug (`--space-5` was invalid)

### Footer
- Clean: "No uploads · No servers · Open source" with link to essentia

## Bugs corrigidos (debug session)

| # | Bug | Fix |
|---|-----|-----|
| 1 | CDN paths errados | Mudado para `essentia.js-core.umd.min.js` e `essentia-wasm.web.js` |
| 2 | Upload panel sempre visível | CSS class `.upload-panel` com `display: none` padrão |
| 3 | CSS class mismatch | HTML `result-confidence` → CSS `.bpm-confidence` |
| 4 | EssentiaWASM MODULARIZE API | `await wasmFactory()` antes de `new Essentia(module)` |
| 5 | resetUI() sobrescrevia handleFile() | Removida chamada a `resetUI()` dentro de `handleFile()` |
| 6 | uploadPanel.style.display inline | Trocar para `classList.remove('visible')` |

## License

MIT © Feco Linhares — use freely, credit required.

## Testes

- UI flow: file select → auto-analyze → result ✅
- BPM detection com sinal sintético: 120 BPM detectado ✅
- Tempo classification: Moderato ✅
- Confidence display funcionando ✅
- Modal open/close/dismiss ✅
- Nenhum erro no console ✅
