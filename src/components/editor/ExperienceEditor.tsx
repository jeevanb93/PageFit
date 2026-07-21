import type { Resume, Experience } from '../../types/resume'
import styles from './editor.module.css'

interface Props {
    resume: Resume
    updateResume: (r: Resume) => void
}

function ExperienceEditor({ resume, updateResume }: Props) {

    // Helper: replace one entry in the experience array
    function setEntries(entries: Experience[]) {
        updateResume({ ...resume, experience: entries })
    }

    // Add a blank experience entry
    function addEntry() {
        setEntries([
            ...resume.experience,
            { id: Date.now(), title: '', company: '', location: '', startDate: '', endDate: '', current: false, bullets: [] }
        ])
    }

    // Remove entry at index i
    function removeEntry(i: number) {
        setEntries(resume.experience.filter((_, idx) => idx !== i))
    }

    // Update a single field on entry i
    function updateEntry(i: number, field: keyof Experience, value: string | boolean) {
        setEntries(resume.experience.map((entry, idx) =>
            idx === i ? { ...entry, [field]: value } : entry
        ))
    }

    // Tick "Present" and clear the end date in a single update — two separate
    // updateEntry calls would both read the same stale `resume` and the second
    // would discard the first.
    function setCurrent(i: number, checked: boolean) {
        setEntries(resume.experience.map((entry, idx) =>
            idx === i
                ? { ...entry, current: checked, endDate: checked ? '' : entry.endDate }
                : entry
        ))
    }

    // Add a blank bullet to entry i
    function addBullet(i: number) {
        setEntries(resume.experience.map((entry, idx) =>
            idx === i ? { ...entry, bullets: [...entry.bullets, ''] } : entry
        ))
    }

    // Remove bullet j from entry i
    function removeBullet(i: number, j: number) {
        setEntries(resume.experience.map((entry, idx) =>
            idx === i
                ? { ...entry, bullets: entry.bullets.filter((_, bIdx) => bIdx !== j) }
                : entry
        ))
    }

    // Update bullet j in entry i
    function updateBullet(i: number, j: number, value: string) {
        setEntries(resume.experience.map((entry, idx) =>
            idx === i
                ? { ...entry, bullets: entry.bullets.map((b, bIdx) => bIdx === j ? value : b) }
                : entry
        ))
    }

    // Move bullet j up or down within entry i
    function moveBullet(i: number, j: number, direction: 'up' | 'down') {
        const entry = resume.experience[i]
        const bullets = [...entry.bullets]
        const target = direction === 'up' ? j - 1 : j + 1
        if (target < 0 || target >= bullets.length) return
        ;[bullets[j], bullets[target]] = [bullets[target], bullets[j]]
        setEntries(resume.experience.map((e, idx) =>
            idx === i ? { ...e, bullets } : e
        ))
    }

    return (
        <div className={styles.editor}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Experience</h2>
                <button className={styles.addBtn} onClick={addEntry}>+ Add Experience</button>
            </div>

            {resume.experience.length === 0 && (
                <p className={styles.empty}>No experience yet. Click &quot;+ Add Experience&quot; to start.</p>
            )}

            {resume.experience.map((entry, i) => (
                <div key={entry.id} className={styles.entry}>

                    {/* Row 1: title, company, location */}
                    <div className={styles.experienceHeader}>
                        <input className={styles.input} placeholder="Job Title"
                            value={entry.title}
                            onChange={e => updateEntry(i, 'title', e.target.value)} />
                        <input className={styles.input} placeholder="Company"
                            value={entry.company}
                            onChange={e => updateEntry(i, 'company', e.target.value)} />
                        <input className={styles.input} placeholder="Location"
                            value={entry.location}
                            onChange={e => updateEntry(i, 'location', e.target.value)} />
                        <button className={styles.removeBtn} title="Remove entry"
                            onClick={() => removeEntry(i)}>✕</button>
                    </div>

                    {/* Row 2: dates + current checkbox */}
                    <div className={styles.dateRow}>
                        <input className={styles.input} placeholder="Start Date (e.g. Jun 2022)"
                            value={entry.startDate}
                            onChange={e => updateEntry(i, 'startDate', e.target.value)} />
                        <input className={styles.input} placeholder="End Date"
                            value={entry.endDate}
                            disabled={entry.current}
                            onChange={e => updateEntry(i, 'endDate', e.target.value)} />
                        <label className={styles.currentLabel}>
                            <input type="checkbox"
                                checked={entry.current}
                                onChange={e => setCurrent(i, e.target.checked)} />
                            Present
                        </label>
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

export default ExperienceEditor
