import type { Project, Resume } from '../../types/resume'
import styles from './editor.module.css'

interface Props {
    resume: Resume
    updateResume: (r: Resume) => void
}

function ProjectsEditor({ resume, updateResume }: Props) {

    // Helper: replace one entry in the projects array
    function setEntries(entries: Project[]) {
        updateResume({ ...resume, projects: entries })
    }

    // Add a blank project entry
    function addEntry() {
        setEntries([
            ...resume.projects,
            { id: Date.now(), title: '', url: '', bullets: [] }
        ])
    }

    // Remove entry at index i
    function removeEntry(i: number) {
        setEntries(resume.projects.filter((_, idx) => idx !== i))
    }

    // Update a single field on entry i
    function updateEntry(i: number, field: keyof Project, value: string) {
        setEntries(resume.projects.map((entry, idx) =>
            idx === i ? { ...entry, [field]: value } : entry
        ))
    }

    // Add a blank bullet to entry i
    function addBullet(i: number) {
        setEntries(resume.projects.map((entry, idx) =>
            idx === i ? { ...entry, bullets: [...entry.bullets, ''] } : entry
        ))
    }

    // Remove bullet j from entry i
    function removeBullet(i: number, j: number) {
        setEntries(resume.projects.map((entry, idx) =>
            idx === i
                ? { ...entry, bullets: entry.bullets.filter((_, bIdx) => bIdx !== j) }
                : entry
        ))
    }

    // Update bullet j in entry i
    function updateBullet(i: number, j: number, value: string) {
        setEntries(resume.projects.map((entry, idx) =>
            idx === i
                ? { ...entry, bullets: entry.bullets.map((b, bIdx) => bIdx === j ? value : b) }
                : entry
        ))
    }

    // Move bullet j up or down within entry i
    function moveBullet(i: number, j: number, direction: 'up' | 'down') {
        const entry = resume.projects[i]
        const bullets = [...entry.bullets]
        const target = direction === 'up' ? j - 1 : j + 1
        if (target < 0 || target >= bullets.length) return
        ;[bullets[j], bullets[target]] = [bullets[target], bullets[j]]
        setEntries(resume.projects.map((p, idx) =>
            idx === i ? { ...p, bullets } : p
        ))
    }

    return (
        <div className={styles.editor}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Projects</h2>
                <button className={styles.addBtn} onClick={addEntry}>+ Add Project</button>
            </div>

            {resume.projects.length === 0 && (
                <p className={styles.empty}>No projects yet. Click &quot;+ Add Project&quot; to start.</p>
            )}

            {resume.projects.map((entry, i) => (
                <div key={entry.id} className={styles.entry}>

                    <div className={styles.projectHeader}>
                        <input
                            className={styles.input}
                            placeholder="Project Title"
                            value={entry.title}
                            onChange={e => updateEntry(i, 'title', e.target.value)}
                        />
                        <input
                            className={styles.input}
                            placeholder="Project URL"
                            value={entry.url}
                            onChange={e => updateEntry(i, 'url', e.target.value)}
                        />
                        <button className={styles.removeBtn} title="Remove project"
                            onClick={() => removeEntry(i)}>✕</button>
                    </div>

                    {/* Bullets */}
                    <div className={styles.bullets}>
                        {entry.bullets.map((bullet, j) => (
                            <div key={j} className={styles.bulletRow}>
                                <textarea className={styles.bulletInput} placeholder="Bullet point"
                                    rows={2}
                                    value={bullet}
                                    onChange={e => updateBullet(i, j, e.target.value)} />
                                <button className={styles.moveBtn} title="Move up"
                                    disabled={j === 0}
                                    onClick={() => moveBullet(i, j, 'up')}>↑</button>
                                <button className={styles.moveBtn} title="Move down"
                                    disabled={j === entry.bullets.length - 1}
                                    onClick={() => moveBullet(i, j, 'down')}>↓</button>
                                <button className={styles.removeBtn} title="Remove bullet"
                                    onClick={() => removeBullet(i, j)}>✕</button>
                            </div>
                        ))}
                        <button className={styles.addBulletBtn} onClick={() => addBullet(i)}>
                            + Add Bullet
                        </button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ProjectsEditor
