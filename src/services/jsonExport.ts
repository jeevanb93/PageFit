import type { Resume } from '../types/resume'
import { validateResume } from '../utils/validation'
import { downloadBlob, slugify } from './download'

export function exportJson(resume: Resume): void {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
    downloadBlob(blob, `${slugify(resume.profile.name)}.json`)
}

export async function importJson(file: File): Promise<Resume> {
    const text = await file.text()
    return validateResume(JSON.parse(text))
}
