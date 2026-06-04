# Deployment — BPMfinder

BPMfinder is a **static site** — no build step, no server-side rendering, no database. It can be deployed to any static hosting provider.

## GitHub Pages (Primary)

The primary deployment target is **GitHub Pages**, using GitHub Actions for automated deployment.

### Automatic Deployment

1. Push to the `master` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) runs automatically
3. The workflow deploys to `https://fecolinhares.github.io/BPMfinder/`

### Manual Setup (first time)

1. Go to your repository **Settings → Pages**
2. Under "Source", select **GitHub Actions**
3. Push the `master` branch — the workflow will deploy automatically

### Required Files for GitHub Pages

| File | Purpose |
|------|---------|
| `index.html` | Entry point (must exist at root) |
| `sw.js` | Service Worker |
| `robots.txt` | Crawler directives |
| `sitemap.xml` | SEO sitemap |
| `llms.txt` | LLM/AI agent entry point |
| `index.html.md` | Markdown version for AI consumption |
| `DESIGN.md` | Design system documentation |
| `404.html` | (Optional) Custom 404 page |

## Manual Deployment (Any Static Host)

Since BPMfinder is a single HTML file with no build step, you can deploy it anywhere:

```bash
# Option 1: Copy files to any static host
scp index.html sw.js robots.txt sitemap.xml llms.txt index.html.md user@host:/var/www/html/

# Option 2: Netlify CLI
npx netlify deploy --prod --dir=.

# Option 3: Vercel CLI
npx vercel --prod

# Option 4: Cloudflare Pages
# Connect your GitHub repo → auto-deploys on push
```

## Local Preview

```bash
# Python
python3 -m http.server 8888

# Node.js
npx serve .

# PHP
php -S localhost:8888
```

## Environment Considerations

Since BPMfinder has **no backend**, there are no environment-specific configurations. The same build works in development, staging, and production. Key characteristics:

- **No API keys** — Piped API is public, no registration needed
- **No CORS issues** — All external resources are CDN or CORS-enabled
- **Offline capable** — Service Worker caches WASM and static assets
- **HTTPS recommended** — Required for Microphone and Tab Capture (getUserMedia/getDisplayMedia)

## DNS / Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file with your domain (e.g., `bpmfinder.example.com`)
2. Configure your DNS provider
3. Update the `CNAME` record to point to `fecolinhares.github.io`
4. Update `sitemap.xml` and JSON-LD structured data with the new URL
5. Update `.github/workflows/deploy.yml` if needed

## Post-Deployment Checklist

- [ ] Site loads at the expected URL
- [ ] HTTPS is enabled (required for mic/tab capture)
- [ ] All 4 input modes work (file, YouTube, mic, tab)
- [ ] Theme toggle persists across page reloads
- [ ] Service Worker registers and caches assets
- [ ] `/llms.txt` is accessible at the root
- [ ] `robots.txt` and `sitemap.xml` are accessible
- [ ] Lighthouse SEO score ≥ 95%
- [ ] OG image renders correctly on social media
- [ ] Google Search Console verifies the site
