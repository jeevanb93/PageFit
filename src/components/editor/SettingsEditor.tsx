import type { Resume } from '../../types/resume'
import styles from './editor.module.css'

interface Props {
    resume: Resume
    updateResume: (r: Resume) => void
}

function SettingsEditor({ resume, updateResume }: Props) {

    return (
        <div className={styles.editor}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Settings</h2>
            </div>

            <span className={styles.label}>Paper size</span>

            <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                    <input type="radio" name="paperSize" value="a4"
                        checked={resume.settings.paperSize === 'a4'}
                        onChange={() => updateResume({ ...resume, settings: { paperSize: 'a4' } })} />
                    A4 (210 × 297 mm)
                </label>
                <label className={styles.radioLabel}>
                    <input type="radio" name="paperSize" value="letter"
                        checked={resume.settings.paperSize === 'letter'}
                        onChange={() => updateResume({ ...resume, settings: { paperSize: 'letter' } })} />
                    US Letter (8.5 × 11 in)
                </label>
            </div>

            <p className={styles.hint}>
                A4 is standard in Australia, the UK and Europe. US Letter is standard in
                North America. This affects the preview and every export.
            </p>
        </div>
    )
}

export default SettingsEditor
