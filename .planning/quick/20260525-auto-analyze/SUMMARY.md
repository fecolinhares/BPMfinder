---
status: complete
date: 2026-05-25
---

## Result

**Commit:** `5f532a2` feat: auto-analyze on file select — skip intermediate click screen

### What changed
- **Before:** user selects file → upload panel with file info + "Analyze BPM" button → click → analysis
- **After:** user selects file → analysis starts **automatically**
- Button repurposed as **retry** mechanism (appears only on error)
- `startAnalysis(file)` extracted as reusable async function
- Cleaned up disabled state management
