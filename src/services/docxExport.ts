import type { Paragraph as ParagraphType } from 'docx'
import type { Resume } from '../types/resume'
import { downloadBlob, slugify } from './download'

const PAGE_WIDTH_IN = { a4: 8.27, letter: 8.5 }
const MARGIN_IN = 0.5

export async function exportDocx(resume: Resume): Promise<void> {
    // Loaded on demand — the docx library is ~400 kB and most sessions never export.
    const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        AlignmentType,
        BorderStyle,
        TabStopType,
        convertInchesToTwip,
    } = await import('docx')

    const { profile, skills, experience, projects, education, settings } = resume
    const rightTab = convertInchesToTwip(PAGE_WIDTH_IN[settings.paperSize] - MARGIN_IN * 2)

    const heading = (text: string) =>
        new Paragraph({
            spacing: { before: 160, after: 40 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000' } },
            children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24 })],
        })

    const bullets = (items: string[]) =>
        items.filter(Boolean).map(
            b =>
                new Paragraph({
                    bullet: { level: 0 },
                    spacing: { before: 0, after: 0, line: 240 },
                    children: [new TextRun({ text: b, size: 21 })],
                })
        )

    const contact = [
        profile.email,
        profile.phone,
        profile.location,
        ...profile.links.map(l => l.label || l.url),
    ]
        .filter(Boolean)
        .join(' | ')

    const children: ParagraphType[] = [
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [new TextRun({ text: profile.name, bold: true, size: 48 })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [new TextRun({ text: contact, size: 20 })],
        }),
    ]

    if (skills.length > 0) {
        children.push(heading('Skills'))
        skills.forEach(g => {
            children.push(
                new Paragraph({
                    spacing: { before: 0, after: 0, line: 240 },
                    children: [
                        new TextRun({ text: `${g.label}: `, bold: true, size: 21 }),
                        new TextRun({ text: g.skills, size: 21 }),
                    ],
                })
            )
        })
    }

    if (experience.length > 0) {
        children.push(heading('Experience'))
        experience.forEach(e => {
            const dates = e.current ? `${e.startDate} – Present` : `${e.startDate} – ${e.endDate}`
            children.push(
                new Paragraph({
                    spacing: { before: 60, after: 0, line: 240 },
                    tabStops: [{ type: TabStopType.RIGHT, position: rightTab }],
                    children: [
                        new TextRun({ text: e.title, bold: true, size: 21 }),
                        new TextRun({ text: `, ${e.company} — ${e.location}`, size: 21 }),
                        new TextRun({ text: `\t${dates}`, size: 21 }),
                    ],
                })
            )
            children.push(...bullets(e.bullets))
        })
    }

    if (projects.length > 0) {
        children.push(heading('Projects'))
        projects.forEach(p => {
            children.push(
                new Paragraph({
                    spacing: { before: 60, after: 0, line: 240 },
                    tabStops: [{ type: TabStopType.RIGHT, position: rightTab }],
                    children: [
                        new TextRun({ text: p.title, bold: true, size: 21 }),
                        new TextRun({ text: `\t${p.url}`, size: 21 }),
                    ],
                })
            )
            children.push(...bullets(p.bullets))
        })
    }

    if (education.length > 0) {
        children.push(heading('Education'))
        education.forEach(ed => {
            children.push(
                new Paragraph({
                    spacing: { before: 0, after: 0, line: 240 },
                    tabStops: [{ type: TabStopType.RIGHT, position: rightTab }],
                    children: [
                        new TextRun({ text: ed.school, bold: true, size: 21 }),
                        new TextRun({ text: ` — ${ed.degree}, ${ed.location}`, size: 21 }),
                        new TextRun({ text: `\t${ed.date}`, size: 21 }),
                    ],
                })
            )
        })
    }

    const doc = new Document({
        styles: { default: { document: { run: { font: 'Georgia', size: 22 } } } },
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: convertInchesToTwip(MARGIN_IN),
                            bottom: convertInchesToTwip(MARGIN_IN),
                            left: convertInchesToTwip(MARGIN_IN),
                            right: convertInchesToTwip(MARGIN_IN),
                        },
                    },
                },
                children,
            },
        ],
    })

    downloadBlob(await Packer.toBlob(doc), `${slugify(profile.name)}.docx`)
}
