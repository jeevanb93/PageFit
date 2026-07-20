import type { Resume } from '../../types/resume'
import styles from './SettingsEditor.module.css'

function SettingsEditor({ resume, updateResume }: { resume: Resume, updateResume: (r: Resume) => void }) {

    return (
        <div className={styles.settingsEditor}>
            <h2>Settings</h2>
            <div className={styles.field}>
                <label>
                  <input type="radio" name="paperSize" value="letter"
                    checked={resume.settings.paperSize === 'letter'}
                    onChange={() => updateResume({ ...resume, settings: { paperSize: 'letter' } })} />
                  Letter (8.5 × 11 in)
                </label>
            </div>
            <div className={styles.field}>
                <label>
                  <input type="radio" name="paperSize" value="a4"
                    checked={resume.settings.paperSize === 'a4'}
                    onChange={() => updateResume({ ...resume, settings: { paperSize: 'a4' } })} />
                  A4 (210 × 297 mm)
                </label>
            </div>
        </div>
    )
}

export default SettingsEditor