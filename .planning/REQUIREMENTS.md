# Requirements — v2 Rhythmcore Visual Redesign ✅

## COLOR-01: Sync color tokens with Rhythmcore palette
- [x] **COLOR-01**: Replace `--primary` token with `#06B6D4` (cyan) for secondary UI elements
- [x] **COLOR-02**: Keep `--accent` amber `#F97316` (already matches, verify contrast)
- [x] **COLOR-03**: Add `--surface` token (`#4A5568` equivalent in OKLCH dark/light)
- [x] **COLOR-04**: Adjust dark theme surface/background to Rhythmcore's compact card hierarchy
- [x] **COLOR-05**: Adjust light theme to match Rhythmcore's `background: #FFFFFF`, `surface: #4A5568`, `text-primary: #111827`, `border: #E5E7EB`

## TYPE-01: Sync typography with Rhythmcore
- [x] **TYPE-01**: Load **Inter** from Google Fonts for display/body
- [x] **TYPE-02**: Load **JetBrains Mono** from Google Fonts for labels and metadata
- [x] **TYPE-03**: Update `--font-sans` to Inter (with system fallback)
- [x] **TYPE-04**: Update `--font-mono` to JetBrains Mono (with mono fallback)
- [x] **TYPE-05**: Set display-lg scale: `64px`, weight 500, line-height 1.04 for hero BPM
- [x] **TYPE-06**: Set body-md: `16px`, weight 400, line-height 1.6
- [x] **TYPE-07**: Set label-md (JetBrains Mono): `12px`, weight 600, line-height 1.2

## LAYOUT-01: Card-based Rhythmcore layout
- [x] **LAYOUT-01**: Redesign drop zone as a surface card (8px radius, subtle border, shadow)
- [x] **LAYOUT-02**: Redesign upload panel area as surface card
- [x] **LAYOUT-03**: Redesign result area as compact metric card
- [x] **LAYOUT-04**: Card-padding 24px, gap 16px, section-padding 80px
- [x] **LAYOUT-05**: More compact dashboard hierarchy (less whitespace between sections)

## MOTION-01: Add Rhythmcore transitions
- [x] **MOTION-01**: Add staggered entrance animation to result card (stagger children)
- [x] **MOTION-02**: Add hover lift effect to cards (`translateY(-2px)` + shadow)
- [x] **MOTION-03**: Add scroll-triggered fade-in for main sections
- [x] **MOTION-04**: Smooth restrained easing (cubic-bezier) across all transitions
- [x] **MOTION-05**: Preserve reduced-motion support

## COMP-01: Component refinements
- [x] **COMP-01**: Buttons use primary/accent colors with 8px radius
- [x] **COMP-02**: Button hover states with lift effect
- [x] **COMP-03**: Result BPM uses JetBrains Mono with display-lg sizing
- [x] **COMP-04**: Loading spinner styled with primary cyan
- [x] **COMP-05**: Error state styled as surface card with border

## RESP-01: Responsive adjustments
- [x] **RESP-01**: Mobile adjustments preserve Rhythmcore density
- [x] **RESP-02**: All sections stack correctly below 480px
- [x] **RESP-03**: BPM display scales down gracefully on mobile (3rem)

---
## Verificado ✅
All 25 requirements delivered and verified in browser. Phase 4 complete.
