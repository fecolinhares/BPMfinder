# PLAN — Phase 3: Helper Modal (Tempo Reference)

## Objective

Add a subtle helper icon next to the tempo classification text (e.g., "Andante") that opens a native `<dialog>` modal explaining all tempo classifications in a clean reference table.

## Design Decisions (impeccable)

### Modal: Native `<dialog>` element
- `dialog.showModal()` — built-in focus trap, Escape to close, backdrop
- No extra JS libraries needed
- Backdrop uses semi-transparent OKLCH (not rgba)
- Z-index is automatic (top layer)

### Colors
- Modal surface: `--bg-elevated` (same as card surfaces)
- Table stripe: subtle `--bg-hover` on alternating rows
- Emoji mood column for quick visual scan
- Term in bold, BPM range in `--text-secondary`, description in `--text-tertiary`
- Header: modal title + close button (simple ✕)

### Motion
- Dialog entrance: subtle scale + fade (transform + opacity)
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — per impeccable motion design
- Duration: 300ms entry, 200ms exit
- `prefers-reduced-motion: reduce` → fade only, no scale

### Interaction
- Helper icon: subtle circle with "?" or "ⓘ", secondary color
- Hover: subtle background highlight
- Focus-visible ring (accessibility)
- Click outside modal closes it (native dialog behavior)
- Escape closes (native)

### Layout (spatial)
- Max-width: 420px (comfortable reading)
- Padding: var(--space-6)
- Table cells: var(--space-3) vertical, var(--space-4) horizontal
- First column (emoji): narrow, centered

## Implementation Steps

### Step 1: Add dialog HTML after footer
- `<dialog id="tempoDialog">` with table inside
- Header row: "Tempo Reference" + close button
- Body: table with columns: (icon) | Term | BPM | Description
- 10 data rows from Grave to Prestissimo

### Step 2: CSS for dialog + backdrop
- `dialog` styled with bg-elevated, border-radius, max-width
- `dialog::backdrop` with OKLCH semi-transparent
- Animation via `@starting-style` or JS-driven
- Table styling: clean borders, alternating row bg, compact

### Step 3: JavaScript for open/close
- Helper icon click → `tempoDialog.showModal()`
- Close button click → `tempoDialog.close()`
- On result shown, inject helper icon next to tempo label
- Dialog spawns from TEMPO_RANGES array (data-driven)

### Step 4: Update STATE.md + vault
