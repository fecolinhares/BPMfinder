# Quick Plan: Auto-analyze on file select

## Goal
Remove the intermediate "Analyze BPM" button screen. When user selects/drops a file, analysis starts immediately.

## Changes

### 1. Extract analysis into `startAnalysis(file)`
Move the try/catch block from `analyzeBtn` click handler into a reusable function.

### 2. `handleFile()` → auto-start
After setting up file info, call `startAnalysis(currentFile)` directly instead of waiting for button click.

### 3. Error recovery
On error: keep uploadPanel visible with file info, re-enable analyze button for retry.
On success: normal result display, hide uploadPanel.

### 4. Simplify analyzeBtn
Remove its disabled state management (no longer needed since auto-start fires immediately).
