import { describe, it, expect } from 'vitest'
import { generateTex } from './texExport'
import { defaultResume } from '../types/resume'

describe('generateTex', () => {
    const tex = generateTex(defaultResume)

    it('produces a complete LaTeX document', () => {
        expect(tex).toContain('\\documentclass[11pt]{article}')
        expect(tex).toContain('\\begin{document}')
        expect(tex).toContain('\\end{document}')
    })

    it('uses the paper size from settings', () => {
        expect(generateTex(defaultResume)).toContain('a4paper')
        expect(
            generateTex({ ...defaultResume, settings: { paperSize: 'letter' } })
        ).toContain('letterpaper')
    })

    it('includes every section in template order', () => {
        const order = ['Skills', 'Experience', 'Projects', 'Education'].map(s =>
            tex.indexOf(`\\section*{${s}}`)
        )
        expect(order.every(i => i > -1)).toBe(true)
        expect([...order].sort((a, b) => a - b)).toEqual(order)
    })

    it('renders the name and contact line', () => {
        expect(tex).toContain('\\centerline{\\Huge Jane Doe}')
        expect(tex).toContain('jane.doe@email.com')
    })

    it('marks a current role as Present', () => {
        expect(tex).toContain('-- Present')
    })

    it('escapes LaTeX special characters in user content', () => {
        const out = generateTex({
            ...defaultResume,
            profile: { ...defaultResume.profile, name: 'A & B_C' },
        })
        expect(out).toContain('\\centerline{\\Huge A \\& B\\_C}')
    })

    it('omits empty sections', () => {
        const out = generateTex({ ...defaultResume, projects: [] })
        expect(out).not.toContain('\\section*{Projects}')
    })
})
