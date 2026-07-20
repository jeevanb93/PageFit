import type { Resume } from '../../types/resume'
import styles from './EducationEditor.module.css'

interface Props {
    resume: Resume
    updateResume: (r: Resume) => void
}

function EducationEditor({ resume, updateResume }: Props) {

    // Add a blank education row
    function addEducation() {
        updateResume({
            ...resume,
            education: [...resume.education, { id: Date.now(), school:'', degree:'', location:'', date:'' }]
        })
    }

    function removeEducation(i: number) {
        updateResume({
            ...resume,
            education: resume.education.filter((_, idx) => idx !== i)
        })
    }

    function updateEducation(i: number, field: 'school' | 'degree' | 'location' | 'date', value: string) {
        const updated = resume.education.map((group, idx) =>
            idx === i ? { ...group, [field]:value } :  group
        )
        updateResume({ ...resume, education: updated })
    }

    return (
        <div className={styles.editor}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Education</h2>
                <button className={styles.addBtn} onClick={addEducation}>+ Add Education</button>
            </div>

            {resume.education.map((group, i) => (
                <div key={i} className={styles.row}>
                    <input
                        className={styles.labelInput}
                        placeholder="School"
                        value={group.school}
                        onChange={e=>updateEducation(i, 'school', e.target.value)}
                    />
                    <input
                        className={styles.labelInput}
                        placeholder="Degree"
                        value={group.degree}
                        onChange={e=>updateEducation(i, 'degree', e.target.value)}
                    />
                    <input
                        className={styles.labelInput}
                        placeholder="Location"
                        value={group.location}
                        onChange={e=>updateEducation(i, 'location', e.target.value)}
                    />
                    <input
                        className={styles.labelInput}
                        placeholder="Date"
                        value={group.date}
                        onChange={e=>updateEducation(i, 'date', e.target.value)}
                    />
                    <button className={styles.removeBtn} onClick={() => removeEducation(i)}>✕</button>
                </div>
            ))}

            {resume.education.length === 0 && (
                <p className={styles.emptyMessage}>No education entries yet. Click "Add Education" to start.</p>
            )}
        </div>
    )
}


export default EducationEditor