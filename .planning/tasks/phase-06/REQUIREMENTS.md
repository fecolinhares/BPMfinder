# Requirements — Phase 6: Microphone Capture

## MIC-01: Capture panel with two options
- [ ] **MIC-01**: Capture panel shows two buttons: "Capture from Microphone" + "Capture from Tab"
- [ ] **MIC-02**: Tab capture button retained exactly as built in Phase 5
- [ ] **MIC-03**: Mic capture uses `navigator.mediaDevices.getUserMedia({ audio: true })`
- [ ] **MIC-04**: Both modes share the same MediaRecorder pipeline (10s duration, progress bar, countdown)

## MIC-02: Microphone recording
- [ ] **MIC-01**: getUserMedia requests mic permission (browser-native dialog)
- [ ] **MIC-02**: 10-second recording with progress bar + countdown (same as tab capture)
- [ ] **MIC-03**: Stereo → mono conversion for essentia.js
- [ ] **MIC-04**: Visual "🎤 Recording…" indicator while mic is active
- [ ] **MIC-05**: Mic stream properly stopped after capture

## MIC-03: Error handling
- [ ] **MIC-01**: Permission denied → clear message with guidance
- [ ] **MIC-02**: No mic hardware → specific error message
- [ ] **MIC-03**: Silent recording (< 1000 bytes) → warning
- [ ] **MIC-04**: Unsupported browser (no getUserMedia) → graceful message

## MIC-04: Shared pipeline
- [ ] **MIC-01**: Mic blob → AudioBuffer → runEssentia() → displayResult()
- [ ] **MIC-02**: Source indicator shows "from microphone"
- [ ] **MIC-03**: Existing tab capture pipeline 100% untouched

## MIC-05: Privacy & UX
- [ ] **MIC-01**: Mic indicator visible while recording (browser shows icon natively)
- [ ] **MIC-02**: User must click a button to start (no auto-mic)
- [ ] **MIC-03**: Mic stream released after capture completes
