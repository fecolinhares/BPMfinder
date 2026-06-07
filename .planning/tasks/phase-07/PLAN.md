# Phase 7 — SEO & Lighthouse Optimization

## Goal
Update all SEO metadata and structured data to reflect the full feature set (YouTube, Tab Capture, Mic Capture), optimize Lighthouse scores, ensure the app ranks well for BPM-related searches.

## Checklist

### 1. Meta tags (in `<head>`)
- [ ] `<title>` — already good, but verify
- [ ] `<meta name="description">` — update to mention YouTube, Tab Capture, Mic
- [ ] `<meta name="keywords">` — add keywords for new features
- [ ] OG tags — update description to reflect full feature set
- [ ] Twitter card — update description

### 2. JSON-LD Structured Data (WebApplication)
- [ ] `description` field — update to mention all 4 input modes
- [ ] `featureList` — add YouTube, Tab Capture, Microphone
- [ ] `browserRequirements` — add getDisplayMedia/getUserMedia mentions
- [ ] `operatingSystem` — verify (already covers all)

### 3. OG Image
- [ ] Update inline SVG to have 4-panel preview or text that mentions all features
- [ ] Or update og:image URL

### 4. Sitemap + robots.txt
- [ ] sitemap.xml: update `<lastmod>` to today, verify priority

### 5. Lighthouse Audit
- [ ] Run Lighthouse (local or Chrome browser)
- [ ] Fix: Performance issues found
- [ ] Fix: Accessibility issues found
- [ ] Fix: SEO issues found
- [ ] Fix: Best Practices issues found

### 6. Human Testing
- [ ] Verify all 4 modes work end-to-end
- [ ] Check mobile responsive
- [ ] Check dark/light theme
- [ ] Check error states
