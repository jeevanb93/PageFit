import type { Resume } from '../../types/resume'
import styles from './SkillsEditor.module.css'

interface Props {
    resume: Resume
    updateResume: (r: Resume) => void
}

function SkillsEditor({ resume, updateResume }: Props) {

    // Add a blank skill group row
    function addGroup() {
        updateResume({
            ...resume,
            skills: [...resume.skills, { label: '', skills: '' }]
        })
    }

    // Remove the skill group at index i
    function removeGroup(i: number) {
        updateResume({
            ...resume,
            skills: resume.skills.filter((_, idx) => idx !== i)
        })
    }

    // Update a single field ('label' or 'skills') on one group
    function updateGroup(i: number, field: 'label' | 'skills', value: string) {
        const updated = resume.skills.map((group, idx) =>
            idx === i ? { ...group, [field]: value } : group
        )
        updateResume({ ...resume, skills: updated })
    }

    return (
        <div className={styles.editor}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Skills</h2>
                <button className={styles.addBtn} onClick={addGroup}>+ Add Group</button>
            </div>

            {resume.skills.map((group, i) => (
                <div key={i} className={styles.row}>
                    <input
                        className={styles.labelInput}
                        placeholder="Category (e.g. Languages)"
                        value={group.label}
                        onChange={e => updateGroup(i, 'label', e.target.value)}
                    />
                    <input
                        className={styles.skillsInput}
                        placeholder="Skills (e.g. TypeScript, Python)"
                        value={group.skills}
                        onChange={e => updateGroup(i, 'skills', e.target.value)}
                    />
                    <button className={styles.removeBtn} onClick={() => removeGroup(i)}>✕</button>
                </div>
            ))}

            {resume.skills.length === 0 && (
                <p className={styles.empty}>No skill groups yet. Click &quot;+ Add Group&quot; to start.</p>
            )}
        </div>
    )
}

export default SkillsEditor
