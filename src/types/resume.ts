interface Profile {
  name: string
  email: string
  phone?: string
  location?: string
  links: { label: string; url: string }[]
}

interface SkillGroup {
    label: string
    skills: string
}

interface Experience {
    id: number
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    bullets: string[]
}

interface Project {
    id: number
    title: string
    url:string
    bullets: string[]
}

interface Education {
    id: number
    school: string
    degree: string
    location: string
    date: string
}

interface Settings {
    paperSize: 'letter' | 'a4'
}

interface Resume {
    profile: Profile
    skills: SkillGroup[]
    experience: Experience[]
    projects: Project[]
    education: Education[]
    settings: Settings
}

export const defaultResume: Resume = {
    profile: {name: '', email: '', phone: '', location:'', links: []},
    skills: [],
    experience: [],
    projects: [],
    education: [],
    settings: {paperSize: 'letter'},
}

export type {Resume, Profile, SkillGroup, Experience, Project, Education, Settings}