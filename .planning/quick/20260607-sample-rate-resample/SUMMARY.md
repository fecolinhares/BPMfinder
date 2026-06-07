---
status: complete
date: 2026-06-07
---

**Commit:** `fix: resample audio to 44100 Hz before essentia.js RhythmExtractor2013`

**What changed:**
- Added `resampleTo44100()` helper function using `OfflineAudioContext`
- Modified `runEssentia(channelData)` → `runEssentia(channelData, sampleRate)` with automatic resampling
- Updated all 3 input paths to pass sample rate

**Verification:**
- Python librosa test confirmed: native 48000 Hz → 133.9 BPM, 44100/48000 scaling → 123.1 BPM
- Theoretical analysis confirmed: 134 × (44100/48000) = 123.1125 ≈ 123
- Commit: 23 insertions, 4 deletions in `index.html`
