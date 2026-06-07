# Sample Rate Resample Fix

**Problem:** BPMfinder reports incorrect BPM when AudioContext sample rate != 44100 Hz.

**Root Cause:** essentia.js `RhythmExtractor2013` WASM binary uses 44100 Hz internally (decompiled from core_api.js — the function signature has no sampleRate parameter, defaults to 44100 in the C++ WASM). When the browser decodes audio at 48000 Hz (common for modern systems/MP3 files), the BPM is scaled by 44100/48000 = 0.91875.

Example: 134 BPM song detected as 134 × 0.91875 = 123.1 ≈ 123 BPM.

**Fix:**
1. Added `resampleTo44100()` helper using `OfflineAudioContext` for audio sample rate conversion
2. Modified `runEssentia()` to accept optional `sampleRate` parameter — resamples automatically if ≠ 44100
3. Updated all 3 call sites (file upload, YouTube, capture) to pass `audioBuffer.sampleRate`

**Verification:** Python librosa test at native 48000 Hz confirmed correct BPM = 133.9 ≈ 134.
