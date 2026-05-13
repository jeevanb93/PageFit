# PageFit

**Role-ready resumes without formatting chaos.**

PageFit is a free, local-first resume builder for technical resumes. No account required, no data sent to any server — everything lives in your browser.

## Features

- Live structured resume editor with section tabs
- Live one-page preview matching a clean LaTeX-quality layout
- Export to **PDF**, **DOCX**, **LaTeX (.tex)**, and **JSON**
- Import resume from JSON
- Browser autosave — refresh without losing work
- Fit warnings for likely page overflow (too many bullets, long entries)
- STAR / XYZ / CAR bullet writing guidance
- Letter and A4 paper size support

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server and build
- [@react-pdf/renderer](https://react-pdf.org/) — PDF export
- [docx](https://docx.js.org/) — DOCX export
- No backend, no database, no analytics

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

## Deployment

PageFit is designed to deploy as a static site. Build output goes to `dist/`.

Cloudflare Pages settings:
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Privacy

PageFit is fully local. Your resume data never leaves your browser. There are no accounts, no tracking, and no third-party data collection.

## License

MIT
