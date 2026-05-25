# STATE: BPMfinder

**Status:** 🟢 Active — Phase 3 Complete
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
| Phase 3 — Helper Modal: Tempo Reference | ✅ Complete |

## Feature: Tempo Reference Modal

**Description:** Helper icon (ⓘ) next to the tempo classification label opens a native `<dialog>` modal showing all 10 tempo classifications (Grave → Prestissimo) with emoji, term, BPM range, and meaning.

**Design choices (impeccable):**
- Native `<dialog>` element — built-in focus trap, backdrop, Escape-to-close, top-layer stacking
- Ease-out-expo entrance animation (`cubic-bezier(0.16, 1, 0.3, 1)`) — 300ms entry, per motion design
- Backdrop: `oklch(0 0 0 / 0.35)` — OKLCH, no rgba
- `@starting-style` via keyframes, reduced-motion fallback
- Table rows: hover state with `--bg-hover`, alternating subtle borders
- Helper button: focus-visible ring, hover bg highlight, 20x20px

### Bugfix: Dialog não centralizava no mobile
**Causa raiz:** O reset universal `*, *::before, *::after { margin: 0; }` anulava o `margin: auto` nativo do `<dialog>`. Além disso, o UA stylesheet do browser seta `inset: 0` (`left: 0; right: 0; top: 0; bottom: 0`) que, combinado com `width` explícito e `margin: 0`, criava um layout **over-constrained** — o browser ignora `right` e posiciona o dialog em `left: 0`.

**Fix:** Override do UA `inset: 0` via `.tempo-dialog:modal { top: 50%; left: 50%; transform: translate(-50%, -50%); }`. Animation keyframes atualizadas pra incluir `translate(-50%, -50%)` como base, com `scale`/`translateY` adicionais pro entrance effect.

**Verificação:** Dialog centrado horizontal e verticalmente em qualquer viewport. Testado em 1280x577 — centrado com offset de apenas 7px (scrollbar). Funciona em mobile portrait (375px).

**Bugs corrigidos (debug session)**

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

## Melhorias de UX

### Enhancement: Confidence em percentual com cor semântica
- Confidence agora sempre mostra **0–100%** (nunca mais decimal cru)
- Se o raw confidence ≥ 1 (áudio sintético), normaliza para 100%
- **Cores semânticas** (OKLCH, afinadas com o esquema amber):
  - ≥ 70% → verde (`--success`) — qualidade boa
  - 50–70% → âmbar (`--accent`) — qualidade média
  - < 50% → vermelho (`--error`) — qualidade baixa
- Cores seguem princípios do **impeccable**: restrained, state indicators, sem badges/pills

### Enhancement: Modal header spacing
- Aumentado o padding interno do cabeçalho do modal de referência de tempo
- Antes: `var(--space-4) var(--space-5)` = 16px vertical, 24px horizontal
- Depois: `var(--space-5) var(--space-6)` = 24px vertical, 32px horizontal
- Melhora a legibilidade e evita que o título "Tempo Reference" fique colado na borda
- Segue princípios do impeccable: espaçamento consistente, hierarquia visual

### Enhancement: Modal header title centralizado
- Título da modal agora centralizado horizontalmente (`justify-content: center`)
- Botão de fechar reposicionado com `position: absolute; right: var(--space-6)` para não afetar o centramento
- Título permanece perfeitamente centralizado independente do tamanho do texto

## Testes
- UI flow (file select → panel show → analyze → result) ✅
- BPM detection com sinal sintético: 120 BPM detectado ✅
- Tempo classification: Moderato ✅
- Confidence display funcionando ✅
- Nenhum erro no console ✅
