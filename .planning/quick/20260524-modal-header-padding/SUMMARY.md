---
status: complete
date: 2026-05-24
---

## Result

**Commit:** `6aab88c` fix: modal header padding — use --space-8 for vertical (was invalid --space-5)
**Push:** ✅ origin master

### What changed
| Before | After |
|--------|-------|
| `padding: var(--space-5) var(--space-6)` | `padding: var(--space-8) var(--space-6)` |
| `--space-5` **não existe** → CSS inválido → padding = 0 | `--space-8` = 2rem (32px) vertical, `--space-6` = 1.5rem (24px) horizontal |
| Header espremido, título colado nas bordas | Dobro de padding vertical, título folgado |

### Root cause
`--space-5` nunca foi definido nos tokens de espaçamento (só existem 1,2,3,4,6,8,12,16). O CSS `padding: var(--space-5) ...` era silenciosamente ignorado.
