---
status: complete
date: 2026-05-26
---

## Result

**Commit:** `353ae60` feat: SEO + performance + code quality improvements
**Skills used:** SEO (addyosmani/web-quality-skills) + optimize (impeccable references)

### New files
- `robots.txt` — allow all crawlers, sitemap reference
- `sitemap.xml` — single URL entry for GitHub Pages

### index.html changes
- `<meta name="robots" content="index, follow">` — explicit crawl directive
- `<link rel="canonical">` + `<meta property="og:url">` — prevent duplicate content
- `<link rel="preconnect">` + `<link rel="dns-prefetch">` to jsdelivr CDN
- JSON-LD WebApplication schema (name, description, category, author, price=free)
- `<script async crossorigin>` on essentia.js — non-blocking CDN loading
- `role="img"` + `aria-label` on icon-only elements (logo note, drop icon)
