import type { Resume } from '../types/resume'

// Uses the browser's print dialog ("Save as PDF"), so the output is exactly
// what the live preview shows — no second rendering engine to keep in sync.
export function exportPdf(resume: Resume): void {
    const style = document.createElement('style')
    style.id = 'pagefit-print-size'
    style.textContent = `@page { size: ${resume.settings.paperSize === 'a4' ? 'A4' : 'letter'}; margin: 0; }`
    document.head.appendChild(style)

    window.print()

    document.getElementById('pagefit-print-size')?.remove()
}
