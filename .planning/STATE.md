# STATE: BPMfinder

**Status:** 🟢 Active — Phase 2 Complete
**Last updated:** 2026-05-24

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-24)

**Core value:** Users can discover the BPM of any song instantly, privately, and without uploading files to any server.
**Current focus:** Ready for deploy

## Phase Progress

| Phase | Status |
|-------|--------|
| Phase 1 — Core Detection + Static Scaffold | ✅ Complete |
| Phase 2 — Polish + Deploy | ✅ Complete |

## Bug Fixes Applied

### Bug #1: CDN paths errados
- `essentia.js` e `essentia-wasm.js` não existiam → mudado para `essentia.js-core.umd.min.js` e `essentia-wasm.web.js`

### Bug #2: Upload panel sempre visível
- Inline `style="display: none; display: flex"` → CSS class `.upload-panel` com `display: none` padrão

### Bug #3: CSS class mismatch
- HTML usava `class="result-confidence"` mas CSS tinha `.bpm-confidence`

### Bug #4: EssentiaWASM MODULARIZE API
- `EssentiaWASM` é factory function que retorna Promise → `await wasmFactory()` antes de `new Essentia(module)`

### Bug #5: resetUI() sobrescrevia estado do handleFile
- `handleFile()` chamava `resetUI()` depois de configurar o painel → `resetUI()` removia as classes recém-adicionadas. Fix: eliminar chamada a `resetUI()` dentro de `handleFile()`.

### Bug #6: uploadPanel.style.display = 'none' inline
- Linhas com `uploadPanel.style.display = 'none'` criavam inline style que vencia CSS class → trocado para `uploadPanel.classList.remove('visible')`

## Testes
- UI flow (file select → panel show → analyze → result) ✅
- BPM detection com sinal sintético: 120 BPM detectado ✅
- Tempo classification: Moderato ✅
- Confidence display funcionando ✅
- Nenhum erro no console ✅
