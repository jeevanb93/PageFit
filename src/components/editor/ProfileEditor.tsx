import type { Resume } from '../../types/resume'
import styles from './editor.module.css'

interface Props {
    resume: Resume
    updateResume: (resume: Resume) => void
}

function ProfileEditor({ resume, updateResume }: Props) {
    const { profile } = resume

    // update single field on profile
    function updateField(field: string, value: string) {
        updateResume({
            ...resume,
            profile: { ...profile, [field]: value }
        })
    }

    // add a blank link row
    function addLink() {
        updateResume({
            ...resume,
            profile: {
                ...profile, links: [...profile.links, { label: '', url: '' }]
            }
        })
    }

    //remove links at index 'i'
    function removeLink(i: number) {
        updateResume({
            ...resume,
            profile: {
                ...profile, links: profile.links.filter((_, index) => index !== i)
            }
        })
    }

    // update a single field on one link
    function updateLink(i: number, field: 'label' | 'url', value: string) {
        const newLinks = profile.links.map((link, index) =>
            index === i ? { ...link, [field]: value } : link
        )
        updateResume({ ...resume, profile: { ...profile, links: newLinks } })
    }

    return (
        <div className={styles.editor}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Profile</h2>
            </div>

            <label className={styles.label}>Name
                <input className={styles.input} value={profile.name}
                    onChange={e => updateField('name', e.target.value)} />
            </label>

            <label className={styles.label}>Email
                <input className={styles.input} type="email" value={profile.email}
                    onChange={e => updateField('email', e.target.value)} />
            </label>

            <label className={styles.label}>Phone
                <input className={styles.input} type="tel" value={profile.phone ?? ''}
                    onChange={e => updateField('phone', e.target.value)} />
            </label>

            <label className={styles.label}>Location
                <input className={styles.input} value={profile.location ?? ''}
                    onChange={e => updateField('location', e.target.value)} />
            </label>

            <div className={styles.header}>
                <span className={styles.label}>Links</span>
                <button className={styles.addBtn} onClick={addLink}>+ Add Link</button>
            </div>

            {profile.links.length === 0 && (
                <p className={styles.empty}>No links yet. Click &quot;+ Add Link&quot; to start.</p>
            )}

            {profile.links.map((link, i) => (
                <div key={i} className={styles.linkRow}>
                    <input className={styles.input} placeholder='Label' value={link.label}
                        onChange={e => updateLink(i, 'label', e.target.value)} />
                    <input className={styles.input} placeholder='URL' value={link.url}
                        onChange={e => updateLink(i, 'url', e.target.value)} />
                    <button className={styles.removeBtn} title="Remove link"
                        onClick={() => removeLink(i)}>✕</button>
                </div>
            ))}
        </div>
    )
}

export default ProfileEditor
