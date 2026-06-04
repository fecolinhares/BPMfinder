# Contributing — BPMfinder

First off, thank you for considering contributing to BPMfinder! This is a small, focused open-source project, and every contribution helps.

## Code of Conduct

This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainer.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](https://github.com/fecolinhares/BPMfinder/issues) to avoid duplicates
2. Open a new issue with:
   - A clear title and description
   - Steps to reproduce (be specific)
   - Expected vs actual behavior
   - Browser version and OS
   - Screenshots if applicable

### Suggesting Features

1. Open a feature request issue
2. Describe the problem you're solving, not just the solution
3. Explain why it fits BPMfinder's scope (client-side, privacy-first, no backend)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes in `index.html` (the app is a single file)
4. Test manually in your browser (open `index.html` or serve locally)
5. Run Lighthouse and ensure SEO + A11y scores stay ≥ 95%
6. Commit with conventional commits (`feat:`, `fix:`, `perf:`, `docs:`, etc.)
7. Push and open a Pull Request against `master`
8. In your PR description, explain what changed and why

## Development Setup

```bash
git clone https://github.com/fecolinhares/BPMfinder.git
cd BPMfinder
python3 -m http.server 8888
# Open http://localhost:8888
```

No build step, no dependencies, no package manager needed.

## Design System

BPMfinder uses the **Rhythmcore Interface** design system. See `DESIGN.md` at the project root for the full design contract. Key tokens:

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| Primary | `oklch(0.53 0.14 195)` | `oklch(0.53 0.16 195)` |
| Accent | `oklch(0.70 0.18 51)` | `oklch(0.60 0.18 51)` |
| Background | `oklch(0.07 0.01 60)` | `oklch(1 0 0)` |

All colors use the **OKLCH** color space. When adding new UI elements, use the existing token system — never hard-code colors.

## Code Style

- **No frameworks** — vanilla HTML/CSS/JS only
- **Single file** — all code in `index.html` unless there's a strong reason to split
- **CSS** — Design tokens first, component classes second, utility only when needed
- **JS** — `async/await`, descriptive variable names, error handling for all async operations
- **Conventional commits** — `feat:`, `fix:`, `perf:`, `docs:`, `refactor:`, `style:`
- **Accessibility** — ARIA labels, focus-visible rings, semantic HTML, color contrast ≥ 4.5:1

## Adding a New Input Mode

1. Add a tab button in `.input-tabs`
2. Create a panel `<div>` with matching `id` and `webmcp-tool` attributes
3. Register the panel in the JS `MODES` object
4. Wire the event handler to decode audio and call `runEssentia()`
5. Add source label to `modeLabels` in `displayResult()`

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
