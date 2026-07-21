import type { Resume } from '../types/resume'
import { escapeLatex } from '../utils/latex'
import { downloadBlob, slugify } from './download'

function bulletList(bullets: string[]): string {
    const items = bullets.filter(Boolean)
    if (items.length === 0) return ''
    return [
        '\\vspace{-9pt}',
        '\\begin{itemize}',
        ...items.map(b => `  \\item ${escapeLatex(b)}`),
        '\\end{itemize}',
        '',
    ].join('\n')
}

export function generateTex(resume: Resume): string {
    const { profile, skills, experience, projects, education, settings } = resume
    const paper = settings.paperSize === 'a4' ? 'a4paper' : 'letterpaper'

    const contact = [
        profile.email,
        profile.phone,
        profile.location,
        ...profile.links.map(l => l.label || l.url),
    ]
        .filter(Boolean)
        .map(part => escapeLatex(part as string))
        .join(' | ')

    const lines: string[] = [
        '\\documentclass[11pt]{article}',
        `\\usepackage[${paper},`,
        'top=0.5in,',
        'bottom=0.5in,',
        'left=0.5in,',
        'right=0.5in]{geometry}',
        '',
        '\\usepackage{XCharter}',
        '\\usepackage[T1]{fontenc}',
        '\\usepackage[utf8]{inputenc}',
        '\\usepackage{enumitem}',
        '\\usepackage[hidelinks]{hyperref}',
        '\\usepackage{titlesec}',
        '\\raggedright',
        '\\pagestyle{empty}',
        '',
        '\\input{glyphtounicode}',
        '\\pdfgentounicode=1',
        '',
        '\\titleformat{\\section}{\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule\\vspace{-6.5pt}]',
        '\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\small$\\bullet$}}$}',
        '\\setlist[itemize]{itemsep=-2pt, leftmargin=12pt, topsep=7pt}',
        '',
        '\\begin{document}',
        '',
        `\\centerline{\\Huge ${escapeLatex(profile.name)}}`,
        '',
        '\\vspace{5pt}',
        '',
        `\\centerline{${contact}}`,
        '',
        '\\vspace{-10pt}',
        '',
    ]

    if (skills.length > 0) {
        lines.push('\\section*{Skills}')
        lines.push(
            skills
                .map(g => `\\textbf{${escapeLatex(g.label)}:} ${escapeLatex(g.skills)}`)
                .join(' \\\\\n')
        )
        lines.push('', '\\vspace{-6.5pt}', '')
    }

    if (experience.length > 0) {
        lines.push('\\section*{Experience}')
        experience.forEach(e => {
            const dates = e.current
                ? `${escapeLatex(e.startDate)} -- Present`
                : `${escapeLatex(e.startDate)} -- ${escapeLatex(e.endDate)}`
            lines.push(
                `\\textbf{${escapeLatex(e.title)},} {${escapeLatex(e.company)}} -- ${escapeLatex(e.location)} \\hfill ${dates} \\\\`
            )
            lines.push(bulletList(e.bullets))
        })
        lines.push('\\vspace{-18.5pt}', '')
    }

    if (projects.length > 0) {
        lines.push('\\section*{Projects}')
        projects.forEach(p => {
            lines.push(`\\textbf{${escapeLatex(p.title)}} \\hfill ${escapeLatex(p.url)} \\\\`)
            lines.push(bulletList(p.bullets))
        })
        lines.push('\\vspace{-18.5pt}', '')
    }

    if (education.length > 0) {
        lines.push('\\section*{Education}')
        lines.push(
            education
                .map(
                    ed =>
                        `\\textbf{${escapeLatex(ed.school)}} -- ${escapeLatex(ed.degree)} \\hfill ${escapeLatex(ed.date)}`
                )
                .join(' \\\\\n')
        )
        lines.push('')
    }

    lines.push('\\end{document}', '')
    return lines.join('\n')
}

export function exportTex(resume: Resume): void {
    const blob = new Blob([generateTex(resume)], { type: 'application/x-tex' })
    downloadBlob(blob, `${slugify(resume.profile.name)}.tex`)
}
