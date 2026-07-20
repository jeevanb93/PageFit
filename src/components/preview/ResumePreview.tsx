import { useRef, useState, useEffect } from 'react'
import type { Resume } from '../../types/resume'
import styles from './ResumePreview.module.css'

interface Props {
    resume: Resume
}

function ResumePreview({ resume }: Props) {
    const { profile, skills, experience, projects, education, settings } = resume

    // Page dimensions in px at 96dpi
    const pageWidth  = settings.paperSize === 'a4' ? 794 : 816
    const pageHeight = settings.paperSize === 'a4' ? 1123 : 1056

    // Track the panel's width so we can scale the page to fit
    const panelRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const el = panelRef.current
        if (!el) return
        const observer = new ResizeObserver(() => {
            // Subtract padding (2 × 24px) before scaling
            setScale((el.offsetWidth - 48) / pageWidth)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [pageWidth])

    // Build the contact line — skip empty fields
    const contactParts = [
        profile.email,
        profile.phone,
        profile.location,
        ...profile.links.map(l => l.label || l.url),
    ].filter(Boolean)

    return (
        // panelRef measures the available panel width
        <div ref={panelRef} className={styles.panel}>

            {/* Wrapper collapses layout to the scaled size so the panel scrolls correctly */}
            <div style={{ width: pageWidth * scale, height: pageHeight * scale }}>

            {/* The page is rendered at full size then scaled down to fit */}
            <div
                className={styles.page}
                style={{
                    width: pageWidth,
                    minHeight: pageHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                {/* NAME */}
                <h1 className={styles.name}>{profile.name || 'Your Name'}</h1>

                {/* CONTACT ROW */}
                {contactParts.length > 0 && (
                    <p className={styles.contact}>
                        {contactParts.join(' | ')}
                    </p>
                )}

                {/* SKILLS */}
                {skills.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionHeading}>Skills</h2>
                        <div className={styles.skillsBody}>
                            {skills.map((group, i) => (
                                <p key={i}>
                                    <strong>{group.label}:</strong> {group.skills}
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {/* EXPERIENCE */}
                {experience.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionHeading}>Experience</h2>
                        {experience.map(entry => (
                            <div key={entry.id} className={styles.entry}>
                                <div className={styles.entryHeader}>
                                    <span>
                                        <strong>{entry.title}</strong>
                                        {entry.company && `, ${entry.company}`}
                                        {entry.location && ` — ${entry.location}`}
                                    </span>
                                    <span className={styles.dates}>
                                        {entry.startDate}
                                        {(entry.startDate && (entry.endDate || entry.current)) && ' – '}
                                        {entry.current ? 'Present' : entry.endDate}
                                    </span>
                                </div>
                                {entry.bullets.length > 0 && (
                                    <ul className={styles.bullets}>
                                        {entry.bullets.map((b, i) => b && <li key={i}>{b}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* PROJECTS — \vspace{-18.5pt} before section in template */}
                {projects.length > 0 && (
                    <section className={styles.tightSection}>
                        <h2 className={styles.sectionHeading}>Projects</h2>
                        {projects.map(entry => (
                            <div key={entry.id} className={styles.entry}>
                                <div className={styles.entryHeader}>
                                    <strong>{entry.title}</strong>
                                    {entry.url && <span className={styles.url}>{entry.url}</span>}
                                </div>
                                {entry.bullets.length > 0 && (
                                    <ul className={styles.bullets}>
                                        {entry.bullets.map((b, i) => b && <li key={i}>{b}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* EDUCATION — \vspace{-18.5pt} before section in template */}
                {education.length > 0 && (
                    <section className={styles.tightSection}>
                        <h2 className={styles.sectionHeading}>Education</h2>
                        {education.map(entry => (
                            <div key={entry.id} className={styles.eduEntry}>
                                <span>
                                    <strong>{entry.school}</strong>
                                    {entry.degree && ` — ${entry.degree}`}
                                    {entry.location && `, ${entry.location}`}
                                </span>
                                <span className={styles.dates}>{entry.date}</span>
                            </div>
                        ))}
                    </section>
                )}
            </div>
            </div>
        </div>
    )
}

export default ResumePreview
