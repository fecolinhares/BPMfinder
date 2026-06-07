# Quick Task: Modal header padding

**Slug:** modal-header-padding
**Date:** 2026-05-24

## Objective
Dobrar o padding vertical do header da modal "Tempo Reference" e corrigir o uso de `--space-5` (token inexistente).

## Current state
```css
padding: var(--space-5) var(--space-6);
/* --space-5 não existe nos tokens → declaração inválida, padding = 0 */
```

## Target state
```css
padding: var(--space-8) var(--space-6);
/* --space-8 = 2rem (32px) — dobro de --space-4 (16px) que seria o base */
/* --space-6 = 1.5rem (24px) — horizontal */
```

## Steps
1. Patch index.html: `--space-5` → `--space-8` no padding do `.tempo-dialog-header`
2. git add + commit
3. git push
4. Update STATE.md corrigindo documentação do padding
