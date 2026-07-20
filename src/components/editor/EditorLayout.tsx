import {useState} from 'react'
import type { Resume } from '../../types/resume'
import styles from './EditorLayout.module.css'
import ProfileEditor from './ProfileEditor'
import SkillsEditor from './SkillsEditor'
import EducationEditor from './EducationEditor'
import ExperienceEditor from './ExperienceEditor'
import ProjectsEditor from './ProjectsEditor'
import SettingsEditor from './SettingsEditor'

// These are the sections visible on the sidebar.
type Section = 'profile' | 'skills' | 'experience' | 'projects' | 'education' | 'settings'

const sections: Section[] = ['profile', 'skills', 'experience', 'projects', 'education', 'settings']

interface Props {
    resume: Resume
    updateResume: (resume: Resume) => void
}

function EditorLayout({ resume, updateResume }: Props) {
    const [activeSection, setActiveSection] = useState<Section>('profile')

    return (
        <div className={styles.container}>
            {/* SIDEBAR - List of Nav buttons*/}
            <nav className={styles.sidebar}>
                {sections.map(section => (
                    <button 
                        key={section}
                        className={activeSection === section ? styles.activeBtn : styles.btn}
                        onClick={() => setActiveSection(section)}
                    >
                        {/*Capitalise first letter for display*/}
                        {section.charAt(0).toUpperCase() +section.slice(1)}
                    </button>

                ))}
            </nav>

            {/* CONTENT - show which section is active */}
            <div className={styles.content}>
                {activeSection === 'profile' && (
                    <ProfileEditor resume={resume} updateResume={updateResume} />
                )}
                {activeSection === 'skills' && (
                    <SkillsEditor resume={resume} updateResume={updateResume} />
                )}
                {activeSection === 'education' && (
                    <EducationEditor resume={resume} updateResume={updateResume} />
                )}
                {activeSection === 'experience' && (
                    <ExperienceEditor resume={resume} updateResume={updateResume} />
                )}
                {activeSection === 'projects' && (
                    <ProjectsEditor resume={resume} updateResume={updateResume} />
                )}
                {activeSection === 'settings' && (
                    <SettingsEditor resume={resume} updateResume={updateResume} />
                )}


            </div>
        </div>
    )
}

export default EditorLayout